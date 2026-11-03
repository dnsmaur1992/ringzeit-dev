# Ringzeit Dev – Architektur

Stand: Schritt 1 (Konzept zur Sichtung), 03.11.2026, Code-Stand `main` @ `b8b6443`.
Zeilenangaben beziehen sich auf `src/ringzeit.html` in diesem Stand (gegenüber der Codeprüfung in `914ed7d` ab Zeile 8473 um 7 verschoben).
Abschnitte 4–8 sind **Vorschlag**; erst nach deiner Sichtung gelten sie als beschlossen.

## 1. Isolation stabile App ↔ Dev-App (Schritt 0, abgenommen)

| | Stabile App | Entwicklungsapp |
|---|---|---|
| Repository | `dnsmaur1992/ringzeit` (nur lesend) | `dnsmaur1992/ringzeit-dev` |
| Adresse | `https://dnsmaur1992.github.io/ringzeit/` | `https://dnsmaur1992.github.io/ringzeit-dev/` |
| Origin | `https://dnsmaur1992.github.io` | **dieselbe** Origin |
| localStorage | `ringzeit.v1` | `ringzeit-dev.v1` |
| Cache Storage | `ringzeit-<build>` | `ringzeit-dev-<build>` |
| Service Worker | Scope `/ringzeit/` | Scope `/ringzeit-dev/` |
| Manifest | Name „Ringzeit“ | `id`/`start_url`/`scope` `./`, Name „Ringzeit Dev“ |
| Sicherung | `app: "ringzeit"` | `app: "ringzeit-dev"`; stabile Sicherungen werden abgelehnt |
| Cloud (Claude-Host) | optional | aus (`CLOUD_SYNC = false`) |

Kein `sessionStorage`, IndexedDB oder Cookies im Code. Kennungen stehen nur in `APP_ID`/`APP_NAME` (Abschnitt „Storage“);
`tools/build_pwa.py` liest sie. „Neu starten“ entfernt nur `ringzeit-dev.v1`; der Dev-Service-Worker löscht nur
`ringzeit-dev-…`-Caches. **Grenze:** Ein Update der *stabilen* App löscht alle fremden Caches, auch den Dev-Cache
(Dev-Daten bleiben); behebbar nur in der stabilen App per eigenem Auftrag.

## 2. Ausgangslage (Befunde der Codeprüfung, am aktuellen Stand bestätigt)

Die Befunde aus der Codeprüfung (Gesamtauftrag Abschnitt 9) gelten unverändert; Schritt 0 hat nur Kennungen,
Cloud-Schalter, Sicherungskennung und Build geändert. Am Code nachgeprüft:

- Ein Inline-Script (Zeile 4635–23437), keine Module, keine Klassen. Globaler Zustand `S` (8396) und `ui` (8407);
  Planlogik liest `S.profile` direkt (z. B. `sessMin`, `ageGroup`, `waFormat`-Aufruf in `compPhase` 8974).
- `buildSession` (10062) bündelt Auswahl, Belastung (`weekLoad`), Periodisierung (`phaseInfo`), Alters-/Disziplinregeln, Texte.
- Übungskatalog `X` (7438): 88 Einträge (warm 7, cond 19, str 34, mob 16, cool 6, pow 5, pre 1); `EX.id` = Arrayposition (8359).
  Abhärtungsübungen nutzen bereits stabile Text-IDs (`fWraps`, `neck`, `checks` …). Logs speichern Übungs-IDs in `perf`.
- Dosierung doppelt: Text aus `DOSE_FIX`/`DOSE_MIN`/`DOSE_SIDE`/`DOSE_LEG` + `doseTxt` (20959–21057), Timerphasen aus
  `exerciseTiming` (13385) mit eigenen Tabellen. Beide schlüsseln über **deutsche Namen**. Beispiel „Speed-Runden“:
  Text `4 × (10 s / 20 s locker)` (21005) und Timer `[4, 10, 20]` (13487) stimmen derzeit überein – Driftrisiko, kein Fehler.
- Belastung: `computeLoad` (9057) nutzt Minuten × RPE aus allen Logeinträgen (eigene **und** Verein), Entlastung bei
  Planwoche 5, RPE-Überschreitung oder Lastsprung > 30 %. Sportneutral, aber Logs tragen kein Sportfeld.
- Zufall: `rnd`/`shuffle` (8462) und weitere Stellen nutzen `Math.random` direkt (26 Aufrufe).
- `fmt` (12373) und `fmtS` (20059) sind identisch.
- Fitness-Freischaltung für Full Contact/K1 (`discLock`, 5638/6744) – widerspricht Gesamtauftrag 6A, Änderung erst in 3-U.
- `docs/trainingslogik.md` ist leer (bestätigt).

## 3. Leitlinien

- Bestehende Bausteine auslagern, nicht neu schreiben. Keine Frameworks, keine neuen Laufzeitabhängigkeiten.
- Explizite Eingaben statt verstecktem Zugriff auf `S`/`ui` – schrittweise, an den Stellen, die angefasst werden.
- Daten als Objekte (Sport, Regelprofil, Übung, Dosierung), Berechnungen als kleine Funktionen; Fabrikfunktion nur
  für Dienste mit Lebenszyklus (Speicher, Timer). Keine Vererbungshierarchie für Sportarten.
- Eine HTML-Datei für die Auslieferung bleibt (Offline-Cache, Pages-Unterpfad und Service Worker unverändert).

## 4. Zielstruktur (Vorschlag)

```
src/
  index.html                 Markup + CSS (heutiger Kopf/Body von ringzeit.html), Platzhalter für das Script
  core/                      ES-Module, ohne Zugriff auf S/ui/DOM, direkt mit node --test testbar
    format.js                Zeit-/Zahlenformat (fmt/fmtS zusammengeführt, numF)
    dates.js                 iso, parse, monday, addDays, daysBetween, wd (mit übergebenem "heute")
    random.js                rnd/shuffle mit austauschbarer Zufallsquelle (für Seeds)
    storage.js               createStore({ key, storage, cloud:false }) – heutiges store, Kennung von außen
    history.js               Logzugriff + Belastung (logRange, weekLoad, computeLoad) – Vertrag 6.4, Umsetzung 3-U
    prescription.js          strukturierte Dosierung → Text, Phasen, Zeitschätzung – Vertrag 6.3, Umsetzung 3-D
  catalog/
    exercises.js             Übungsdefinitionen (heute X) mit stabilen IDs + Abbildung alter Indizes (3-D)
  sports/
    index.js                 Register: sportFor(id), sichtbare/versteckte Sportarten
    kickboxing/              definition.js (Disziplinen, Formate, Typen), techniques.js (TECH/COMBOS/EXTRA), drills.js
    boxing/                  ab 4a-U
    taekwondo/               common.js, wt.js, itf.js – ab 6a/6b/6c
  app/                       bestehender App-Code als geordnete Teildateien in gemeinsamem Scope
    00-i18n.js … 90-boot.js  Schnitt entlang der vorhandenen Abschnittsköpfe (i18n, Inhalte, Zustand, Plan, Render,
                             Player, Timer, Figuren, Ratgeber, Ereignisse, Boot)
tools/build_pwa.py           baut core/catalog/sports mit esbuild zu einem Bundle (global `RZ`), hängt app/*.js an,
                             setzt beides in index.html ein → pwa/index.html (+ lesbar: build/ringzeit.html für Tests)
```

**Naht zwischen neuem Kern und Bestandscode:** Die Module werden mit esbuild als ein IIFE-Bundle mit genau einem
globalen Namen `RZ` gebaut. `src/app/00-imports.js` holt daraus *explizit* die genutzten Namen
(`const { fmtTime, createStore, sportFor } = RZ;`). So bleibt der Bestandscode lauffähig, die Tests behalten ihren
Zugriff auf `S`, `buildSession` usw., und jede Abhängigkeit vom Kern steht an einer Stelle. Der Bestandscode in
`app/` schrumpft mit jedem Teil; Kernmodule importieren nie aus `app/` (keine Zyklen, prüfbar per Skript).

Alternative (nicht empfohlen): alles sofort als ES-Module – erfordert Import-Listen für rund 590 gemeinsam genutzte Namen der obersten Ebene (davon ~450 Funktionen) auf einmal
und ein neues Test-Harness; zu großer Sprung für eine reine Extraktion.

## 5. Übernahmeliste

| Baustein (Zeile) | Übernahme | Wann |
|---|---|---|
| `store` + `migrate`/`slimSessions`/`hydrate` (8481) | wird `createStore`, Kennung/Cloud von außen; Migrationen bleiben | 2 |
| `X`/`EX`, `okEx`, `pickEx` (7438, 9096) | Daten nach `catalog/exercises.js`, Auswahl unverändert; stabile IDs in 3-D | 2 / 3-D |
| `TECH`/`COMBOS`/`EXTRA` (7236), `RT` (9220), `waFormat` (8953) | nach `sports/kickboxing/`; Regeln bekommen Alter/Disziplin als Parameter | 2 |
| `scheduleTimers`/`syncTimers`/`pauseOtherTimer` (19372), Audio, Wake Lock | bleiben in `app/`, unverändert; gemeinsamer Timervertrag erst bei Bedarf (2-B Wiederaufnahme) | – |
| `playerSteps`/`stepDone`/`setsHtml` (12887, 12274) | bleiben, werden von neuen Sportarten mitgenutzt | – |
| `figure`/`FIGS` (10651), `skFigure`/`SKETCH` (14887) | bleiben; Kleidung als Parameter in 4b/6a | 4b / 6a |
| `L`/`t()`, `summaryData` (4653, 18857) | bleiben; sportbezogene Texte später je Sportmodul | 4b ff. |
| `weekLoad`/`computeLoad` (9051) | Grundlage für `core/history.js` | 3-U |
| `fmt`/`fmtS` | zu einer Funktion in `core/format.js` | 2 |

## 6. Verträge

### 6.1 Diensteingaben
Planfunktionen bekommen einen **PlanContext** statt globaler Lesezugriffe:
`{ profile, sport, history, date, today, equipment, rng }`. Ein Adapter `planContext(ds)` in `app/` baut ihn aus `S`.
In Schritt 2 nutzen ihn nur die verschobenen Kickboxregeln; weitere Funktionen folgen, wenn sie in 3-U/4a ohnehin
angepasst werden. UI und Speicher werden außen angebunden (`render`, `store.save` bleiben in `app/`).

### 6.2 Sport- und Regeldaten
```
SportDefinition  { id: "kickboxing"|"boxing"|"taekwondo", styles?: ["wt","itf"], disciplines: [DisciplineDef],
                   sessionTypes, equipment, techniques, drills, attire, guides, sources, visible: bool }
DisciplineDef    { id: "lc"|"kl"|"fc"|"k1"|…, ruleProfile, minAge? }
RuleProfile      { publisher, title, version, validFrom, scope, format(age, ageClass) → {r,w,b,cls}|null,
                   allowedTechniques, ageClasses }
```
Fachliche Erfahrung/Grade bleiben je Sport bzw. Style im Profil (`profile.sports[sport] = { level, discipline, grades }`),
Belastung und vergleichbare Fitnesstests gemeinsam (konkretes Schema: 3-Q).

### 6.3 Übungen, stabile IDs und Dosierung (Umsetzung 3-D)
```
ExerciseDefinition { id: "str.pushup" (stabil, nie Anzeige), legacyIndex?: 12, cat, name: {de,en,ko?}, desc,
                     equip, locs, avoid, minLevel, sides: "none"|"side"|"leg" }
Prescription       { sets?, reps?|[lo,hi], workSec?|[lo,hi], restSec?, betweenSec?, sides, changeoverSec?,
                     intervals?: {n, on, off}, laps?, holdSec?, distanceM?, note? }
```
- Bestehende Daten: numerische IDs (Arrayposition) werden beim Laden über `legacyIndex` abgebildet; Text-IDs
  (`fWraps` …) bleiben. Neue Daten speichern nur stabile IDs. Kein Neunummerieren.
- Aus einer `Prescription` werden **abgeleitet**: `doseText(p, lang)`, `timerPhases(p, choice)`, `estimateSec(p)`.
  Reine Wiederholungen bekommen keine erfundene Ausführungszeit; die Schätzung kennzeichnet einen Pauschalwert.
- Plan (Prescription, Ziel) und Ist (`perf`, `rpe`, Minuten) bleiben getrennt.
- Schlüssel ist die ID, nie der Anzeigename – Umbenennen/Übersetzen (auch koreanisch) ändert keine Dosierung.

### 6.4 Historie und Belastung (Umsetzung 3-Q/3-U)
Ein gemeinsames Log für alle Sportarten; jede absolvierte Einheit genau einmal:
`TrainingEntry { id, date, src: "own"|"club"|"other", sport?, style?, discipline?, type, minutes (Ist), rpe|null,
inputConfirmed, completed, openExercises, perf, progression }`.
Belastung = Minuten × RPE wie heute (Session-RPE), über alle Quellen; fehlende Werte bleiben fehlend und werden
benannt, nicht geschätzt. Überschneidungen (Beine/Tritte, Schulter, Kraft, Intervalle, Beweglichkeit) und
Planaktualisierung legt 3-Q fest. Einträge ohne `sport` gelten als Kickboxen (betrifft nur eigene Dev-Daten).

## 7. Umfang Schritt 2 (Vorschlag: drei einzeln abnehmbare Unterteile)

Allen gemeinsam: **keine** Änderung an Training, Dosierung, Bedienung oder Texten; Vergleichsbasis muss identisch bleiben.

| Teil | Inhalt | Prüfung |
|---|---|---|
| **2.1 Aufteilung und Build** | `ringzeit.html` → `src/index.html` + `src/app/*.js` entlang der Abschnitte; Build setzt zusammen, erzeugt `build/ringzeit.html` (lesbar) und `pwa/` | zusammengesetztes Script **byte-gleich** zum alten; alle Tests laufen auf `build/ringzeit.html`; Baseline identisch; Isolationstest |
| **2.2 Kerndienste** | `core/format`, `dates`, `random`, `storage` als Module + `RZ`-Naht; `fmt`/`fmtS` zusammen; `store` über `createStore` | neue Modultests (Node); 105 Bestandstests; Baseline identisch; Sicherung/Reset im Isolationstest |
| **2.3 Kickboxmodul** | `catalog/exercises.js`, `sports/kickboxing/*` (Techniken, Kombis, Formate, Regeln) + `planContext`; Sportregister mit nur Kickboxen sichtbar | Baseline identisch (alle 16 Profilläufe × 8 Einheiten); Bestandstests; manuelles Kickboxtraining komplett |

Nicht in 2: stabile IDs/Dosierung (3-D), Belastungsmodell (3-U), Timer-Zustandsmaschine, UI-Vereinheitlichung,
Entfernen der Fitnesssperre, Bedienkorrekturen (2-B).

## 8. Vergleichsbasis

`node tests/baseline.mjs` führt die echten Funktionen (`buildSession`, `weekPlan`, `planOn`, `clubOn`, `weekLoad`,
`phaseInfo`, `doseTxt`, `exerciseTiming`) mit festem Datum (Mo 02.11.2026, 09:00), festem Zufall (mulberry32,
Seed je Fall) und synthetischen Profilen aus und vergleicht mit `tests/baseline/kickboxing.json`.

- **Profile (8):** LC Level 0 Erwachsen · LC Level 1 mit Vereinstagen · KL Jugend · FC Level 2 mit Turnier am
  28.11. (Peak-Phase) · K1 Level 2 mit Knieeinschränkung · LC Kinder (45 Min.) · KL Masters englisch, 4 Tage · LC mit
  Mobilitäts-Schwerpunktblock. Jedes Profil ohne und mit Historie (2 Wochen eigene + Vereinseinheiten, löst Entlastung aus).
- **Je Profillauf:** Planung über 14 Tage, Belastung/Phase für 3 Wochen, 8 Einheiten am 04.11. (Technik Halle/zu Hause,
  Partner, Kondition Halle/Lauf draußen, Kraft Halle/Studio, Mobilität) inkl. Dosierungstext und Timerphasen je Übung.
- **Empfindlichkeit geprüft:** Eine geänderte Dosierungszahl oder Rundenregel wird als Abweichung gemeldet.
- Regel: Schritt 2 muss identisch bleiben. Bewusste Änderungen ab 2-B/3-U: Abweichung erklären, in
  `implementation-status.md` dokumentieren, dann mit `--write` neu aufnehmen.

## 9. Maßgebliche Dateien, Build und Tests

| Datei | Rolle |
|---|---|
| `src/ringzeit.html` | lesbare Quelle (bis 2.1), einzige Quelle für App-Logik und Kennungen |
| `tools/build_pwa.py` | Build: `pwa/index.html` (esbuild-komprimiert), `pwa/sw.js`, `pwa/manifest.webmanifest` |
| `index.html`, `sw.js`, `manifest.webmanifest` | generiert, veröffentlicht (Kopie aus `pwa/`) – nicht von Hand ändern |
| `installieren.html` | Installationsseite, QR-Code auf die Dev-Adresse |
| `tests/training.test.mjs` | echtes Inline-Script in Node-VM (Logik, Ereignisse, Speicherung) – 105 Tests |
| `tests/baseline.mjs` + `tests/baseline/kickboxing.json` | Vergleichsbasis Kickboxen |
| `tests/isolation.e2e.mjs` | Browserprüfung stabile App ↔ Dev-App (Playwright/Chromium) |

```bash
npm i esbuild@0.24.2            # einmalig; build_pwa.py sucht node_modules/.bin/esbuild
node --test tests/training.test.mjs
node tests/baseline.mjs
python3 tools/build_pwa.py && cp pwa/index.html pwa/sw.js pwa/manifest.webmanifest .
node tests/isolation.e2e.mjs <Ordner der stabilen App>
```

Baseline-Stand vor Schritt 0: Commit `914ed7d`, inhaltsgleich mit der stabilen App `ff7a7d8`; 105/105 Tests; Build mit
esbuild 0.24.2 bis auf den Versionsstempel byte-identisch zum veröffentlichten `index.html`.

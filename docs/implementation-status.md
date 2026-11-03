# Ringzeit Dev – Umsetzungsstand

## Ziel und Basis

- Ziel: `https://github.com/dnsmaur1992/ringzeit-dev`, Pages `https://dnsmaur1992.github.io/ringzeit-dev/`
- Referenz (nur lesend): `https://github.com/dnsmaur1992/ringzeit`, Stand `ff7a7d8`
- Vergleichsbasis: `ringzeit-dev` @ `914ed7deed48b045cd3b220d1c0c3dfd4c2e483b` (manuelle Kopie der stabilen App, kein Git-Klon)
- Lieferweg: Dateien als ZIP aus dem Chat, manueller Upload durch den Betreiber. Kein Push durch Claude.

## Aktueller Teil

| Paket | Teil | Modell | Status |
|---|---|---|---|
| W1 | 0 – Entwicklungskopie isolieren | Opus | ABGENOMMEN (03.11.2026, Stand `b8b6443`) |
| W1 | 1 – Architektur und Vergleichsbasis | Opus | ABGENOMMEN (03.11.2026, Stand `e708335`) |
| W2 | 2 – Gemeinsamer Kern und Kickboxmodul | Opus (statt Sonnet, wegen Umfang) | ABGENOMMEN (03.11.2026, Stand `b0c5251`) |
| W2 | 2-B – Wiederaufnahme, Sprachausgabe, klare Texte | Sonnet 5.5 | ABGENOMMEN (03.11.2026, Stand `a7e29d1`) |
| W3 | 3-Q – Daten- und Belastungskonzept | Opus 5.5 | ABGENOMMEN (03.11.2026, Stand 97bf4f1) |
| W3 | 3-U – Historie, Belastung, Auswahl | Sonnet 5.5 | GELIEFERT – Abnahme offen |

## Entscheidungen

- Projektname „Ringzeit Dev“, frische Entwicklungsdaten, kein Altimport (Gesamtauftrag 6A).
- 03.11.2026, Schritt 0: Dev-App läuft unter `/ringzeit-dev/`. Daten nur lokal auf dem Gerät; Cloud-/Claude-Host-Speicherung abgeschaltet (`CLOUD_SYNC = false`).
- 03.11.2026, Schritt 0: Sicherungen der stabilen App werden in der Dev-App abgelehnt (Durchsetzung „kein Altimport“); eigene Dev-Sicherungen lassen sich speichern und zurückladen.
- Kontingent: Wochenlimit setzt dienstags 04:00 zurück.
- 03.11.2026, Schritt 1: Ordnerstruktur `core/`, `catalog/`, `sports/`, `app/` vom Betreiber als nachvollziehbar bestätigt. Schritt 2 als ein Umbau mit einer Abnahme (2.1–2.3 nur interne Zwischenstände mit Prüfung), weil es eine Entwicklungsversion ist und Rückfallmechanismen vorhanden sind. Übergang über `RZ`-Naht empfohlen (Verträge: `architecture.md` Abschnitt 6).
- 03.11.2026, Schritt 1: Satzpause, die beim Vor-/Zurückblättern verworfen wird, bleibt in Schritt 2 unverändert; mögliche Korrektur in 2-B (umgesetzt, siehe unten).
- 03.11.2026, Schritt 2: `RT`, `okEx`/`pickEx` bleiben vorerst in `app/08-plan.js` (mit Planlogik bzw. Profilgrenzen verwoben); Umzug, wenn 3-U/4a sie ohnehin anpassen.
- 03.11.2026, 2-B (Betreiber: „Android, Deutsch, mehr weiß ich nicht“; übrige Vorschläge unwidersprochen übernommen): Wiederaufnahme mit Dialog (immer, bei Stand älter als 24 h mit Zusatzzeile), Timer pausiert, nichts wird automatisch verbucht; paginierte Satzpause bleibt erhalten, wenn man zur selben Übung zurückkommt; Nackenübung überall „Isometrische Nackenkräftigung – Halteübung“, Dosierung unverändert 4 × 10 s (Text an den Timer angepasst, keine Mehrbelastung – der Full-Contact-Text „15 s, 2 Durchgänge“ entfällt).
- 03.11.2026, 3-Q (Betreiber): E1 Sportart je Einheit = Hauptsport aus Inbetriebnahme, je Einheit umstellbar (eigene und Verein); E2 Wochenstruktur bleibt, Inhalt aus gewählter Sportart; E3 Turniere/Prüfungen mit Sportart, Turniere jeder Sportart steuern die Belastungsphasen, Gürtelprüfung nur ihr Sport; E4 keine „sonstigen Aktivitäten“, dafür „Freier Lauf“ (Minuten, km, Anstrengung); E5 Dauer und Anstrengung Pflicht, keine Vorauswahl; E6 jede Woche startet mit fester Vorlage, Nicht-Begonnenes verfällt, Ergebnisse steuern Umfang/Intensität auch unbegonnener Einheiten der laufenden Woche, nicht die Tage; E7 Mittelweg: Fitnesstest löst Level aus, Technikteil je Sportart, Level je Sportart, Wettkampfklasse frei wählbar (FC/K1-Fitnesssperre entfällt). Details: `docs/data-load-concept.md`.
- 03.11.2026, 3-Q-Sichtung: Schutzregeln (Art-Tausch bei KO/Vereins-Sparring/stressiger Woche/Ramadan) bleiben; A1–A4, A8, A9, A11 wie vorgeschlagen; A5 ein Satz = erst links, dann rechts; A6 Nackenprogression bleibt, Text „je Richtung“ + Skizze mit vier Richtungen; A7 Kick-Halten-Timer auf ca. 4 Min.; A10 explosiv bleibt explosiv, langsam bleibt langsam; A12 Satzzahl gilt (3 × 4 Sprints).
- 03.11.2026, Schritt 1: Vergleichsbasis um vier Profile (Schulter/Rücken, wenig Zeit, 5 Tage, Gürtelprüfung) und zwei Abläufe „Navigieren während des Trainings und Fortsetzen“ erweitert.

## Prüfungen

Schritt 0 (03.11.2026, automatisch, nicht auf echten Geräten):
- `node --test tests/training.test.mjs`: 105/105 bestanden (vor und nach der Änderung).
- `node tests/isolation.e2e.mjs` gegen die stabile App `ff7a7d8` in Chromium auf gemeinsamer Origin (localhost): 12/12 bestanden – getrennte Schlüssel, Caches, Service Worker und Manifest; Cloud bleibt aus; eigene Sicherung hin und zurück; stabile Sicherung abgelehnt; Reset und Update der Dev-App lassen stabile Daten und Caches unberührt; Offline-Neustart der Dev-App.
- Beobachtet: ein Update der *stabilen* App löscht den Dev-Cache (nicht die Dev-Daten); siehe `architecture.md`.

Schritt 1 (03.11.2026, automatisch):
- `node tests/baseline.mjs`: Vergleichsbasis Kickboxen aufgenommen (12 Profile × ohne/mit Historie × 9 Einheiten + 2 Navigationsabläufe), reproduziert, Empfindlichkeit gegen geänderte Dosierung, Rundenregel und nicht pausierenden Timer geprüft.
- Bestandstests unverändert 105/105.

Schritt 2 (03.11.2026, automatisch; Zwischenstände lokal geprüft):
- 2.1 Aufteilung: zusammengesetztes `build/ringzeit.html` byte-gleich zur früheren `src/ringzeit.html`; komprimierte `index.html` bis auf den Versionsstempel byte-gleich zur veröffentlichten; Bestandstests 105/105; Vergleichsbasis identisch; Isolationstest 12/12.
- 2.2 Kerndienste (`core/format`, `dates`, `random`, `storage`, `fmt`/`fmtS` zusammengeführt): Bestandstests 105/105; neue Modultests 9/9 (u. a. Speicher voll → einmal verdichten, Cloud aus, Cloud-Spiegel mit Testhost, Modulgrenzen); Vergleichsbasis identisch; Isolationstest 12/12.
- 2.3 Katalog und Kickboxmodul (`catalog/exercises.js`, `sports/kickboxing/*`, `sports/index.js`, `planContext`): Bestandstests 105/105; Modultests 9/9; Vergleichsbasis identisch (24 Profilläufe × 9 Einheiten + 2 Navigationsabläufe); Isolationstest 12/12.
- Browser-Rauchtest der komprimierten App (Chromium, 390 × 844): Start ohne Konsolenfehler, Speicher lokal unter `ringzeit-dev.v1`, Einheit starten, Aufwärm-Timer läuft.
- Nicht geprüft: echte Geräte (iOS/Android), Ton/Sprachausgabe, Bildschirmsperre.

2-B (03.11.2026, automatisch; nicht auf echten Geräten):
- `node --test tests/training.test.mjs tests/core.test.mjs`: 122/122 (113 + 9; neu: Wiederaufnahme ×4, Satzpause beim Blättern, Nackenübung, Ansagen ×2).
- `node tests/baseline.mjs`: unverändert identisch (24 Profilläufe × 9 Einheiten, 2 Abläufe). Absichtlich geändert, aber von der Vergleichsbasis nicht erfasst: Texte/Name der Nackenübung, Wiederaufnahme, Satzpause beim Blättern, Ansage-Wiederholung – dafür eigene Tests.
- `node tests/isolation.e2e.mjs ../ringzeit`: 12/12.
- Chromium (komprimierte App, 390 × 844): Einheit starten → Seite neu laden → Dialog „Training fortsetzen?“ (Dienstag, 3.11. … Schritt 1 von 15) → „Fortsetzen“ → Ablauf an derselben Stelle, Timer auf Pause; keine Konsolenfehler.
- Android-Sprachausgabe: **nicht reproduziert** (kein Gerät, keine Gerätedaten). Es wurden nur begründete Absicherungen eingebaut, kein Fehler als „behoben“ gemeldet: (1) Sprachcode `de_DE` → `de-DE` (Android meldet Unterstriche; manche Engines wählen sonst die Standardstimme), (2) Stimmenliste beim Start einmal anfordern (Chrome lädt sie verzögert), (3) bei Fehlern (`synthesis-failed`, `language-unavailable` …) bis zu zwei Wiederholungen: nächstbeste Stimme, dann nur Sprache, (4) letzter Fehler erscheint unter Profil → App & Daten → „Stimme der Ansagen“ zur Diagnose. Unverändert: Offline-Stimmen bevorzugt, Online-Stimmen abgewertet, kein Cloud-TTS.

Manuelle Abnahmen:
- 03.11.2026: 2-B vom Betreiber auf dem Handy (App-Version 03.11.2026 08:34) getestet und abgenommen – Stand `main` @ `a7e29d1` (inkl. Entfernen von `docs/todo-bedienung-akku.md` und `src/core/text.txt`). **Wochenpaket 2/8 abgeschlossen.**
- 03.11.2026: Schritt 1 vom Betreiber gesichtet und abgenommen – Stand `main` @ `e708335` (`docs/architecture.md`, Vergleichsbasis). Bestätigt: Ordnerstruktur, Übergang über `RZ`, Schritt 2 als ein Umbau. **Wochenpaket 1/8 abgeschlossen.**
- 03.11.2026: Schritt 0 vom Betreiber manuell getestet und abgenommen („Alle Tests erfolgreich“) – Stand `main` @ `b8b6443`, App-Version 03.11.2026 04:47, Testliste: Dev-Version/Ladebild, frisches Profil, stabile Daten unverändert, eigene installierte App, Sicherung hin/zurück und Ablehnung stabiler Sicherung, Neu starten nur Dev, Offline-Start.

- 03.11.2026, 3-U (Betreiber): Vorauswahlen und vorbelegte Dauer bleiben wie bisher (E5 geändert); Sportwahl wird sichtbar (zurzeit nur Kickboxen); keine interne Testansicht nötig (Dev-App). Umsetzung und Abweichungen: `data-load-concept.md` Abschnitt 9. Schwelle der Bereichsregel 0,35 statt 0,4 (sonst löst hartes Sparring nie aus).

## Offen

- Cacheproblem der stabilen App (siehe oben) – nur per eigenem Auftrag an der stabilen App behebbar.
- `docs/rules-sources.md` angelegt (3-Q): Trainingsquellen T1/T2 für das Belastungsmodell; Verbandsregeln folgen in 4a-Q/5, WAKO-Fassung weiter unbelegt.
- 3-U: Technik-Test für eine neue Sportart (nur Technikteil) und die Frage nach dem Hauptsport in der Inbetriebnahme haben noch keine Oberfläche; beides erst sinnvoll, wenn eine zweite Sportart sichtbar ist (Kern `levelFor` ist fertig und getestet).
- Android-Sprachausgabe: Ursache nicht belegt. Für gezielte Behebung werden Gerät, Android-Version, Browser/installierte App und die Fehlermeldung unter „Stimme der Ansagen“ benötigt.
- Android-Tonprüfung aus der früheren `docs/todo-bedienung-akku.md` (entfernt) steht jetzt hier.

## Nächster Vorschlag (ohne Freigabe)

Nach Abnahme von 3-U: Teil 3-D – stabile Übungs-IDs, strukturierte Dosierung, Timer-Text-Abweichungen A1–A12 (Modell laut Plan Sonnet).

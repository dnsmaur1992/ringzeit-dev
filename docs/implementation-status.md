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
| W3 | 3-U – Historie, Belastung, Auswahl | Sonnet 5.5 | ABGENOMMEN (03.11.2026, Stand `5484843`, App-Version 03.11.2026 12:27; Sicherungs-Rückladung nicht von Hand getestet, nur automatisch) |
| W3 | 3-D – Stabile IDs, strukturierte Dosierung, Timer-Text-Abweichungen | Sonnet 5.5 | ABGENOMMEN (03.11.2026, Stand `e7fb557` inkl. Korrektur „Freier Lauf“, App-Version 03.11.2026 13:50; Altdaten, Full-Contact-Abhärtung und explosive Sätze nur automatisch getestet, auf Wunsch des Betreibers nicht von Hand) |
| W4 | 4a-Q – Boxquellen und Trainingskonzept | Opus 5.5 | ABGENOMMEN (03.11.2026 15:47, Stand `278b269`; `docs/boxing-concept.md`, `docs/rules-sources.md` R2, T3–T5) |
| W4 | 4a-U – Boxpläne (Entwicklungsvorschau) | Sonnet 5.5 | ABGENOMMEN (03.11.2026, Stand `a1c2946`, App-Version 03.11.2026 16:32, 164 Tests) |
| W4 | 4b – Gemeinsame Tipps und Boxeinstieg | Sonnet 5.5 | ABGENOMMEN (03.11.2026 17:27, Stand `e3c44f2`, App-Version 03.11.2026 17:21, 169 Tests) |
| W5 | 5 – Taekwondoquellen und Grad-/Trainingsmodell | Opus 5.5 | ABGENOMMEN (03.11.2026 18:02, Stand `0d01538`; `docs/taekwondo-concept.md`, `docs/rules-sources.md` R3a–R3d, R4a–R4d; nur Konzept, kein Code) |
| W5 | 6a – Gürtelbereich und Dobok | Sonnet 5.5 | WARTET AUF SICHTUNG (186 Tests, Baseline Kickboxen identisch; Nachbesserung nach erster Sichtung 03.11.2026 18:59, siehe unten) |

## 4b – Gemeinsame Tipps und Boxeinstieg (Umsetzung)

- **B1 Tipps/Wissenswertes**: dieselbe Anzeige wie beim Kickboxen (Ladebildschirm, Übungshinweise), nach Hauptsport gefiltert. Kickbox-Tipps tragen `k`, Box-Tipps (9) und Box-Fakten (7) `b` (Quellen Olympedia/Wikipedia in den Fakten); Box-Tipps zeigen „Hinweis aus dem Training – im Zweifel mit deinem Trainer abstimmen“ (Trainerprüfung empfohlen).
- **B2 Kleidung**: blau (links)/rot (rechts) mit weißer Gürtellinie auch im Ladebildschirm und im Onboarding, wenn Hauptsport Boxen.
- **B3 Ratgeber/Inhalte**: `src/app/34b-guide-box.js` – Themen Handschuhe & Bandagen, Sandsack, Amateurboxen-Geschichte (neutral, mit Quellen), Regeln & Links (DBV-WKB, Stand 01.09.2026, nur verlinkt); Kickbox-/WAKO-Themen (Schienbein, Kampfrichter, Disziplinen, Turniertag, Handschuhe) erscheinen für Boxer nicht, allgemeine Themen bleiben; Materialpflege ohne Schienbeinschutz; Packliste Boxen aus der WKB abgeleitet (eigene Punkte weiter möglich); Tour-Einleitung, Grundlagen-Hinweis und Teilen-Text DE/EN je Sportart; Bandagenvideo des Vereins bleibt für beide Sportarten.
- **B4 Einstieg und Freigabe**: Onboarding fragt zuerst die Sportart (nur wenn mehr als eine sichtbar), Boxer überspringen die Kickbox-Disziplinfrage; Technik-Test mit Boxbeschreibung (Jab, Cross, Haken, Uppercut, Deckung, Beinarbeit) und reiner Technikbewertung für die andere Sportart ohne Wiederholung des Fitnesstests (`techBy` je Sportart, Verlaufsansicht zeigt weiter den letzten vollständigen Test); Boxen `visible: true`, kein Vorschauhinweis mehr (nur Hinweis „Boxeinheit nach DBV-Regeln“ mit Regel-Link).
- **Grenzen**: Skizzen für Meiden/Körperhaken noch nicht vorhanden; Boxtipps sind Erinnerungen an bekannte Grundlagen und nicht trainergeprüft; Flexibilitätstest-Beschreibung für Boxer neutraler formuliert (Beinschwung statt Sidekick-Höhe).

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
- 03.11.2026: 3-D vom Betreiber abgenommen („Ich nehme 3d hiermit ab“; drei Prüfpunkte bewusst nicht von Hand) – Stand `main` @ `e7fb557`, App-Version 03.11.2026 13:50. Korrektur nach Test: bei „Freier Lauf“ war „Intervalle“ mitmarkiert (Fehler aus 3-U), behoben und getestet. **Wochenpaket 3/8 abgeschlossen.**
- 03.11.2026: 2-B vom Betreiber auf dem Handy (App-Version 03.11.2026 08:34) getestet und abgenommen – Stand `main` @ `a7e29d1` (inkl. Entfernen von `docs/todo-bedienung-akku.md` und `src/core/text.txt`). **Wochenpaket 2/8 abgeschlossen.**
- 03.11.2026: Schritt 1 vom Betreiber gesichtet und abgenommen – Stand `main` @ `e708335` (`docs/architecture.md`, Vergleichsbasis). Bestätigt: Ordnerstruktur, Übergang über `RZ`, Schritt 2 als ein Umbau. **Wochenpaket 1/8 abgeschlossen.**
- 03.11.2026: Schritt 0 vom Betreiber manuell getestet und abgenommen („Alle Tests erfolgreich“) – Stand `main` @ `b8b6443`, App-Version 03.11.2026 04:47, Testliste: Dev-Version/Ladebild, frisches Profil, stabile Daten unverändert, eigene installierte App, Sicherung hin/zurück und Ablehnung stabiler Sicherung, Neu starten nur Dev, Offline-Start.

- 03.11.2026, 3-U (Betreiber): Vorauswahlen und vorbelegte Dauer bleiben wie bisher (E5 geändert); Sportwahl wird sichtbar (zurzeit nur Kickboxen); keine interne Testansicht nötig (Dev-App). Umsetzung und Abweichungen: `data-load-concept.md` Abschnitt 9. Schwelle der Bereichsregel 0,35 statt 0,4 (sonst löst hartes Sparring nie aus).
- 03.11.2026, 4a-Q (Betreiber): B1 Regeln in der App nur verlinkt (WKB-PDF), keine Unzen/Gewichtstabellen · B2 Partnertage = Aufgabensparring, höchstens eine Runde „Freies Touch-Sparring“ (30–40 % Schlaghärte, Partner + Schutz, ab Fortgeschritten, Hinweis „nur nach Absprache mit Trainer“) · B3 keine Abhärtung, dafür Handgelenk & Griff; mehr Beinarbeit und Meiden mit dem Kopf · B4 über 40: 3 × 2 Min., „kein offizielles DBV-Format“. Details `docs/boxing-concept.md`.
- 03.11.2026, 3-D (Betreiber): A10 nach Vorschlag (in explosiven Blöcken ohne Gewichte nur Schnellkraftübungen mit 3–5 Wdh.; „langsam (3 s ab)“ nur in langsamen Blöcken). Umsetzung und Abweichungen: `docs/data-load-concept.md` §10 (stabile Text-IDs mit Migration in `hydrate`, `core/prescription.js`, A1–A12 und neu A13 Schienbein-Checks). Vergleichsbasis neu aufgezeichnet.

## 4a-U – Boxpläne (Umsetzung)

- **U1 Regeln** (`src/sports/boxing/rules.js`): DBV-Altersklasse nach Kalenderjahr (U13/U15/U17/U19/Erwachsene, §46), Rundenlänge je Klasse (§47, immer 3 Runden, 1 min Pause), Trainingsstandard ohne Turnier (3 × 3 min; jüngere Klassen mit der Rundenlänge ihrer Klasse; über 40: 3 × 2 min, „kein offizielles DBV-Format“), K.o.-Sperre 30 Tage (§89, Hinweis auf Steigerung und Anhang 5), Link zur WKB. Ohne Geburtsjahr gilt „Erwachsene“ (Betreiber, 03.11.2026). Boxen ist als `visible: false, preview: true` registriert.
- **U2 Technik** (`src/sports/boxing/techniques.js`, `tasks.js`): nur Schläge und gemeinsame Bewegungen aus dem Bestand (keine neuen Skizzen; Skizzen für Meiden/Körperhaken kommen mit 4b), Kombinationen je Level, Konterbausteine mit vorgegebener Gegneraktion, neun Boxaufgaben.
- **U3 Planer** (`src/app/08-plan.js`): `buildSession` setzt die Sportart der Einheit (`buildSport`); `discOf()` liefert für Boxen „box“, damit keine Kickbox-Disziplinregel greift. Neue Rundenarten „Beinarbeit-Runde“ und „Meiden & Kontern“ (immer mit Gegneraktion, A/B-Rahmen wie bei Partnerrunden); höherer Anteil an Beinarbeit und Meiden. Block „Handgelenk & Griff“ (6 min, fest) statt Abhärtung: Handtuch und Faustschluss immer, dazu eine Übung nach Alter, Level, Einschränkung und Ausrüstung (Faust-Stütz, Faust-Liegestütze, Handgelenk beugen/strecken, Fingerstrecken, Nackenhalten – nie doppelt zur Kraft-Übung); Kinder nur Handtuch und Griff.
- **U4 Partner**: Aufgabensparring; „Freies Touch-Sparring“ höchstens einmal je Einheit, nicht für Anfänger, Kinder, in Tapering-/Erholungswochen und nicht bei K.o.-Sperre, mit Hinweis „nur nach Absprache mit deinem Trainer und unter Aufsicht“. Kinder sparren nicht mit Partner. Gegneraktionen nur Schläge.
- **U5 Tests**: Kickbox-Baseline unverändert (24 Profile × 9 Einheiten, 2 Abläufe); neue Tests für Regeln, Daten, Formate, Handgelenkblock, Touch-Sparring, K.o.-Sperre (Boxen 30 Tage, Kickboxen 4 Wochen), Wechsel Boxen ↔ Kickboxen mit gemeinsamer Belastung. Bestehende Tests, die „boxing“ als unfertige Sportart benutzten, nutzen jetzt „taekwondo“.
- **Entwicklungsvorschau**: Boxen erscheint in der Sportwahl der Einheit und (auf Wunsch des Betreibers, 03.11.2026 16:13) als Hauptsport im Profil, jeweils nur als „Boxen“ beschriftet (die Vorschau ist in der Einheit durch Hinweis und Regel-Link gekennzeichnet); in der Einheit mit Hinweis und Link zum Regelwerk; nicht im normalen Menü und nicht im Onboarding. Mit Hauptsport Boxen entfallen im Profil Disziplin und Fokus, Kopfzeile und Zusammenfassung nennen „Boxen“, Kickbox-Regelmarken werden nicht gezeigt, der Wochenplan nutzt das Boxmuster.
- **Korrektur nach erstem Test (03.11.2026 16:11)**: In Boxeinheiten tauchte „Kick-Intervalle“ (Kraft/Kondition) auf. Alle Katalogübungen, deren Text Kicks nennt, sind jetzt für Boxen ausgeschlossen (`BOX_NO_EX`: Kick-Intervalle, Einbeinstand mit Kick-Hold, Zeitlupen-Kicks, Kick-Halten, Adduktoren & Spagat, Woodchopper, Copenhagen Plank); ein Test prüft, dass jede Katalogübung mit „Kick“ im Text dort steht.
- **Meiden-Runde ohne Gegneraussage** (Betreiber, 03.11.2026 16:24): Die Runde „Meiden & Kontern“ nennt nur die Abwehr und den Konter, nicht die Aktion des Gegners (bisher A/B-Rahmen, wirkte wie eine Partnerübung). Beschriftung in der Auswahl nur noch „Boxen“ (Betreiber, 16:28). Echte Gegneraktionen gibt es weiter nur in Partnerrunden. Dehnen/Halteübungen für die Beine bleiben unverändert (Betreiber).
- **Boxkleidung der Startseiten-Figuren** (Betreiber, 03.11.2026 16:30): Ist die gezeigte Einheit auf Boxen gestellt (Auswahl in der Einheit, sonst gebaute Einheit, sonst Hauptsport), tragen die Figuren Shirt und Hose in einer Farbe mit weißer Gürtellinie: links blau, rechts rot; die Szene zeigt dann die Boxpose (Jab gegen Meiden). Bei Kickboxen unverändert. Vorgezogen aus 4b („Kleidung als Parameter“, `docs/architecture.md`); die Sommer-Badehose wird bei Boxkleidung nicht gezeichnet.
- **Bekannte Grenzen**: Das Onboarding fragt weiter nur die Kickbox-Disziplin ab (Hauptsport Boxen nur im Profil). Wettkämpfe der Sportart Boxen nutzen das DBV-Format. Keine Skizzen für Meiden/Körperhaken (4b). Keine Gewichtsklassen/Handschuhgewichte (verlinkt). Eigene Kombinationen aus dem Verein (`myCombos`) gelten nur für Kickboxen.

## Offen

- Cacheproblem der stabilen App (siehe oben) – nur per eigenem Auftrag an der stabilen App behebbar.
- `docs/rules-sources.md` angelegt (3-Q): Trainingsquellen T1/T2 für das Belastungsmodell; Verbandsregeln folgen in 4a-Q/5, WAKO-Fassung weiter unbelegt.
- 3-U: Technik-Test für eine neue Sportart (nur Technikteil) und die Frage nach dem Hauptsport in der Inbetriebnahme haben noch keine Oberfläche; beides erst sinnvoll, wenn eine zweite Sportart sichtbar ist (Kern `levelFor` ist fertig und getestet).
- Android-Sprachausgabe: Ursache nicht belegt. Für gezielte Behebung werden Gerät, Android-Version, Browser/installierte App und die Fehlermeldung unter „Stimme der Ansagen“ benötigt.
- Android-Tonprüfung aus der früheren `docs/todo-bedienung-akku.md` (entfernt) steht jetzt hier.

## 6a – Gürtelbereich und Dobok (Umsetzung)

- **Sichtbarkeit**: Taekwondo steht ab 6a ohne Zusatz „Vorschau“ in allen Sportauswahlen. Einheiten bestehen vorerst nur aus sportneutralen Blöcken (Kraft, Kondition, Beweglichkeit, Abhärtung) mit Hinweis „Taekwondo-Technik und Partnerübungen folgen mit den WT- und ITF-Plänen“; Technik, Formate und Regelprofile kommen mit 6b (WT) und 6c (ITF).
- **Style** (WT / DTU oder ITF-D) wird im Profil (Ziele → Taekwondo-Grad) und im Onboarding gewählt, nicht je Einheit. Das Onboarding fragt bei Taekwondo Style und aktuellen Grad statt der Kickbox-Disziplin.
- **Grade**: WT 10.–1. Kup, 1. Dan, unter 15 Jahren 1. Poom statt Dan; ITF-D 10.–1. Kup und 1. Dan; kein höherer Dan, kein Minikup. Grad je Style getrennt, **kein Übertrag**. Ein Grad ändert sich nur durch Ersteintrag, manuelle Korrektur oder eine bestandene Prüfung, die der Betreiber bestätigt („Grad übernehmen?“ – erst nach Ja); Einheiten, Abzeichen und Fitnesstest ändern ihn nie.
- **Prüfung**: Datum + Zielgrad, Ergebnis bestanden/nicht bestanden, Verlauf (Datum, Style, Grad, Art, Ergebnis). Übersicht je Grad „laut PO“ mit Prüfungsteilen, Formname (nur Name, kein Inhalt; WT: übliche Taegeuk-Folge mit Hinweis, PO nennt nur die Nummer) und Mindestwartezeit als Hinweis (keine Sperre). Teile ohne App-Inhalt: „im Verein vorbereiten“. Kein Bruchtest für unter 15 (WT).
- **Dobok-Figuren**: Ist Taekwondo gezeigt (Einheit, sonst Hauptsport; Ladebild, Onboarding, Startseite), tragen die Figuren einen weißen Dobok mit V-Kragen; der Gürtel entspricht dem Grad des gewählten Styles (kein Grad = weißer Standardgürtel; Poom rot/schwarz geteilt). Badehose/Saisonschmuck ersetzen den Dobok nicht, keine Logos. Gürtelfarben ITF-D = DTU (Angabe des Betreibers 03.11.2026); die zweite Farbe läuft als Längsstreifen mittig über den ganzen Gürtel (Betreiber, 03.11.2026 19:02), auch am Farbfeld im Profil und an den Gürtelenden.
- **Technik-Test** Taekwondo: eigene Beschreibung (nur Technik), Stufe je Style.
- **Sicherung**: `profile.tkd` (Style, Grade, Verlauf, Prüfungen) gehört zum Profil und damit zur Sicherung; `migrate` normalisiert.
- **Code**: `src/sports/taekwondo/{index,grades}.js`, `src/app/36-tkd-grade.js`; Tests 186 (neu: Grade/Gürtel/Wartezeiten/Formen, Normalisierung, Prüfungsablauf mit Bestätigung, Style-Trennung, Panel, Taekwondo-Einheit, Dobok-/Gürtelfarben, Onboarding, Technik-Test).
- **Nachbesserung nach erster Sichtung (Betreiber, 03.11.2026 18:56)**: (1) Taekwondo-Einheiten enthielten noch Kickbox-Übungen (Schattenboxen, Kick-Intervalle, Speed-Runden, Kick-Halten, Zeitlupen-Kicks, Beinarbeit „in Kampfstellung“ u. a.) – jetzt per Ausschlussliste `TKDT.NO_EX` (13 Übungen) aus allen Taekwondo-Einheiten entfernt, bis 6b/6c eigene Technikblöcke bringen; neutrale Übungen und die Abhärtung bleiben. (2) Der **Stil (WT/ITF-D)** ist wieder beim Hauptsport einstellbar (Profil → Training), zusätzlich im Gradbereich. (3) **Umschalter „Technik-Namen: Koreanisch / App-Sprache“** (Standard Koreanisch, `profile.tkd.names`, Sicherung/Migration) ist eingebaut; er wirkt auf die Technik-Namen, sobald die WT-/ITF-Pläne (6b/6c) Techniken enthalten, die Sprachausgabe nennt sie immer in der App-Sprache (T4/T5). (3a) **Einheitenart bei Taekwondo** (Betreiber 19:12: „Schattenboxen“ mit Jab/Cross/High Kick trotz Namenseinstellung): die Auswahl in „Einheit anpassen“ bot Technik, Kampf und Partner auch für Taekwondo an und baute damit Kickbox-Kombinationen. Jetzt nur Kraft, Kondition, Mobility; ein Wechsel auf Taekwondo setzt eine unpassende Art auf Kraft, und der Planer wandelt T/C/P bei Taekwondo in Kraft um. Die Kickbox-Technikblöcke bekommen keine koreanischen Namen – die Namen kommen mit den eigenen Technikblöcken (6b/6c). (3b) **Onboarding-Bild** (Betreiber 19:13): bei Taekwondo wurde das Bild auf Höhe 0 zusammengedrückt (fehlte), bei Boxen zeigte es die Kick-Szene – jetzt feste Höhe (`flex-shrink:0`), Boxen zeigt die Boxszene (blau/rot), Taekwondo die Dobok-Figuren, Kickboxen unverändert. (4) **Dobok deutlicher**: reinweiß mit Naht- und Kragenlinien, Weiß-Ärmel mit dunklem Rand, Kopf und Fäuste in Hautton, keine Handschuhe bei Taekwondo-Figuren.
- **Bekannte Grenzen**: keine Taekwondo-Techniken/Drills/Regelprofile (6b/6c); Tipps/Fakten nur allgemein (6d); Abhärtung wie bisher, neue Bereiche (Handkante, Finger, Fuß) kommen in 6b/6c; das Onboarding-Bild bei Boxen ist angepasst (3b).

## Nächster Vorschlag (ohne Freigabe)

Nach Sichtung von 6a: Teil 6b – WT-Pläne (Modell laut Plan: Sonnet). Erst nach Abnahme von 6a und ausdrücklichem Auftrag.

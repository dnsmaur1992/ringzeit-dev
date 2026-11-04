# Gesamtprüfung (Teil 7)

Stand der Prüfung: Repo `df2ab31` (6d abgenommen), App-Version 03.11.2026 22:31. Geprüft am 03./04.11.2026 mit Opus 5.5.
Teil 7a prüft nur und behebt nichts. Korrekturen kommen in 7b, und nur die Befunde, die der Betreiber freigibt.

Die Belege sind nach Herkunft getrennt:
- **automatisch**: Node-VM (Produktionscode) oder Chromium per Playwright
- **Gerät**: echtes iPhone/Android, durch den Betreiber
- **fachlich**: Trainer- oder Regelurteil

## 1. Automatisch belegt

| Prüfung | Umfang | Ergebnis |
|---|---|---|
| Testsuite `node --test tests/training.test.mjs tests/core.test.mjs` | 213 Tests | alle grün |
| Vergleichsbasis Kickboxen `node tests/baseline.mjs` | 24 Profile × 9 Einheiten, 2 Abläufe | identisch |
| Isolation stabile App ↔ Dev `node tests/isolation.e2e.mjs ../ringzeit` | 12 Prüfungen | bestanden |
| **Ablauf-Matrix** `node tests/final-check.mjs` | 648 Einheiten: Kickboxen LC/KL/PF/FC/K1 (Erwachsene) und LC Jugend 13, Boxen Erwachsene und Jugend 14, WT Erwachsene 4. Kup und Kind 9 J., ITF Erwachsene 5. Kup und Jugend 16 J.; je Level 0–2, Typ T/S/P/K/C/M, Ort Halle/Zuhause/Draußen | 0 Befunde: jede Einheit vom Start bis zum Abschluss geführt. Zeitübungen laufen von selbst weiter, Sätze werden eingetragen, Runden laufen über den Rundentimer. Kein `undefined`/`NaN` in einem Schritt oder im Abschlussformular. Am Ende vollständig, Verlaufseintrag mit Sportart. |
| H2 WT- und ITF-Einheit in derselben Woche | Abschluss vollständig und vorzeitig | jede Einheit genau einmal gezählt (Wochenlast 730 = 75 × 6 + 40 × 7) |
| H3 hartes Vereinssparring am Vortag | Boxen → Kickboxen, Taekwondo → Kickboxen | Boxen entlastet die Arme, Taekwondo Beine und Arme (siehe B1) |
| H4 Wiederaufnahme | ITF-Einheit im Kickbox-Profil, Rundentimer, Neustart | angeboten; Sport, Stil und ITF-Namen bleiben erhalten |
| H5 Sicherung → Rückladen | Taekwondo-Profil mit Graden, Historie, Namensart | unverändert |
| H6 Level | Technik je Sport und Stil, Fitness gemeinsam | wie entschieden |
| H7 kein automatischer Gürtel | drei vollständige Einheiten | Grad unverändert |
| H8 Dosierungstext ↔ Timer | 216 Einheiten, alle Zeitübungen mit „n × s“ | keine Abweichung (zusätzlich A1–A13 in der Suite) |
| H9 sportfremde Begriffe in Einheiten | 4 Sportprofile × 6 Typen × 3 Level, DE/EN | **1 Befund** (B3) |
| Feiertags- und Posenbilder | 3 Sportarten × 16 Feiertage/Jahreszeiten × 8 Szenen | 384 Szenen ohne Fehler; Taekwondo immer im Dobok |
| Abhärtung | alle Sportarten, Alter 30/16/10 | Taekwondo ohne Bandagen/Handschuhe, Boxen ohne Schienbein/Fuß |
| **Ansichten 390 px** `node tests/final-browser.cjs views` | 10 Seiten je Kickboxen/Boxen/WT/ITF × DE/EN | ohne `undefined`/`NaN`, ohne Seitwärtsscrollen, ohne JS-Fehler |
| **Offline** `node tests/final-browser.cjs off` | ausgelieferter Stand (Repo-Wurzel) | Service Worker aktiv; Cache nur `ringzeit-dev-…`; Start ohne Server nach dem ersten Besuch funktioniert |
| **Frisches Profil** `node tests/final-browser.cjs onb` | Inbetriebnahme je Hauptsport bis zur App | bestanden (B5 beachten) |

Hinweis zur Methode: Die Matrix ersetzt Tippen durch Programmaufrufe der echten Bedienwege (`data-player`,
`data-fx`, Abschlussformular). Ton, Vibration, Wachhalten und Systemstimmen gibt es im VM nicht. Sie sind nur auf
dem Gerät belegbar.

## 2. Befunde (Vorschlag für 7b)

| Nr. | Schwere | Befund | Beleg | Vorschlag 7b |
|---|---|---|---|---|
| B1 | mittel | **Taekwondo-Belastungsbereiche nicht wie im Konzept.** Konzept 6.1 und Entscheidung 6c-4 nennen WT Beine 0,50 · Arme 0,15 · Rumpf 0,15 · Ausdauer 0,20 und ITF 0,40 · 0,25 · 0,15 · 0,20. Umgesetzt ist das nicht: Taekwondo-Vereinstraining zählt wie Kickboxen (Beine 0,40 · Arme 0,40 · Rumpf 0,20). Bei eigenen Einheiten zählen nur Katalogübungen, Tritt-Runden fehlen. Eine WT-Technikeinheit landet so z. B. bei Beine 0,33 · Ausdauer 0,67. Folge: Nach hartem Taekwondo am Vortag werden auch die Arme entlastet. | H1, H3b | In `core/history.js` eine Taekwondo-Tabelle je Stil für Vereinstraining und als Ersatz bei eigenen Einheiten. Kickbox-Baseline bleibt identisch. Braucht B2. |
| B2 | klein–mittel | **Verlaufseintrag ohne Stil/Disziplin der Einheit.** Die Einheit speichert WT/ITF bzw. die Kickbox-Disziplin, der Verlaufseintrag nicht. Der Verlauf kann später nicht zeigen, ob eine Einheit WT oder ITF war, und B1 kann nicht nach Stil unterscheiden. | H2b | Feld `tstyle` bzw. `disc` in den Verlaufseintrag übernehmen; im Verlauf kurz anzeigen („Taekwondo · ITF“). Alte Einträge bleiben ohne Feld. |
| B3 | klein | **Boxen: Einstiegsrunde nennt Kicks.** „Einstiegsrunde: 70 % Tempo, Kicks höchstens auf Körperhöhe.“ (EN: „kicks no higher than the body“) erscheint auch in Boxeinheiten. | H9 | Box-Variante, z. B. „Einstiegsrunde: 70 % Tempo, locker und kontrolliert.“ (DE/EN); Kickboxen und Taekwondo unverändert. |
| B4 | klein | **Texte außerhalb der App noch kickbox-only bzw. veraltet.** Manifest-Beschreibung „Trainingsplaner für Kickboxen nach WAKO-Regeln“ (sichtbar bei der Installation). `installieren.html`: Einleitung und Teilen-Text nur Kickboxen/WAKO. README: Taekwondo fehlt fast ganz, Boxen als „Entwicklungsvorschau“, Haftungshinweis nennt nur WAKO (nicht DBV, DTU, ITF-D). `docs/architecture.md`: Boxen „visible: false, preview“. | Textsuche | Texte auf drei Sportarten bringen; Haftungshinweis für alle Verbände. Nur Text, keine Funktion. |
| B5 | klein | **Doppeltippen auf „Verstanden“ (Sicherheitshinweis der Inbetriebnahme).** Nach dem Tippen bleibt die Seite etwa 2 s stehen. Ein zweites Tippen in dieser Zeit erzeugt einen JS-Fehler (`Cannot read properties of null (reading 'ack')`). Im Browserlauf ohne sichtbare Folge, das Profil wird korrekt angelegt. | Chromium-Lauf mit Mehrfachklick | Zweites Tippen abfangen (keine Aktion, wenn die Inbetriebnahme schon abgeschlossen ist). |

Keine weiteren Befunde: Ablauf, Timer, Pause/Fortsetzen, automatische Runde, offene Übungen, Abschluss,
Verlauf/Export, Wiederaufnahme, Isolation, Offline-Cache, Ansichten DE/EN und die Sportbilder sind automatisch ohne
Fehler.

## 3. Nur auf dem Gerät belegbar

| Punkt | Stand |
|---|---|
| iPhone, installierte App (Home-Bildschirm) | Laut Betreiber durchgehend genutzt und bisher ohne Fehler. Die Checkliste für die Endabnahme folgt in 7c. |
| Android: Sprachausgabe DE/EN, Ton, Wachhalten | **nicht belegt** (kein Gerät verfügbar, Entscheidung des Betreibers 03.11.2026) |
| Ton bei Stummschalter, Bildschirm bleibt an, Hintergrund/Neustart mitten in der Runde | nur Gerät; VM-Tests decken die Logik ab (Wiederaufnahme, Uhr, Weckfunktion) |
| Pages-Update auf dem Gerät (neue Version beim nächsten Start) | nur Gerät; Service-Worker-Logik und Cache-Präfix automatisch geprüft |

## 4. Fachlich offen (Trainer/Regelwerk)

- D3: Tul/Partnerform je Kup am Original der ITF-D-PO prüfen.
- WT Art. 14 (verbotene Handlungen) in der Fassung ab 01.06.2026 nicht gesehen.
- WAKO-Regelfassung für Kickboxen weiter unbelegt.
- Ratgeber Taekwondo: Gürtelbinden, Dobok-Pflege, „Respekt vor dem Gürtel“ sind allgemeine Praxis.
- Trainerfragen F1–F3 (siehe `docs/taekwondo-concept.md`).

Die Prüfliste zum Abhaken folgt in 7c.

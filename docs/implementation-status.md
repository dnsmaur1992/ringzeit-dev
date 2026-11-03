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
| W2 | 2 – Gemeinsamer Kern und Kickboxmodul | Opus (statt Sonnet, wegen Umfang) | WARTET AUF MANUELLEN TEST |
| W2 | 2-B – Wiederaufnahme, Sprachausgabe, klare Texte | Sonnet | nicht beauftragt |

## Entscheidungen

- Projektname „Ringzeit Dev“, frische Entwicklungsdaten, kein Altimport (Gesamtauftrag 6A).
- 03.11.2026, Schritt 0: Dev-App läuft unter `/ringzeit-dev/`. Daten nur lokal auf dem Gerät; Cloud-/Claude-Host-Speicherung abgeschaltet (`CLOUD_SYNC = false`).
- 03.11.2026, Schritt 0: Sicherungen der stabilen App werden in der Dev-App abgelehnt (Durchsetzung „kein Altimport“); eigene Dev-Sicherungen lassen sich speichern und zurückladen.
- Kontingent: Wochenlimit setzt dienstags 04:00 zurück.
- 03.11.2026, Schritt 1: Ordnerstruktur `core/`, `catalog/`, `sports/`, `app/` vom Betreiber als nachvollziehbar bestätigt. Schritt 2 als ein Umbau mit einer Abnahme (2.1–2.3 nur interne Zwischenstände mit Prüfung), weil es eine Entwicklungsversion ist und Rückfallmechanismen vorhanden sind. Übergang über `RZ`-Naht empfohlen (Verträge: `architecture.md` Abschnitt 6).
- 03.11.2026, Schritt 1: Satzpause, die beim Vor-/Zurückblättern verworfen wird, bleibt in Schritt 2 unverändert; mögliche Korrektur in 2-B.
- 03.11.2026, Schritt 2: `RT`, `okEx`/`pickEx` bleiben vorerst in `app/08-plan.js` (mit Planlogik bzw. Profilgrenzen verwoben); Umzug, wenn 3-U/4a sie ohnehin anpassen.
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

Manuelle Abnahmen:
- 03.11.2026: Schritt 1 vom Betreiber gesichtet und abgenommen – Stand `main` @ `e708335` (`docs/architecture.md`, Vergleichsbasis). Bestätigt: Ordnerstruktur, Übergang über `RZ`, Schritt 2 als ein Umbau. **Wochenpaket 1/8 abgeschlossen.**
- 03.11.2026: Schritt 0 vom Betreiber manuell getestet und abgenommen („Alle Tests erfolgreich“) – Stand `main` @ `b8b6443`, App-Version 03.11.2026 04:47, Testliste: Dev-Version/Ladebild, frisches Profil, stabile Daten unverändert, eigene installierte App, Sicherung hin/zurück und Ablehnung stabiler Sicherung, Neu starten nur Dev, Offline-Start.

## Offen

- Cacheproblem der stabilen App (siehe oben) – nur per eigenem Auftrag an der stabilen App behebbar.
- `docs/rules-sources.md` entsteht mit den ersten Quellen (spätestens 4a-Q).

## Nächster Vorschlag (ohne Freigabe)

Nach Abnahme von Schritt 2: Schritt 2-B – Wiederaufnahme nach Neuladen/Beenden, Android-Sprachausgabe, Nackenhalte-Texte (Modell laut Plan Sonnet). Vor Code: offene Timerfragen und Android-Reproduktionsdaten klären.

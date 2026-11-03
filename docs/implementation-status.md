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
| W1 | 1 – Architektur und Vergleichsbasis | Opus | WARTET AUF SICHTUNG (Konzept + Vergleichsbasis) |

## Entscheidungen

- Projektname „Ringzeit Dev“, frische Entwicklungsdaten, kein Altimport (Gesamtauftrag 6A).
- 03.11.2026, Schritt 0: Dev-App läuft unter `/ringzeit-dev/`. Daten nur lokal auf dem Gerät; Cloud-/Claude-Host-Speicherung abgeschaltet (`CLOUD_SYNC = false`).
- 03.11.2026, Schritt 0: Sicherungen der stabilen App werden in der Dev-App abgelehnt (Durchsetzung „kein Altimport“); eigene Dev-Sicherungen lassen sich speichern und zurückladen.
- Kontingent: Wochenlimit setzt dienstags 04:00 zurück.
- 03.11.2026, Schritt 1 (Vorschlag, noch nicht gesichtet): Zielstruktur `core/`, `catalog/`, `sports/`, `app/` mit `RZ`-Naht; Schritt 2 in drei Unterteile 2.1/2.2/2.3; Verträge siehe `architecture.md` Abschnitt 6.

## Prüfungen

Schritt 0 (03.11.2026, automatisch, nicht auf echten Geräten):
- `node --test tests/training.test.mjs`: 105/105 bestanden (vor und nach der Änderung).
- `node tests/isolation.e2e.mjs` gegen die stabile App `ff7a7d8` in Chromium auf gemeinsamer Origin (localhost): 12/12 bestanden – getrennte Schlüssel, Caches, Service Worker und Manifest; Cloud bleibt aus; eigene Sicherung hin und zurück; stabile Sicherung abgelehnt; Reset und Update der Dev-App lassen stabile Daten und Caches unberührt; Offline-Neustart der Dev-App.
- Beobachtet: ein Update der *stabilen* App löscht den Dev-Cache (nicht die Dev-Daten); siehe `architecture.md`.

Schritt 1 (03.11.2026, automatisch):
- `node tests/baseline.mjs`: Vergleichsbasis Kickboxen aufgenommen (8 Profile × ohne/mit Historie × 8 Einheiten), zweimal reproduziert, Empfindlichkeit gegen geänderte Dosierung/Rundenregel geprüft.
- Bestandstests unverändert 105/105.

Manuelle Abnahmen:
- 03.11.2026: Schritt 0 vom Betreiber manuell getestet und abgenommen („Alle Tests erfolgreich“) – Stand `main` @ `b8b6443`, App-Version 03.11.2026 04:47, Testliste: Dev-Version/Ladebild, frisches Profil, stabile Daten unverändert, eigene installierte App, Sicherung hin/zurück und Ablehnung stabiler Sicherung, Neu starten nur Dev, Offline-Start.

## Offen

- Cacheproblem der stabilen App (siehe oben) – nur per eigenem Auftrag an der stabilen App behebbar.
- `docs/rules-sources.md` entsteht mit den ersten Quellen (spätestens 4a-Q).

## Nächster Vorschlag (ohne Freigabe)

Nach Sichtung von Schritt 1: Schritt 2.1 – Aufteilung und Build (reine Extraktion), Modell Sonnet.

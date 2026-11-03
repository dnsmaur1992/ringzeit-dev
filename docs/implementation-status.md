# Ringzeit Dev – Umsetzungsstand

## Ziel und Basis

- Ziel: `https://github.com/dnsmaur1992/ringzeit-dev`, Pages `https://dnsmaur1992.github.io/ringzeit-dev/`
- Referenz (nur lesend): `https://github.com/dnsmaur1992/ringzeit`, Stand `ff7a7d8`
- Vergleichsbasis: `ringzeit-dev` @ `914ed7deed48b045cd3b220d1c0c3dfd4c2e483b` (manuelle Kopie der stabilen App, kein Git-Klon)
- Lieferweg: Dateien als ZIP aus dem Chat, manueller Upload durch den Betreiber. Kein Push durch Claude.

## Aktueller Teil

| Paket | Teil | Modell | Status |
|---|---|---|---|
| W1 | 0 – Entwicklungskopie isolieren | Opus | WARTET AUF MANUELLEN TEST |
| W1 | 1 – Architektur und Vergleichsbasis | Opus | nicht beauftragt |

## Entscheidungen

- Projektname „Ringzeit Dev“, frische Entwicklungsdaten, kein Altimport (Gesamtauftrag 6A).
- 03.11.2026, Schritt 0: Dev-App läuft unter `/ringzeit-dev/`. Daten nur lokal auf dem Gerät; Cloud-/Claude-Host-Speicherung abgeschaltet (`CLOUD_SYNC = false`).
- 03.11.2026, Schritt 0: Sicherungen der stabilen App werden in der Dev-App abgelehnt (Durchsetzung „kein Altimport“); eigene Dev-Sicherungen lassen sich speichern und zurückladen.
- Kontingent: Wochenlimit setzt dienstags 04:00 zurück.

## Prüfungen

Schritt 0 (03.11.2026, automatisch, nicht auf echten Geräten):
- `node --test tests/training.test.mjs`: 105/105 bestanden (vor und nach der Änderung).
- `node tests/isolation.e2e.mjs` gegen die stabile App `ff7a7d8` in Chromium auf gemeinsamer Origin (localhost): 12/12 bestanden – getrennte Schlüssel, Caches, Service Worker und Manifest; Cloud bleibt aus; eigene Sicherung hin und zurück; stabile Sicherung abgelehnt; Reset und Update der Dev-App lassen stabile Daten und Caches unberührt; Offline-Neustart der Dev-App.
- Beobachtet: ein Update der *stabilen* App löscht den Dev-Cache (nicht die Dev-Daten); siehe `architecture.md`.

Manuelle Abnahmen: noch keine.

## Offen

- Manueller Test von Schritt 0 auf echten Geräten (iPhone/Android) mit stabiler App und Dev-App nebeneinander.
- GitHub Pages für `ringzeit-dev` aktiv? (vom Betreiber zu prüfen)
- Cacheproblem der stabilen App (siehe oben) – nur per eigenem Auftrag an der stabilen App behebbar.
- `docs/rules-sources.md` entsteht mit den ersten Quellen (spätestens 4a-Q).

## Nächster Vorschlag (ohne Freigabe)

Nach manueller Abnahme von Schritt 0: Schritt 1 – Architektur und Vergleichsbasis, Modell Opus.

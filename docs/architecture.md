# Ringzeit Dev – Architektur

Stand: Schritt 0 (Isolation), 03.11.2026. Modulgrenzen, Verträge und Vergleichsprofile folgen in Schritt 1.

## Grenzen

| | Stabile App | Entwicklungsapp |
|---|---|---|
| Repository | `dnsmaur1992/ringzeit` (nur lesend) | `dnsmaur1992/ringzeit-dev` |
| Adresse | `https://dnsmaur1992.github.io/ringzeit/` | `https://dnsmaur1992.github.io/ringzeit-dev/` |
| Origin | `https://dnsmaur1992.github.io` | **dieselbe** Origin |
| localStorage | `ringzeit.v1` | `ringzeit-dev.v1` |
| Cache Storage | `ringzeit-<build>` | `ringzeit-dev-<build>` |
| Service Worker | Scope `/ringzeit/` | Scope `/ringzeit-dev/` |
| Manifest | Name „Ringzeit“, `start_url`/`scope` `./` | `id`/`start_url`/`scope` `./` (= `/ringzeit-dev/`), Name „Ringzeit Dev“ |
| Sicherung | `app: "ringzeit"` | `app: "ringzeit-dev"`, Dateiname `ringzeit-dev-…json`; stabile Sicherungen werden abgelehnt |
| Cloud (Claude-Host) | optional | aus (`CLOUD_SYNC = false`) |

Weitere Speicherorte gibt es im geprüften Code nicht: kein `sessionStorage`, kein IndexedDB, keine Cookies.
`navigator.storage.persist()` gilt für die ganze Origin und hat keine Kollisionen zur Folge.

Die Kennungen stehen an genau einer Stelle: `APP_ID` und `APP_NAME` in `src/ringzeit.html` (Abschnitt „Storage“).
`tools/build_pwa.py` liest sie dort und erzeugt daraus Titel, Manifest und Cachenamen.

Bereinigung betrifft nur Eigenes:
- „Neu starten“ (`resetAll`) entfernt nur `localStorage[LS]` (`ringzeit-dev.v1`) und lädt neu.
- Der Dev-Service-Worker löscht bei Aktivierung nur Caches mit Präfix `ringzeit-dev-` außer dem aktuellen.
- Kein `localStorage.clear()`, kein Abmelden fremder Service Worker, kein Originreset.

**Bekannte Grenze außerhalb dieses Repositorys:** Der Service Worker der stabilen App löscht bei jedem ihrer Updates
*alle* anderen Caches derselben Origin, also auch `ringzeit-dev-…`. Dev-Daten (localStorage) bleiben davon unberührt;
der Dev-Cache wird beim nächsten Online-Start neu gefüllt. Bis dahin ist die Dev-App nicht offline startbar.
Beheben lässt sich das nur in der stabilen App (Präfixfilter wie hier) – eigener Auftrag, nicht Teil von ringzeit-dev.

## Maßgebliche Dateien

| Datei | Rolle |
|---|---|
| `src/ringzeit.html` | lesbare Quelle (HTML, CSS, ein Inline-Script), einzige Quelle für App-Logik und Kennungen |
| `tools/build_pwa.py` | Build: `pwa/index.html` (mit esbuild komprimiert), `pwa/sw.js`, `pwa/manifest.webmanifest` |
| `index.html`, `sw.js`, `manifest.webmanifest` | generierte, veröffentlichte Dateien (Kopie aus `pwa/`) – nicht von Hand ändern |
| `installieren.html` | Installationsseite mit QR-Code auf die Dev-Adresse (handgeschrieben) |
| `tests/training.test.mjs` | führt das echte Inline-Script in einer Node-VM aus (Logik, Ereignisse, Speicherung) |
| `tests/isolation.e2e.mjs` | Browserprüfung stabile App ↔ Dev-App auf gemeinsamer Origin |

## Build und Tests

```bash
npm i esbuild@0.24.2            # einmalig; build_pwa.py sucht node_modules/.bin/esbuild
node --test tests/training.test.mjs
python3 tools/build_pwa.py
cp pwa/index.html pwa/sw.js pwa/manifest.webmanifest .
node tests/isolation.e2e.mjs <Ordner der stabilen App>   # Playwright + Chromium
```

Ohne esbuild baut das Skript unkomprimiert (funktionsgleich, größer).

## Baseline (Ausgangsstand vor Schritt 0)

- Ausgangscommit `914ed7deed48b045cd3b220d1c0c3dfd4c2e483b` (`main`), 13 Commits, keine Git-Verbindung zur stabilen App (Dateien manuell kopiert).
- Inhaltlich identisch mit der stabilen App, Commit `ff7a7d8` (gleiches `sw.js`, Build `202610311642`).
- `node --test tests/training.test.mjs`: 105 Tests, 105 bestanden.
- Build reproduzierbar: `build_pwa.py` mit esbuild 0.24.2 erzeugt aus `src/ringzeit.html` ein `index.html`, das bis auf den Versionsstempel byte-identisch zum veröffentlichten ist; `sw.js` ebenso.
- `docs/trainingslogik.md` ist leer.

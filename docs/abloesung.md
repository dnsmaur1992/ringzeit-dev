# Ablöse-Anleitung: Ringzeit Dev → stabile Ringzeit (nur Doku, Teil 7c)

Diese Anleitung beschreibt, wie der abgenommene Stand von **Ringzeit Dev** später die stabile App **Ringzeit**
ersetzen kann. **Nichts davon ist ausgeführt.** Die stabile App bleibt unangetastet, bis der Betreiber die Ablösung
ausdrücklich beauftragt (Auftrag Teil 7: keine automatische Veröffentlichung oder Ablösung).

## 1. Ausgangslage (Stand 04.11.2026)

| | Ringzeit (stabil) | Ringzeit Dev |
|---|---|---|
| Repo / Pages | `dnsmaur1992/ringzeit` · `…github.io/ringzeit/` | `dnsmaur1992/ringzeit-dev` · `…github.io/ringzeit-dev/` |
| App-Kennung (`APP_ID`) | `ringzeit` | `ringzeit-dev` (`src/app/06-storage.js`) |
| Datenspeicher (localStorage) | `ringzeit.v1` | `ringzeit-dev.v1`, Wiederaufnahme `ringzeit-dev.resume.v1` |
| Cache des Service Workers | `ringzeit-<Version>` | `ringzeit-dev-<Version>` (Präfix aus `APP_ID`, `tools/build_pwa.py`) |
| Sicherungsdatei | `"app": "ringzeit"` | `"app": "ringzeit-dev"`; der Import nimmt nur die eigene Kennung an |

Beide Apps liegen auf **derselben Herkunft** (`dnsmaur1992.github.io`). Sie teilen sich also localStorage und
Cache-Speicher und sind nur über Schlüssel und Präfix getrennt. Darauf bauen die Schritte unten auf.

## 2. Entscheidung vorab

- **Weg 1 (empfohlen): Code übernehmen, Daten bleiben.** Der Dev-Code kommt ins stabile Repo, mit `APP_ID = "ringzeit"`. Die neue Version liest beim ersten Start die vorhandenen Nutzerdaten aus `ringzeit.v1` und wandelt sie um (`hydrate`/`migrate`/`migrateExIds`). Die Nutzer behalten Link, Home-Bildschirm-Symbol und Verlauf.
- **Weg 2: Umzug auf die Dev-Adresse.** Die Nutzer installieren Ringzeit Dev neu. Ihre Daten bleiben in der alten App, weil die Sicherungen wegen der anderen Kennung nicht importierbar sind. Davon rate ich ab.

## 3. Schritte für Weg 1

1. **Sicherung:** In der stabilen App eine Sicherung exportieren (`ringzeit-…json`, altes Format) und gut aufheben. Zusätzlich ein Komplett-ZIP des stabilen Repos anlegen. Beides ist der Rückweg.
2. **Datenübernahme testen (Pflicht, bisher nicht gemacht):** Ein Test mit Altdaten wurde für das Projekt bewusst ausgeschlossen. Vor der Ablösung ist er nötig:
   - In einer Kopie von Ringzeit Dev `APP_ID` auf `"ringzeit"` setzen und lokal bauen.
   - Die Sicherung aus Schritt 1 importieren, oder sie als `ringzeit.v1` in den localStorage legen.
   - Prüfen: Profil, Disziplin, Gürtel, Verlauf, Fitnesstests, Gewichte, Turniere und Pausen sind vollständig. Alte Übungsnummern werden zu Text-IDs. Kein Eintrag ist doppelt. Die Wochenbelastung stimmt.
   - Danach die vollständige Prüfung laufen lassen (`node --test …`, `node tests/final-check.mjs`).
3. **Code übernehmen:** Alle Dateien des abgenommenen Dev-Stands ins stabile Repo kopieren (`src/`, `tools/`, `tests/`, `docs/`, `package.json`, `README.md`, `installieren.html`, Icons, gebaute `index.html`/`sw.js`/`manifest.webmanifest`). Dann anpassen:
   - `src/app/06-storage.js`: `APP_ID = "ringzeit"`, `APP_NAME = "Ringzeit"`.
   - `tools/build_pwa.py`: `DESC` ohne „Entwicklungsversion“.
   - `README.md`, `installieren.html`: Hinweis „Entwicklungsversion“ entfernen, Adressen `ringzeit-dev` → `ringzeit`.
   - `tests/training.test.mjs` (`RESUME_KEY`) und `tests/isolation.e2e.mjs`: Kennung anpassen. Den Isolationstest nur behalten, wenn Ringzeit Dev weiterläuft.
4. **Cache-Aufräumen anpassen, falls Ringzeit Dev weiterläuft:** Mit `APP_ID = "ringzeit"` heißt das Präfix `ringzeit-`. Das passt auch auf die Caches von Ringzeit Dev (`ringzeit-dev-…`). Sie würden beim Aufräumen gelöscht, und Ringzeit Dev wäre bis zum nächsten Online-Start nicht offline nutzbar. Das ist dasselbe „Cacheproblem der stabilen App“ wie heute. Abhilfe in `tools/build_pwa.py` (sw.js, activate): `k.startsWith(PREFIX) && !k.startsWith("ringzeit-dev-") && k !== CACHE`.
5. **Bauen und prüfen:** `python3 tools/build_pwa.py`, dann Suite, Baseline, `final-check.mjs`, `final-browser.cjs` (läuft gegen die Repo-Wurzel). Danach die Geräte-Checkliste (`docs/geraete-checkliste.md`) mit einer Kopie der echten Daten durchgehen.
6. **Veröffentlichen:** Hochladen ins stabile Repo, so wie bisher per Web-Upload. Die Nutzer bekommen die neue Version beim nächsten Start (die App-Seite wird zuerst aus dem Netz geladen) und sehen einmal „Was ist neu“.
7. **Nachsorge:** In den ersten Tagen Rückmeldungen sammeln (Feedback-Formular, Profil → App & Daten).

## 4. Rückweg

- **Code:** Das Komplett-ZIP aus Schritt 1 wieder hochladen. Der Service Worker der alten Version übernimmt beim nächsten Online-Start.
- **Daten:** Die neue Version speichert im Format v2 unter `ringzeit.v1`. Die alte Version liest dieses Format vielleicht **nicht vollständig** (das ist nicht geprüft). Deshalb nach einem Rückweg die Sicherung aus Schritt 1 einspielen. Was seit der Ablösung trainiert wurde, müsste man dann von Hand nachtragen.

## 5. Was mit Ringzeit Dev passiert

Es gibt zwei Möglichkeiten:
- **Weiterführen** als Entwicklungskopie für künftige Erweiterungen. Dann gilt Schritt 4.
- **Stilllegen:** Pages abschalten oder einen Hinweis „Bitte die stabile App nutzen“ veröffentlichen.

Daten in Ringzeit Dev (`ringzeit-dev.v1`) gehen nicht automatisch in die stabile App über. Wer Dev zum Training
genutzt hat, sichert dort vorher und trägt das Wichtigste nach. Ein Import über Kennungen hinweg ist nicht vorgesehen.

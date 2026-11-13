#!/usr/bin/env python3
"""Ringzeit release: turns the accepted Ringzeit Dev state into the files for the stable repo (dnsmaur1992/ringzeit).

  python3 tools/release.py <empty output folder>

Copies the repo (without .git, node_modules, build, pwa), switches app id and name to the stable app
("ringzeit" / "Ringzeit": storage key ringzeit.v1, caches ringzeit-<version>, backups "app": "ringzeit"),
replaces the development wording and addresses, then builds the app in the output folder and copies
index.html, sw.js and manifest.webmanifest to its root. Every replacement must match exactly as often as stated,
otherwise the script stops – so a changed source never yields a half-converted release.
Nothing is uploaded; the stable repo is changed only by the operator (docs/release.md)."""
import os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = {".git", "node_modules", "build", "pwa"}
# files of the dev repo that do not belong into the stable repo
DROP = ["tests/isolation.e2e.mjs", "tools/release.py", "tools/release-qr.svg",
        # test guides with upload hints for one repo – each repo keeps its own (docs/release.md)
        "docs/technik-fitness-test.md", "docs/einheiten-progression-test.md"]

# (file, old, new, count)
R = [
    ("src/app/06-storage.js", 'const APP_ID = "ringzeit-dev";', 'const APP_ID = "ringzeit";', 1),
    ("src/app/06-storage.js", 'const APP_NAME = "Ringzeit Dev";', 'const APP_NAME = "Ringzeit";', 1),
    ("src/app/06-storage.js", "/* Development copy (ringzeit-dev): its own app id", "/* Stable app (ringzeit; development copy: ringzeit-dev): its own app id", 1),
    ("src/app/06-storage.js", "apart from the stable Ringzeit, which runs on the same origin", "apart from Ringzeit Dev, which runs on the same origin", 1),
    ("src/index.html", "<title>Ringzeit Dev</title>", "<title>Ringzeit</title>", 1),
    ("src/index.html", '<div class="lt" id="loaderTitle">Ringzeit Dev</div>', '<div class="lt" id="loaderTitle">Ringzeit</div>', 1),
    ("src/app/01-overview-i18n.js", 'impBad: "Diese Datei ist keine Sicherung von Ringzeit Dev. Sicherungen der stabilen Ringzeit-App werden hier bewusst nicht geladen.",', 'impBad: "Diese Datei ist keine Ringzeit-Sicherung. Sicherungen der Entwicklungsversion Ringzeit Dev werden hier bewusst nicht geladen.",', 1),
    ("src/app/01-overview-i18n.js", 'impBad: "This file is not a Ringzeit Dev backup. Backups of the stable Ringzeit app are deliberately not loaded here.",', 'impBad: "This file is not a Ringzeit backup. Backups of the development version Ringzeit Dev are deliberately not loaded here.",', 1),
    ("src/app/01-overview-i18n.js", 'loadingApp: "Ringzeit Dev lädt",', 'loadingApp: "Ringzeit lädt",', 1),
    ("src/app/01-overview-i18n.js", 'loadingApp: "Ringzeit Dev is loading",', 'loadingApp: "Ringzeit is loading",', 1),
    ("tools/build_pwa.py", '"""Ringzeit Dev build.', '"""Ringzeit build.', 1),
    ("tools/build_pwa.py", "DESC='Entwicklungsversion – Trainingsplaner für Kickboxen, Boxen und Taekwondo'", "DESC='Trainingsplaner für Kickboxen, Boxen und Taekwondo'", 1),
    ("package.json", '"name": "ringzeit-dev",', '"name": "ringzeit",', 1),
    ("package.json", '"description": "Ringzeit Dev – build and test tools', '"description": "Ringzeit – build and test tools', 1),
    ("tests/training.test.mjs", 'const RESUME_KEY = "ringzeit-dev.resume.v1";', 'const RESUME_KEY = "ringzeit.resume.v1";', 1),
    ("tests/final-browser.cjs", 'localStorage.setItem("ringzeit-dev.v1"', 'localStorage.setItem("ringzeit.v1"', 2),
    ("tests/final-browser.cjs", 'localStorage.getItem("ringzeit-dev.v1")', 'localStorage.getItem("ringzeit.v1")', 1),
    ("tests/final-browser.cjs", 'ok("Cache-Name nur Entwicklungskopie", caches1.length > 0 && caches1.every((c) => c.startsWith("ringzeit-dev-")),', 'ok("Cache-Name nur stabile App", caches1.length > 0 && caches1.every((c) => c.startsWith("ringzeit-") && !c.startsWith("ringzeit-dev-")),', 1),
    ("tests/final-browser.cjs", "Cache nur mit Präfix ringzeit-dev-", "Cache nur mit Präfix ringzeit- (nicht ringzeit-dev-)", 1),
    ("installieren.html", "<title>Ringzeit Dev installieren</title>", "<title>Ringzeit installieren</title>", 1),
    ("installieren.html", 'content="So installierst du die Entwicklungsversion Ringzeit Dev auf iPhone und Android – kostenlos, ohne Konto."', 'content="So installierst du Ringzeit auf iPhone und Android – kostenlos, ohne Konto."', 1),
    ("installieren.html", "<h1>Ringzeit Dev</h1>", "<h1>Ringzeit</h1>", 1),
    ("installieren.html", 'aria-label="QR-Code zu Ringzeit Dev"', 'aria-label="QR-Code zu Ringzeit"', 1),
    ("installieren.html", '<a class="btn" href="./">Ringzeit Dev öffnen</a>', '<a class="btn" href="./">Ringzeit öffnen</a>', 1),
    ("installieren.html", '<span class="url">dnsmaur1992.github.io/ringzeit-dev</span>', '<span class="url">dnsmaur1992.github.io/ringzeit</span>', 1),
    ("installieren.html", 'title: "Ringzeit Dev",', 'title: "Ringzeit",', 1),
    ("installieren.html", 'text: "Ringzeit Dev – Entwicklungsversion des Trainingsplans fürs Kickboxen, Boxen und Taekwondo. So installierst du die App:",', 'text: "Ringzeit – Trainingsplan fürs Kickboxen, Boxen und Taekwondo. So installierst du die App:",', 1),
    ("README.md", '<a href="https://dnsmaur1992.github.io/ringzeit-dev/"><img src="https://img.shields.io/badge/Dev--App%20%C3%B6ffnen-dnsmaur1992.github.io%2Fringzeit--dev-C8404A?style=for-the-badge" alt="Ringzeit Dev öffnen"></a>', '<a href="https://dnsmaur1992.github.io/ringzeit/"><img src="https://img.shields.io/badge/App%20%C3%B6ffnen-dnsmaur1992.github.io%2Fringzeit-C8404A?style=for-the-badge" alt="Ringzeit öffnen"></a>', 1),
    ("README.md", "https://dnsmaur1992.github.io/ringzeit-dev/installieren.html", "https://dnsmaur1992.github.io/ringzeit/installieren.html", 2),
    ("README.md", "| 1. [Ringzeit Dev öffnen](https://dnsmaur1992.github.io/ringzeit-dev/) | 1. [Ringzeit Dev öffnen](https://dnsmaur1992.github.io/ringzeit-dev/) |", "| 1. [Ringzeit öffnen](https://dnsmaur1992.github.io/ringzeit/) | 1. [Ringzeit öffnen](https://dnsmaur1992.github.io/ringzeit/) |", 1),
    ("README.md", "# Isolation stabile App ↔ Dev-App im Browser (Playwright/Chromium, Ordner mit den Dateien der stabilen App):\nnode tests/isolation.e2e.mjs ../ringzeit\n", "", 1),
    ("README.md", "(Schlüssel `ringzeit-dev.v1`, getrennt von der stabilen App)", "(Schlüssel `ringzeit.v1`; die Entwicklungsversion Ringzeit Dev speichert getrennt unter `ringzeit-dev.v1`)", 1),
    ("README.md", "\nringzeit-dev/\n", "\nringzeit/\n", 1),
    ("README.md", "| [Release](docs/release.md) · [Ablösung der stabilen App](docs/abloesung.md) | Release-Paket für die stabile App (`tools/release.py`), Upload-Anleitung, Prüfergebnis |", "| [Release](docs/release.md) · [Ablösung](docs/abloesung.md) | wie dieser Stand aus Ringzeit Dev übernommen wurde, Prüfergebnis |", 1),
]
# the development note under the intro becomes a short release note
DEV_NOTE = re.compile(r"> \*\*Ringzeit Dev – Entwicklungsversion\.\*\*[^\n]*\n")
REL_NOTE = ("> **Ringzeit** plant dein Training für Kickboxen, Boxen und Taekwondo. Wer Ringzeit nutzt, behält bei jedem Update "
            "alle Daten. Entwickelt wird in [ringzeit-dev](https://github.com/dnsmaur1992/ringzeit-dev); diese App wird nur über ein "
            "Release von dort aktualisiert. Stand und Prüfungen: [Umsetzungsstand](docs/implementation-status.md) · "
            "[Gesamtprüfung](docs/final-check.md) · [Release](docs/release.md).\n")


def main(out):
    if os.path.exists(out) and os.listdir(out):
        raise SystemExit("output folder must be empty: " + out)
    shutil.copytree(ROOT, out, ignore=lambda d, names: [n for n in names if n in SKIP and d == ROOT], dirs_exist_ok=True)
    for f in DROP:
        os.remove(os.path.join(out, f))
    for f, a, b, n in R:
        p = os.path.join(out, f)
        s = open(p, encoding="utf-8").read()
        if s.count(a) != n:
            raise SystemExit(f"{f}: expected {n}× {a[:70]!r}, found {s.count(a)}")
        open(p, "w", encoding="utf-8").write(s.replace(a, b))
    # README note and installation QR code (points to …/ringzeit/)
    p = os.path.join(out, "README.md")
    s = open(p, encoding="utf-8").read()
    if len(DEV_NOTE.findall(s)) != 1:
        raise SystemExit("README: development note not found")
    open(p, "w", encoding="utf-8").write(DEV_NOTE.sub(lambda m: REL_NOTE, s))
    p = os.path.join(out, "installieren.html")
    s = open(p, encoding="utf-8").read()
    qr = open(os.path.join(ROOT, "tools", "release-qr.svg"), encoding="utf-8").read().strip()
    s2, k = re.subn(r'(<div class="code" role="img" aria-label="QR-Code zu Ringzeit">)\s*<svg.*?</svg>', lambda m: m.group(1) + qr, s, count=1, flags=re.S)
    if k != 1:
        raise SystemExit("installieren.html: QR code not found")
    open(p, "w", encoding="utf-8").write(s2)
    # no development id may be left in what the app or the tests use
    left = []
    for d in ["src", "tools", "tests"]:
        for base, _, files in os.walk(os.path.join(out, d)):
            for fn in files:
                if fn.endswith((".js", ".mjs", ".cjs", ".py", ".html")):
                    t = open(os.path.join(base, fn), encoding="utf-8").read()
                    for m in re.finditer(r"ringzeit-dev(?!-)|Ringzeit Dev", t):
                        line = t[: m.start()].count("\n") + 1
                        ctx = t[max(0, m.start() - 60) : m.end() + 20]
                        if "Entwicklungsversion Ringzeit Dev" in ctx or "development version Ringzeit Dev" in ctx or "development copy: ringzeit-dev" in ctx or 'storage key, e.g. "ringzeit-dev.v1"' in ctx or "apart from Ringzeit Dev, which runs" in ctx or "other=own==='ringzeit'?'ringzeit-dev'" in ctx:
                            continue
                        left.append(f"{os.path.relpath(os.path.join(base, fn), out)}:{line}")
    if left:
        raise SystemExit("development ids left: " + ", ".join(left))
    if os.path.exists(os.path.join(ROOT, "node_modules")):
        os.symlink(os.path.join(ROOT, "node_modules"), os.path.join(out, "node_modules"))
    subprocess.run([sys.executable, "tools/build_pwa.py"], cwd=out, check=True)
    for f in ["index.html", "sw.js", "manifest.webmanifest"]:
        shutil.copy(os.path.join(out, "pwa", f), os.path.join(out, f))
    print("release ready in", out)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(os.path.abspath(sys.argv[1]))

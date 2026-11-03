# Ringzeit Dev – Regel- und Trainingsquellen

Angelegt in Teil 3-Q (03.11.2026). Regeln, Prüfungsprogramme und Trainingsquellen stehen getrennt. Eine Trainingsquelle
ist keine Verbandsregel. Nur aufgenommen, was tatsächlich geprüft wurde; „Fassung/Gültigkeit“ nennt den geprüften Stand.

## A. Wettkampfregeln (Verbände)

| Nr. | Herausgeber | Titel | URL | Fassung / Gültigkeit | Geltungsbereich | Fundstelle | Status |
|---|---|---|---|---|---|---|---|
| R1 | WAKO | Regelwerke Kickboxen (LC, KL, FC, K1) | – | im Code als `RULE_PROFILE` (`src/sports/kickboxing/rules.js`) übernommen | Kickboxen | – | **Fassung noch nicht belegt** (Befund aus Schritt 1); Prüfung bei Bedarf eigener Auftrag |
| R2 | Deutscher Boxsport-Verband e.V. (DBV) | Die Wettkampfbestimmungen des DBV für das olympische Boxen (WKB), rechtsverbindliche, nicht kommentierte Fassung | https://www.boxverband.de/wp-content/uploads/2026/09/DBV-WKB-Wettkampfbestimmungen.pdf · Übersicht https://www.boxverband.de/wettkampfbestimmungen/ | Stand 01.09.2026, in Kraft seit 01.11.2026 (§ 108); ersetzt die bisherige „WB“ | olympisches Boxen im DBV | Altersklassen § 46, Runden § 47, Trefferfläche (Begriffsbestimmungen), Regelverstöße § 43, Kopfschutz § 26, Gewichtsklassen § 45 + Anhang 1–2, Sparring § 52, Sperren § 81 Abs. 9, §§ 89–91, Stufenplan Anhang 5 | **geprüft 03.11.2026** an der PDF; in der App nur verlinkt (Entscheidung B1, `docs/boxing-concept.md`) |
| R3 | World Taekwondo / Kukkiwon / DTU | Wettkampfregeln, Technik/Terminologie, Kup-Prüfungen | https://www.worldtaekwondo.org/ · https://www.kukkiwon.or.kr/ | wird in Teil 5 geprüft | Taekwondo WT | – | offen (5) |
| R4 | ITF-D | Regelwerke | https://www.itf-d.de/de/downloads/regelwerke | wird in Teil 5 geprüft | Taekwondo ITF | – | offen (5) |

## B. Prüfungsprogramme

Noch keine (Kickbox-Gürtelprogramm stammt aus der stabilen App; Quelle nicht belegt. Taekwondo ab Teil 5).

## C. Trainingsquellen (keine Regeln)

| Nr. | Autoren / Herausgeber | Titel | Fundstelle | Geprüft | Verwendung in Ringzeit |
|---|---|---|---|---|---|
| T1 | Foster C. et al. | A new approach to monitoring exercise training | J Strength Cond Res 2001; 15(1): 109–115 · Katalogeintrag https://sponet.de/sponet/Record/4006210 | Titel, Zeitschrift, Jahrgang, Seiten am 03.11.2026 über Katalog bestätigt | Belastung einer Einheit = Dauer (min) × Anstrengung (Session-RPE, 0–10) – `data-load-concept.md` 4.1 |
| T2 | Impellizzeri F. M. et al. | Acute:Chronic Workload Ratio: Conceptual Issues and Fundamental Pitfalls | Int J Sports Physiol Perform 2020 · https://pmc.ncbi.nlm.nih.gov/articles/PMC7534938/ | Titel und Thema am 03.11.2026 per Suche bestätigt; Volltext nicht abrufbar (Browserprüfung der Seite) | Begründung, das Verhältnis Vorwoche/Vorwochenmittel nur als einfachen Auslöser „etwas leichter“ zu nutzen, nicht als Verletzungsprognose – `data-load-concept.md` 4.1 |

| T3 | Chaabène H. et al. | Amateur boxing: physical and physiological attributes | Sports Med 2015; 45(3): 337–352 · https://www.pubmed.gov/25358529/ | Titel/Fundstelle am 03.11.2026 per Suche bestätigt; Volltext nicht abgerufen | Anforderungsprofil Boxen (aerob/anaerob, Schnellkraft) – `boxing-concept.md` 3 |
| T4 | Slimani M., Chaabène H., Davis P., Franchini E., Cheour F., Chamari K. | Performance aspects and physiological responses in male amateur boxing competitions: a brief review | J Strength Cond Res 2017; 31(4): 1132–1141 · https://www.pubmed.gov/28081033/ | Kurzfassung am 03.11.2026 gelesen | Serien statt Einzeltechniken, Block-/Konterverbindungen, Aktivität/Pause, Anpassung an Alter und Niveau – `boxing-concept.md` 3 |
| T5 | Gesellschaft für Pädiatrische Sportmedizin (Schulze S., Kirchem A.) | Belastungsprofil: Boxen | https://www.kindersportmedizin.org/attachments/article/241/Belastungsprofil%20Boxen.pdf (ohne Datum, Zahlen von 2015) | am 03.11.2026 gelesen | Beweglichkeit nachrangig, typische Verletzungen/Überlastungen (Hand, Schulter/Nacken). **Rundenzeiten darin veraltet** – Regeln nur aus R2 |

Hinweis: Das Bereichsmodell (Beine/Tritte, Schultern/Arme, Rumpf, Ausdauer, Beweglichkeit) ist eine bewusst einfache
eigene Festlegung aus den vorhandenen Übungsdaten (Meidecodes, Kategorien), keine Quelle mit Muskel- oder Erholungswerten.

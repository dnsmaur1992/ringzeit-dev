# Ringzeit Dev – Trainingslogik (Stand 3-U, 03.11.2026)

Kurz und nur das, was die App heute tut. Die Herleitung steht in `data-load-concept.md`, Quellen in `rules-sources.md`.

## Belastung
- Belastung eines Eintrags = **Dauer in Minuten × Anstrengung (1–10)**. Eigenes Training, Vereinstraining und Freie Läufe zählen gleich, alle Sportarten gemeinsam. Eine abgebrochene Einheit zählt mit der angegebenen Dauer.
- Geplante, ausgelassene oder verfallene Einheiten sind keine Einträge und haben keine Belastung. Jede Woche beginnt mit derselben festen Vorlage (Tage und Art).
- Die Strecke eines Freien Laufs wird nur angezeigt (Tempo), sie ändert die Belastung nicht.

## Wann die App „etwas leichter“ plant
1. Geplante Entlastungswoche (jede 5. Planwoche).
2. Die Woche davor war deutlich zu hart (mindestens zwei Einheiten klar über dem Ziel).
3. Die Vorwoche lag mehr als 30 % über dem Mittel der drei Wochen davor (und über 600).
4. Die laufende Woche wird mit dem, was schon war und noch geplant ist, mehr als 30 % über das Mittel der drei Vorwochen steigen (und über 600). Dann werden nur die noch nicht begonnenen Einheiten leichter; Trainingstage und Art bleiben.
- Nicht in Tapering, Erholungswoche und beim Wiedereinstieg nach einer Pause.
- Das Verhältnis akut/chronisch ist **keine Verletzungsprognose**, sondern nur ein einfacher Auslöser (Quelle T2).

## Der Tag danach
- Jeder Eintrag verteilt seine Belastung auf fünf Bereiche: Beine/Tritte, Schultern/Arme/Schläge, Rumpf, Ausdauer, Beweglichkeit.
- War gestern ein Eintrag mit Anstrengung ≥ 7 und mindestens 0,35 Anteil in einem Bereich, wird die Einheit heute etwas leichter (Zielanstrengung −1, Übungen für diesen Bereich später gewählt). Die App nennt den Grund in „Warum diese Einheit?“.
- Bestehende Schutzregeln (Sparring → Technik nach KO-Sperre, nach Vereins-Sparring, in stressiger Woche, im Ramadan) bleiben.

## Bearbeiten und Löschen
- Einträge lassen sich ändern (Sportart, Art, Dauer, Anstrengung, Strecke, Notiz) und löschen.
- Ändert sich dadurch der Zustand der Woche, werden die noch nicht begonnenen Einheiten bis Sonntag neu erstellt. Begonnene und abgeschlossene Einheiten bleiben unverändert.

## Level
- Das Level kommt aus dem Fitnesstest: gemeinsame Werte (Kraft, Schnelligkeit, Ausdauer, Beweglichkeit) plus die Technik-Einschätzung der jeweiligen Sportart. Full Contact und K1 sind nicht mehr an das Level gebunden, nur an das Mindestalter (15 Jahre).

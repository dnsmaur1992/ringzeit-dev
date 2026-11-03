/* Taekwondo WT / DTU rule profile (6b): what the planner needs – age class and bout format, protection ban after a
   concussion. Sources: DTU Wettkampfordnung Zweikampf (WOZ) 4.1, 7.1–7.3, 17.3 (docs/rules-sources.md R3b) and the WT
   Competition Rules (R3a, Fassung ab 01.06.2026). No weight classes (linked, not copied), no scoring tables.
   ITF-D follows with 6c. Pure data. */

/* Age classes of the year of the tournament (WOZ 4.1): Jugend D 7–8 · C 9–11 · B 12–14 · A 15–17 · adults from 18
   (Senioren from 17, Masters 1 from 35, Masters 2 from 45 – for the planner adults are one class, masters get the 2-minute format). */
export function wtClass(age) {
  if (age == null) return "s"; // nothing entered: adult
  if (age < 7) return null;
  if (age <= 8) return "d";
  if (age <= 11) return "c";
  if (age <= 14) return "b";
  if (age <= 17) return "a";
  return age >= 35 ? "m" : "s";
}
/* round length per class (WOZ 7.1): Senioren and Jugend A 3 × 2 min, Jugend B–D and Masters 3 × 1:30; 1 min break */
const ROUND = { d: 90, c: 90, b: 90, a: 120, s: 120, m: 90 };

/** Official bout format of the age class, or null (under 7). Same signature as the other rule profiles (discipline unused). */
export function wtFormat(_disc, age) {
  const cls = wtClass(age);
  return cls ? { r: 3, w: ROUND[cls], b: 60, cls } : null;
}
export const STD_FORMAT = { r: 3, w: 120, b: 60, cls: null };

/** Protection ban after a concussion in days by age (WOZ 17.3): adults 30, Junioren/Jugend A 40, Jugend B–D 50. */
export function koDaysFor(age) {
  if (age == null || age >= 18) return 30;
  if (age >= 15) return 40;
  return 50;
}

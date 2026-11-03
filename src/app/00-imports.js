  /* ============ Shared modules (src/core, src/catalog, src/sports – bundled as RZ by tools/build_pwa.py) ============ */
  /* Every name the app takes from the shared core is listed here – nothing else reaches into RZ. */
  const { pad, fmtTime: fmt, iso, parse, monday, addDays, today, daysBetween, wd, rnd, shuffle, createStore } = RZ;
  /* exercise catalogue (src/catalog) and sports (src/sports) */
  const { EX, AV, sportFor } = RZ;
  /* kickboxing techniques and combos used by the combo and drill builders (src/sports/kickboxing/techniques.js) */
  const { TECH, KICKS, STRIKE, RISKY, ADV, COMBOS, EXTRA, KICK_ONLY, HAND_ONLY, THEMES } = RZ;

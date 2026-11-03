  /* ============ Shared modules (src/core, src/catalog, src/sports – bundled as RZ by tools/build_pwa.py) ============ */
  /* Every name the app takes from the shared core is listed here – nothing else reaches into RZ. */
  const { pad, fmtTime: fmt, iso, parse, monday, addDays, today, daysBetween, wd, rnd, shuffle, createStore } = RZ;
/* shared history and load (src/core/history.js) */
  const { entryLoad, entryComplete, entrySport, weekLoadSum, weekIncomplete, deloadFor, projectWeek, REGIONS, clubRegions, exRegions, meanRegions, entryRegions, lightRegions, levelFor, techKey } = RZ;
  /* exercise catalogue (src/catalog) and sports (src/sports) */
  const { EX, AV, sportFor, visibleSports, SPORTS } = RZ;
  /* kickboxing techniques and combos used by the combo and drill builders (src/sports/kickboxing/techniques.js) */
  const { TECH, KICKS, STRIKE, RISKY, ADV, COMBOS, EXTRA, KICK_ONLY, HAND_ONLY, THEMES } = RZ;

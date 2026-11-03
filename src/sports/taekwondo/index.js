/* Sport definition: taekwondo (styles WT and ITF-D). 6a: grade area and dobok figures. 6b: WT plans (techniques,
   combos, counters, partner tasks, rule profile). ITF-D follows with 6c – until then an ITF unit consists of the
   sport-neutral blocks only (strength, conditioning, mobility), see docs/taekwondo-concept.md. */
import * as grades from "./grades.js";
import * as techniques from "./techniques.js";
import { wtFormat, STD_FORMAT, koDaysFor } from "./rules.js";

export const RULE_PROFILE = {
  publisher: "WT / DTU",
  title: "World Taekwondo Competition Rules · DTU Wettkampfordnung Zweikampf (WOZ)",
  version: "WT ab 01.06.2026 · WOZ Stand 01.01.2026",
  url: "https://www.dtu.de/",
  disciplines: [],
  /* the style (WT or ITF-D) is passed as the first argument; the ITF-D profile follows with 6c */
  format: (style, age) => (style === "itf" ? null : wtFormat(style, age)),
  standardFormat: STD_FORMAT,
  koDays: koDaysFor, // by age (WOZ 17.3)
};

export const taekwondo = {
  id: "taekwondo",
  visible: true,
  rules: RULE_PROFILE,
  /* technique first like boxing; from 5 days a different mix (docs/taekwondo-concept.md 6.2) */
  dayPattern: {
    1: ["T"],
    2: ["T", "S"],
    3: ["T", "S", "P"],
    4: ["T", "S", "P", "K"],
    5: ["T", "S", "P", "C", "K"],
    6: ["T", "S", "P", "K", "T", "M"],
    7: ["T", "S", "P", "K", "C", "S", "M"],
  },
  /* ITF-D until 6c: sport-neutral types only */
  dayPatternItf: {
    1: ["S"],
    2: ["S", "K"],
    3: ["S", "K", "M"],
    4: ["S", "K", "S", "M"],
    5: ["S", "K", "S", "K", "M"],
    6: ["S", "K", "S", "K", "S", "M"],
    7: ["S", "K", "S", "K", "S", "K", "M"],
  },
  techniques,
  grades,
};

/* Sport definition: taekwondo (styles WT and ITF-D). 6a: grade area and dobok figures; the style specific plans
   (techniques, drills, formats) follow in 6b (WT) and 6c (ITF). Until then a taekwondo unit consists of the sport-neutral
   blocks only (strength, conditioning, mobility), see docs/taekwondo-concept.md. */
import * as grades from "./grades.js";

/* rule data of the styles come with 6b/6c; until then: no tournament format, a training standard, 30 days after a concussion
   (WT: 30/40/50 days by age, the shortest applies for now) */
const STD_FORMAT = { r: 3, w: 120, b: 60, cls: null };
export const RULE_PROFILE = {
  publisher: "WT / DTU · ITF-D",
  title: "Taekwondo (Regelprofile folgen in 6b/6c)",
  version: "–",
  url: "",
  disciplines: [],
  format: () => null,
  standardFormat: STD_FORMAT,
  koDays: 30,
};

export const taekwondo = {
  id: "taekwondo",
  visible: true,
  rules: RULE_PROFILE,
  /* only sport-neutral types until the technique plans exist (6b/6c): S strength, K conditioning, M mobility */
  dayPattern: {
    1: ["S"],
    2: ["S", "K"],
    3: ["S", "K", "M"],
    4: ["S", "K", "S", "M"],
    5: ["S", "K", "S", "K", "M"],
    6: ["S", "K", "S", "K", "S", "M"],
    7: ["S", "K", "S", "K", "S", "K", "M"],
  },
  techniques: {},
  grades,
};

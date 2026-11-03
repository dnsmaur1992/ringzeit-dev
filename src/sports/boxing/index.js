/* Sport definition: boxing (DBV, olympic boxing). In development: not visible in the normal menu; shown only as a
   labelled development preview (preview: true) until the presentation (part 4b) is accepted. */
import { RULE_PROFILE } from "./rules.js";
import * as techniques from "./techniques.js";
import { BOX_TASKS } from "./tasks.js";

export const boxing = {
  id: "boxing",
  visible: false,
  preview: true,
  rules: RULE_PROFILE,
  /* days 1–4 as in kickboxing; from 5 days a different mix (docs/boxing-concept.md §3.2) */
  dayPattern: {
    1: ["T"],
    2: ["T", "S"],
    3: ["T", "S", "P"],
    4: ["T", "S", "P", "K"],
    5: ["T", "S", "P", "C", "K"],
    6: ["T", "S", "P", "K", "T", "M"],
    7: ["T", "S", "P", "K", "C", "S", "M"],
  },
  techniques,
  tasks: BOX_TASKS,
};

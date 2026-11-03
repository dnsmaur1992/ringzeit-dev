/* Sport register. Unfinished sports are added with visible: false and stay out of the normal menu. */
import { kickboxing } from "./kickboxing/index.js";

export const SPORTS = { kickboxing };
export const DEFAULT_SPORT = "kickboxing";

/** Sport definition for an id; profiles without a sport (all data so far) are kickboxing. */
export const sportFor = (id) => SPORTS[id] || SPORTS[DEFAULT_SPORT];

/** Sports shown in the normal menu. */
export const visibleSports = () => Object.values(SPORTS).filter((s) => s.visible);

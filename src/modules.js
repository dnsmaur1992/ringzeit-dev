/* Entry of the shared modules. tools/build_pwa.py bundles this file into one script with the global name RZ;
   src/app/00-imports.js takes exactly the names the app uses. Nothing below reads app state or the DOM. */
export * from "./core/index.js";
export { EX, AV } from "./catalog/exercises.js";
export { EX_KEYS, keyOfLegacy, legacyIndex } from "./catalog/ids.js";
export * from "./sports/kickboxing/techniques.js";
export { sportFor, visibleSports, SPORTS } from "./sports/index.js";

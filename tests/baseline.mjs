// Kickboxing comparison baseline: fixed profiles, dates, history and a seeded Math.random run through the REAL
// production functions (buildSession, weekPlan, computeLoad, doseTxt, exerciseTiming). Step 2 (pure extraction)
// must reproduce this file exactly; intended differences from 2-B/3-U onward are documented, then re-recorded.
//
//   node tests/baseline.mjs           compare with tests/baseline/kickboxing.json (exit 1 on difference)
//   node tests/baseline.mjs --write   record a new baseline
//
// The app is loaded like in training.test.mjs: the inline script without its boot call, browser services stubbed.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import vm from "node:vm";

const SRC = new URL("../src/ringzeit.html", import.meta.url);
const OUT = new URL("./baseline/kickboxing.json", import.meta.url);
const html = readFileSync(SRC, "utf8");
const script = html.slice(html.lastIndexOf("<script>") + 8, html.lastIndexOf("</script>"));
const unbooted = script.slice(0, script.indexOf("  (function boot() {"));

const TODAY = [2026, 10, 2]; // Monday 2 Nov 2026
const NOW = new Date(...TODAY, 9, 0).getTime();

function load() {
  let seed = 1;
  const rand = () => {
    // mulberry32
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const M = Object.create(Math);
  M.random = rand;
  const node = () => ({
    value: "",
    textContent: "",
    innerHTML: "",
    hidden: true,
    dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    style: { setProperty() {} },
    addEventListener() {},
    setAttribute() {},
    querySelector: () => null,
    querySelectorAll: () => [],
  });
  const store = new Map();
  const ctx = vm.createContext({
    console,
    Date: class extends Date {
      constructor(...a) {
        super(...(a.length ? a : [NOW]));
      }
      static now() {
        return NOW;
      }
    },
    Intl,
    Map,
    Set,
    JSON,
    Math: M,
    Object,
    Array,
    Number,
    String,
    Promise,
    setInterval() {},
    clearInterval() {},
    setTimeout: () => 0,
    clearTimeout() {},
    navigator: {},
    window: { addEventListener() {}, scrollTo() {} },
    document: {
      visibilityState: "visible",
      querySelector: () => null,
      getElementById: node,
      querySelectorAll: () => [],
      documentElement: {},
      addEventListener() {},
      removeEventListener() {},
    },
    localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) },
    matchMedia: () => ({ matches: true }),
  });
  new vm.Script(unbooted).runInContext(ctx, { timeout: 5000 });
  return {
    run: (code) => vm.runInContext(code, ctx, { timeout: 10000 }),
    reseed: (n) => (seed = n),
  };
}

// ---- comparison profiles (synthetic; covers disciplines, levels, age groups, limits, club days, tournament phase)
const P = (o) => ({ example: false, planStart: "2026-09-28", days: [0, 2, 4], minutes: 75, lang: "de", ...o });
const PROFILES = {
  "lc-l0-adult": P({ disc: "lc", level: 0, birthYear: 1995 }),
  "lc-l1-adult-club": P({ disc: "lc", level: 1, birthYear: 1995, club: { days: [1, 3], minutes: 90 } }),
  "kl-l1-youth": P({ disc: "kl", level: 1, birthYear: 2010 }),
  "fc-l2-adult-comp": P({ disc: "fc", level: 2, birthYear: 1998, comps: [{ id: "c1", date: "2026-11-28" }] }),
  "k1-l2-adult-knee": P({ disc: "k1", level: 2, birthYear: 1992, limits: ["knee"] }),
  "lc-l1-kids": P({ disc: "lc", level: 1, birthYear: 2016, minutes: 45 }),
  "kl-l1-masters-en": P({ disc: "kl", level: 1, birthYear: 1978, lang: "en", days: [1, 3, 5, 6] }),
  "lc-l1-focus-mob": P({ disc: "lc", level: 1, birthYear: 1995, block: { k: "mob", start: "2026-10-19" } }),
};
// own + club history in the two weeks before TODAY (exercises load model inputs)
const HISTORY = [
  { date: "2026-10-20", src: "own", type: "T", minutes: 75, rpe: 7, tHi: 7, inputConfirmed: true, completed: true },
  { date: "2026-10-21", src: "club", type: "club", minutes: 90, rpe: 8, inputConfirmed: true },
  { date: "2026-10-27", src: "own", type: "K", minutes: 60, rpe: 9, tHi: 7, inputConfirmed: true, completed: true },
  { date: "2026-10-28", src: "club", type: "club", minutes: 90, rpe: 9, inputConfirmed: true },
  { date: "2026-10-30", src: "own", type: "S", minutes: 70, rpe: 9, tHi: 7, inputConfirmed: true, completed: false },
];
// session cases: type, location, equipment, options
const CASES = [
  ["T", "gym", ["partner", "bag", "pads", "rope"]],
  ["T", "home", ["bag", "rope", "bands"]],
  ["P", "gym", ["partner", "bag"]],
  ["K", "gym", ["rope", "kb"]],
  ["K", "out", [], { run: true }],
  ["S", "gym", ["weights", "kb", "bar", "bands"]],
  ["S", "studio", []],
  ["M", "home", ["bands"]],
];
const DATE = "2026-11-04";

function snapshot() {
  const a = load();
  const out = { meta: { today: "2026-11-02", date: DATE, cases: CASES.length, profiles: Object.keys(PROFILES) }, profiles: {} };
  for (const [name, prof] of Object.entries(PROFILES)) {
    for (const withHistory of [false, true]) {
      const key = name + (withHistory ? "+history" : "");
      a.run(`S = hydrate({profile:{...DEFAULT_PROFILE, ...${JSON.stringify(prof)}}, log:${JSON.stringify(withHistory ? HISTORY : [])}}); loadCache = {};`);
      const r = { age: a.run("ageGroup()"), days: {}, plan: {}, load: {}, phase: {}, sessions: {} };
      // planned type per day (own sessions) and club days for two weeks
      for (let i = 0; i < 14; i++) {
        const ds = a.run(`iso(addDays(parse("2026-11-02"), ${i}))`);
        r.days[ds] = a.run(`[planOn(${JSON.stringify(ds)}) || "", !!clubOn(${JSON.stringify(ds)})]`);
      }
      for (const mon of ["2026-11-02", "2026-11-09", "2026-11-23"]) {
        r.plan[mon] = a.run(`weekPlan(parse(${JSON.stringify(mon)}))`);
        r.load[mon] = a.run(`(loadCache = {}, weekLoad(${JSON.stringify(mon)}))`);
        r.phase[mon] = a.run(`phaseInfo(${JSON.stringify(mon)})`);
      }
      CASES.forEach(([ty, loc, eq, opts = {}], i) => {
        a.reseed(1000 + i);
        const sess = a.run(`(() => {
          const s = buildSession(${JSON.stringify(DATE)}, ${JSON.stringify(ty)}, ${JSON.stringify(loc)}, ${JSON.stringify(eq)}, ${JSON.stringify(opts)});
          S.sessions[${JSON.stringify(DATE)}] = s;
          const items = s.blocks.map((b, bi) => b.items.map((it, ni) => {
            const tm = exerciseTiming(s, bi, ni);
            return {
              dose: it.kind === "ex" || it.id != null && typeof it.id === "number" ? doseTxt(it.id, b) : null,
              timer: tm && { phases: tm.phases?.length || 0, seconds: (tm.phases || []).reduce((x, p) => x + p.seconds, 0), choices: tm.choices, perSet: tm.seconds },
            };
          }));
          const copy = JSON.parse(JSON.stringify(s));
          delete copy.created;
          return { session: copy, items };
        })()`);
        r.sessions[`${ty}-${loc}${opts.run ? "-run" : ""}`] = sess;
      });
      out.profiles[key] = JSON.parse(JSON.stringify(r));
    }
  }
  return out;
}

const now = snapshot();
const text = JSON.stringify(now, null, 1) + "\n";
if (process.argv.includes("--write")) {
  mkdirSync(new URL("./baseline/", import.meta.url), { recursive: true });
  writeFileSync(OUT, text);
  console.log(`baseline written: ${Object.keys(now.profiles).length} profile runs × ${CASES.length} sessions`);
} else {
  const old = readFileSync(OUT, "utf8");
  if (old === text) {
    console.log(`baseline identical: ${Object.keys(now.profiles).length} profile runs × ${CASES.length} sessions`);
  } else {
    const A = JSON.parse(old),
      B = now,
      diffs = [];
    const walk = (x, y, path) => {
      if (diffs.length > 40) return;
      if (JSON.stringify(x) === JSON.stringify(y)) return;
      if (x && y && typeof x === "object" && typeof y === "object")
        for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) walk(x[k], y[k], `${path}.${k}`);
      else diffs.push(`${path}: ${JSON.stringify(x)?.slice(0, 120)} -> ${JSON.stringify(y)?.slice(0, 120)}`);
    };
    walk(A, B, "$");
    console.log("BASELINE DIFFERS:\n" + diffs.join("\n"));
    process.exit(1);
  }
}

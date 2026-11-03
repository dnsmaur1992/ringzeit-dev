// Tests for the shared core modules (src/core, later src/catalog and src/sports), imported directly as ES modules.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { fmtTime, pad } from "../src/core/format.js";
import { iso, parse, monday, addDays, daysBetween, wd } from "../src/core/dates.js";
import { rnd, shuffle } from "../src/core/random.js";
import { createStore } from "../src/core/storage.js";

test("format: m:ss and two digits", () => {
  assert.equal(pad(7), "07");
  assert.equal(fmtTime(0), "0:00");
  assert.equal(fmtTime(65), "1:05");
  assert.equal(fmtTime(180), "3:00");
});

test("dates: local ISO strings, Monday weeks, day arithmetic across the DST change", () => {
  assert.equal(iso(parse("2026-11-02")), "2026-11-02");
  assert.equal(parse("2026-11-02"), parse("2026-11-02")); // cached object
  assert.equal(iso(monday(parse("2026-11-08"))), "2026-11-02");
  assert.equal(iso(addDays(parse("2026-10-24"), 2)), "2026-10-26"); // 25 Oct is 25 hours long in Berlin
  assert.equal(daysBetween(parse("2026-10-24"), parse("2026-10-26")), 2);
  assert.equal(wd("2026-11-02"), 0);
  assert.equal(wd("2026-11-08"), 6);
});

test("random: helpers follow Math.random, shuffle keeps the input", () => {
  const orig = Math.random;
  try {
    Math.random = () => 0.99;
    assert.equal(rnd(["a", "b", "c"]), "c");
    const a = [1, 2, 3, 4];
    Math.random = () => 0;
    assert.deepEqual(shuffle(a), [2, 3, 4, 1]);
    assert.deepEqual(a, [1, 2, 3, 4]);
  } finally {
    Math.random = orig;
  }
});

function memory(limit = Infinity) {
  const m = new Map();
  return {
    m,
    getItem: (k) => m.get(k) ?? null,
    setItem(k, v) {
      if (v.length > limit) throw new Error("QuotaExceededError");
      m.set(k, v);
    },
  };
}
const hooks = (state, extra = {}) => ({
  key: "test.v1",
  getState: () => state,
  compact: () => (state.big = ""),
  onFull: () => (state.warned = (state.warned || 0) + 1),
  cloud: null,
  applyCloud() {},
  cloudDocs: () => ({ app: {}, log: {} }),
  onCloudLost() {},
  ...extra,
});

test("storage: writes and reads only its own key", () => {
  const mem = memory(),
    state = { a: 1 };
  mem.setItem("ringzeit.v1", "stable data");
  const s = createStore(hooks(state, { storage: () => mem }));
  s.save();
  assert.deepEqual(s.readLocal(), { a: 1 });
  assert.equal(mem.getItem("ringzeit.v1"), "stable data");
  assert.equal(s.mode, "local");
});

test("storage: when full it compacts once and retries; warns only once if that fails too", () => {
  const mem = memory(30),
    state = { a: 1, big: "x".repeat(40) };
  const s = createStore(hooks(state, { storage: () => mem }));
  s.save();
  assert.deepEqual(s.readLocal(), { a: 1, big: "" });
  state.big = "y".repeat(40);
  state.more = "z".repeat(40);
  s.save();
  s.save();
  assert.equal(state.warned, 1);
});

test("storage: unreadable storage or broken JSON reads as no data", () => {
  const broken = createStore(hooks({}, { storage: () => { throw new Error("SecurityError"); } }));
  assert.equal(broken.readLocal(), null);
  broken.save(); // must not throw
  const mem = memory();
  mem.setItem("test.v1", "{not json");
  assert.equal(createStore(hooks({}, { storage: () => mem })).readLocal(), null);
});

test("storage: no cloud host (or switched off) stays local", async () => {
  const s = createStore(hooks({}, { storage: () => memory(), cloud: () => false }));
  await s.init();
  assert.equal(s.mode, "local");
  assert.equal(await s.loadCloud(), false);
});

test("storage: with a cloud host it loads, mirrors on save and falls back to local when revoked", async () => {
  const docs = { "data/users/u1/app": { profile: { x: 1 } } },
    writes = [];
  let refuse = false;
  const host = {
    use: async (n) =>
      n === "user"
        ? { id: async () => "u1" }
        : {
            doc: (path) => ({
              get: async () => ({ exists: path in docs, data: () => docs[path] }),
              set: async (d) => {
                if (refuse) throw { code: "revoked" };
                writes.push([path, d]);
              },
            }),
          },
  };
  const got = [],
    lost = [];
  const s = createStore(
    hooks({}, { storage: () => memory(), cloud: () => host, applyCloud: (a, l) => got.push([a, l]), cloudDocs: () => ({ app: { p: 1 }, log: { l: 2 } }), onCloudLost: () => lost.push(1) }),
  );
  await s.init();
  assert.equal(s.mode, "cloud");
  assert.equal(await s.loadCloud(), true);
  assert.deepEqual(got, [[{ profile: { x: 1 } }, null]]);
  s.flush();
  await Promise.all(Object.values(s.chain));
  assert.deepEqual(writes, [["data/users/u1/app", { p: 1 }], ["data/users/u1/log", { l: 2 }]]);
  refuse = true;
  s.flush();
  await Promise.all(Object.values(s.chain));
  assert.equal(s.mode, "local");
  assert.ok(lost.length >= 1);
});

// shared modules must not reach into the app: no app state, no DOM/browser globals, no imports from src/app
test("boundaries: core, catalog and sports modules use only explicit inputs", () => {
  const root = fileURLToPath(new URL("../src/", import.meta.url));
  const files = [];
  for (const dir of ["core", "catalog", "sports"]) {
    const walk = (d) => {
      try {
        for (const f of readdirSync(d)) {
          const p = join(d, f);
          if (statSync(p).isDirectory()) walk(p);
          else if (p.endsWith(".js")) files.push(p);
        }
      } catch (e) {
        if (e.code !== "ENOENT") throw e;
      }
    };
    walk(join(root, dir));
  }
  assert.ok(files.length >= 5);
  for (const f of files) {
    const code = readFileSync(f, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g, '""');
    for (const bad of [/\bS\./, /\bui\./, /\bdocument\b/, /\bwindow\b/, /\blocalStorage\b/, /\bt\(/, /\brender\(/])
      assert.doesNotMatch(code, bad, `${f} uses ${bad}`);
    assert.doesNotMatch(readFileSync(f, "utf8"), /from\s+["'][^"']*\/app\//, `${f} imports from src/app`);
  }
});

/* ---------- shared history and load (src/core/history.js), acceptance cases of docs/data-load-concept.md §5 ---------- */
import {
  entryLoad, weekLoadSum, weekIncomplete, deloadFor, projectWeek, clubRegions, exRegions, entryRegions, lightRegions, levelFor,
} from "../src/core/history.js";

test("history: load = minutes × effort; aborted unit counts the confirmed minutes (case 2); entries without values count 0", () => {
  assert.equal(entryLoad({ minutes: 30, rpe: 6 }), 180);
  assert.equal(entryLoad({ minutes: 30 }), 0);
  assert.equal(entryLoad({ rpe: 6 }), 0);
  const log = [{ date: "2026-11-02", minutes: 30, rpe: 6 }, { date: "2026-11-03", src: "club", sport: "boxing", minutes: 60, rpe: 5 }, { date: "2026-11-04", minutes: 40 }];
  assert.equal(weekLoadSum(log, "2026-11-02"), 480, "every sport and club count");
  assert.equal(weekIncomplete(log, "2026-11-02"), 1);
  assert.equal(weekLoadSum(log, "2026-11-09"), 0, "a not begun / expired unit has no entry and no load (case 3)");
});

test("history: free run 40 min, 7.5 km, effort 6 → load 240; the distance has no effect (case 12)", () => {
  assert.equal(entryLoad({ minutes: 40, rpe: 6, km: 7.5, run: "free" }), 240);
  assert.equal(entryLoad({ minutes: 40, rpe: 6, km: 99, run: "free" }), 240);
});

test("history: deload rules unchanged – planned 5th week, hard sessions, acute jump; taper/recover/ramp never", () => {
  const mon = parse("2026-11-09");
  const wk = (m, rpe, n = 1, extra = {}) => Array.from({ length: n }, () => ({ date: m, minutes: 60, rpe, ...extra }));
  assert.equal(deloadFor({ log: [], mon, phase: "base", ramp: false, planStart: "2026-10-12" }).why, "plan");
  assert.equal(deloadFor({ log: [], mon, phase: "taper", ramp: false, planStart: "2026-10-12" }).deload, false);
  assert.equal(deloadFor({ log: [], mon, phase: "base", ramp: true, planStart: "2026-10-12" }).deload, false);
  const hard = wk("2026-11-03", 9, 2, { tHi: 6 });
  assert.equal(deloadFor({ log: hard, mon, phase: "base", ramp: false, planStart: "" }).why, "rpe");
  const log = [...wk("2026-10-19", 5, 2), ...wk("2026-10-26", 5, 2), ...wk("2026-11-02", 9, 2)];
  assert.equal(deloadFor({ log, mon, phase: "base", ramp: false, planStart: "" }).why, "acwr");
});

test("history: week projection (done + planned) over 1.3 × chronic average lightens the open sessions (case 7)", () => {
  const mon = parse("2026-11-02");
  const chronic = ["2026-10-12", "2026-10-19", "2026-10-26"].map((d) => ({ date: d, minutes: 90, rpe: 5 }));
  const none = deloadFor({ log: chronic, mon, phase: "base", ramp: false, planStart: "", projected: projectWeek({ log: chronic, monISO: "2026-11-02", plannedDays: [{ minutes: 60, rpe: 6 }] }) });
  assert.equal(none.deload, false);
  const log = [...chronic, { date: "2026-11-02", minutes: 120, rpe: 9 }];
  const projected = projectWeek({ log, monISO: "2026-11-02", plannedDays: [{ minutes: 75, rpe: 6 }, { minutes: 75, rpe: 6 }] });
  assert.equal(projected, 1080 + 900);
  assert.equal(deloadFor({ log, mon, phase: "base", ramp: false, planStart: "", projected }).why, "proj");
});

test("history: regions – club kinds, boxing carries the arms, free run; hard day before → light regions (case 1)", () => {
  assert.deepEqual(clubRegions("P"), { legs: 0.35, arms: 0.35, core: 0.1, endu: 0.2 });
  assert.equal(clubRegions("P", "boxing").legs, 0.15);
  assert.ok(clubRegions("P", "boxing").arms > 0.5);
  assert.deepEqual(entryRegions({ run: "free" }), { legs: 0.3, endu: 0.7 });
  assert.deepEqual(exRegions({ cat: "mob", avoid: "" }), { mob: 1 });
  assert.deepEqual(exRegions({ cat: "str", avoid: "ka" }), { legs: 1 });
  assert.deepEqual(exRegions({ cat: "warm", avoid: "k" }), {});
  const club = [{ date: "2026-11-02", src: "club", ck: "P", minutes: 90, rpe: 9 }];
  assert.deepEqual(lightRegions({ log: club, date: "2026-11-03" }), ["legs", "arms"]);
  assert.deepEqual(lightRegions({ log: club, date: "2026-11-04" }), [], "only the day after");
  assert.deepEqual(lightRegions({ log: [{ ...club[0], rpe: 5 }], date: "2026-11-03" }), [], "not hard enough");
  assert.deepEqual(lightRegions({ log: [{ ...club[0], ck: "X" }], date: "2026-11-03" }), [], "mixed stays below the share");
});

test("history: level per sport – shared values 42 days, technique part per sport (cases 9, 10)", () => {
  const legacy = { id: "t1", date: "2026-10-14", scores: { str: 4, spd: 4, end: 4, flx: 4, tec: 4 }, complete: true };
  assert.equal(levelFor([legacy], "kickboxing").level, 2, "legacy test = kickboxing technique, same result as before");
  assert.equal(levelFor([legacy], "kickboxing").needTech, false);
  const box = levelFor([legacy], "boxing");
  assert.equal(box.level, 0);
  assert.equal(box.needTech, true, "first boxing unit: only the technique part is missing");
  assert.equal(box.needShared, false);
  const part = { id: "t2", date: "2026-11-03", scores: { tec: 2 }, techBy: { boxing: 2 } };
  const b2 = levelFor([legacy, part], "boxing");
  assert.equal(b2.level, 1, "4+4+4+4+2 = 18, minimum 2");
  assert.equal(levelFor([legacy, part], "kickboxing").level, 2, "the kickboxing level does not move");
  assert.equal(levelFor([], "kickboxing").level, 0);
});

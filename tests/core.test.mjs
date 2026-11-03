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

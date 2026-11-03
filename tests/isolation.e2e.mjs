// Browser check: Ringzeit Dev and the stable Ringzeit share one origin (dnsmaur1992.github.io) but must not share
// local data, backups or caches. Serves both builds side by side on localhost (/ringzeit/ and /ringzeit-dev/) and
// drives the real pages in Chromium with synthetic data only.
//
// Usage: python3 tools/build_pwa.py && node tests/isolation.e2e.mjs <folder with the stable app's files>
// Needs Playwright with Chromium. Not part of `node --test tests/training.test.mjs`.
import { chromium } from "playwright";
import { cpSync, mkdtempSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import assert from "node:assert/strict";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const stableDir = process.argv[2];
if (!stableDir || !existsSync(join(stableDir, "sw.js"))) throw new Error("usage: node tests/isolation.e2e.mjs <stable app folder>");
if (!existsSync(join(repo, "pwa", "index.html"))) throw new Error("build first: python3 tools/build_pwa.py");

// --- serve /ringzeit/ (stable copy) and /ringzeit-dev/ (fresh build) like GitHub Pages
const root = mkdtempSync(join(tmpdir(), "rz-iso-"));
const STABLE = join(root, "ringzeit"),
  DEV = join(root, "ringzeit-dev");
const icons = ["icon-180.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];
for (const f of ["index.html", "sw.js", "manifest.webmanifest", "installieren.html", ...icons]) cpSync(join(stableDir, f), join(STABLE, f));
for (const f of ["installieren.html", ...icons]) cpSync(join(repo, f), join(DEV, f));
for (const f of ["index.html", "sw.js", "manifest.webmanifest"]) cpSync(join(repo, "pwa", f), join(DEV, f));
const types = { html: "text/html", js: "text/javascript", webmanifest: "application/manifest+json", png: "image/png" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = join(root, p);
  if (!file.startsWith(root) || !existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": types[file.split(".").pop()] || "application/octet-stream", "cache-control": "no-store" });
  res.end(readFileSync(file));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ acceptDownloads: true });
// a Claude host with cloud storage, offered to the dev page only: the dev build must ignore it (CLOUD_SYNC = false)
await ctx.addInitScript(() => {
  if (!location.pathname.startsWith("/ringzeit-dev/")) return;
  const doc = () => ({ get: async () => ({ exists: false }), set: async () => {} });
  window.claude = { use: async (n) => (n === "user" ? { id: async () => "u1" } : n === "db" ? { doc } : null) };
});
let passed = 0;
const ok = (name) => console.log(`ok ${++passed} - ${name}`);
const swVersion = (dir) => readFileSync(join(dir, "sw.js"), "utf8").match(/(\d{12})"/)[1];
const bumpSw = (dir) => {
  const v = swVersion(dir),
    n = String(Number(v) + 1);
  writeFileSync(join(dir, "sw.js"), readFileSync(join(dir, "sw.js"), "utf8").replace(`${v}"`, `${n}"`));
  return n;
};
async function open(path) {
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: "load" });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => typeof store === "object" && typeof S === "object" && S.profile);
  return page;
}
const state = (page) =>
  page.evaluate(async () => ({
    keys: Object.keys(localStorage).sort(),
    stable: localStorage.getItem("ringzeit.v1"),
    dev: localStorage.getItem("ringzeit-dev.v1"),
    caches: (await caches.keys()).sort(),
    sws: (await navigator.serviceWorker.getRegistrations()).map((r) => new URL(r.scope).pathname).sort(),
  }));
const year = (json) => JSON.parse(json).profile.birthYear;
// waitForFunction treats a returned Promise as truthy, so async conditions are polled here
async function until(page, fn, arg, ms = 15000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await page.evaluate(fn, arg)) return true;
    await page.waitForTimeout(200);
  }
  throw new Error("timeout: " + fn.toString().slice(0, 80));
}
// new service worker installed and activated for the page's scope
async function updateSw(page, version) {
  await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
  await until(page, async (v) => (await caches.keys()).some((k) => k.endsWith(v)), version);
  await until(page, async (v) => {
    const r = await navigator.serviceWorker.getRegistration();
    return !!r.active && r.active.scriptURL && !r.installing && !r.waiting && r.active.state === "activated";
  }, version);
  await page.waitForTimeout(500);
}

try {
  // 1. stable app with its own synthetic data and cache
  const st = await open("/ringzeit/");
  await st.evaluate(() => {
    S.profile.birthYear = 1980;
    store.save(true);
  });
  const stableJson = (await state(st)).stable;
  assert.equal(year(stableJson), 1980);
  ok("stable app stores its data under ringzeit.v1");

  // 2. dev app next to it
  const dv = await open("/ringzeit-dev/");
  const devVer = swVersion(DEV),
    stableVer = swVersion(STABLE);
  await dv.evaluate(() => {
    S.profile.birthYear = 1990;
    store.save(true);
  });
  let s = await state(dv);
  assert.equal(await dv.evaluate(() => LS), "ringzeit-dev.v1");
  assert.equal(year(s.dev), 1990);
  assert.equal(s.stable, stableJson);
  ok("dev app writes only ringzeit-dev.v1; stable data unchanged");
  assert.equal(await dv.evaluate(() => store.mode), "local");
  ok("dev app stays local although a Claude cloud host is offered");
  assert.deepEqual(s.caches, [`ringzeit-${stableVer}`, `ringzeit-dev-${devVer}`]);
  assert.deepEqual(s.sws, ["/ringzeit-dev/", "/ringzeit/"]);
  ok("separate service workers (/ringzeit/, /ringzeit-dev/) and caches; dev activation kept the stable cache");
  const man = await dv.evaluate(async () => (await fetch("manifest.webmanifest")).json());
  assert.equal(man.name, "Ringzeit Dev");
  assert.equal(new URL(man.id, base + "/ringzeit-dev/manifest.webmanifest").pathname, "/ringzeit-dev/");
  assert.equal(await dv.title(), "Ringzeit Dev");
  ok("manifest id/name/start_url and title point to Ringzeit Dev");

  // 3. own backup: export, change, re-import; a stable backup is refused
  const [dl] = await Promise.all([dv.waitForEvent("download"), dv.evaluate(() => exportData())]);
  const backupName = dl.suggestedFilename(),
    backup = readFileSync(await dl.path(), "utf8");
  assert.match(backupName, /^ringzeit-dev-/);
  assert.equal(JSON.parse(backup).app, "ringzeit-dev");
  ok(`backup export is marked as ringzeit-dev (${backupName})`);
  await dv.evaluate(() => {
    S.profile.birthYear = 2000;
    store.save(true);
  });
  const stableBackup = JSON.stringify({ app: "ringzeit", v: 1, exported: new Date().toISOString(), data: JSON.parse(stableJson) });
  await dv.evaluate((t) => importFile(new File([t], "ringzeit-sicherung.json")), stableBackup);
  await dv.waitForFunction(() => !document.getElementById("toast").hidden);
  assert.match(await dv.textContent("#toast"), /Ringzeit Dev/);
  assert.equal(year((await state(dv)).dev), 2000);
  ok("stable backup is refused, dev data unchanged");
  await dv.evaluate((t) => importFile(new File([t], "b.json")), backup);
  await dv.waitForFunction(() => !document.getElementById("sheet").hidden);
  await dv.evaluate(() => {
    const b = [...document.querySelectorAll("#sheet button")].filter((x) => /btn/.test(x.className) && !/sec/.test(x.className));
    b[b.length - 1].click();
  });
  await dv.waitForFunction(() => S.profile.birthYear === 1990);
  s = await state(dv);
  assert.equal(year(s.dev), 1990);
  assert.equal(s.stable, stableJson);
  ok("own backup restores dev data; stable data unchanged");

  // 4. reset in the dev app removes only its own key
  await Promise.all([dv.waitForEvent("load"), dv.evaluate(() => resetAll())]);
  await dv.waitForFunction(() => typeof S === "object" && S.profile);
  s = await state(dv);
  assert.notEqual(s.dev && year(s.dev), 1990);
  assert.equal(s.stable, stableJson);
  assert.ok(s.caches.includes(`ringzeit-${stableVer}`));
  assert.deepEqual(s.sws, ["/ringzeit-dev/", "/ringzeit/"]);
  ok("dev reset clears only dev data; stable data, cache and service worker remain");

  // 5. dev update: new service worker deletes only the old dev cache
  const devNew = bumpSw(DEV);
  await updateSw(dv, devNew);
  await until(dv, async (old) => !(await caches.keys()).includes(old), `ringzeit-dev-${devVer}`);
  s = await state(dv);
  assert.deepEqual(s.caches, [`ringzeit-${stableVer}`, `ringzeit-dev-${devNew}`]);
  assert.equal(s.stable, stableJson);
  ok("dev update removes only the old ringzeit-dev cache");

  // 6. dev works offline from its own cache
  await ctx.setOffline(true);
  await dv.reload({ waitUntil: "load" });
  await dv.waitForFunction(() => typeof S === "object" && S.profile);
  assert.equal(await dv.title(), "Ringzeit Dev");
  await ctx.setOffline(false);
  ok("dev app reloads offline from its cache");

  // 7. known limit, outside the dev repo: the STABLE service worker deletes every other cache on its update.
  //    Dev data in localStorage is not affected; the dev cache is refilled on the next online start.
  await dv.evaluate(() => {
    S.profile.birthYear = 1995;
    store.save(true);
  });
  const stableNew = bumpSw(STABLE);
  await updateSw(st, stableNew);
  s = await state(st);
  const devCacheGone = !s.caches.some((k) => k.startsWith("ringzeit-dev-"));
  assert.equal(year(s.dev), 1995);
  ok("a stable update leaves the dev data untouched");
  console.log(`info - after a stable update the dev cache is ${devCacheGone ? "DELETED by the stable service worker (known limit)" : "kept"}`);
  await dv.reload({ waitUntil: "load" });
  await dv.waitForFunction(() => typeof S === "object" && S.profile);
  assert.equal(await dv.evaluate(() => S.profile.birthYear), 1995);
  await until(dv, async () => (await caches.keys()).some((k) => k.startsWith("ringzeit-dev-"))).catch(() => {});
  s = await state(dv);
  console.log(`info - after the next online start of the dev app its cache is ${s.caches.some((k) => k.startsWith("ringzeit-dev-")) ? "present again" : "still missing"}: ${s.caches.join(", ")}`);
  console.log(`\n${passed} checks passed`);
} finally {
  await browser.close();
  server.close();
}

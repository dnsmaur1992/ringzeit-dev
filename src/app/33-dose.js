  /* ============ Dose: every exercise says how much – reps, seconds, distance or minutes ============ */
  /* per-exercise doses by German name: [de, en] */
  const DOSE_FIX = {
    // warm-up (shown after the minutes)
    Gelenkmobilisation: ["je Gelenk 10 Kreise", "10 circles per joint"],
    "Kurz andehnen": ["je Muskel 15–30 s · ca. 2 Min.", "15–30 s per muscle · about 2 min"],
    "Dynamisches Dehnen": ["je Bewegung 10 Wdh.", "10 reps per movement"],
    "Bänder-Aktivierung": ["je Übung 15 Wdh.", "15 reps per exercise"],
    // cool-down
    "Hüftbeuger dehnen": ["je Seite 45 s", "45 s per side"],
    "Adduktoren & Spagat": ["60–90 s halten", "hold 60–90 s"],
    "Oberschenkel hinten": ["je Seite 45 s", "45 s per side"],
    "Schulter & Brust": ["je Seite 30 s", "30 s per side"],
    Atmung: ["2 Min.", "2 min"],
    Auslaufen: ["5 Min. locker", "5 min easy"],
    // mobility
    "Hüftkreise im Vierfüßler": ["je Seite 6 Kreise", "6 circles per side"],
    "90/90 Hüftwechsel": ["10 Wechsel", "10 switches"],
    "Cossack Squats": ["je Seite 6", "6 per side"],
    "World's Greatest Stretch": ["je Seite 5", "5 per side"],
    "Offenes Buch": ["je Seite 8", "8 per side"],
    "Sprunggelenk an der Wand": ["je Seite 10", "10 per side"],
    "Band-Dislocates": ["10 Wdh.", "10 reps"],
    Froschdehnung: ["60–90 s halten", "hold 60–90 s"],
    Taube: ["je Seite 60–90 s", "60–90 s per side"],
    "Katze-Kuh": ["10 Wdh.", "10 reps"],
    "Zeitlupen-Kicks": ["je Seite 5", "5 per side"],
    "Tiefe Hocke halten": ["60–90 s halten", "hold 60–90 s"],
    Nackenmobilisation: ["je Richtung 5", "5 each direction"],
    "Beinpendel kontrolliert": ["je Seite 10", "10 per side"],
    "Kick-Halten": ["je Seite 5 × 3–5 s", "5 × 3–5 s per side"],
    "Aktive Beinheber": ["je Seite 8", "8 per side"],
    // strength specials
    Klimmzüge: ["so viele saubere wie möglich", "as many clean reps as possible"],
    "Negative Klimmzüge": ["3–5 Wdh.", "3–5 reps"],
    "Isometrische Nackenkräftigung – Halteübung": ["je Richtung 10 s", "10 s each direction"],
    "Einbeinstand mit Kick-Hold": ["pro Bein 2 × 10 s", "2 × 10 s per leg"],
    // conditioning with their own pattern (one block per circuit lap)
    "Seil-Intervalle": ["2 Min. im Wechsel", "2 min alternating"],
    Sprints: ["4 Läufe à 20 m", "4 runs of 20 m"],
    Bergsprints: ["4 Sprints", "4 sprints"],
    "Schatten-Sprints": ["3 × (20 s Vollgas / 10 s locker)", "3 × (20 s all-out / 10 s easy)"],
    "Sack-Sprints": ["4 × (15 s / 15 s Pause)", "4 × (15 s / 15 s rest)"],
    "Kick-Intervalle": ["3 × (20 s / 10 s Pause)", "3 × (20 s / 10 s rest)"],
    Steigerungsläufe: ["2 × 80 m", "2 × 80 m"],
    "Rudergerät-Intervalle": ["2 Min. im Wechsel", "2 min alternating"],
    "Laufband-Intervalle": ["2 Min. im Wechsel", "2 min alternating"],
    "Rad-Sprints": ["2 × (20 s / 40 s locker)", "2 × (20 s / 40 s easy)"],
    "Speed-Runden": ["4 × (10 s / 20 s locker)", "4 × (10 s / 20 s easy)"],
    "Steppen und leichte Beinarbeit": ["3 Min.", "3 min"],
    "Kettlebell-Swings": ["15 Wdh.", "15 reps"],
    "Skater-Sprünge": ["pro Bein 10", "10 per leg"],
  };
  /* minutes one circuit lap of these takes (everything else ≈ 1 min) */
  const DOSE_MIN = {
    "Seil-Intervalle": 2,
    Sprints: 1.5,
    Bergsprints: 2,
    "Schatten-Sprints": 1.5,
    "Sack-Sprints": 2,
    "Kick-Intervalle": 1.5,
    Steigerungsläufe: 1.5,
    "Rudergerät-Intervalle": 2,
    "Laufband-Intervalle": 2,
    "Rad-Sprints": 2,
    "Speed-Runden": 2,
    "Steppen und leichte Beinarbeit": 3,
  };
  const DOSE_SIDE = new Set([
    "Ausfallschritte",
    "Bulgarian Split Squats",
    "Step-ups",
    "Wadenheben einbeinig",
    "Woodchopper am Kabelzug",
    "Pallof Press",
    "Copenhagen Plank",
    "Russian Twists",
    "Seitliche Sprünge",
  ]);
  /* one-legged exercises: the dose is per leg ("pro Bein") instead of "je Seite" */
  const DOSE_LEG = new Set([
    "Ausfallschritte",
    "Bulgarian Split Squats",
    "Step-ups",
    "Wadenheben einbeinig",
    "Einbeinstand mit Kick-Hold",
    "Skater-Sprünge",
  ]);
  const sideWord = (name, de = S.profile.lang === "de") =>
    DOSE_LEG.has(name) ? (de ? " pro Bein" : " per leg") : DOSE_SIDE.has(name) ? (de ? " je Seite" : " per side") : "";
  /* a circuit: "3×" without reps – all exercises one after another, then a lap break */
  const isCirc = (b) => /^\d+\s*×$/.test((b.sets || "").trim());
  const circLap = (b) =>
    b.items.reduce((a, it) => {
      const e = EX[it.id];
      return a + (!e ? 1 : DOSE_MIN[e.de] || (DOSE_SIDE.has(e.de) ? 1.5 : 1));
    }, 0) + 1.5;
  /* laps that fill the block's minutes (2–6) */
  const circN = (b) => Math.max(2, Math.min(6, Math.round(b.min / circLap(b))));
  const blockSets = (b) => (isCirc(b) ? circN(b) : parseInt(b.sets) || 3);
  function doseTxt(id, b) {
    const e = EX[id];
    if (!e) return "";
    const de = S.profile.lang === "de",
      L = S.profile.level,
      fix = DOSE_FIX[e.de] ? DOSE_FIX[e.de][de ? 0 : 1] : "",
      side = sideWord(e.de, de),
      reps = de ? " Wdh." : " reps",
      circ = isCirc(b),
      m = (b.sets || "").match(/^(\d+)×\s*(\d+(?:[–-]\d+)?)?/),
      n = m ? +m[1] : 3;
    if (e.cat === "pre") return fix;
    if (b.key === "warm") {
      const mins = Math.max(2, Math.round(b.min / Math.max(1, b.items.length)));
      return `${mins} ${de ? "Min." : "min"}${fix ? " · " + fix : ""}`;
    }
    if (b.key === "mob") {
      const mins = Math.max(2, Math.round(b.min / Math.max(1, b.items.length)));
      return `${fix || (de ? "60–90 s halten" : "hold 60–90 s")} · ${de ? "insgesamt ca." : "about"} ${mins} ${de ? "Min." : "min in total"}`;
    }
    if (b.key === "cool" || e.cat === "cool" || e.cat === "mob")
      return fix || (de ? "45–60 s halten" : "hold 45–60 s");
    if (e.cat === "cond") {
      if (fix) return fix;
      if (e.de === "Burpees") return ["6", "10", "15"][L] + reps;
      const W = [30, 40, 45][L],
        R = [30, 20, 15][L];
      if (e.de === "Bear Crawl")
        return de
          ? `${W} s (ca. 10 m hin und zurück), ${R} s Pause`
          : `${W} s (about 10 m out and back), ${R} s rest`;
      return de ? `${W} s Belastung, ${R} s Pause` : `${W} s work, ${R} s rest`;
    }
    // strength, core and power
    if (e.cat === "pow") {
      const one = (de ? "5 Wdh." : "5 reps") + side;
      if (circ) return one;
      if (/^Kontrast|^Contrast/.test(b.sets || ""))
        return de
          ? `3 × 5 Wdh.${side} direkt nach dem Kraftsatz`
          : `3 × 5 reps${side} right after the strength set`;
      return `${n} × ${one} · ${de ? "1–2 Min. Pause" : "1–2 min rest"}`;
    }
    let one;
    if (fix) one = fix;
    else if (TIMED.has(id)) {
      const h = [
        [20, 30],
        [30, 45],
        [45, 60],
      ][L] || [30, 45];
      one = `${h[0]}–${h[1]} s${side} ${de ? "halten" : "hold"}`;
    } else {
      const heavyBw = bwHeavy(b, id),
        r = heavyBw ? ["8–10", "10–12", "12–15"][L] : m && m[2] ? m[2] : hasKg(id) ? "8–12" : ["8–10", "10–12", "12–15"][L];
      one = r + reps + side + (heavyBw ? (de ? ", langsam (3 s ab)" : ", slow (3 s down)") : "");
    }
    return circ ? one : `${n} × ${one}`;
  }
  /* Training with a partner: you are two and every device is there once.
     Circuit: both work at the same time, B starts further down the list so nobody needs the same device at once
     (duoOff); the plan shows the two orders side by side, A left and B right.
     Sets with set rest: you take turns – the set rest is the partner's set. Other device work: take turns. */
  const exEqOf = (sess, id) => (EX[id] && EX[id].eq ? EX[id].eq.split("|").filter((q) => (sess.eq || []).includes(q)) : []);
  const isDuo = (sess, b) =>
    !!sess && (sess.eq || []).includes("partner") && isCirc(b) && !b.rounds && !["warm", "cool"].includes(b.key) && b.items.length > 1 && b.items.every((it) => EX[it.id]);
  function duoOff(sess, b) {
    const n = b.items.length,
      eqs = b.items.map((it) => exEqOf(sess, it.id)),
      clash = (o) => eqs.filter((e, i) => e.length && eqs[(i + o) % n].some((q) => e.includes(q))).length,
      cand = [Math.ceil(n / 2), ...Array.from({ length: n - 1 }, (_, i) => i + 1).filter((o) => o !== Math.ceil(n / 2))];
    let best = cand[0];
    for (const o of cand) if (clash(o) < clash(best)) best = o;
    return { off: best, clash: clash(best) };
  }
  const duoTxt = () =>
    S.profile.lang === "de"
      ? {
          circ: (k) => `Zu zweit: gleichzeitig, aber versetzt – A beginnt bei Übung 1, B bei Übung ${k}. So ist jedes Gerät immer nur bei einem von euch.`,
          clash: " Wo trotzdem beide dasselbe Gerät brauchen: abwechselnd.",
          sets: " Zu zweit: abwechselnd – die Satzpause ist der Satz deines Partners.",
          turns: "Zu zweit: Geräte abwechselnd – während einer arbeitet, macht der andere Pause, dann tauschen.",
        }
      : {
          circ: (k) => `As a pair: at the same time, but offset – A starts at exercise 1, B at exercise ${k}. That way each device is only ever with one of you.`,
          clash: " Where you both still need the same device: take turns.",
          sets: " As a pair: take turns – the set rest is your partner's set.",
          turns: "As a pair: take turns on the devices – one works, the other rests, then swap.",
        };
  function duoHtml(sess, bi, cur) {
    const b = sess.blocks[bi],
      n = b.items.length,
      { off } = duoOff(sess, b),
      cell = (who, k, on) => `<div class="dc ${who}${on ? " on" : ""}"><i>${k + 1}</i>${esc(itemTitle(sess, bi, k))}</div>`;
    let h = `<div class="duo"><div class="dh a"><b>A</b></div><div class="dh b"><b>B</b></div>`;
    for (let i = 0; i < n; i++) h += cell("a", i, cur === i) + cell("b", (i + off) % n, cur === i);
    return h + `</div>`;
  }
  function blockHead(b, sess) {
    const de = S.profile.lang === "de";
    let info = b.sets || "";
    if (b.key === "mob") info = "";
    else if (isCirc(b)) info = de ? `${circN(b)} Durchgänge` : `${circN(b)} laps`;
    if (b.rounds) {
      const w = b.w || (b.items.some((i) => i.k !== "ex") ? 180 : 120),
        r = b.b || 60;
      info = `${b.items.length} × ${fmt(w)} / ${fmt(r)} ${de ? "Pause" : "rest"}`;
    }
    const straight =
        !b.rounds && !isCirc(b) && (b.key === "str" || b.key === "pow") && /^\d+×/.test(b.sets || ""),
      note =
        isCirc(b) && !b.rounds
          ? de
            ? "Zirkel: alle Übungen nacheinander, dann 1–2 Min. Pause. Das ist ein Durchgang."
            : "Circuit: all exercises one after another, then 1–2 min rest. That is one lap."
          : straight
            ? (de
                ? "Erst alle Sätze einer Übung, dazwischen 60–90 s Pause – dann die nächste Übung."
                : "All sets of one exercise first, 60–90 s rest in between – then the next exercise.") +
              (b.items.some((it) => EX[it.id] && bwHeavy(b, it.id))
                ? de
                  ? " Die schweren Wiederholungszahlen gelten für Übungen mit Gewicht; ohne Gewicht machst du mehr Wiederholungen, dafür langsam."
                  : " The heavy rep numbers are for weighted exercises; without weight you do more reps, but slowly."
                : "")
            : "";
    let duo = "",
      extra = "";
    const pair = !!sess && (sess.eq || []).includes("partner") && !b.rounds && !["warm", "cool", "hard"].includes(b.key);
    if (pair && isDuo(sess, b)) {
      const bi = sess.blocks.indexOf(b),
        d = duoOff(sess, b);
      extra = " " + duoTxt().circ(d.off + 1) + (d.clash ? duoTxt().clash : "");
      duo = duoHtml(sess, bi, -1);
    } else if (pair && straight) extra = duoTxt().sets;
    else if (pair && b.items.some((it) => exEqOf(sess, it.id).length)) extra = (note ? " " : "") + duoTxt().turns;
    const nt = note + esc(extra);
    return `<div class="bhead"><b>${t(b.key)}</b><span>${b.min} ${t("min")}${info ? ` · ${esc(info)}` : ""}</span></div>${nt ? `<div class="bnote">${nt}${duo}</div>` : ""}`;
  }


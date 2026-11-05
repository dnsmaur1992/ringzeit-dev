  /* ============ Winter Arc (7n): an optional autumn/winter challenge built from chosen building blocks ============
     Start only from October to January (a running arc may end later); length 6–12 weeks from the next Monday.
     The user picks the blocks (training, recovery, mindset, discipline, body, look); Today shows only those.
     No extremes: rest days and deload weeks stay, no diet or weight goals (weight is a curve only), paused
     weeks (sickness, breaks) neither count nor break the streak. Stored in S.profile.arc / .arcs / .relaxLog
     so the normal save and the backup keep it. */
  const ARC_WEEKS = [6, 8, 10, 12];
  /* building blocks: k = kind (goal: weekly number, daily/weekly: tick, once: test, look: display) */
  const ARC_BLOCKS = {
    train: [
      ["train", "goal"],
      ["test", "once"],
      ["mob", "daily"],
      ["walk", "daily"],
    ],
    rest: [
      ["relax", "goal"],
      ["sleep23", "daily"],
      ["sleep7", "daily"],
      ["breath", "daily"],
      ["phone", "daily"],
    ],
    mind: [
      ["impulse", "look"],
      ["strong", "weekly"],
      ["grat", "daily"],
      ["read", "daily"],
    ],
    disc: [
      ["wake", "daily"],
      ["cold", "daily"],
      ["water", "daily"],
      ["alc", "daily"],
      ["social", "daily"],
    ],
    body: [["weight", "weekly"]],
    look: [["winter", "look"]],
  };
  const ARC_KIND = Object.fromEntries(Object.values(ARC_BLOCKS).flat());
  const ARC_DEFAULT = ["train", "relax", "test", "impulse", "mob", "sleep23", "winter"];
  const ARCT = {
    de: {
      name: "Winter Arc",
      tag: "❄ Challenge",
      intro: "Die dunkle Jahreszeit als eigener Abschnitt: dranbleiben, still arbeiten, im Frühjahr stärker sein. Ohne Extreme – Ruhetage und Entlastungswochen bleiben.",
      offer: "Herbst und Winter sind da. Lust auf deinen Winter Arc?",
      offerBtn: "Ansehen",
      len: "Länge",
      wk: (n) => `${n} Wo`,
      when: (a, b) => `Start ${a} · Ende ${b}`,
      pickH: "Was gehört zu deinem Arc?",
      pickSub: "Tipp an, was du willst. Auf Heute erscheint nur das, was du gewählt hast.",
      groups: { train: "Training", rest: "Erholung", mind: "Mindset", disc: "Disziplin", body: "Körper", look: "Optik" },
      blocks: {
        train: "Wochenziel Einheiten",
        test: "Fitnesstest am Start und am Ende",
        mob: "10 Min Mobility",
        walk: "Spaziergang draußen",
        relax: "Wochenziel Entspannen",
        sleep23: "Schlaf vor 23 Uhr",
        sleep7: "7 Stunden Schlaf",
        breath: "Atemübung",
        phone: "Handy weg 30 Min vor dem Schlaf",
        impulse: "Impuls der Woche",
        strong: "Meditation „Stärken“ 1× pro Woche",
        grat: "3 gute Dinge des Tages",
        read: "10 Min lesen",
        wake: "Feste Weckzeit",
        cold: "Kalt duschen (30 Sek.)",
        water: "2 Liter Wasser",
        alc: "Kein Alkohol",
        social: "Social-Media-Pause",
        weight: "Gewicht 1× pro Woche eintragen",
        winter: "Winter-Design",
      },
      trainN: "Einheiten pro Woche",
      relaxN: "Entspannen pro Woche",
      goalNote: "Vereinstraining zählt mit. In Wochen mit Krankheit oder Pause ruht das Ziel, die Serie bleibt.",
      coldNote: "Kalt duschen langsam steigern; nicht bei Herz-Kreislauf-Problemen oder wenn du krank bist.",
      weightNote: "Nur als Verlauf – ohne Zielgewicht. Ein Gewichtslimit für einen Kampf trägst du bei den Terminen ein.",
      start: "Winter Arc starten",
      startsOn: (d) => `Dein Winter Arc startet ${d}.`,
      testFirst: "Mach vorher den Fitnesstest – am Ende siehst du, was der Winter gebracht hat.",
      testEnd: "Letzte Woche: Zeit für den Endtest.",
      toTest: "Zum Fitnesstest",
      week: (w, n) => `Winter Arc · Woche ${w} von ${n}`,
      day: (d, n, l) => `Tag ${d} von ${n} · noch ${l} ${l === 1 ? "Tag" : "Tage"}`,
      unitsWk: "Einheiten diese Woche",
      relaxWk: "Entspannen diese Woche",
      today: "Heute",
      thisWeek: "Diese Woche",
      of7: (n) => `${n} von 7`,
      kgPh: "kg",
      kgSave: "Eintragen",
      kgDone: (kg) => `Eingetragen: ${kg} kg`,
      kgBad: "Bitte ein Gewicht zwischen 25 und 200 kg eingeben.",
      strongGo: "Meditation „Stärken“ starten",
      go: "Start",
      impulseH: "Impuls der Woche",
      streak: (n) => (n ? `Serie: ${n} ${n === 1 ? "Woche" : "Wochen"} am Stück ❄` : "Die Serie beginnt mit deiner ersten vollen Woche."),
      rests: "Diese Woche ruht das Ziel (Pause).",
      pause: "Pausieren",
      resume: "Weiter",
      paused: (d) => `Winter Arc pausiert seit ${d}. Das Ziel ruht, die Serie bleibt.`,
      end: "Beenden",
      endAsk: "Winter Arc wirklich beenden? Dein Fortschritt bleibt in der Bilanz.",
      endYes: "Ja, beenden",
      endNo: "Weitermachen",
      cancel: "Nicht starten",
      done: "Winter Arc geschafft",
      doneCard: "Dein Winter Arc ist vorbei. Schau dir an, was du geschafft hast.",
      doneBtn: "Bilanz ansehen",
      sumH: "Stärker aus dem Winter.",
      sumLine: (u, r, g, n) => `${u} Einheiten · ${r} × Entspannen · Wochenziel in ${g} von ${n} Wochen`,
      testH: "Fitnesstest vorher → nachher",
      testTotal: "Gesamt",
      testMissing: "Für den Vergleich fehlt der Start- oder Endtest.",
      habitsH: "Gewohnheiten",
      habitLine: (n, d) => `${n} von ${d} Tagen`,
      weekLine: (n, w) => `${n} von ${w} Wochen`,
      weightH: "Gewicht (Verlauf)",
      share: "Teilen",
      shareTx: (n, u) => `Mein Winter Arc: ${n} Wochen, ${u} Einheiten. Ringzeit`,
      close: "Schließen",
      newArc: "Neuer Arc",
      archive: "Abschließen",
      offSeason: "Den Winter Arc startest du von Oktober bis Januar.",
      history: "Frühere Arcs",
      histLine: (a, n, g) => `${a} · ${n} Wochen · Ziel in ${g} Wochen`,
      profRun: (w, n) => `Läuft · Woche ${w} von ${n}`,
      profStart: "Winter Arc starten",
      impulses: [
        "Dranbleiben, wenn es keiner sieht.",
        "Disziplin ist kein Gefühl, sondern eine Entscheidung, die du jeden Tag neu triffst.",
        "Klein anfangen zählt. Zehn Minuten sind mehr als null.",
        "Erholung ist Training. Schlaf ist kein Luxus, sondern dein Fortschritt.",
        "Du musst dich nicht motiviert fühlen, um anzufangen. Fang an – die Motivation kommt nach.",
        "Vergleich dich nur mit dem, der du letzte Woche warst.",
        "Ein schlechter Tag ist kein schlechter Arc. Morgen geht es weiter.",
        "Stärke wächst im Stillen. Im Frühjahr sieht man sie.",
        "Halte deine Versprechen an dich selbst – auch die kleinen.",
        "Ruhig bleiben, wenn es hart wird. Dein Atem ist dein Anker.",
        "Du bist weiter, als du denkst. Schau zurück, wo du gestartet bist.",
        "Die letzten Wochen entscheiden nicht alles – aber sie zeigen, wer du geworden bist.",
      ],
    },
    en: {
      name: "Winter Arc",
      tag: "❄ Challenge",
      intro: "The dark season as a chapter of its own: keep going, work quietly, be stronger in spring. No extremes – rest days and deload weeks stay.",
      offer: "Autumn and winter are here. Fancy your Winter Arc?",
      offerBtn: "Take a look",
      len: "Length",
      wk: (n) => `${n} wk`,
      when: (a, b) => `Start ${a} · End ${b}`,
      pickH: "What belongs to your arc?",
      pickSub: "Tap what you want. Today only shows what you picked.",
      groups: { train: "Training", rest: "Recovery", mind: "Mindset", disc: "Discipline", body: "Body", look: "Look" },
      blocks: {
        train: "Weekly session goal",
        test: "Fitness test at start and end",
        mob: "10 min mobility",
        walk: "Walk outside",
        relax: "Weekly relax goal",
        sleep23: "Asleep before 11 pm",
        sleep7: "7 hours of sleep",
        breath: "Breathing exercise",
        phone: "Phone away 30 min before sleep",
        impulse: "Thought of the week",
        strong: "Meditation “Strengthen” once a week",
        grat: "3 good things of the day",
        read: "Read 10 min",
        wake: "Fixed wake-up time",
        cold: "Cold shower (30 s)",
        water: "2 litres of water",
        alc: "No alcohol",
        social: "Social media break",
        weight: "Log weight once a week",
        winter: "Winter look",
      },
      trainN: "Sessions per week",
      relaxN: "Relax per week",
      goalNote: "Club training counts. In weeks with sickness or a break the goal rests, the streak stays.",
      coldNote: "Build cold showers up slowly; not with heart or circulation problems or when you're ill.",
      weightNote: "As a curve only – no target weight. A weight limit for a fight goes under your dates.",
      start: "Start Winter Arc",
      startsOn: (d) => `Your Winter Arc starts ${d}.`,
      testFirst: "Do the fitness test first – at the end you'll see what winter brought.",
      testEnd: "Last week: time for the final test.",
      toTest: "To the fitness test",
      week: (w, n) => `Winter Arc · week ${w} of ${n}`,
      day: (d, n, l) => `Day ${d} of ${n} · ${l} ${l === 1 ? "day" : "days"} to go`,
      unitsWk: "Sessions this week",
      relaxWk: "Relax this week",
      today: "Today",
      thisWeek: "This week",
      of7: (n) => `${n} of 7`,
      kgPh: "kg",
      kgSave: "Log",
      kgDone: (kg) => `Logged: ${kg} kg`,
      kgBad: "Please enter a weight between 25 and 200 kg.",
      strongGo: "Start meditation “Strengthen”",
      go: "Start",
      impulseH: "Thought of the week",
      streak: (n) => (n ? `Streak: ${n} ${n === 1 ? "week" : "weeks"} in a row ❄` : "The streak starts with your first full week."),
      rests: "The goal rests this week (break).",
      pause: "Pause",
      resume: "Resume",
      paused: (d) => `Winter Arc paused since ${d}. The goal rests, the streak stays.`,
      end: "End",
      endAsk: "Really end your Winter Arc? Your progress stays in the review.",
      endYes: "Yes, end it",
      endNo: "Keep going",
      cancel: "Don't start",
      done: "Winter Arc done",
      doneCard: "Your Winter Arc is over. See what you achieved.",
      doneBtn: "See review",
      sumH: "Stronger out of winter.",
      sumLine: (u, r, g, n) => `${u} sessions · ${r} × relax · weekly goal in ${g} of ${n} weeks`,
      testH: "Fitness test before → after",
      testTotal: "Total",
      testMissing: "The start or final test is missing for the comparison.",
      habitsH: "Habits",
      habitLine: (n, d) => `${n} of ${d} days`,
      weekLine: (n, w) => `${n} of ${w} weeks`,
      weightH: "Weight (curve)",
      share: "Share",
      shareTx: (n, u) => `My Winter Arc: ${n} weeks, ${u} sessions. Ringzeit`,
      close: "Close",
      newArc: "New arc",
      archive: "Finish",
      offSeason: "You can start the Winter Arc from October to January.",
      history: "Earlier arcs",
      histLine: (a, n, g) => `${a} · ${n} weeks · goal in ${g} weeks`,
      profRun: (w, n) => `Running · week ${w} of ${n}`,
      profStart: "Start Winter Arc",
      impulses: [
        "Keep going when nobody is watching.",
        "Discipline isn't a feeling, it's a decision you make again every day.",
        "Starting small counts. Ten minutes beat zero.",
        "Recovery is training. Sleep is not a luxury, it's your progress.",
        "You don't have to feel motivated to start. Start – motivation follows.",
        "Only compare yourself with who you were last week.",
        "One bad day isn't a bad arc. Tomorrow you carry on.",
        "Strength grows in silence. Spring will show it.",
        "Keep the promises you make to yourself – the small ones too.",
        "Stay calm when it gets hard. Your breath is your anchor.",
        "You've come further than you think. Look back at where you started.",
        "The last weeks don't decide everything – but they show who you've become.",
      ],
    },
  };
  const arcT = () => ARCT[S.profile.lang] || ARCT.de;
  /* season: starting is possible from October to January */
  const arcSeason = (d = today()) => [9, 10, 11, 0].includes(d.getMonth());
  const arcSeasonKey = (d = today()) => String(d.getMonth() === 0 ? d.getFullYear() - 1 : d.getFullYear());
  const arcNextMon = (d = today()) => {
    const m = monday(d);
    return iso(m) === iso(d) ? d : addDays(m, 7);
  };
  const arcOf = () => (S.profile.arc && S.profile.arc.start ? S.profile.arc : null);
  const arcEnd = (a) => a.endedEarly || iso(addDays(parse(a.start), a.weeks * 7 - 1));
  const arcHas = (a, id) => a.pick.includes(id);
  function arcPausedOn(a, ds) {
    return (a.paused || []).some((p) => ds >= p.from && (!p.to || ds <= p.to)) || !!pausedOn(ds);
  }
  /* relax sessions finished (kept small); written by the relax module when a session runs to its end */
  function relaxLogAdd(r) {
    const L = (S.profile.relaxLog = Array.isArray(S.profile.relaxLog) ? S.profile.relaxLog : []);
    L.push({ d: iso(today()), m: r.mode, k: r.mode === "med" ? r.kind : r.pat });
    S.profile.relaxLog = L.slice(-300);
    store.save();
  }
  const relaxOnDays = (a, b, f = () => true) => (S.profile.relaxLog || []).filter((x) => x.d >= a && x.d <= b && f(x)).length;
  /* per week: sessions (own and club, with minutes), relax sessions, paused, reached */
  function arcWeek(a, i) {
    const m = addDays(parse(a.start), i * 7),
      from = iso(m),
      to = iso(addDays(m, 6)),
      units = S.log.filter((e) => e.date >= from && e.date <= to && (e.minutes || 0) > 0).length,
      relax = relaxOnDays(from, to),
      days = Array.from({ length: 7 }, (_, k) => iso(addDays(m, k))),
      rest = days.filter((d) => arcPausedOn(a, d)).length >= 3,
      ok = (!arcHas(a, "train") || units >= a.train) && (!arcHas(a, "relax") || relax >= a.relax);
    return { from, to, units, relax, rest, ok };
  }
  /* streak: full weeks in a row up to the last finished one; resting weeks are skipped, never broken */
  function arcStreak(a, upTo) {
    let n = 0;
    for (let i = upTo; i >= 0; i--) {
      const w = arcWeek(a, i);
      if (w.rest) continue;
      if (!w.ok) break;
      n++;
    }
    return n;
  }
  /* a tick: daily ones per day, weekly ones once in the week; some come by themselves */
  function arcTicked(a, id, ds) {
    if (id === "breath" && relaxOnDays(ds, ds, (x) => x.m === "breath")) return true;
    if (ARC_KIND[id] === "weekly") {
      const m = monday(parse(ds)),
        from = iso(m),
        to = iso(addDays(m, 6));
      if (id === "strong" && relaxOnDays(from, to, (x) => x.m === "med" && x.k === "strong")) return true;
      if (id === "weight") return S.weights.some((w) => w.date >= from && w.date <= to);
      return Object.keys(a.checks || {}).some((d) => d >= from && d <= to && a.checks[d].includes(id));
    }
    return !!(a.checks && a.checks[ds] && a.checks[ds].includes(id));
  }
  function arcToggle(id) {
    const a = arcOf();
    if (!a) return;
    const ds = iso(today());
    a.checks = a.checks || {};
    const cur = new Set(a.checks[ds] || []);
    cur.has(id) ? cur.delete(id) : cur.add(id);
    a.checks[ds] = [...cur];
    store.save();
    render();
  }
  /* fitness tests: the first around the start, the last around the end */
  function arcTests(a) {
    const s0 = iso(addDays(parse(a.start), -14)),
      s1 = iso(addDays(parse(a.start), 13)),
      e = arcEnd(a),
      e0 = iso(addDays(parse(e), -13)),
      e1 = iso(addDays(parse(e), 14)),
      ok = (x) => x.scores && x.total != null,
      first = S.tests.find((x) => ok(x) && x.date >= s0 && x.date <= s1) || null,
      last = [...S.tests].reverse().find((x) => ok(x) && x.date >= e0 && x.date <= e1 && (!first || x.id !== first.id)) || null;
    return { first, last };
  }
  function arcSummary(a) {
    const end = arcEnd(a),
      upto = iso(today()) < end ? iso(today()) : end,
      weeks = Array.from({ length: a.weeks }, (_, i) => arcWeek(a, i)).filter((w) => w.from <= upto),
      days = Math.max(1, daysBetween(parse(a.start), parse(upto)) + 1),
      habits = a.pick
        .filter((id) => ARC_KIND[id] === "daily" || ARC_KIND[id] === "weekly")
        .map((id) => {
          if (ARC_KIND[id] === "weekly") return { id, n: weeks.filter((w) => arcTicked(a, id, w.from)).length, of: weeks.length, wk: true };
          let n = 0;
          for (let k = 0; k < days; k++) if (arcTicked(a, id, iso(addDays(parse(a.start), k)))) n++;
          return { id, n, of: days };
        }),
      wts = S.weights.filter((w) => w.date >= a.start && w.date <= end);
    return {
      units: weeks.reduce((s, w) => s + w.units, 0),
      relax: weeks.reduce((s, w) => s + w.relax, 0),
      goal: weeks.filter((w) => w.ok && !w.rest).length,
      weeks: weeks.length,
      habits,
      weight: wts.length ? { first: wts[0].kg, last: wts[wts.length - 1].kg, n: wts.length } : null,
      tests: arcTests(a),
    };
  }
  /* ---------- Today ---------- */
  function arcCardHtml() {
    const A = arcT(),
      a = arcOf(),
      td = iso(today());
    if (!a) {
      const P = S.profile;
      if (!arcSeason() || P.arcHide === arcSeasonKey()) return "";
      return `<div class="note act arcoffer"><span>❄ ${A.offer}</span><span class="minirow"><button type="button" class="btn ghost" data-arc="setup">${A.offerBtn}</button><button type="button" class="btn ghost" data-arc="hide" aria-label="✕">✕</button></span></div>`;
    }
    const end = arcEnd(a),
      win = arcHas(a, "winter") ? " wawin" : "";
    if (td > end || a.endedEarly) return `<div class="arcard${win}"><span class="eb">${A.tag}</span><div class="big">${A.done}</div><p class="sub">${A.doneCard}</p><button type="button" class="btn" data-arc="summary">${A.doneBtn}</button></div>`;
    if (td < a.start) {
      const T = arcTests(a);
      return `<div class="arcard${win}"><span class="eb">${A.tag}</span><div class="big">${esc(A.startsOn(fmtDate(a.start)))}</div>${arcHas(a, "test") && !T.first ? `<p class="sub">${A.testFirst}</p><button type="button" class="btn sec" data-tab="test">${A.toTest}</button>` : ""}<div class="minirow"><button type="button" class="btn ghost" data-arc="setup">✎</button><button type="button" class="btn ghost" data-arc="cancel">${A.cancel}</button></div></div>`;
    }
    const day = daysBetween(parse(a.start), today()) + 1,
      n = a.weeks * 7,
      wi = Math.floor((day - 1) / 7),
      w = arcWeek(a, wi),
      pz = (a.paused || []).find((p) => !p.to);
    let h = `<div class="arcard${win}"><span class="eb">${esc(A.week(wi + 1, a.weeks))}</span>`;
    h += `<div class="big">${esc(arcHas(a, "impulse") ? A.impulses[wi % A.impulses.length] : A.name)}</div>`;
    h += `<div class="arcbar"><i style="width:${Math.round((day / n) * 100)}%"></i></div><span class="sub">${esc(A.day(day, n, n - day))}</span>`;
    if (pz) return h + `<p class="sub">${esc(A.paused(fmtDate(pz.from)))}</p><button type="button" class="btn" data-arc="resume">${A.resume}</button></div>`;
    const dots = (k, of) => `<div class="arcdots">${Array.from({ length: of }, (_, i) => `<span class="${i < k ? "on" : ""}"></span>`).join("")}</div>`;
    const goals = [];
    if (arcHas(a, "train")) goals.push(`<div class="g"><b>${w.units}/${a.train}</b><small>${A.unitsWk}</small>${dots(w.units, a.train)}</div>`);
    if (arcHas(a, "relax")) goals.push(`<div class="g"><b>${w.relax}/${a.relax}</b><small>${A.relaxWk}</small>${dots(w.relax, a.relax)}</div>`);
    if (goals.length) h += `<div class="arcgoals">${goals.join("")}</div>`;
    if (w.rest) h += `<p class="sub">${A.rests}</p>`;
    h += `</div>`;
    // ticks of today and of this week
    const daily = a.pick.filter((id) => ARC_KIND[id] === "daily"),
      weekly = a.pick.filter((id) => ARC_KIND[id] === "weekly"),
      cnt = (id) => {
        let k = 0;
        for (let d = 0; d < 7; d++) {
          const ds = iso(addDays(parse(w.from), d));
          if (ds <= td && arcTicked(a, id, ds)) k++;
        }
        return k;
      };
    if (daily.length || weekly.length) {
      h += `<div class="panel wapan arcticks">`;
      if (daily.length)
        h += `<span class="lab">${A.today}</span>${daily
          .map((id) => {
            const on = arcTicked(a, id, td),
              auto = id === "breath";
            return `<div class="arch"><button type="button" class="arck${on ? " on" : ""}" data-arcchk="${id}" aria-pressed="${on}" ${auto && on ? "disabled" : ""}>${on ? "✓" : ""}</button><span style="flex:1">${esc(A.blocks[id])}${id === "cold" ? `<small class="sub" style="display:block">${A.coldNote}</small>` : ""}</span><span class="sub">${A.of7(cnt(id))}</span>${auto && !on ? `<button type="button" class="btn ghost" data-rx="open" data-rv="breath">🌬️</button>` : ""}</div>`;
          })
          .join("")}`;
      if (weekly.length)
        h += `<span class="lab">${A.thisWeek}</span>${weekly
          .map((id) => {
            const on = arcTicked(a, id, td);
            if (id === "weight") {
              const lw = S.weights.find((x) => x.date >= w.from && x.date <= w.to);
              return `<div class="arch"><span class="arck${on ? " on" : ""}" aria-hidden="true">${on ? "✓" : ""}</span><span style="flex:1">${esc(A.blocks.weight)}${lw ? `<small class="sub" style="display:block">${esc(A.kgDone(numF(lw.kg)))}</small>` : `<small class="sub" style="display:block">${A.weightNote}</small>`}</span>${lw ? "" : `<span class="arkg"><input id="arcKg" class="wc" type="text" inputmode="decimal" placeholder="${A.kgPh}" aria-label="${A.kgPh}"><button type="button" class="btn ghost" data-arc="kg">${A.kgSave}</button></span>`}</div>`;
            }
            return `<div class="arch"><span class="arck${on ? " on" : ""}" aria-hidden="true">${on ? "✓" : ""}</span><span style="flex:1">${esc(A.blocks[id])}</span>${on ? "" : `<button type="button" class="btn ghost" data-arc="strong" aria-label="${A.strongGo}">🌙 ${A.go}</button>`}</div>`;
          })
          .join("")}`;
      h += `</div>`;
    }
    if (arcHas(a, "test") && wi === a.weeks - 1 && !arcTests(a).last) h += `<div class="note act"><span>${A.testEnd}</span><button type="button" class="btn ghost" data-tab="test">${A.toTest}</button></div>`;
    const ask = ui.arcEndAsk;
    h += `<div class="panel"><div class="row between" style="flex-wrap:wrap;gap:8px"><span class="sub">${esc(A.streak(arcStreak(a, wi - 1)))}</span><span class="minirow"><button type="button" class="btn ghost" data-arc="pause">${A.pause}</button><button type="button" class="btn ghost" data-arc="endask">${A.end}</button></span></div>${
      ask ? `<div class="note"><b>${A.endAsk}</b><div class="inline" style="margin-top:8px"><button type="button" class="btn" data-arc="end">${A.endYes}</button><button type="button" class="btn sec" data-arc="endno">${A.endNo}</button></div></div>` : ""
    }</div>`;
    return h;
  }
  /* ---------- profile (Dates & goals) ---------- */
  function arcProfileHtml() {
    const A = arcT(),
      a = arcOf(),
      hist = (S.profile.arcs || []).slice().reverse();
    let h = `<div class="panel"><div class="field"><span class="lab">❄ ${A.name}</span>`;
    if (a) {
      const day = daysBetween(parse(a.start), today()) + 1,
        wi = Math.min(a.weeks, Math.max(1, Math.ceil(day / 7)));
      h += `<span class="sub">${esc(iso(today()) < a.start ? A.startsOn(fmtDate(a.start)) : A.profRun(wi, a.weeks))}</span><button type="button" class="btn sec" data-tab="week" style="align-self:flex-start">${A.today} ›</button>`;
    } else if (arcSeason()) h += `<span class="sub">${A.intro}</span><button type="button" class="btn" data-arc="setup" style="align-self:flex-start">${A.profStart}</button>`;
    else h += `<span class="sub">${A.offSeason}</span>`;
    if (hist.length) h += `<span class="lab" style="margin-top:8px">${A.history}</span>${hist.map((x) => `<span class="sub">${esc(A.histLine(fmtDate(x.start), x.weeks, x.goal))}</span>`).join("")}`;
    return h + `</div></div>`;
  }
  /* ---------- setup and review overlay ---------- */
  function arcOpen(view) {
    const a = arcOf();
    ui.arc = view === "summary" ? { view } : { view: "setup", weeks: a ? a.weeks : 8, pick: a ? [...a.pick] : [...ARC_DEFAULT], train: a ? a.train : 3, relax: a ? a.relax : 2 };
    renderArc();
  }
  function renderArc() {
    const el = document.getElementById("arcov"),
      r = ui.arc;
    if (!el) return;
    if (!r) {
      el.hidden = true;
      el.innerHTML = "";
      return;
    }
    el.hidden = false;
    const A = arcT(),
      a = arcOf();
    let h = `<div class="fbar"><button type="button" class="x" data-arc="close" aria-label="×">✕</button><span>${A.name}</span><span style="width:40px"></span></div>`;
    if (r.view === "summary" && a) {
      const s = arcSummary(a),
        T = s.tests;
      h += `<div class="arcard wawin" style="text-align:center"><div class="arcbadge">❄</div><div class="big">${A.sumH}</div><p class="sub">${esc(A.sumLine(s.units, s.relax, s.goal, s.weeks))}</p></div>`;
      if (arcHas(a, "test"))
        h += `<div class="panel wapan"><span class="lab">${A.testH}</span>${
          T.first && T.last
            ? `<table class="arctab"><tr><td>${A.testTotal}</td><td>${T.first.total}</td><td class="${T.last.total > T.first.total ? "up" : ""}">${T.last.total}${T.last.total > T.first.total ? " ↑" : ""}</td></tr>${TCATS.filter((k) => T.first.scores[k] != null && T.last.scores[k] != null)
                .map((k) => `<tr><td>${t("cats")[k]}</td><td>${T.first.scores[k]}</td><td class="${T.last.scores[k] > T.first.scores[k] ? "up" : ""}">${T.last.scores[k]}${T.last.scores[k] > T.first.scores[k] ? " ↑" : ""}</td></tr>`)
                .join("")}</table>`
            : `<span class="sub">${A.testMissing}</span>`
        }</div>`;
      if (s.habits.length) h += `<div class="panel wapan"><span class="lab">${A.habitsH}</span>${s.habits.map((x) => `<div class="row between"><span>${esc(A.blocks[x.id])}</span><span class="sub">${esc(x.wk ? A.weekLine(x.n, x.of) : A.habitLine(x.n, x.of))}</span></div>`).join("")}</div>`;
      if (s.weight && arcHas(a, "weight")) h += `<div class="panel wapan"><span class="lab">${A.weightH}</span><span class="sub" style="display:block">${numF(s.weight.first)} kg → ${numF(s.weight.last)} kg · ${s.weight.n}×</span></div>`;
      h += `<div class="inline"><button type="button" class="btn" data-arc="archive">${A.archive}</button>${navigator.share ? `<button type="button" class="btn sec" data-arc="share">${A.share}</button>` : ""}</div>`;
    } else {
      const st = arcNextMon(),
        en = addDays(st, r.weeks * 7 - 1);
      h += `<div class="arcard wawin"><span class="eb">${A.tag}</span><div class="big">${A.name}</div><p class="sub">${A.intro}</p></div>`;
      h += `<div class="panel"><div class="field"><span class="lab">${A.len}</span><div class="seg">${ARC_WEEKS.map((n) => `<button type="button" data-arc="set" data-ak="weeks" data-av="${n}" aria-pressed="${r.weeks === n}">${A.wk(n)}</button>`).join("")}</div><span class="sub">${esc(A.when(fmtDate(iso(st)), fmtDate(iso(en))))}</span></div></div>`;
      h += `<div class="panel"><div class="field"><span class="lab">${A.pickH}</span><span class="sub">${A.pickSub}</span></div>`;
      for (const [g, items] of Object.entries(ARC_BLOCKS)) {
        h += `<div class="field"><span class="lab">${A.groups[g]}</span><div class="chips">${items.map(([id]) => `<button type="button" class="chip" data-arcpick="${id}" aria-pressed="${r.pick.includes(id)}">${esc(A.blocks[id])}</button>`).join("")}</div>`;
        if (g === "train" && r.pick.includes("train")) h += `<div class="row" style="gap:10px;align-items:center"><span style="flex:1">${A.trainN}</span><div class="seg">${[2, 3, 4, 5].map((n) => `<button type="button" data-arc="set" data-ak="train" data-av="${n}" aria-pressed="${r.train === n}">${n}</button>`).join("")}</div></div>`;
        if (g === "rest" && r.pick.includes("relax")) h += `<div class="row" style="gap:10px;align-items:center"><span style="flex:1">${A.relaxN}</span><div class="seg">${[1, 2, 3].map((n) => `<button type="button" data-arc="set" data-ak="relax" data-av="${n}" aria-pressed="${r.relax === n}">${n}</button>`).join("")}</div></div>`;
        if (g === "train" && (r.pick.includes("train") || r.pick.includes("relax"))) h += `<span class="sub">${A.goalNote}</span>`;
        if (g === "disc" && r.pick.includes("cold")) h += `<span class="sub">${A.coldNote}</span>`;
        if (g === "body" && r.pick.includes("weight")) h += `<span class="sub">${A.weightNote}</span>`;
        h += `</div>`;
      }
      h += `</div><button type="button" class="btn" data-arc="start" ${r.pick.length ? "" : "disabled"}>${A.start}</button>`;
    }
    el.innerHTML = h;
  }
  function arcAction(act, ds) {
    const a = arcOf(),
      r = ui.arc;
    if (act === "setup") return arcOpen("setup");
    if (act === "summary") return arcOpen("summary");
    if (act === "close") {
      ui.arc = null;
      return renderArc();
    }
    if (act === "hide") {
      S.profile.arcHide = arcSeasonKey();
      store.save();
      return render();
    }
    if (act === "set" && r) {
      r[ds.ak] = +ds.av;
      return renderArc();
    }
    if (act === "start" && r && r.pick.length) {
      const keep = a && iso(today()) < a.start ? a : null; // editing before the start keeps the date
      S.profile.arc = { start: keep ? a.start : iso(arcNextMon()), weeks: r.weeks, pick: r.pick, train: r.train, relax: r.relax, checks: keep ? a.checks || {} : {}, paused: [] };
      ui.arc = null;
      store.save();
      renderArc();
      ui.tab = "week";
      ui.wk = 0;
      render(true);
      window.scrollTo(0, 0);
      return;
    }
    if (!a) return;
    if (act === "cancel") {
      S.profile.arc = null;
      store.save();
      return render();
    }
    if (act === "kg") {
      const el = document.getElementById("arcKg");
      if (el && saveWeight(el.value) === false) toast(arcT().kgBad);
      return;
    }
    if (act === "strong") return relaxOpen({ mode: "med", kind: "strong", mlen: 10 });
    if (act === "pause") {
      a.paused = (a.paused || []).concat([{ from: iso(today()) }]);
      store.save();
      return render();
    }
    if (act === "resume") {
      const p = (a.paused || []).find((x) => !x.to);
      if (p) p.to = iso(addDays(today(), -1)) < p.from ? p.from : iso(addDays(today(), -1));
      store.save();
      return render();
    }
    if (act === "endask") {
      ui.arcEndAsk = true;
      return render();
    }
    if (act === "endno") {
      ui.arcEndAsk = false;
      return render();
    }
    if (act === "end") {
      // ends today: the review shows what was done so far
      ui.arcEndAsk = false;
      a.endedEarly = iso(today()) < a.start ? a.start : iso(today());
      store.save();
      render();
      return arcOpen("summary");
    }
    if (act === "share") {
      const s = arcSummary(a);
      try {
        navigator.share({ text: arcT().shareTx(a.weeks, s.units), url: location.href.split("#")[0] });
      } catch (e) {}
      return;
    }
    if (act === "archive") {
      const s = arcSummary(a);
      S.profile.arcs = (S.profile.arcs || []).concat([{ start: a.start, weeks: s.weeks, goal: s.goal, units: s.units, relax: s.relax }]).slice(-10);
      S.profile.arc = null;
      ui.arc = null;
      store.save();
      renderArc();
      return render();
    }
  }

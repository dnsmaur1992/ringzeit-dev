  /* ============ Round announcer: speaks round, exercise and combo once at the start of every round ============ */
  const SPEAK = {
    de: {
      round: "Roundhouse Körper",
      roundh: "High Kick Kopf",
      lowk: "Low Kick",
      hookk: "Hook Kick Kopf",
      hookb: "Körperhaken",
      upper: "Uppercut",
    },
    en: {
      round: "roundhouse body",
      roundh: "high kick head",
      lowk: "low kick",
      hookk: "hook kick head",
      hookb: "body hook",
      upper: "uppercut",
    },
  };
  const canSpeak = () =>
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined";
  const voiceOn = () => canSpeak() && S.profile.voice !== false;
  function comboWords(c) {
    const lg = S.profile.lang,
      sd = sides(c),
      sp = SPEAK[lg];
    return c
      .map((x, i) => {
        const w = sp[x] || TECH[x][lg === "de" ? 0 : 1];
        // the side is only spoken where it isn't obvious (jab and cross are always lead and rear)
        return sd[i] && !FIXED[x]
          ? `${w} ${lg === "de" ? (sd[i] === "L" ? "vorne" : "hinten") : sd[i] === "L" ? "lead" : "rear"}`
          : w;
      })
      .join(", ");
  }
  /* The best installed voice for the app language: premium/enhanced voices first, novelty and online-only voices last
     (the app runs offline in the gym). No voice found: the device default is used. */
  function bestVoice() {
    try {
      if (!canSpeak() || !speechSynthesis.getVoices) return null;
      const lg = S.profile.lang === "de" ? "de" : "en",
        want = lg === "de" ? "de-de" : "en-gb",
        norm = (v) => String(v.lang || "").toLowerCase().replace("_", "-"),
        vs = (speechSynthesis.getVoices() || []).filter((v) => norm(v).startsWith(lg));
      if (!vs.length) return null;
      const score = (v) => {
        const id = `${v.name} ${v.voiceURI}`.toLowerCase();
        let sc = 0;
        if (/premium/.test(id)) sc += 30;
        else if (/enhanced|erweitert|verbessert/.test(id)) sc += 20;
        else if (/neural|natural/.test(id)) sc += 15;
        if (/eloquence|novelty/.test(id)) sc -= 20;
        if (v.localService === false) sc -= 12;
        if (norm(v) === want) sc += 3;
        if (v.default) sc += 1;
        return sc;
      };
      return vs.slice().sort((a, b) => score(b) - score(a))[0];
    } catch (e) {
      return null;
    }
  }
  try {
    if (canSpeak() && speechSynthesis.addEventListener)
      speechSynthesis.addEventListener("voiceschanged", () => {
        if (ui.tab === "profile" && ui.profSec === "app") render();
      });
  } catch (e) {}
  function applyVoice(u) {
    u.lang = S.profile.lang === "de" ? "de-DE" : "en-GB";
    const v = bestVoice();
    if (v) {
      u.voice = v;
      u.lang = v.lang;
    }
  }
  function say(text, rate = 1) {
    if (!voiceOn()) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      applyVoice(u);
      u.rate = rate;
      // iOS Safari drops an utterance spoken right after cancel() and sometimes leaves the synth paused
      const busy = (speechSynthesis.speaking || speechSynthesis.pending) && !primeU;
      if (busy) speechSynthesis.cancel();
      if (speechSynthesis.paused) speechSynthesis.resume();
      if (busy) setTimeout(() => speechSynthesis.speak(u), 80);
      else speechSynthesis.speak(u);
    } catch (e) {}
  }
  /* Announces the round once at its start, slowly and clearly: round number, exercise and (if any) the combo */
  function callTick(tm) {
    const round = tm.phase === "rest" ? tm.round + 1 : tm.round;
    if (!voiceOn() || !["work", "prep", "rest"].includes(tm.phase) || tm.called === round || round > tm.total)
      return;
    const sess = S.sessions[tm.ds],
      rb = roundBlock(sess),
      it = rb && rb.items[round - 1];
    if (!it) return;
    tm.called = round;
    const info = roundInfo(it),
      de = S.profile.lang === "de",
      text = `${de ? "Runde" : "Round"} ${round}. ${info.title}.${it.combo ? " " + comboWords(it.combo) + "." : ""}`; // counter actions are shown, not spoken
    queueTimerSpeech(
      text,
      300,
      () =>
        ui.timer === tm &&
        tm.running &&
        tm.called === round &&
        ((tm.phase === "rest" && tm.round + 1 === round) || (tm.phase !== "rest" && tm.round === round)),
      0.88,
    );
  }


  /* ============ Loader: alternates fun facts and technique tips ============ */
  let loadIdx = Math.floor(Math.random() * 100);
  function showCard() {
    const lg = S.profile.lang,
      box = document.getElementById("factBox");
    const tips = TIPS.filter((x) => !x.d || x.d.includes(S.profile.disc));
    if (loadIdx % 2) {
      const x = tips[Math.floor(loadIdx / 2) % tips.length];
      box.className = "fact tip";
      document.getElementById("factK").textContent = t("tipK");
      document.getElementById("factT").textContent = x[lg];
      document.getElementById("factS").textContent = "";
    } else {
      const f = FACTS[Math.floor(loadIdx / 2) % FACTS.length];
      box.className = "fact";
      document.getElementById("factK").textContent = t("factK");
      document.getElementById("factT").textContent = f[lg];
      document.getElementById("factS").textContent = `${t("src")}: ${f.s}`;
    }
    document.getElementById("factNext").textContent = t("nextFact");
  }
  let closeLoader = null,
    loaderTimer = null,
    loaderOpened = 0;
  const LOADER_READ = 10000,
    LOADER_MAX = 10000;
  document.getElementById("factNext").onclick = (ev) => {
    ev.stopPropagation();
    loadIdx++;
    showCard();
    // each "next" gives time to read; 10 s after the screen appeared the app opens anyway
    clearTimeout(loaderTimer);
    const left = Math.max(0, loaderOpened + LOADER_MAX - Date.now());
    loaderTimer = setTimeout(() => closeLoader && closeLoader(), Math.min(LOADER_READ, left));
  };
  document.getElementById("loader").addEventListener("click", () => {
    if (closeLoader) closeLoader();
  });
  function openLoader(ms) {
    return new Promise((res) => {
      const el = document.getElementById("loader");
      el.hidden = false;
      closeLoader = () => {
        clearTimeout(loaderTimer);
        el.hidden = true;
        closeLoader = null;
        res();
      };
      loaderOpened = Date.now();
      loaderTimer = setTimeout(() => closeLoader && closeLoader(), ms);
    });
  }
  function prepLoader(titleKey) {
    document.getElementById("burst").innerHTML = burst();
    document.getElementById("loaderFig").innerHTML =
      `<svg viewBox="0 0 400 220" role="img" aria-label=""><ellipse cx="200" cy="208" rx="150" ry="10" fill="#C9A86A" opacity=".18"/>${fightPair(loadIdx % 2 ? "box" : "kick")}</svg>`;
    document.getElementById("loaderTitle").textContent = t(titleKey);
    document.getElementById("loaderHint").textContent = t("tapClose");
    showCard();
  }
  function loading(titleKey, ms = 3800) {
    loadIdx++;
    prepLoader(titleKey);
    return openLoader(ms);
  }
  /* A short burst of brass and crimson sparks from the toast position */
  function celebrate(x, y, n = 16, far = 60) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (x == null) x = window.innerWidth / 2;
    if (y == null) y = window.innerHeight - 130;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span"),
        a = (i / n) * Math.PI * 2,
        d = far - 10 + Math.random() * far;
      el.className = "spark";
      const se = season(),
        pal = se
          ? {
              spring: ["#F6B8C8", "#8ec9a4", "#C9A86A"],
              summer: ["#1FB3C2", "#FFD23F", "#C9A86A"],
              autumn: ["#E0914A", "#C8404A", "#D9A441"],
              winter: ["#FFFFFF", "#BFD6F2", "#C9A86A"],
            }[se.k]
          : ["#C9A86A", "#C9A86A", "#C8404A"];
      el.style.cssText = `left:${x}px;top:${y}px;background:${pal[i % 3]};--dx:${(Math.cos(a) * d).toFixed(0)}px;--dy:${(Math.sin(a) * d - 30).toFixed(0)}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }
  }
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => (el.hidden = true), 2400);
  }


/* ============================================================
   REVEAL SAFETY ADD-ON — чинит «невидимый контент».
   Reveal-блоки бандла (data-reveal*) проявляются CSS-переходом
   opacity 0→1, но dc-runtime пересобирает их посреди перехода →
   CSSTransition виснет в running на нулевом кадре и держит
   opacity:0 (перебивая даже инлайн !important).
   Решение: убираем переход у reveal-элементов (виснуть нечему),
   проявляем то, что в зоне видимости (data-revealed=true +
   гасим залипшие анимации). Ниже сгиба — скрыто до скролла.
   ============================================================ */
(function () {
  if (window.__ptReveal) return;
  window.__ptReveal = true;

  var SEL = "[data-reveal],[data-reveal-left],[data-reveal-scale]";
  var pending = true; // false = всё проявлено, скролл-тик мгновенно выходит
  var CSS = "[data-reveal],[data-reveal-left],[data-reveal-scale]{transition:none !important;}";

  function injectCSS() {
    if (!document.getElementById("pt-reveal-style") && document.head) {
      var s = document.createElement("style"); s.id = "pt-reveal-style"; s.textContent = CSS; document.head.appendChild(s);
    }
  }
  function vh() { return window.innerHeight || document.documentElement.clientHeight || 812; }
  function show(el) {
    el.setAttribute("data-revealed", "true");
    if (el.getAnimations) { try { el.getAnimations().forEach(function (a) { a.finish(); }); } catch (e) {} }
  }
  function tick() {
    injectCSS();
    if (!pending) return; // всё проявлено — не сканируем
    var els = document.querySelectorAll(SEL), left = 0;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.getAttribute("data-revealed") === "true") continue; // transition:none → залипания невозможны
      var r = el.getBoundingClientRect();
      if (r.top < vh() * 0.95) show(el); else left++;
    }
    pending = left > 0;
  }

  injectCSS(); tick();
  window.addEventListener("load", tick);
  window.addEventListener("scroll", tick, { passive: true, capture: true });
  window.addEventListener("resize", tick, { passive: true });
  var n = 0, iv = setInterval(function () { n++; tick(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 320) { clearInterval(iv); setInterval(tick, 1200); } }, 250); /* прогрев → вечный пульс */
  try {
    var mo = new MutationObserver(function () { pending = true; tick(); });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

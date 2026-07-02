/* ============================================================
   NO-BLINK / KILL-DOTS ADD-ON — полностью убирает мелкие
   статус-точки по всему сайту (магента/циан/зелёные «огоньки»)
   и гасит их анимации. Большой glow-шар героя (80px) не трогаем.
   Переживает пересборку: держит стиль последним + наблюдатель.
   ============================================================ */
(function () {
  if (window.__ptNoBlink) return;
  window.__ptNoBlink = true;

  var CSS =
    "@keyframes blink{0%,100%{opacity:1}}" +
    "@keyframes pulse-dot{0%,100%{opacity:1;transform:none}}" +
    "@keyframes pulse-soft{0%,100%{opacity:1;transform:none}}" +
    "@keyframes pulse-ring{0%,100%{opacity:0}}" +
    '[style*="background: rgb(255, 46, 154)"][style*="border-radius: 50%"],' +
    '[style*="background:#FF2E9A"][style*="border-radius: 50%"],' +
    '[style*="background: #FF2E9A"][style*="border-radius: 50%"]{display:none !important}';

  var ANIM = /blink|pulse-dot|pulse-soft|pulse-ring/;

  function ensureStyle() {
    if (!document.head) return;
    var s = document.getElementById("pt-noblink");
    if (!s) { s = document.createElement("style"); s.id = "pt-noblink"; s.textContent = CSS; }
    if (document.head.lastElementChild !== s) document.head.appendChild(s);
  }

  // мелкая статус-точка: лист, маленькая (<=16px), с одной из «мигающих» анимаций
  function isStatusDot(el) {
    if (el.children.length) return false;
    var cs = getComputedStyle(el);
    if (!ANIM.test(cs.animationName)) return false;
    var w = parseFloat(cs.width), h = parseFloat(cs.height);
    return w > 0 && h > 0 && w <= 16 && h <= 16;
  }

  function hideDots() {
    var els = document.querySelectorAll("span,div,i,b");
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.dataset.ptKd) continue;
      if (isStatusDot(e)) { e.style.setProperty("display", "none", "important"); e.dataset.ptKd = "1"; }
    }
  }

  function run() { ensureStyle(); hideDots(); }

  var n = 0, iv = setInterval(function () { n++; run(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 120) { clearInterval(iv); setInterval(run, 1200); } }, 150); /* прогрев → вечный пульс */
  run();
  window.addEventListener("load", run);
  window.addEventListener("DOMContentLoaded", run);
  try {
    var mo = new MutationObserver(run);
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

/* ============================================================
   TYPOGRAPHY FIX ADD-ON — лечит «вылезающий/зажатый» текст.
   Причина: у заголовков line-height 0.96–0.98 (<1) → кириллица
   спиллит за бокс. Поднимаем line-height заголовкам и крупным
   числам, длинным словам разрешаем перенос. Покрывает и ленивые
   модули (CSS + наблюдатель).
   ============================================================ */
(function () {
  if (window.__ptTypo) return;
  window.__ptTypo = true;

  var CSS = `
h1,h2,h3,h4{line-height:1.15 !important;overflow-wrap:anywhere;word-break:normal;padding-block:0.12em !important;overflow:visible !important;}
.pt-cd-cell *{line-height:1.1 !important;}
`;

  function injectCSS() {
    if (document.getElementById("pt-typo-style") || !document.head) return;
    var st = document.createElement("style");
    st.id = "pt-typo-style";
    st.textContent = CSS;
    document.head.appendChild(st);
    console.log("[typo] глобальный фикс line-height подключён");
  }

  // Крупные числа (08 / 80+ / 1500+ / 90 …) — листовые элементы с большим шрифтом
  // и тесной высотой строки. Поднимаем им line-height точечно.
  function fixBigNumbers() {
    var els = document.querySelectorAll("div,span,p,strong,b");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.dataset.ptTypo) continue;
      if (el.children.length) continue;
      var t = (el.textContent || "").trim();
      if (!t || t.length > 14) continue;
      var cs = getComputedStyle(el);
      var fs = parseFloat(cs.fontSize);
      if (fs >= 34) {
        var lh = parseFloat(cs.lineHeight);
        if (isNaN(lh) || lh < fs * 1.08) {
          el.style.lineHeight = "1.12";
          el.style.overflow = "visible";
          el.style.paddingBottom = "0.08em";
          el.style.paddingTop = "0.04em";
        }
        el.dataset.ptTypo = "1";
      }
    }
  }

  function ensureFonts() { // п.5: ЕДИНСТВЕННОЕ подключение шрифтов (вместо 16 @import по аддонам)
    if (document.getElementById("pt-fonts") || !document.head) return;
    var p1 = document.createElement("link"); p1.rel = "preconnect"; p1.href = "https://fonts.googleapis.com";
    var p2 = document.createElement("link"); p2.rel = "preconnect"; p2.href = "https://fonts.gstatic.com"; p2.crossOrigin = "";
    var l = document.createElement("link"); l.id = "pt-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@400;600;700&display=swap";
    document.head.appendChild(p1); document.head.appendChild(p2); document.head.appendChild(l);
  }
  function run() { ensureFonts(); injectCSS(); fixBigNumbers(); }

  var n = 0;
  var iv = setInterval(function () { n++; run(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 160) { clearInterval(iv); setInterval(run, 1200); } }, 150);
  window.addEventListener("load", run);
  window.addEventListener("DOMContentLoaded", run);
  try {
    var mo = new MutationObserver(function () { run(); });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

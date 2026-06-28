/* ============================================================
   STATS ADD-ON — V1 ровные стат-карточки секции «Конференция».
   Акцент-полоса сверху, ровная раскладка (label вверху,
   число+подпись внизу), tabular-цифры. Переживает пересборку.
   ============================================================ */
(function () {
  if (window.__ptStats) return;
  window.__ptStats = true;

  var DATA = {
    "потоки":    { a: "#00E5FF", n: "06",    l: "параллельных программ" },
    "спикеры":   { a: "#00E5FF", n: "80+",   l: "практикующих экспертов" },
    "участники": { a: "#FF2E9A", n: "1500+", l: "юристов и АУ" },
    "дни":       { a: "#F0B84B", n: "02",    l: "25 и 26 сентября" }
  };

  var CSS = `
.pt-st{position:relative !important;overflow:hidden !important;display:flex !important;flex-direction:column !important;}
.pt-st::before{content:"" !important;position:absolute !important;top:0;left:0;right:0;height:2px !important;background:var(--a) !important;opacity:.8;z-index:1;}
.pt-st-k{font-family:'JetBrains Mono',ui-monospace,monospace !important;font-size:11px !important;letter-spacing:.16em !important;text-transform:uppercase !important;color:#8b92a0 !important;}
.pt-st-val{margin-top:auto !important;}
.pt-st-n{font-family:'Space Grotesk',system-ui,sans-serif !important;font-weight:700 !important;font-size:46px !important;line-height:1 !important;color:var(--a) !important;font-variant-numeric:tabular-nums !important;font-feature-settings:"tnum" 1 !important;letter-spacing:.01em !important;}
.pt-st-l{font-size:13.5px !important;line-height:1.4 !important;color:#aeb8c7 !important;margin-top:9px !important;}
@media(max-width:560px){.pt-st-n{font-size:40px !important;}}
`;

  function injectCSS() { if (!document.getElementById("pt-stats-style") && document.head) { var s = document.createElement("style"); s.id = "pt-stats-style"; s.textContent = CSS; document.head.appendChild(s); } }
  function key(t) { t = (t || "").toLowerCase().replace(/[^а-яё]/g, ""); for (var k in DATA) { if (t.indexOf(k) > -1) return k; } return null; }

  function apply() {
    injectCSS();
    var labels = [].slice.call(document.querySelectorAll("span,div")).filter(function (e) {
      return !e.children.length && /^\/\/\s*(потоки|спикеры|участники|дни)$/i.test((e.textContent || "").trim());
    });
    labels.forEach(function (l) {
      var card = l, hops = 0;
      while (card && hops < 6 && !(card.classList && card.classList.contains("glass"))) { card = card.parentElement; hops++; }
      if (!card || !card.classList || !card.classList.contains("glass") || card.dataset.ptStat) return;
      var k = key(l.textContent); if (!k) return;
      var d = DATA[k];
      card.dataset.ptStat = "1";
      card.classList.add("pt-st");
      card.style.setProperty("--a", d.a);
      card.innerHTML = '<span class="pt-st-k">// ' + k + '</span><div class="pt-st-val"><div class="pt-st-n">' + d.n + '</div><div class="pt-st-l">' + d.l + '</div></div>';
    });
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 120) clearInterval(iv); }, 150);
  apply(); window.addEventListener("load", apply); window.addEventListener("DOMContentLoaded", apply);
  try { var mo = new MutationObserver(apply); if (document.body) mo.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 30000); } catch (e) {}
})();

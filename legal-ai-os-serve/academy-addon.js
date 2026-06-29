/* ============================================================
   ACADEMY ADD-ON — карточка статов в табе Академия.
   Просто и надёжно (без canvas): 4 стата вертикальным списком
   на всю ширину карточки — крупное число слева, подпись справа,
   неоновая левая акцент-линия. Не зажато. Анимация только на hover.
   Находит карточку по тексту, переживает пересборку dc-runtime.
   ============================================================ */
(function () {
  if (window.__ptAcad) return;
  window.__ptAcad = true;

  var IC = {
    book:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.4 7 22l5-3 5 3-1.21-8.6"/></svg>'
  };
  var STATS = [
    { n: "28",    l: "курсов",      note: "практические интенсивы", a: "#00E5FF", ic: IC.book },
    { n: "04",    l: "уровня",      note: "старт → эксперт",        a: "#FF2E9A", ic: IC.layers },
    { n: "3200+", l: "выпускников", note: "сертифицированы",        a: "#F0B84B", ic: IC.users },
    { n: "94%",   l: "сертификат",  note: "с первого раза",         a: "#00E5FF", ic: IC.award }
  ];

  var CSS = `
/* убираем внешний «квадрат»: карточка-обёртка прозрачная, без рамки/тени */
.glass.pt-ac-card{
  border:0 !important;background:transparent !important;box-shadow:none !important;
  padding:0 !important;display:flex !important;flex-direction:column;justify-content:center;
}
/* и на hover/focus тоже: иначе artefact .glass:hover возвращает рамку+тень+подъём */
.glass.pt-ac-card:hover,.glass.pt-ac-card:focus,.glass.pt-ac-card:focus-within{
  transform:none !important;border-color:transparent !important;
  box-shadow:none !important;background:transparent !important;
}
.pt-ac-list{display:flex;flex-direction:column;gap:12px;width:100%;}
.pt-ac-row{
  display:grid;grid-template-columns:40px auto 1fr;align-items:center;gap:16px;
  padding:14px 18px;border-radius:13px;
  border:1px solid color-mix(in srgb,var(--a) 16%,#161d2e);
  border-left:3px solid var(--a);
  background:linear-gradient(100deg,color-mix(in srgb,var(--a) 8%,#0b0e16),#0a0c12 70%);
  transition:transform .2s,border-color .2s,box-shadow .2s,background .2s;
}
.pt-ac-row:hover{
  transform:translateX(4px);
  border-color:color-mix(in srgb,var(--a) 45%,#161d2e);
  box-shadow:0 10px 30px -8px color-mix(in srgb,var(--a) 22%,transparent);
  background:linear-gradient(100deg,color-mix(in srgb,var(--a) 14%,#0b0e16),#0a0c12 70%);
}
.pt-ac-ic{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;
  color:var(--a);border:1px solid color-mix(in srgb,var(--a) 30%,#1c2230);background:color-mix(in srgb,var(--a) 9%,transparent);}
.pt-ac-ic svg{width:20px;height:20px;display:block;}
.pt-ac-num{font-family:'Space Grotesk',system-ui,sans-serif;font-weight:800;font-size:30px;line-height:1;color:#fff;
  font-variant-numeric:tabular-nums;text-shadow:0 0 22px color-mix(in srgb,var(--a) 38%,transparent);min-width:74px;}
.pt-ac-meta{display:flex;flex-direction:column;text-align:right;}
.pt-ac-meta b{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  font-weight:500;color:color-mix(in srgb,var(--a) 70%,#cfe9ff);}
.pt-ac-meta i{font-style:normal;font-size:12px;color:#7d8492;margin-top:4px;}
@media(prefers-reduced-motion:reduce){.pt-ac-row{transition:none !important;}}
@media(max-width:560px){.pt-ac-num{font-size:26px;min-width:64px;}.pt-ac-meta i{display:none;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-ac-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-ac-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function findCard() {
    var spans = [].slice.call(document.querySelectorAll("span"));
    var mark = spans.filter(function (s) { return /academy\s*·\s*stats/i.test(s.textContent || ""); })[0];
    if (!mark) return null;
    var card = mark;
    for (var i = 0; i < 8 && card; i++) {
      card = card.parentElement;
      if (card && card.classList && card.classList.contains("glass")) return card;
    }
    return null;
  }

  function render(card) {
    if (card.dataset.ptAc === "1") return;
    card.dataset.ptAc = "1";
    card.classList.add("pt-ac-card");
    var rows = STATS.map(function (s) {
      return '<div class="pt-ac-row" style="--a:' + s.a + '">'
           + '<span class="pt-ac-ic">' + s.ic + '</span>'
           + '<span class="pt-ac-num">' + esc(s.n) + '</span>'
           + '<span class="pt-ac-meta"><b>' + esc(s.l) + '</b><i>' + esc(s.note) + '</i></span>'
           + '</div>';
    }).join("");
    card.innerHTML = '<div class="pt-ac-list">' + rows + '</div>';
  }

  function apply() {
    injectCSS();
    var card = findCard();
    if (card) render(card);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 200) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () {
      var card = findCard();
      if (card && card.dataset.ptAc !== "1") apply();
    });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 45000);
  } catch (e) {}
})();


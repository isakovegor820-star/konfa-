/* ============================================================
   SPEAKERS ADD-ON — секция спикеров, 3 ФОТО-варианта с живым
   переключателем (примерь на сайте, потом оставим один):
     1 · Сетка карточек (фото сверху)
     2 · Постеры (фото на всю, имя поверх)
     3 · Строки с фото
   Фото-плейсхолдеры в _speakers/N.jpg (реальные заменим потом).
   Данные берёт из существующих карточек (.scp4), переживает ре-рендер.
   ============================================================ */
(function () {
  if (window.__ptSpeakers) return;
  window.__ptSpeakers = true;
  if (!window.__ptSpkVariant) window.__ptSpkVariant = "p1"; // колонки — карточки с фото сверху

  var A = ["#00E5FF", "#FF2E9A", "#F0B84B"];
  var TOPICS = {
    "А. Кредитов": "ИИ-ассистент в банкротных спорах",
    "И. Должникова": "Реестр требований без ошибок",
    "М. Управленцева": "Масштабировать юрбизнес ×5",
    "Д. Юристов": "Судебная практика БФЛ 2026",
    "К. Банкротова": "Воронка клиентов в БФЛ",
    "Е. Процессова": "Субсидиарка: тренды 2026",
    "Р. Команднов": "Юнит-экономика юрфирмы",
    "Н. Цифрова": "LegalTech-стек юрфирмы"
  };
  function photo(k) { return "speakers/" + ((k % 8) + 1) + ".jpg"; }

  var CSS = `
.pt-spk-host{display:block !important;grid-template-columns:none !important;gap:0 !important;}
.pt-spk-sw{display:flex;align-items:center;gap:8px;margin-bottom:18px;flex-wrap:wrap;}
.pt-spk-sw .lbl{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;color:#5f6878;text-transform:uppercase;margin-right:4px;}
.pt-spk-chip{font-family:'JetBrains Mono',monospace;font-size:12px;color:#9aa6b8;background:rgba(255,255,255,.03);border:1px solid #1c2230;border-radius:999px;padding:8px 14px;cursor:pointer;transition:.16s;}
.pt-spk-chip:hover{color:#cfe9ff;border-color:#2c3650;}
.pt-spk-chip.on{color:#06222a;background:#00E5FF;border-color:#00E5FF;font-weight:500;}

/* 1: сетка карточек */
.pt-p1{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
@media(max-width:1024px){.pt-p1{grid-template-columns:repeat(2,1fr);}}
.pt-p1 .c{border:1px solid #1c2230;border-radius:16px;overflow:hidden;background:rgba(255,255,255,.02);transition:transform .2s,border-color .2s,box-shadow .2s;}
.pt-p1 .c:hover{transform:translateY(-5px);border-color:var(--a);box-shadow:0 18px 48px color-mix(in srgb,var(--a) 16%,transparent);}
.pt-p1 .ph{aspect-ratio:1/1;overflow:hidden;background:#0c0e14;}
.pt-p1 .ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s;}
.pt-p1 .c:hover .ph img{transform:scale(1.06);}
.pt-p1 .info{padding:14px 16px 16px;}
.pt-p1 .nm{font-family:'Space Grotesk',system-ui,sans-serif;font-weight:700;font-size:16px;color:#EEF3FA;line-height:1.15;}
.pt-p1 .ro{font-size:12px;color:#9aa6b8;margin-top:3px;}
.pt-p1 .tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--a);border:1px solid color-mix(in srgb,var(--a) 40%,#1c2230);border-radius:6px;padding:4px 9px;margin-top:11px;}

/* 2: постеры */
.pt-p2{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
@media(max-width:1024px){.pt-p2{grid-template-columns:repeat(2,1fr);}}
.pt-p2 .c{position:relative;aspect-ratio:3/4;border-radius:16px;overflow:hidden;border:1px solid #1c2230;transition:transform .2s,border-color .2s,box-shadow .2s;}
.pt-p2 .c:hover{transform:translateY(-4px);border-color:var(--a);box-shadow:0 18px 48px color-mix(in srgb,var(--a) 18%,transparent);}
.pt-p2 .c img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.pt-p2 .c:hover img{transform:scale(1.06);}
.pt-p2 .grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,6,10,.96),rgba(5,6,10,.25) 50%,rgba(5,6,10,.04));}
.pt-p2 .info{position:absolute;left:0;right:0;bottom:0;padding:16px;}
.pt-p2 .nm{font-family:'Space Grotesk',system-ui,sans-serif;font-weight:700;font-size:17px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.6);line-height:1.12;}
.pt-p2 .ro{font-size:12px;color:#d6deea;margin-top:3px;text-shadow:0 1px 8px rgba(0,0,0,.6);}
.pt-p2 .tag{position:absolute;top:12px;left:12px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#06222a;background:var(--a);border-radius:6px;padding:4px 9px;font-weight:500;}

/* 3: строки с фото */
.pt-p3{display:flex;flex-direction:column;gap:8px;}
.pt-p3 .row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px;padding:11px 14px;border:1px solid #1c2230;border-radius:14px;transition:border-color .18s,background .18s;}
.pt-p3 .row:hover{border-color:color-mix(in srgb,var(--a) 55%,#1c2230);background:linear-gradient(90deg,color-mix(in srgb,var(--a) 8%,transparent),transparent);}
.pt-p3 .ph{width:54px;height:54px;border-radius:12px;overflow:hidden;flex:0 0 auto;background:#0c0e14;}
.pt-p3 .ph img{width:100%;height:100%;object-fit:cover;display:block;}
.pt-p3 .nm{font-family:'Space Grotesk',system-ui,sans-serif;font-weight:600;font-size:16px;color:#EEF3FA;}
.pt-p3 .ro{font-size:12px;color:#8b92a0;margin-top:2px;}
.pt-p3 .right{text-align:right;}
.pt-p3 .tl{font-size:12.5px;color:#aeb6c4;}
.pt-p3 .tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--a);border:1px solid color-mix(in srgb,var(--a) 40%,#1c2230);border-radius:5px;padding:3px 8px;margin-top:5px;}
@media(max-width:560px){.pt-p3 .right{display:none;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-spk-style") && document.head) {
      var s = document.createElement("style"); s.id = "pt-spk-style"; s.textContent = CSS; document.head.appendChild(s);
    }
  }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function img(k, n) { return '<img src="' + photo(k) + '" alt="' + esc(n) + '" loading="lazy">'; }

  function vp1(d) {
    return '<div class="pt-p1">' + d.map(function (s, k) {
      return '<article class="c" style="--a:' + A[k % 3] + '"><div class="ph">' + img(k, s.n) + '</div><div class="info"><div class="nm">' + esc(s.n) + '</div><div class="ro">' + esc(s.r) + '</div><span class="tag">' + esc(s.t) + '</span></div></article>';
    }).join("") + "</div>";
  }
  function vp2(d) {
    return '<div class="pt-p2">' + d.map(function (s, k) {
      return '<article class="c" style="--a:' + A[k % 3] + '">' + img(k, s.n) + '<div class="grad"></div><span class="tag">' + esc(s.t) + '</span><div class="info"><div class="nm">' + esc(s.n) + '</div><div class="ro">' + esc(s.r) + '</div></div></article>';
    }).join("") + "</div>";
  }
  function vp3(d) {
    return '<div class="pt-p3">' + d.map(function (s, k) {
      return '<div class="row" style="--a:' + A[k % 3] + '"><div class="ph">' + img(k, s.n) + '</div><div><div class="nm">' + esc(s.n) + '</div><div class="ro">' + esc(s.r) + '</div></div><div class="right"><div class="tl">' + (s.tl ? "«" + esc(s.tl) + "»" : "") + '</div><span class="tag">' + esc(s.t) + '</span></div></div>';
    }).join("") + "</div>";
  }
  var VAR = { p1: vp1, p2: vp2, p3: vp3 };

  function switcher(v) {
    function chip(id, label) { return '<button class="pt-spk-chip' + (v === id ? " on" : "") + '" data-v="' + id + '">' + label + "</button>"; }
    return '<div class="pt-spk-sw"><span class="lbl">// примерь вариант:</span>' + chip("p1", "1 · Сетка") + chip("p2", "2 · Постеры") + chip("p3", "3 · Строки") + "</div>";
  }

  function renderInto(host) {
    var d = window.__ptSpkData || [];
    var v = window.__ptSpkVariant || "p1";
    if (!VAR[v]) v = "p1";
    host.classList.add("pt-spk-host");
    host.removeAttribute("style");
    host.innerHTML = VAR[v](d); // переключатель убран — залочен вариант 3
  }

  function extract(c) {
    var lv = [].slice.call(c.querySelectorAll("*"))
      .filter(function (e) { return !e.children.length && (e.textContent || "").trim(); })
      .map(function (e) { return e.textContent.trim(); });
    var n = lv[1] || "";
    return { i: lv[0] || "", n: n, r: lv[2] || "", t: lv[3] || "", tl: TOPICS[n] || "" };
  }

  function apply() {
    injectCSS();
    var first = document.querySelector(".scp4");
    if (!first) return;
    var grid = first.parentElement;
    if (!grid) return;
    var cards = [].slice.call(grid.querySelectorAll(".scp4"));
    if (cards.length < 2) return;
    window.__ptSpkData = cards.map(extract);
    renderInto(grid);
    console.log("[speakers] фото-вариант", window.__ptSpkVariant, "·", window.__ptSpkData.length);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 200) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(apply);
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 40000);
  } catch (e) {}
})();

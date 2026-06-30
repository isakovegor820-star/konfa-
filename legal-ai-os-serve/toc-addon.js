/* ============================================================
   TOC ADD-ON — блок «Содержание» (таб Книга).
   Заменяет список глав на сетку карточек 3×2 (вариант «Сетка»):
   крупный номер, заголовок, описание, страницы + PREVIEW, hover-
   подъём + свечение + стрелка, reveal со stagger. Хедер секции
   («Содержание / SCAN·READY») оставляем как есть.
   Поиск = LCA названий глав, только в <body>, без блоб-узлов.
   ============================================================ */
(function () {
  if (window.__ptToc) return;
  window.__ptToc = true;

  var ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var CH = [
    { n:"01", t:"Введение в банкротство физлиц",       d:"Кому это нужно. Когда подавать. Базовые мифы и реалии процедуры.",                p:"12" },
    { n:"02", t:"Подготовка и подача заявления",        d:"Документы, расчёт суммы, выбор СРО. Чек-листы и шаблоны заявлений.",              p:"14–28" },
    { n:"03", t:"Анализ сделок и оспаривание",          d:"Подозрительные сделки, исковая давность, тактика управляющего и должника.",       p:"29–48" },
    { n:"04", t:"Защита единственного жилья",           d:"Исполнительский иммунитет. Ипотека. Совместная собственность. Кейсы судов.",       p:"49–72" },
    { n:"05", t:"Взаимодействие с АУ и кредиторами",    d:"Тактика общения, собрание кредиторов, реестр, торги имущества.",                  p:"73–96" },
    { n:"06", t:"Завершение процедуры",                 d:"Освобождение от долгов. Когда суд может отказать. Последствия банкротства.",       p:"97–117" }
  ];

  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function cardsHTML() {
    var cards = CH.map(function (c, i) {
      return '<div class="ptoc-card" tabindex="0" style="--d:' + (i * 50) + 'ms">'
        + '<p class="ptoc-num">' + c.n + '</p>'
        + '<h3 class="ptoc-ctitle">' + esc(c.t) + '</h3>'
        + '<p class="ptoc-cdesc">' + esc(c.d) + '</p>'
        + '<div class="ptoc-foot">'
          + '<span class="ptoc-pages"><span class="ptoc-pfx">стр.</span> ' + c.p + '</span>'
          + '<span class="ptoc-preview">Preview' + ARR + '</span>'
        + '</div>'
        + '</div>';
    }).join("");
    return '<div class="ptoc-grid">' + cards + '</div>';
  }

  var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

.ptoc-host{
  --ptoc-cyan:#00E5FF;--ptoc-h:#fff;--ptoc-desc:#aab2c2;--ptoc-meta:#828b9d;
  --ptoc-card:#0b0f1a;--ptoc-line:rgba(255,255,255,.08);
  font-family:'Space Grotesk',system-ui,sans-serif;width:100%;
}
.ptoc-host *{box-sizing:border-box;}

.ptoc-host .ptoc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,1.6vw,20px);}
@media(max-width:860px){ .ptoc-host .ptoc-grid{grid-template-columns:repeat(2,minmax(0,1fr));} }
@media(max-width:560px){ .ptoc-host .ptoc-grid{grid-template-columns:1fr;} }

.ptoc-host .ptoc-card{
  position:relative;display:flex;flex-direction:column;min-height:252px;
  padding:24px 24px 20px;
  background:linear-gradient(180deg,rgba(255,255,255,.018),rgba(255,255,255,0));
  background-color:var(--ptoc-card);border:1px solid var(--ptoc-line);border-radius:14px;
  text-decoration:none;cursor:pointer;overflow:hidden;outline:none;
  transition:transform .28s cubic-bezier(.22,.61,.36,1),border-color .28s ease,box-shadow .28s ease,background-color .28s ease;
  opacity:0;transform:translateY(16px);
}
.ptoc-host .ptoc-card.ptoc-in{animation:ptocReveal .38s cubic-bezier(.22,.61,.36,1) forwards;}
@keyframes ptocReveal{to{opacity:1;transform:translateY(0);}}
.ptoc-host .ptoc-card::before{content:"";position:absolute;left:0;top:0;height:100%;width:2px;background:var(--ptoc-cyan);transform:scaleY(0);transform-origin:top;transition:transform .3s cubic-bezier(.22,.61,.36,1);}
.ptoc-host .ptoc-card:hover,.ptoc-host .ptoc-card:focus-visible{
  transform:translateY(-6px);border-color:rgba(0,229,255,.45);background-color:#0d1320;
  box-shadow:0 0 0 1px rgba(0,229,255,.18),0 14px 36px -14px rgba(0,229,255,.42),0 6px 20px -10px rgba(0,0,0,.7);
}
.ptoc-host .ptoc-card:hover::before,.ptoc-host .ptoc-card:focus-visible::before{transform:scaleY(1);}
.ptoc-host .ptoc-card:focus-visible{box-shadow:0 0 0 2px var(--ptoc-cyan),0 14px 36px -14px rgba(0,229,255,.42);}

.ptoc-host .ptoc-num{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:38px;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:rgba(255,255,255,.18);margin:0 0 16px;transition:color .28s ease,text-shadow .28s ease;}
.ptoc-host .ptoc-card:hover .ptoc-num,.ptoc-host .ptoc-card:focus-visible .ptoc-num{color:var(--ptoc-cyan);text-shadow:0 0 18px rgba(0,229,255,.45);}
.ptoc-host .ptoc-ctitle{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:17px;line-height:1.3;letter-spacing:-.005em;color:var(--ptoc-h);margin:0 0 8px;}
.ptoc-host .ptoc-cdesc{font-family:'Space Grotesk',sans-serif;font-weight:400;font-size:14px;line-height:1.55;color:var(--ptoc-desc);margin:0 0 20px;}
.ptoc-host .ptoc-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:auto;padding-top:16px;border-top:1px solid var(--ptoc-line);transition:border-color .28s ease;}
.ptoc-host .ptoc-card:hover .ptoc-foot,.ptoc-host .ptoc-card:focus-visible .ptoc-foot{border-color:rgba(0,229,255,.18);}
.ptoc-host .ptoc-pages{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;line-height:1;letter-spacing:.06em;font-variant-numeric:tabular-nums;color:var(--ptoc-desc);white-space:nowrap;}
.ptoc-host .ptoc-pages .ptoc-pfx{color:var(--ptoc-meta);margin-right:5px;text-transform:uppercase;letter-spacing:.1em;font-size:11px;}
.ptoc-host .ptoc-preview{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:11px;line-height:1;letter-spacing:.16em;text-transform:uppercase;color:var(--ptoc-meta);transition:color .28s ease,gap .28s ease;}
.ptoc-host .ptoc-preview svg{width:14px;height:14px;display:block;flex:none;transform:translateX(-3px);opacity:0;transition:transform .28s cubic-bezier(.22,.61,.36,1),opacity .28s ease;}
.ptoc-host .ptoc-card:hover .ptoc-preview,.ptoc-host .ptoc-card:focus-visible .ptoc-preview{color:var(--ptoc-cyan);gap:9px;}
.ptoc-host .ptoc-card:hover .ptoc-preview svg,.ptoc-host .ptoc-card:focus-visible .ptoc-preview svg{transform:translateX(0);opacity:1;}

@media(prefers-reduced-motion:reduce){
  .ptoc-host .ptoc-card{opacity:1 !important;transform:none !important;animation:none !important;transition:border-color .2s ease,box-shadow .2s ease;}
  .ptoc-host .ptoc-card:hover,.ptoc-host .ptoc-card:focus-visible{transform:none !important;}
  .ptoc-host .ptoc-card::before,.ptoc-host .ptoc-num,.ptoc-host .ptoc-preview,.ptoc-host .ptoc-preview svg{transition:none !important;}
  .ptoc-host .ptoc-preview svg{opacity:1;transform:none;}
}
`;

  function injectCSS() {
    if (!document.getElementById("pt-toc-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-toc-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }

  var TITLES = ["Введение в банкротство", "Подготовка и подача", "Анализ сделок", "Защита единственного", "Взаимодействие с АУ", "Завершение процедуры"];

  function findList() {
    if (!document.body) return null;
    var leaves = [].slice.call(document.body.querySelectorAll("*")).filter(function (e) {
      var tg = e.tagName;
      return e.children.length === 0 && tg !== "SCRIPT" && tg !== "STYLE" && tg !== "TEMPLATE"
        && (e.textContent || "").indexOf(TITLES[0]) >= 0;
    });
    var first = leaves[0];
    if (!first) return null;
    var node = first;
    for (var i = 0; i < 14 && node; i++) {
      node = node.parentElement;
      if (!node || node === document.body || node.tagName === "HTML") break;
      // уже внутри НАШЕЙ разметки → не рендерим повторно (иначе рекурсия grid>grid>…)
      if (node.className && /ptoc-(host|grid)/.test(String(node.className))) return null;
      if (node.querySelector('script[type^="__bundler"]')) return null; // не трогаем блобы
      if (TITLES.every(function (t) { return (node.textContent || "").indexOf(t) >= 0; })) {
        return node; // лоуэст-общий-предок всех 6 глав = контейнер списка
      }
    }
    return null;
  }

  function reveal(host) {
    var cards = [].slice.call(host.querySelectorAll(".ptoc-card"));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { cards.forEach(function (c) { c.classList.add("ptoc-in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.style.animationDelay = el.style.getPropertyValue("--d") || "0ms";
          el.classList.add("ptoc-in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(function (c) { io.observe(c); });
  }

  function render(list) {
    if (!list) return;
    if (list.dataset.ptToc === "1" && list.querySelector(".ptoc-grid")) return;
    list.dataset.ptToc = "1";
    list.classList.add("ptoc-host");
    list.innerHTML = cardsHTML();
    reveal(list);
  }

  function apply() {
    injectCSS();
    var l = findList();
    if (l) render(l);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 250) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () {
      var l = findList();
      if (l && (l.dataset.ptToc !== "1" || !l.querySelector(".ptoc-grid"))) apply();
    });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 60000);
  } catch (e) {}
})();

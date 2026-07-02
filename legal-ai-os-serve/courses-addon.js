/* ============================================================
   COURSES ADD-ON — секция «Активные курсы» (таб Академия).
   Дизайн «Чистая сетка» (Spacious Grid, вариант 1): просторная
   сетка 3 колонки, карточки равной высоты, левая акцент-полоса
   по уровню, hover-подъём + стрелка, reveal со stagger.
   Находит сетку по названиям курсов, переживает пересборку dc-runtime.
   ============================================================ */
(function () {
  if (window.__ptCourses) return;
  window.__ptCourses = true;

  var IC_LVL = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>';
  var IC_CLK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  var IC_MOD = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v16"/></svg>';
  var IC_ARR = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var COURSES = [
    { lv:1, n:"01", lvl:"JUNIOR",       d:"14", dw:"дней", t:"Старт практики БФЛ",            desc:"Базовые процедуры, документооборот, первая консультация. Для тех, кто только пришёл в банкротство физлиц.", m:"12", mw:"модулей", tag:"video + chat" },
    { lv:2, n:"02", lvl:"PRACTITIONER", d:"28", dw:"дней", t:"Судебная защита должника",      desc:"Стратегия защиты, оспаривание сделок, исполнительский иммунитет. Все типы судебных баталий.",          m:"20", mw:"модулей", tag:"live · group" },
    { lv:2, n:"02", lvl:"PRACTITIONER", d:"21", dw:"день", t:"AI в работе юриста",            desc:"Промпт-инжиниринг, генерация документов, AI-ассистенты, автоматизация рутины.",                       m:"16", mw:"модулей", tag:"practice" },
    { lv:3, n:"03", lvl:"SENIOR",       d:"45", dw:"дней", t:"Управление командой",           desc:"Найм, мотивация, KPI юристов. Регулярный менеджмент в юр. бюро. От 5 до 50 человек.",                 m:"24", mw:"модуля",  tag:"mentorship" },
    { lv:3, n:"03", lvl:"SENIOR",       d:"35", dw:"дней", t:"Продажи и упаковка БФЛ-услуги",  desc:"Воронки, скрипты, маркетинг. Как делать высокую конверсию первой консультации.",                    m:"18", mw:"модулей", tag:"workshop" },
    { lv:4, n:"04", lvl:"EXPERT",       d:"90", dw:"дней", t:"Масштабирование юр. бюро",       desc:"Юнит-экономика, франшиза, выход в регионы. Программа для собственников и партнёров.",                m:"32", mw:"модуля",  tag:"mastermind" }
  ];

  var CSS = `

.pt-courses-grid{
  --c1:#22E0F5;--c2:#5CC4FA;--c3:#FF55AE;--c4:#F2C260;
  --ctxt:#fff;--cdesc:#aeb6c4;--cmeta:#8a93a4;
  display:grid !important;grid-template-columns:repeat(3,1fr) !important;
  gap:24px !important;align-items:stretch !important;width:100%;
}
.pt-courses-grid *{box-sizing:border-box;}
@media(max-width:1000px){ .pt-courses-grid{grid-template-columns:repeat(2,1fr) !important;} }
@media(max-width:640px){ .pt-courses-grid{grid-template-columns:1fr !important;} }

.pt-card{
  --accent:var(--c1);--accent-rgb:34,224,245;
  position:relative;display:flex;flex-direction:column;height:100%;
  padding:32px 32px 30px 36px;border-radius:16px;
  border:1px solid rgba(var(--accent-rgb),.16);
  background:linear-gradient(160deg, rgba(var(--accent-rgb),.07) 0%, rgba(var(--accent-rgb),.02) 42%, rgba(8,10,18,.55) 100%);
  text-decoration:none;color:inherit;cursor:pointer;overflow:hidden;
  font-family:'Space Grotesk',system-ui,sans-serif;
  opacity:0;transform:translateY(22px);
  transition:transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease-out, border-color .3s ease-out;
  outline:none;
}
.pt-card::before{content:"";position:absolute;top:0;left:0;bottom:0;width:4px;background:var(--accent);box-shadow:0 0 14px 0 rgba(var(--accent-rgb),.55);}
.pt-card:hover,.pt-card:focus-visible{
  transform:translateY(-6px);border-color:rgba(var(--accent-rgb),.42);
  box-shadow:0 18px 44px -18px rgba(var(--accent-rgb),.55), 0 0 0 1px rgba(var(--accent-rgb),.18) inset;
}
.pt-card:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
.pt-card.lv1{--accent:var(--c1);--accent-rgb:34,224,245;}
.pt-card.lv2{--accent:var(--c2);--accent-rgb:92,196,250;}
.pt-card.lv3{--accent:var(--c3);--accent-rgb:255,85,174;}
.pt-card.lv4{--accent:var(--c4);--accent-rgb:242,194,96;}

.pt-card__top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px 16px;margin-bottom:24px;}
.pt-card__pill{display:inline-flex;align-items:center;gap:8px;padding:7px 13px 7px 11px;border-radius:999px;
  border:1px solid rgba(var(--accent-rgb),.32);background:rgba(var(--accent-rgb),.08);
  font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;line-height:1.5;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);white-space:nowrap;}
.pt-card__pill svg{display:block;flex:none;}
.pt-card__pill .num{font-feature-settings:"tnum" 1,"lnum" 1;}
.pt-card__dur{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-weight:400;font-size:12px;line-height:1.5;letter-spacing:.06em;color:var(--cmeta);white-space:nowrap;}
.pt-card__dur svg{display:block;flex:none;opacity:.9;}
.pt-card__dur .num{color:var(--cdesc);font-feature-settings:"tnum" 1,"lnum" 1;}

.pt-card__title{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:22px;line-height:1.28;letter-spacing:-.01em;color:var(--ctxt);margin:0 0 14px;}
.pt-card__desc{font-family:'Space Grotesk',sans-serif;font-weight:400;font-size:15px;line-height:1.6;color:var(--cdesc);margin:0 0 28px;
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:calc(15px * 1.6 * 3);}

.pt-card__div{height:1px;width:100%;background:linear-gradient(90deg, rgba(var(--accent-rgb),.28), rgba(255,255,255,.04));margin-top:auto;}
.pt-card__foot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px 16px;padding-top:20px;}
.pt-card__mods{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-weight:400;font-size:12.5px;line-height:1.5;letter-spacing:.04em;color:var(--cmeta);}
.pt-card__mods svg{display:block;flex:none;opacity:.9;}
.pt-card__mods .num{color:var(--cdesc);font-feature-settings:"tnum" 1,"lnum" 1;}
.pt-card__tag{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;line-height:1.5;letter-spacing:.08em;text-transform:lowercase;color:var(--accent);}
.pt-card__arrow{display:inline-flex;align-items:center;margin-left:2px;opacity:0;transform:translateX(-6px);transition:opacity .25s ease-out, transform .25s ease-out;color:var(--accent);}
.pt-card:hover .pt-card__arrow,.pt-card:focus-visible .pt-card__arrow{opacity:1;transform:translateX(0);}

.pt-card.in{opacity:1;transform:translateY(0);}

@media(prefers-reduced-motion:reduce){
  .pt-card{opacity:1 !important;transform:none !important;transition:none !important;}
  .pt-card:hover,.pt-card:focus-visible{transform:none !important;}
  .pt-card__arrow{transition:none !important;opacity:1 !important;transform:none !important;}
}
`;

  function injectCSS() {
    if (!document.getElementById("pt-courses-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-courses-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function card(c, i) {
    return '<div class="pt-card lv' + c.lv + '" tabindex="0" style="--d:' + (i * 40) + 'ms">'
      + '<div class="pt-card__top">'
        + '<span class="pt-card__pill">' + IC_LVL + ' LVL <span class="num">' + c.n + '</span> · ' + c.lvl + '</span>'
        + '<span class="pt-card__dur">' + IC_CLK + ' <span class="num">' + c.d + '</span> ' + c.dw + '</span>'
      + '</div>'
      + '<h3 class="pt-card__title">' + esc(c.t) + '</h3>'
      + '<p class="pt-card__desc">' + esc(c.desc) + '</p>'
      + '<div class="pt-card__div"></div>'
      + '<div class="pt-card__foot">'
        + '<span class="pt-card__mods">' + IC_MOD + ' <span class="num">' + c.m + '</span> ' + c.mw + '</span>'
        + '<span class="pt-card__tag">' + c.tag + '<span class="pt-card__arrow">' + IC_ARR + '</span></span>'
      + '</div>'
      + '</div>';
  }

  var TITLES = ["Старт практики БФЛ", "Судебная защита должника", "AI в работе юриста", "Управление командой", "Продажи и упаковка", "Масштабирование юр"];

  function findGrid() {
    if (document.querySelector(".pt-courses-grid")) return null; /* уже собрано — тяжёлый скан не нужен */
    // ВАЖНО: ищем только в <body> и пропускаем script/style/template — иначе
    // матчим <script type="__bundler/template"> (в нём экранированный HTML
    // артефакта со всеми названиями курсов) и затираем блобы → ломаем сборку.
    if (!document.body) return null;
    var leaves = [].slice.call(document.body.querySelectorAll("*")).filter(function (e) {
      var tg = e.tagName;
      return e.children.length === 0
        && tg !== "SCRIPT" && tg !== "STYLE" && tg !== "TEMPLATE" && tg !== "NOSCRIPT"
        && (e.textContent || "").indexOf(TITLES[0]) >= 0;
    });
    var first = leaves[0];
    if (!first) return null; // реальных карточек ещё нет (артефакт не собран) — ждём
    var node = first;
    for (var i = 0; i < 14 && node; i++) {
      node = node.parentElement;
      if (!node || node === document.body || node.tagName === "HTML") break;
      if (node.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
      if (TITLES.every(function (t) { return (node.textContent || "").indexOf(t) >= 0; })) {
        return node; // лоуэст-общий-предок всех 6 заголовков = сетка курсов
      }
    }
    return null;
  }

  function reveal(grid) {
    var cards = [].slice.call(grid.querySelectorAll(".pt-card"));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { cards.forEach(function (c) { c.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target, d = parseInt(el.style.getPropertyValue("--d")) || 0;
          setTimeout(function () { el.classList.add("in"); }, d);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18 });
    cards.forEach(function (c) { io.observe(c); });
  }

  function render(grid) {
    if (!grid || grid.dataset.ptCourses === "1") return;
    grid.dataset.ptCourses = "1";
    grid.classList.add("pt-courses-grid");
    grid.innerHTML = COURSES.map(card).join("");
    reveal(grid);
  }

  function apply() {
    injectCSS();
    var g = findGrid();
    if (g) render(g);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 250) { clearInterval(iv); setInterval(apply, 1200); } }, 200); /* прогрев → вечный пульс */
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () {
      var g = findGrid();
      if (g && g.dataset.ptCourses !== "1") apply();
    });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

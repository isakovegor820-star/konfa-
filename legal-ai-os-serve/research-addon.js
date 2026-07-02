/* ============================================================
   RESEARCH ADD-ON — хиро-блок «Исследования рынка БФЛ» (таб 05).
   Дизайн V3 «Бенто-дашборд»: мета-строка, крупный заголовок + лид,
   3 статус-карточки (42 · +12 с живым мини-графиком · 18.09.2026)
   и сетка из 5 карточек-тем с цветными акцентами, hover-подъём +
   стрелка, появление со stagger. Заменяет innerHTML внутреннего
   max-width контейнера секции — паддинги/центровка сохраняются.
   Якорь — заголовок «Исследования рынка БФЛ». Без мигающих точек,
   reduced-motion, переживает пересборку dc-runtime.
   ============================================================ */
(function () {
  if (window.__ptResearch) return;
  window.__ptResearch = true;

  var TOPICS = [
    { n:"01", t:"Цифры рынка",         d:"Объём, рост, доля регионов и средний чек процедуры." },
    { n:"02", t:"Влияние ИИ",          d:"Где AI заменяет рутину, а где усиливает эксперта." },
    { n:"03", t:"Экономика практики",  d:"Маржа, стоимость лида и P&L типового бюро." },
    { n:"04", t:"Технологии лидеров",  d:"Стек, CRM и модели топ-бюро отрасли." },
    { n:"05", t:"Тренды судов",        d:"Свежие позиции и развороты судебной практики." }
  ];

  var CSS = `
.pt-rbn{--rc:#00E5FF;--rm:#FF2E9A;--ra:#F0B84B;--rg:#28e0a0;--rd:#9aa3b4;--rt:#5f6878;--rl:rgba(255,255,255,.08);font-family:'Space Grotesk',system-ui,sans-serif;color:#fff;}
.pt-rbn *{box-sizing:border-box;}
.pt-rbn-top{display:flex;justify-content:space-between;align-items:center;gap:18px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;margin-bottom:clamp(22px,3vw,38px);}
.pt-rbn-top .l{color:var(--rc);white-space:nowrap;}
.pt-rbn-top .r{color:var(--rt);white-space:nowrap;}
.pt-rbn-top .r b{color:var(--rd);font-weight:500;}
.pt-rbn-hr{flex:1;height:1px;background:linear-gradient(90deg,rgba(0,229,255,.55),rgba(0,229,255,.04));}
.pt-rbn-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(34px,5vw,58px);line-height:1.03;letter-spacing:-.025em;margin:0;color:#fff;opacity:0;transform:translateY(18px);animation:ptRbnUp .55s .04s cubic-bezier(.22,.61,.36,1) forwards;}
.pt-rbn-title .c{color:var(--rc);}
.pt-rbn-lead{font-family:'Space Grotesk',sans-serif;max-width:46em;margin:18px 0 30px;font-size:clamp(14px,1.2vw,15.5px);line-height:1.6;color:var(--rd);opacity:0;transform:translateY(18px);animation:ptRbnUp .55s .12s cubic-bezier(.22,.61,.36,1) forwards;}
.pt-rbn-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px;}
@media(max-width:760px){.pt-rbn-stats{grid-template-columns:1fr;}}
.pt-rbn-stat{position:relative;border:1px solid var(--rl);border-radius:14px;background:linear-gradient(160deg,rgba(255,255,255,.025),rgba(8,10,18,.4));padding:20px 22px;overflow:hidden;opacity:0;transform:translateY(16px);animation:ptRbnUp .5s cubic-bezier(.22,.61,.36,1) forwards;}
.pt-rbn-stat:nth-child(1){animation-delay:.2s}.pt-rbn-stat:nth-child(2){animation-delay:.27s}.pt-rbn-stat:nth-child(3){animation-delay:.34s}
.pt-rbn-stat .k{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--rt);margin-bottom:14px;}
.pt-rbn-dot{width:6px;height:6px;border-radius:50%;background:var(--rg);flex:none;}
.pt-rbn-stat .sv{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:40px;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums;}
.pt-rbn-stat .sv.cy{color:var(--rc);}
.pt-rbn-stat .su{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--rd);margin-top:9px;}
.pt-rbn-spark{position:absolute;right:18px;bottom:18px;display:flex;align-items:flex-end;gap:4px;height:38px;}
.pt-rbn-spark i{width:6px;border-radius:2px 2px 0 0;background:linear-gradient(180deg,var(--rc),rgba(0,229,255,.25));transform:scaleY(0);transform-origin:bottom;animation:ptRbnBar .55s cubic-bezier(.22,.61,.36,1) forwards;}
.pt-rbn-spark i:last-child{background:linear-gradient(180deg,var(--rm),rgba(255,46,154,.3));}
.pt-rbn-spark i:nth-child(1){animation-delay:.45s}.pt-rbn-spark i:nth-child(2){animation-delay:.51s}.pt-rbn-spark i:nth-child(3){animation-delay:.57s}.pt-rbn-spark i:nth-child(4){animation-delay:.63s}.pt-rbn-spark i:nth-child(5){animation-delay:.69s}.pt-rbn-spark i:nth-child(6){animation-delay:.75s}.pt-rbn-spark i:nth-child(7){animation-delay:.81s}
@keyframes ptRbnBar{to{transform:scaleY(1)}}
.pt-rbn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(218px,1fr));gap:14px;}
.pt-rbn-card{position:relative;display:flex;flex-direction:column;border:1px solid var(--rl);border-radius:14px;background:linear-gradient(165deg,rgba(var(--rgb),.06),rgba(8,10,18,.4));padding:20px 20px 18px;cursor:pointer;overflow:hidden;text-decoration:none;color:inherit;outline:none;opacity:0;transform:translateY(16px);animation:ptRbnUp .5s cubic-bezier(.22,.61,.36,1) forwards;transition:transform .26s cubic-bezier(.22,.61,.36,1),border-color .26s,box-shadow .26s;}
.pt-rbn-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--ac);transform:scaleY(0);transform-origin:top;transition:transform .28s cubic-bezier(.22,.61,.36,1);}
.pt-rbn-card:hover,.pt-rbn-card:focus-visible{transform:translateY(-5px);border-color:rgba(var(--rgb),.42);box-shadow:0 16px 38px -18px rgba(var(--rgb),.5);}
.pt-rbn-card:hover::before,.pt-rbn-card:focus-visible::before{transform:scaleY(1);}
.pt-rbn-card:focus-visible{outline:2px solid var(--ac);outline-offset:3px;}
.pt-rbn-card .n{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:var(--ac);margin-bottom:16px;font-variant-numeric:tabular-nums;}
.pt-rbn-card .t{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:16.5px;letter-spacing:-.005em;margin:0 0 7px;color:#fff;}
.pt-rbn-card .d{font-family:'Space Grotesk',sans-serif;font-size:12.5px;line-height:1.5;color:var(--rt);margin:0;}
.pt-rbn-card .ar{margin-top:16px;display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;color:var(--ac);opacity:.5;transition:opacity .26s,transform .26s;}
.pt-rbn-card:hover .ar,.pt-rbn-card:focus-visible .ar{opacity:1;transform:translateX(3px);}
.pt-rbn-card:nth-child(1){--ac:var(--rc);--rgb:0,229,255;animation-delay:.40s}
.pt-rbn-card:nth-child(2){--ac:var(--rm);--rgb:255,46,154;animation-delay:.46s}
.pt-rbn-card:nth-child(3){--ac:var(--ra);--rgb:240,184,75;animation-delay:.52s}
.pt-rbn-card:nth-child(4){--ac:var(--rc);--rgb:0,229,255;animation-delay:.58s}
.pt-rbn-card:nth-child(5){--ac:var(--rm);--rgb:255,46,154;animation-delay:.64s}
@keyframes ptRbnUp{to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.pt-rbn *{animation:none!important;opacity:1!important;transform:none!important;}.pt-rbn-spark i{transform:scaleY(1)!important;}.pt-rbn-card:hover,.pt-rbn-card:focus-visible{transform:none!important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-rbn-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-rbn-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function buildHTML() {
    var cards = TOPICS.map(function (c) {
      return '<a class="pt-rbn-card" tabindex="0"><div class="n">' + c.n + '</div>'
        + '<h3 class="t">' + esc(c.t) + '</h3><p class="d">' + esc(c.d) + '</p>'
        + '<span class="ar">смотреть →</span></a>';
    }).join("");
    return '<div class="pt-rbn">'
      + '<div class="pt-rbn-top"><span class="l">// MODULE · 05</span><span class="pt-rbn-hr"></span><span class="r">ARCHIVE · SCAN · SQL · <b>V1</b></span></div>'
      + '<h2 class="pt-rbn-title">Исследования <span class="c">рынка БФЛ</span></h2>'
      + '<p class="pt-rbn-lead">Аналитическая библиотека отрасли. Цифры рынка, влияние ИИ на работу юристов, экономика практики, технологии лидеров, тренды судебной практики.</p>'
      + '<div class="pt-rbn-stats">'
        + '<div class="pt-rbn-stat"><div class="k"><span class="pt-rbn-dot"></span>archive · status</div><div class="sv">42</div><div class="su">отчёта в архиве</div></div>'
        + '<div class="pt-rbn-stat"><div class="k">за неделю</div><div class="sv cy">+12</div><div class="su">новых исследований</div>'
          + '<div class="pt-rbn-spark"><i style="height:42%"></i><i style="height:58%"></i><i style="height:50%"></i><i style="height:72%"></i><i style="height:64%"></i><i style="height:88%"></i><i style="height:100%"></i></div></div>'
        + '<div class="pt-rbn-stat"><div class="k">обновлено</div><div class="sv" style="font-size:32px">18.09<span style="color:#5f6878;font-size:18px">.2026</span></div><div class="su">последний отчёт</div></div>'
      + '</div>'
      + '<div class="pt-rbn-grid">' + cards + '</div>'
      + '</div>';
  }

  function norm(s) { return (s || "").replace(/\s+/g, " ").trim(); }

  function findWrap() {
    // ВАЖНО: ищем только в <body>, без script/style/template — иначе матчим
    // блоб <script type="__bundler/template"> (в нём весь HTML артефакта как
    // текст) и при innerHTML-замене затрём бандлер-теги → сборка падает.
    if (!document.body) return null;
    var heads = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4")).filter(function (e) {
      var tg = e.tagName;
      if (tg === "SCRIPT" || tg === "STYLE" || tg === "TEMPLATE") return false;
      return /Исследования рынка БФЛ/i.test(norm(e.textContent));
    });
    var h = heads[0];
    if (!h) return null; // секция ещё не отрисована (другой таб) — ждём
    var sec = h.closest("section");
    if (!sec || sec.querySelector('script[type^="__bundler"]')) return null; // страховка от блоба
    var wrap = sec.querySelector(":scope > div"); // внутренний max-width контейнер
    return wrap || null;
  }

  function render(wrap) {
    if (!wrap || wrap.dataset.ptResearch === "1") return; // recursion-guard: свой узел не трогаем
    wrap.dataset.ptResearch = "1";
    wrap.innerHTML = buildHTML();
  }

  function apply() {
    injectCSS();
    var w = findWrap();
    if (w) render(w);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 250) { clearInterval(iv); setInterval(apply, 1200); } }, 200); /* прогрев → вечный пульс */
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () {
      var w = findWrap();
      if (w && w.dataset.ptResearch !== "1") apply();
    });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

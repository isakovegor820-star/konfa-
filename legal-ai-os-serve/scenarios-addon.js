/* ============================================================
   SCENARIOS ADD-ON — секция «Сценарии тренировок» (таб Обучение).
   Дизайн V2 «Фильтр-табы + сетка»: 3-колоночная сетка карточек,
   цвет = сложность (easy·cyan / medium·amber / hard·magenta),
   hover-подъём + цветная полоса + свечение, stagger-появление,
   + живые вкладки-фильтры (Все/Easy/Medium/Hard) с пересборкой
   сетки по клику. Находит сетку как LCA 6 заголовков сценариев,
   переживает пересборку dc-runtime. Данные = реальные с сайта.
   ============================================================ */
(function () {
  if (window.__ptScn) return;
  window.__ptScn = true;

  var IC_CLK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  var IC_MSG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-4.5A8.4 8.4 0 1 1 21 11.5Z"/></svg>';

  var SCN = [
    { cat:"CONSULT", num:"01", diff:"easy",   time:"12 мин", t:"Первая консультация",          desc:"Должник 1.4 млн ₽ долга, дети, ипотека. Возражения, эмпатия, продажа стратегии.",   rep:"8",  att:"124k" },
    { cat:"CONSULT", num:"04", diff:"hard",   time:"22 мин", t:"Сложный кейс с активами",       desc:"Должник с авто, дачей, долей в ООО. Управляющий начнёт оспаривать сделки.",          rep:"14", att:"38k"  },
    { cat:"NEGO",    num:"02", diff:"medium", time:"18 мин", t:"Переговоры с кредитором",        desc:"Банк против мирового. Закрытие переговоров с минимальными уступками.",              rep:"12", att:"76k"  },
    { cat:"COURT",   num:"01", diff:"hard",   time:"25 мин", t:"Защита единственного жилья",     desc:"Судебное заседание. Возражения управляющего. Демонстрация исполнит. иммунитета.",    rep:"18", att:"52k"  },
    { cat:"OBJECT",  num:"03", diff:"easy",   time:"10 мин", t:"Работа с возражениями клиента",  desc:"«Сосед оформил, через месяц ему всё списали». Контр-аргументация, мягкий разворот.", rep:"6",  att:"198k" },
    { cat:"TEAM",    num:"02", diff:"medium", time:"15 мин", t:"Делегирование младшему юристу",  desc:"Постановка задачи, контрольные точки, обратная связь. Сценарий для управ.",          rep:"10", att:"42k"  }
  ];

  var TABS = [
    { f:"all",    label:"Все",    n:6 },
    { f:"easy",   label:"Easy",   n:2 },
    { f:"medium", label:"Medium", n:2 },
    { f:"hard",   label:"Hard",   n:2 }
  ];

  var CSS = `

.pt-scn-tabs{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 26px;font-family:'JetBrains Mono',monospace;}
.pt-scn-tabs *{box-sizing:border-box;}
.pt-scn-tab{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3b4;cursor:pointer;padding:9px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);transition:color .22s,border-color .22s,background .22s;}
.pt-scn-tab .n{color:#5f6878;font-variant-numeric:tabular-nums;}
.pt-scn-tab:hover{border-color:rgba(255,255,255,.18);color:#fff;}
.pt-scn-tab:focus-visible{outline:2px solid #00E5FF;outline-offset:2px;}
.pt-scn-tab.act{color:#04121a;background:#00E5FF;border-color:#00E5FF;}
.pt-scn-tab.act .n{color:rgba(4,18,26,.6);}
.pt-scn-tab[data-f="medium"].act{background:#F0B84B;border-color:#F0B84B;color:#04121a;}
.pt-scn-tab[data-f="medium"].act .n{color:rgba(4,18,26,.6);}
.pt-scn-tab[data-f="hard"].act{background:#FF2E9A;border-color:#FF2E9A;color:#fff;}
.pt-scn-tab[data-f="hard"].act .n{color:rgba(255,255,255,.7);}

.pt-scn-grid{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:18px !important;align-items:stretch !important;width:100%;}
.pt-scn-grid *{box-sizing:border-box;}
@media(max-width:980px){.pt-scn-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;}}
@media(max-width:600px){.pt-scn-grid{grid-template-columns:1fr !important;}}

.pt-scn-card{--a:#00E5FF;--argb:0,229,255;position:relative;display:flex;flex-direction:column;height:100%;font-family:'Space Grotesk',system-ui,sans-serif;padding:22px 22px 18px 24px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(170deg,rgba(var(--argb),.05),rgba(255,255,255,.012) 50%,rgba(8,10,18,.4));cursor:pointer;overflow:hidden;outline:none;transition:transform .26s cubic-bezier(.22,.61,.36,1),border-color .26s ease,box-shadow .26s ease,opacity .3s ease;}
.pt-scn-card.in{animation:ptscnIn .42s cubic-bezier(.22,.61,.36,1) both;}
@keyframes ptscnIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.pt-scn-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--a);transform:scaleY(0);transform-origin:top;transition:transform .3s cubic-bezier(.22,.61,.36,1);}
.pt-scn-card:hover,.pt-scn-card:focus-visible{transform:translateY(-5px);border-color:rgba(var(--argb),.4);box-shadow:0 16px 40px -16px rgba(var(--argb),.45),0 0 0 1px rgba(var(--argb),.14) inset;}
.pt-scn-card:hover::before,.pt-scn-card:focus-visible::before{transform:scaleY(1);}
.pt-scn-card:focus-visible{outline:2px solid var(--a);outline-offset:3px;}
.pt-scn-card.d-easy{--a:#00E5FF;--argb:0,229,255;}
.pt-scn-card.d-medium{--a:#F0B84B;--argb:240,184,75;}
.pt-scn-card.d-hard{--a:#FF2E9A;--argb:255,46,154;}
.pt-scn-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:18px;}
.pt-scn-tag{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5f6878;font-variant-numeric:tabular-nums;}
.pt-scn-tag b{color:#9aa3b4;font-weight:500;}
.pt-scn-rt{display:inline-flex;align-items:center;gap:10px;white-space:nowrap;}
.pt-scn-diff{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--a);padding:4px 9px;border-radius:999px;border:1px solid rgba(var(--argb),.32);background:rgba(var(--argb),.08);}
.pt-scn-diff i{width:5px;height:5px;border-radius:50%;background:var(--a);flex:none;}
.pt-scn-time{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;color:#5f6878;font-variant-numeric:tabular-nums;display:inline-flex;align-items:center;gap:5px;}
.pt-scn-time svg{width:13px;height:13px;opacity:.8;flex:none;}
.pt-scn-ct{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:18px;line-height:1.28;letter-spacing:-.005em;margin:0 0 9px;color:#fff;}
.pt-scn-cd{font-family:'Space Grotesk',sans-serif;font-size:13.5px;line-height:1.55;color:#9aa3b4;margin:0 0 20px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:calc(13.5px*1.55*3);}
.pt-scn-foot{margin-top:auto;padding-top:14px;border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;gap:10px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.04em;color:#5f6878;font-variant-numeric:tabular-nums;}
.pt-scn-foot b{color:#9aa3b4;font-weight:500;}
.pt-scn-foot .ico{display:inline-flex;align-items:center;gap:6px;}
.pt-scn-foot svg{width:13px;height:13px;opacity:.75;flex:none;}

@media(prefers-reduced-motion:reduce){
  .pt-scn-card.in{animation:none !important;}
  .pt-scn-card{transition:border-color .2s,box-shadow .2s;}
  .pt-scn-card:hover,.pt-scn-card:focus-visible{transform:none !important;}
  .pt-scn-card:hover::before,.pt-scn-card:focus-visible::before{transition:none !important;}
}
`;

  function injectCSS() {
    if (!document.getElementById("pt-scn-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-scn-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function card(c, i) {
    return '<div class="pt-scn-card d-' + c.diff + ' in" data-diff="' + c.diff + '" tabindex="0" style="animation-delay:' + (i * 45) + 'ms">'
      + '<div class="pt-scn-top">'
        + '<span class="pt-scn-tag">' + c.cat + ' · <b>' + c.num + '</b></span>'
        + '<span class="pt-scn-rt">'
          + '<span class="pt-scn-diff"><i></i>' + c.diff + '</span>'
          + '<span class="pt-scn-time">' + IC_CLK + esc(c.time) + '</span>'
        + '</span>'
      + '</div>'
      + '<h3 class="pt-scn-ct">' + esc(c.t) + '</h3>'
      + '<p class="pt-scn-cd">' + esc(c.desc) + '</p>'
      + '<div class="pt-scn-foot">'
        + '<span class="ico">' + IC_MSG + '<b>' + c.rep + '</b> реплик</span>'
        + '<span><b>' + c.att + '</b> попыток</span>'
      + '</div>'
      + '</div>';
  }

  function tabsHTML() {
    return TABS.map(function (t, i) {
      return '<button class="pt-scn-tab' + (i === 0 ? ' act' : '') + '" data-f="' + t.f + '" type="button" role="tab">'
        + t.label + ' <span class="n">' + t.n + '</span></button>';
    }).join("");
  }

  var TITLES = SCN.map(function (s) { return s.t; });

  function findGrid() {
    if (document.querySelector(".pt-scn-grid")) return null; /* уже собрано — тяжёлый скан не нужен */
    // ВАЖНО: ищем только в <body>, пропускаем script/style/template — иначе
    // матчим <script type="__bundler/template"> (в нём весь HTML артефакта как
    // текст, со всеми заголовками сценариев) и при innerHTML-замене затрём
    // блобы → [bundler] Missing script tags → приложение не монтируется.
    if (!document.body) return null;
    var leaves = [].slice.call(document.body.querySelectorAll("*")).filter(function (e) {
      var tg = e.tagName;
      return e.children.length === 0
        && tg !== "SCRIPT" && tg !== "STYLE" && tg !== "TEMPLATE" && tg !== "NOSCRIPT"
        && (e.textContent || "").indexOf(TITLES[0]) >= 0;
    });
    var first = leaves[0];
    if (!first) return null; // карточек ещё нет (артефакт не собран / другой таб) — ждём
    var node = first;
    for (var i = 0; i < 14 && node; i++) {
      node = node.parentElement;
      if (!node || node === document.body || node.tagName === "HTML") break;
      if (node.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
      if (TITLES.every(function (t) { return (node.textContent || "").indexOf(t) >= 0; })) {
        return node; // LCA всех 6 заголовков = сетка сценариев
      }
    }
    return null;
  }

  function wireTabs(tabsEl, grid) {
    var tabs = [].slice.call(tabsEl.querySelectorAll(".pt-scn-tab"));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tabs.forEach(function (t) {
      t.onclick = function () {
        tabs.forEach(function (x) { x.classList.remove("act"); });
        t.classList.add("act");
        var f = t.getAttribute("data-f"), i = 0;
        var cards = [].slice.call(grid.querySelectorAll(".pt-scn-card"));
        cards.forEach(function (c) {
          var show = (f === "all" || c.getAttribute("data-diff") === f);
          if (show) {
            c.style.display = "";
            if (!reduce) { c.classList.remove("in"); void c.offsetWidth; c.style.animationDelay = (i * 45) + "ms"; c.classList.add("in"); }
            i++;
          } else { c.style.display = "none"; c.classList.remove("in"); }
        });
      };
    });
  }

  function render(grid) {
    if (!grid || grid.dataset.ptScn === "1") return;
    grid.dataset.ptScn = "1";
    grid.classList.add("pt-scn-grid");
    grid.innerHTML = SCN.map(card).join("");
    // вставляем фильтр-табы между шапкой секции и сеткой (один раз)
    var parent = grid.parentElement;
    if (parent) {
      var tabsEl = parent.querySelector(":scope > .pt-scn-tabs");
      if (!tabsEl) {
        tabsEl = document.createElement("div");
        tabsEl.className = "pt-scn-tabs";
        tabsEl.setAttribute("role", "tablist");
        tabsEl.innerHTML = tabsHTML();
        parent.insertBefore(tabsEl, grid);
      }
      wireTabs(tabsEl, grid);
    }
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
      if (g && g.dataset.ptScn !== "1") apply();
    });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

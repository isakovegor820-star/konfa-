/* ============================================================
   PRODUCTS ADD-ON — блок «Голографический арсенал» (таб Продукты,
   секция «// module · catalog», сетка 6 модулей).
   Дизайн V2 «Split-витрина»: слева список 6 модулей (клик
   переключает), справа крупная детальная панель — код, статус,
   описание, фишки-галочки (влетают по очереди), кнопка
   «Активировать». Цвет = тип (Free·green / Pro·cyan / Sub·magenta).

   УСТОЙЧИВОСТЬ К dc-runtime (как datachart/reports/checklists):
   клики — ДЕЛЕГАЦИЕЙ на document, активный индекс — в data-атрибуте,
   анимации фишек — на чистом CSS (inline-delay) → переживает
   гидрацию/клонирование DOM. Anchor — заголовок каталога.
   Хедер и флагман NeuroPravo Bot выше не трогаем.
   ============================================================ */
(function () {
  if (window.__ptProducts) return;
  window.__ptProducts = true;

  var IC_CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var IC_ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

  var ST = { FREE:{label:"Free",c:"#4ADE80",rgb:"74,222,128"}, PRO:{label:"Pro",c:"#00E5FF",rgb:"0,229,255"}, SUB:{label:"Sub",c:"#FF2E9A",rgb:"255,46,154"} };
  var P = [
    {code:"NP",status:"FREE",name:"NeuroPravo Bot",tag:"AI-помощник",access:"@NeuroPravo_Bot",
     desc:"AI-помощник юриста БФЛ внутри Telegram. Книга, чек-листы, исследования и консультант 24/7 по вашему делу.",
     feats:["Книга «БФЛ» 117 стр.","AI-консультант 24/7","7 чек-листов","Подборки исследований"]},
    {code:"TP",status:"PRO",name:"Templates Pack",tag:"Шаблоны",access:"модуль · 04",
     desc:"64 шаблона документов: заявления, претензии, ходатайства. Готовые к работе в Word и Google Docs.",
     feats:["64 готовых шаблона","Word + Google Docs","Заявления, претензии, иски","Обновления каждый месяц"]},
    {code:"TR",status:"PRO",name:"AI Trainer Suite",tag:"Тренажёры",access:"модуль · 03",
     desc:"Тренажёры консультаций, переговоров и судебных кейсов. Аналитика прогресса всей команды.",
     feats:["Тренажёр консультаций","Переговоры и суд","Аналитика команды","AI-разбор ошибок"]},
    {code:"CL",status:"FREE",name:"Checklists Bundle",tag:"Чек-листы",access:"@NeuroPravo_Bot",
     desc:"Все 7 боевых чек-листов в одном пакете. PDF и редактируемые версии для команды.",
     feats:["Все 7 чек-листов","PDF + редактируемые","Версии для команды","214 пунктов всего"]},
    {code:"RS",status:"SUB",name:"Research Feed",tag:"Исследования",access:"e-mail · feed",
     desc:"Подписка на свежие отчёты, датасеты и разборы рынка БФЛ. Новые материалы раз в 2 недели.",
     feats:["Свежие отчёты и датасеты","Разборы рынка БФЛ","Раз в 2 недели","Прямо на e-mail"]},
    {code:"AC",status:"SUB",name:"Academy Pass",tag:"Курсы",access:"модуль · 02",
     desc:"28 курсов академии — от уровня Junior до Expert. Сертификация и личный наставник.",
     feats:["28 курсов академии","Junior → Expert","Сертификация","Личный наставник"]}
  ];

  var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
.pt-prod{font-family:'Space Grotesk',system-ui,sans-serif;--desc:#9aa3b4;--meta:#6b7385;--line:rgba(255,255,255,.08);}
.pt-prod *{box-sizing:border-box;}
.pt-prod .pr-eyebrow{font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:#00E5FF;margin-bottom:.75rem;}
.pt-prod .pr-title{font-size:clamp(2rem,3.5vw,3rem);font-weight:600;letter-spacing:-.02em;margin:0 0 26px;color:#fff;line-height:1.02;}
.pt-prod .pr-2col{display:grid;grid-template-columns:330px minmax(0,1fr);gap:22px;align-items:start;}
@media(max-width:860px){.pt-prod .pr-2col{grid-template-columns:1fr;}}
.pt-prod .pr-list{display:flex;flex-direction:column;gap:6px;}
.pt-prod .pr-tab{--c:#00E5FF;--crgb:0,229,255;position:relative;display:flex;align-items:center;gap:13px;width:100%;text-align:left;cursor:pointer;padding:12px 14px;border-radius:12px;border:1px solid transparent;background:transparent;color:#fff;font-family:inherit;transition:background .24s,border-color .24s;outline:none;}
.pt-prod .pr-tab::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:2px;background:var(--c);transform:scaleY(0);transform-origin:center;transition:transform .26s cubic-bezier(.22,.61,.36,1);}
.pt-prod .pr-tab:hover{background:rgba(255,255,255,.03);}
.pt-prod .pr-tab.act{background:linear-gradient(90deg,rgba(var(--crgb),.1),rgba(var(--crgb),.02));border-color:rgba(var(--crgb),.28);}
.pt-prod .pr-tab.act::before{transform:scaleY(1);}
.pt-prod .pr-tab:focus-visible{outline:2px solid var(--c);outline-offset:2px;}
.pt-prod .pr-tcode{position:relative;width:38px;height:38px;flex:none;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:12px;color:var(--c);}
.pt-prod .pr-tcode::before{content:"";position:absolute;inset:0;border:1px solid var(--c);border-radius:6px;transform:rotate(45deg);opacity:.5;}
.pt-prod .pr-tmain{min-width:0;flex:1;}
.pt-prod .pr-tname{display:block;font-size:14.5px;font-weight:500;line-height:1.25;letter-spacing:-.005em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff;}
.pt-prod .pr-ttag{display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--meta);margin-top:3px;letter-spacing:.04em;}
.pt-prod .pr-tst{font-family:'JetBrains Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--c);padding:3px 7px;border-radius:5px;border:1px solid rgba(var(--crgb),.32);background:rgba(var(--crgb),.1);white-space:nowrap;}
.pt-prod .pr-panel{--c:#00E5FF;--crgb:0,229,255;position:relative;border-radius:18px;border:1px solid rgba(var(--crgb),.24);overflow:hidden;background:linear-gradient(135deg,rgba(var(--crgb),.09),rgba(8,10,18,.5) 55%,rgba(var(--crgb),.03));padding:clamp(24px,2.6vw,36px);min-height:400px;animation:ptPrFade .42s cubic-bezier(.22,.61,.36,1) both;}
@keyframes ptPrFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.pt-prod .pr-panel::after{content:"";position:absolute;top:-1px;right:-1px;width:56px;height:56px;border-top:1px solid rgba(var(--crgb),.6);border-right:1px solid rgba(var(--crgb),.6);border-top-right-radius:18px;}
.pt-prod .pr-ptop{display:flex;align-items:center;gap:14px;margin-bottom:18px;}
.pt-prod .pr-pcode{position:relative;width:56px;height:56px;flex:none;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:17px;color:var(--c);}
.pt-prod .pr-pcode::before{content:"";position:absolute;inset:0;border:1px solid var(--c);border-radius:9px;transform:rotate(45deg);opacity:.55;}
.pt-prod .pr-pst{font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--c);padding:5px 11px;border-radius:6px;border:1px solid rgba(var(--crgb),.35);background:rgba(var(--crgb),.1);margin-left:auto;}
.pt-prod .pr-pname{font-weight:700;font-size:clamp(22px,2.5vw,30px);line-height:1.1;letter-spacing:-.02em;margin:0 0 12px;color:#fff;}
.pt-prod .pr-pdesc{font-size:14.5px;line-height:1.6;color:var(--desc);margin:0 0 22px;max-width:60ch;}
.pt-prod .pr-feats{display:grid;grid-template-columns:1fr 1fr;gap:9px 18px;margin-bottom:26px;}
@media(max-width:560px){.pt-prod .pr-feats{grid-template-columns:1fr;}}
.pt-prod .pr-feat{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:#dfe4ec;opacity:0;transform:translateX(-8px);animation:ptPrFeat .4s cubic-bezier(.22,.61,.36,1) both;}
@keyframes ptPrFeat{to{opacity:1;transform:none}}
.pt-prod .pr-feat svg{width:16px;height:16px;color:var(--c);flex:none;margin-top:1px;}
.pt-prod .pr-pfoot{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
.pt-prod .pr-access{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--meta);letter-spacing:.08em;}
.pt-prod .pr-cta{display:inline-flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:#04121a;background:var(--c);border:0;border-radius:11px;padding:13px 20px;cursor:pointer;transition:transform .2s,box-shadow .2s;}
.pt-prod .pr-panel[data-s="SUB"] .pr-cta{color:#fff;}
.pt-prod .pr-cta:hover{transform:translateY(-2px);box-shadow:0 12px 28px -10px var(--c);}
.pt-prod .pr-cta:active{transform:scale(.97);}
.pt-prod .pr-cta svg{width:14px;height:14px;}
@media(prefers-reduced-motion:reduce){.pt-prod .pr-panel,.pt-prod .pr-feat{animation:none!important;opacity:1!important;transform:none!important;}.pt-prod .pr-tab,.pt-prod .pr-cta{transition:none!important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-prod-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-prod-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function tabHTML(p, i) {
    var s = ST[p.status];
    return '<button class="pr-tab' + (i===0?" act":"") + '" type="button" role="tab" data-idx="' + i + '" style="--c:' + s.c + ';--crgb:' + s.rgb + '">'
      + '<span class="pr-tcode">' + p.code + '</span><span class="pr-tmain"><span class="pr-tname">' + esc(p.name) + '</span><span class="pr-ttag">' + esc(p.tag) + '</span></span><span class="pr-tst">' + s.label + '</span></button>';
  }
  function panelHTML(p) {
    var s = ST[p.status];
    return '<div class="pr-panel" data-s="' + p.status + '" style="--c:' + s.c + ';--crgb:' + s.rgb + '">'
      + '<div class="pr-ptop"><span class="pr-pcode">' + p.code + '</span><span class="pr-pst">' + s.label + '</span></div>'
      + '<h3 class="pr-pname">' + esc(p.name) + '</h3><p class="pr-pdesc">' + esc(p.desc) + '</p>'
      + '<div class="pr-feats">' + p.feats.map(function (f, k) { return '<div class="pr-feat" style="animation-delay:' + (90 + k * 70) + 'ms">' + IC_CHK + '<span>' + esc(f) + '</span></div>'; }).join("") + '</div>'
      + '<div class="pr-pfoot"><span class="pr-access">' + esc(p.access) + '</span><button class="pr-cta" type="button">Активировать ' + IC_ARR + '</button></div></div>';
  }

  function renderPanel(c, idx) {
    var p = P[idx]; if (!p) return;
    c.dataset.ptIdx = idx;
    var tabs = c.querySelectorAll(".pr-tab");
    [].forEach.call(tabs, function (t) { t.classList.toggle("act", +t.getAttribute("data-idx") === idx); });
    var panel = c.querySelector('[data-r="panel"]');
    if (panel) panel.innerHTML = panelHTML(p);
  }

  function buildProducts(c) {
    if (!c) return;
    if (c.dataset.ptProd === "1" && c.querySelector(".pr-tab")) return;
    c.dataset.ptProd = "1";
    if (!c.dataset.ptIdx) c.dataset.ptIdx = "0";
    c.classList.add("pt-prod");
    c.innerHTML = '<div class="pr-eyebrow">// module · catalog</div><h3 class="pr-title">Голографический арсенал</h3>'
      + '<div class="pr-2col"><div class="pr-list" role="tablist">' + P.map(tabHTML).join("") + '</div><div data-r="panel"></div></div>';
    renderPanel(c, +c.dataset.ptIdx || 0);
  }

  function findContainer() {
    if (!document.body) return null;
    var hs = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4"));
    var h = null;
    // ВНИМАНИЕ: в артефакте «Голографический<br>арсенал» → в textContent НЕТ пробела
    // между словами («Голографическийарсенал»), поэтому \s* (а не \s+).
    for (var i = 0; i < hs.length; i++) { if (/Голографический\s*арсенал/i.test(hs[i].textContent || "")) { h = hs[i]; break; } }
    if (!h) return null;
    var sec = h.closest("section"); if (!sec) return null;
    if (sec.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
    return sec.querySelector(":scope > div");
  }

  // делегирование кликов на document — переживает пересборку/клонирование DOM рантаймом
  if (!window.__ptProdClick) {
    window.__ptProdClick = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest(".pt-prod .pr-tab");
      if (!btn) return;
      var c = btn.closest(".pt-prod"), idx = +btn.getAttribute("data-idx");
      if (c && idx >= 0) renderPanel(c, idx);
    });
  }

  function apply() { injectCSS(); var c = findContainer(); if (c) buildProducts(c); }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 250) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () { var c = findContainer(); if (c && (c.dataset.ptProd !== "1" || !c.querySelector(".pr-tab"))) buildProducts(c); });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 60000);
  } catch (e) {}
})();

/* ============================================================
   REPORTS ADD-ON — блок «Свежие отчёты» (таб Исследования,
   секция «Reports grid», под графиком).
   Дизайн V3 «Featured + сетка»: underline-табы-фильтр по
   категориям (Все / AI / Маркет / Практ. / Продажи / Суды),
   крупный featured-отчёт с кнопкой «Скачать PDF» + сетка
   остальных. Цвет = категория. Фильтр со stagger-анимацией.

   УСТОЙЧИВОСТЬ К dc-runtime (как в datachart): рантайм
   гидрирует/клонирует DOM и сносит JS-обработчики. Поэтому
   клики ловим ДЕЛЕГАЦИЕЙ на document, активный фильтр храним
   в data-атрибуте контейнера. Anchor — заголовок (внутри
   нашей разметки, но контейнер помечен dataset → без рекурсии).
   Шапку (eyebrow+title) пересоздаём 1:1 со стилями артефакта.
   ============================================================ */
(function () {
  if (window.__ptReports) return;
  window.__ptReports = true;

  var IC_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 11l5 5 5-5M5 21h14"/></svg>';
  var CATS = [{k:"all",l:"Все",cls:""},{k:"AI",l:"AI",cls:"c-ai"},{k:"МАРКЕТ",l:"Маркет",cls:"c-mk"},{k:"ПРАКТ.",l:"Практ.",cls:"c-pr"},{k:"ПРОДАЖИ",l:"Продажи",cls:"c-sl"},{k:"СУДЫ",l:"Суды",cls:"c-ct"}];
  var CLS = {"AI":"c-ai","МАРКЕТ":"c-mk","ПРАКТ.":"c-pr","ПРОДАЖИ":"c-sl","СУДЫ":"c-ct"};
  var COLOR = {"all":"#00E5FF","AI":"#00E5FF","МАРКЕТ":"#FF2E9A","ПРАКТ.":"#F0B84B","ПРОДАЖИ":"#4ADE80","СУДЫ":"#A78BFA"};
  var R = [
    {cat:"AI",date:"18.09.2026",t:"Влияние ИИ на работу юриста БФЛ. 2026",d:"Опрос 412 практикующих юристов: какие задачи делегируют AI, сколько времени экономят и где AI пока проигрывает человеку.",p:64,dl:"2.1k"},
    {cat:"МАРКЕТ",date:"02.09.2026",t:"Экономика юр. практики в банкротстве",d:"Юнит-экономика: доходы, расходы, маржа. Срезы по типам бюро и регионам.",p:48,dl:"3.8k"},
    {cat:"ПРАКТ.",date:"24.08.2026",t:"Технологии лидеров рынка БФЛ",d:"Стек 17 крупнейших юр. бюро России: CRM, AI, документооборот, BI.",p:72,dl:"1.4k"},
    {cat:"AI",date:"10.08.2026",t:"Автоматизация документов в БФЛ",d:"Какие шаблоны работают, какие — нет. Сравнение AI-генераторов на 1000 кейсов.",p:52,dl:"2.7k"},
    {cat:"ПРОДАЖИ",date:"28.07.2026",t:"AI для продаж юридических услуг",d:"Скрипты, скоринг лидов, авто-квалификация. Кейсы внедрения у трёх бюро.",p:36,dl:"4.2k"},
    {cat:"СУДЫ",date:"14.07.2026",t:"Судебная практика и тренды 2025–2026",d:"Топ-200 ключевых дел: тренды, прецеденты, изменение позиций ВС РФ.",p:88,dl:"1.9k"}
  ];

  var CSS = `
.pt-rep{font-family:'Space Grotesk',system-ui,sans-serif;--cyan:#00E5FF;--mag:#FF2E9A;--amber:#F0B84B;--grn:#4ADE80;--vio:#A78BFA;--desc:#9aa3b4;--meta:#6b7385;--line:rgba(255,255,255,.08);}
.pt-rep *{box-sizing:border-box;}
.pt-rep-head{margin-bottom:22px;}
.pt-rep-eyebrow{font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:.3em;color:var(--cyan);text-transform:uppercase;margin-bottom:.75rem;}
.pt-rep-title{font-size:clamp(2rem,3.5vw,3rem);font-weight:600;letter-spacing:-.02em;margin:0;color:#fff;line-height:1.04;}
.pt-rep .ut{position:relative;display:flex;gap:2px;border-bottom:1px solid var(--line);margin-bottom:26px;flex-wrap:wrap;}
.pt-rep .ut-btn{--c:var(--cyan);appearance:none;border:0;background:transparent;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--desc);padding:11px 16px 13px;transition:color .28s;white-space:nowrap;}
.pt-rep .ut-btn .n{opacity:.55;font-variant-numeric:tabular-nums;}
.pt-rep .ut-btn:hover{color:#fff;}
.pt-rep .ut-btn.act{color:var(--c);}
.pt-rep .ut-btn:focus-visible{outline:2px solid var(--c);outline-offset:-4px;border-radius:6px;}
.pt-rep .ut-ink{position:absolute;bottom:-1px;left:0;height:2px;border-radius:2px;background:var(--cyan);box-shadow:0 0 10px currentColor;transition:transform .42s cubic-bezier(.34,1.4,.5,1),width .42s cubic-bezier(.34,1.4,.5,1),background .3s;}
.pt-rep .rp-cat{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--c);padding:4px 10px;border-radius:6px;border:1px solid rgba(var(--crgb),.32);background:rgba(var(--crgb),.08);}
.pt-rep .rp-cat i{width:5px;height:5px;border-radius:50%;background:var(--c);flex:none;}
.pt-rep .rp-date{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--meta);font-variant-numeric:tabular-nums;}
.pt-rep .rp-feat{--c:var(--cyan);--crgb:0,229,255;display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:0;border-radius:16px;border:1px solid rgba(var(--crgb),.3);overflow:hidden;background:linear-gradient(135deg,rgba(var(--crgb),.1),rgba(8,10,18,.5) 55%,rgba(var(--crgb),.04));margin-bottom:18px;}
.pt-rep .rp-feat-main{padding:26px 28px;min-width:0;}
.pt-rep .rp-feat-top{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;}
.pt-rep .rp-badge{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--meta);margin-left:auto;}
.pt-rep .rp-feat-t{font-weight:700;font-size:clamp(22px,2.4vw,30px);line-height:1.15;letter-spacing:-.015em;margin:0 0 12px;color:#fff;}
.pt-rep .rp-feat-d{font-size:14.5px;line-height:1.6;color:var(--desc);margin:0;max-width:62ch;}
.pt-rep .rp-feat-side{border-left:1px solid rgba(var(--crgb),.18);background:rgba(7,9,16,.35);padding:26px;display:flex;flex-direction:column;justify-content:center;gap:4px;}
.pt-rep .rp-feat-num{font-weight:700;font-size:40px;letter-spacing:-.02em;color:var(--c);font-variant-numeric:tabular-nums;line-height:1;}
.pt-rep .rp-feat-lab{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--meta);margin-bottom:14px;}
.pt-rep .rp-feat-meta{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--desc);margin-bottom:16px;font-variant-numeric:tabular-nums;}
.pt-rep .rp-cta{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:#04121a;background:var(--c);border:0;border-radius:10px;padding:12px 16px;cursor:pointer;transition:transform .2s,box-shadow .2s;}
.pt-rep .rp-cta:hover{transform:translateY(-2px);box-shadow:0 10px 26px -10px var(--c);}
.pt-rep .rp-cta:active{transform:scale(.97);}
.pt-rep .rp-cta svg{width:15px;height:15px;}
.pt-rep .rp-grid{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:14px !important;}
.pt-rep .rp-g{--c:var(--cyan);--crgb:0,229,255;position:relative;display:flex;flex-direction:column;padding:18px 18px 16px;border-radius:13px;border:1px solid var(--line);background:rgba(255,255,255,.018);cursor:pointer;text-decoration:none;color:inherit;outline:none;overflow:hidden;transition:transform .24s cubic-bezier(.22,.61,.36,1),border-color .24s,box-shadow .24s;}
.pt-rep .rp-g::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--c);transform:scaleY(0);transform-origin:top;transition:transform .26s;}
.pt-rep .rp-g:hover,.pt-rep .rp-g:focus-visible{transform:translateY(-4px);border-color:rgba(var(--crgb),.4);box-shadow:0 14px 32px -16px rgba(var(--crgb),.5);}
.pt-rep .rp-g:hover::before,.pt-rep .rp-g:focus-visible::before{transform:scaleY(1);}
.pt-rep .rp-g-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:13px;}
.pt-rep .rp-g-t{font-weight:600;font-size:15.5px;line-height:1.3;letter-spacing:-.005em;margin:0 0 14px;color:#fff;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.pt-rep .rp-g-foot{margin-top:auto;padding-top:13px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--meta);font-variant-numeric:tabular-nums;}
.pt-rep .rp-g-foot b{color:var(--desc);font-weight:500;}
.pt-rep .rp-g-dl{display:inline-flex;align-items:center;gap:5px;color:var(--c);}
.pt-rep .rp-g-dl svg{width:12px;height:12px;}
.pt-rep .rp-in{animation:ptRpIn .42s cubic-bezier(.22,.61,.36,1) both;}
@keyframes ptRpIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media(max-width:980px){.pt-rep .rp-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;}.pt-rep .rp-feat{grid-template-columns:1fr;}.pt-rep .rp-feat-side{border-left:0;border-top:1px solid rgba(var(--crgb),.18);}}
@media(max-width:620px){.pt-rep .rp-grid{grid-template-columns:1fr !important;}}
@media(prefers-reduced-motion:reduce){.pt-rep .rp-in{animation:none!important;}.pt-rep .ut-btn,.pt-rep .ut-ink,.pt-rep .rp-g,.pt-rep .rp-cta{transition:none!important;}.pt-rep .rp-g:hover,.pt-rep .rp-cta:hover{transform:none!important;}}
.pt-rep .c-ai{--c:var(--cyan);--crgb:0,229,255;}
.pt-rep .c-mk{--c:var(--mag);--crgb:255,46,154;}
.pt-rep .c-pr{--c:var(--amber);--crgb:240,184,75;}
.pt-rep .c-sl{--c:var(--grn);--crgb:74,222,128;}
.pt-rep .c-ct{--c:var(--vio);--crgb:167,139,250;}
`;

  function injectCSS() {
    if (!document.getElementById("pt-rep-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-rep-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function featHTML(r){return '<article class="rp-feat rp-in '+(CLS[r.cat]||"")+'">'
    +'<div class="rp-feat-main"><div class="rp-feat-top"><span class="rp-cat"><i></i>'+r.cat+'</span><span class="rp-date">'+r.date+'</span><span class="rp-badge">свежий отчёт</span></div>'
    +'<h3 class="rp-feat-t">'+esc(r.t)+'</h3><p class="rp-feat-d">'+esc(r.d)+'</p></div>'
    +'<div class="rp-feat-side"><div class="rp-feat-num">'+r.dl+'</div><div class="rp-feat-lab">скачиваний</div>'
    +'<div class="rp-feat-meta">'+r.p+' стр. · PDF</div><button class="rp-cta" type="button">Скачать PDF '+IC_DL+'</button></div></article>';}
  function gridHTML(r,i){return '<a class="rp-g rp-in '+(CLS[r.cat]||"")+'" tabindex="0" style="animation-delay:'+(i*55)+'ms">'
    +'<div class="rp-g-top"><span class="rp-cat"><i></i>'+r.cat+'</span><span class="rp-date">'+r.date+'</span></div>'
    +'<h4 class="rp-g-t">'+esc(r.t)+'</h4>'
    +'<div class="rp-g-foot"><span><b>'+r.p+'</b> стр. · PDF</span><span class="rp-g-dl">'+IC_DL+r.dl+'</span></div></a>';}

  function renderInto(c, f) {
    var list = (f === "all") ? R : R.filter(function (r) { return r.cat === f; });
    var feat = c.querySelector('[data-r="feat"]'), grid = c.querySelector('[data-r="grid"]');
    if (feat) feat.innerHTML = list.length ? featHTML(list[0]) : "";
    if (grid) grid.innerHTML = list.slice(1).map(gridHTML).join("");
  }
  function setActive(c, f) {
    var btns = c.querySelectorAll(".ut-btn");
    [].forEach.call(btns, function (b) { b.classList.toggle("act", b.getAttribute("data-f") === f); });
  }
  function moveInk(c, btn) {
    var ink = c.querySelector('[data-r="ink"]');
    if (ink && btn && btn.offsetWidth) { ink.style.width = btn.offsetWidth + "px"; ink.style.transform = "translateX(" + btn.offsetLeft + "px)"; ink.style.background = COLOR[btn.getAttribute("data-f")] || "#00E5FF"; }
  }

  function buildReports(c) {
    if (!c) return;
    if (c.dataset.ptReports === "1" && c.querySelector(".ut-btn")) return;
    c.dataset.ptReports = "1";
    if (!c.dataset.ptF) c.dataset.ptF = "all";
    c.classList.add("pt-rep");
    var counts = {all:R.length}; R.forEach(function (r) { counts[r.cat] = (counts[r.cat]||0)+1; });
    var tabsHTML = CATS.filter(function (ct) { return ct.k === "all" || counts[ct.k]; }).map(function (ct, i) {
      return '<button class="ut-btn '+ct.cls+(i===0?" act":"")+'" type="button" role="tab" data-f="'+ct.k+'">'+ct.l+' <span class="n">'+(counts[ct.k]||0)+'</span></button>';
    }).join("");
    c.innerHTML = '<div class="pt-rep-head"><div class="pt-rep-eyebrow">// reports · catalog</div><h3 class="pt-rep-title">Свежие отчёты</h3></div>'
      + '<div class="ut" data-r="ut" role="tablist">' + tabsHTML + '<span class="ut-ink" data-r="ink"></span></div>'
      + '<div data-r="feat"></div><div class="rp-grid" data-r="grid"></div>';
    var f = c.dataset.ptF || "all";
    setActive(c, f); renderInto(c, f);
    var act = c.querySelector('.ut-btn[data-f="' + f + '"]') || c.querySelector(".ut-btn");
    requestAnimationFrame(function () { moveInk(c, act); });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { for (var k=0;k<es.length;k++){ if (es[k].isIntersecting){ moveInk(c, c.querySelector(".ut-btn.act")||act); io.disconnect(); break; } } }, {threshold:0.1});
      io.observe(c);
    }
  }

  function findReports() {
    if (!document.body) return null;
    var hs = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4"));
    var h = null;
    for (var i=0;i<hs.length;i++){ if (/Свежие отчёты/i.test(hs[i].textContent||"")){ h=hs[i]; break; } }
    if (!h) return null;
    var sec = h.closest("section"); if (!sec) return null;
    if (sec.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
    return sec.querySelector(":scope > div"); // max-width контейнер секции
  }

  // делегирование кликов на document — переживает пересборку/клонирование DOM рантаймом
  if (!window.__ptRepClick) {
    window.__ptRepClick = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest(".pt-rep .ut-btn");
      if (!btn) return;
      var c = btn.closest(".pt-rep"), f = btn.getAttribute("data-f");
      if (!c || !f) return;
      c.dataset.ptF = f; setActive(c, f); moveInk(c, btn); renderInto(c, f);
    });
    window.addEventListener("resize", function () { clearTimeout(window.__ptRepRz); window.__ptRepRz = setTimeout(function () { var c = findReports(); if (c) { var a = c.querySelector(".ut-btn.act"); if (a) moveInk(c, a); } }, 150); });
  }

  function apply() { injectCSS(); var c = findReports(); if (c) buildReports(c); }

  var n=0, iv=setInterval(function(){n++;apply();if(n===15||n===50||n===150){try{mo.disconnect();mo.observe(document,{childList:true,subtree:true});}catch(e){}}if(n>250){clearInterval(iv);setInterval(apply,1200);}},200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo=new MutationObserver(function(){var c=findReports();if(c&&(c.dataset.ptReports!=="1"||!c.querySelector(".ut-btn")))buildReports(c);});
    if (document.body) mo.observe(document,{childList:true,subtree:true});
    /* observer живёт вечно */
  } catch(e) {}
})();

/* ============================================================
   CHECKLISTS ADD-ON — блок «Чек-листы · каталог» (таб Чек-листы,
   секция «Checklists list», под хедером).
   Дизайн V1 «Список-вкладки + панель»: слева список 7 чек-листов
   (клик переключает), справа детальная панель выбранного — пункты
   с галочками влетают по очереди, прогресс-бар плавно заполняется.
   Цвет — свой у каждого чек-листа.

   УСТОЙЧИВОСТЬ К dc-runtime (как datachart/reports): клики ловим
   ДЕЛЕГАЦИЕЙ на document, активный индекс — в data-атрибуте.
   Все анимации — на чистом CSS (срабатывают при рендере), без
   JS-таймингов → переживает гидрацию/клонирование DOM.
   Anchor — название первого чек-листа; контейнер помечен dataset
   → без рекурсии. Хедер секции выше (заголовок + 07/214) не трогаем.
   ============================================================ */
(function () {
  if (window.__ptChecklists) return;
  window.__ptChecklists = true;

  var IC_CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var IC_ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

  var CH = [
    {id:"CL·01",c:"#00E5FF",pct:100,n:32,t:"Подготовка заявления о банкротстве",d:"Все шаги — от сбора документов до подачи в арбитраж. Проверено на 5k+ дел.",
     items:["Паспорт, ИНН, СНИЛС должника","Справки о доходах за 3 года","Опись имущества и банковских счетов","Полный список кредиторов и сумм долга","Госпошлина + депозит на вознаграждение АУ","Подача в арбитражный суд по месту жительства"]},
    {id:"CL·02",c:"#A78BFA",pct:86,n:24,t:"Взаимодействие с арбитражным управляющим",d:"Что просить, что давать, на что не отвечать. Тактика переговоров.",
     items:["Запросить план процедуры и сроки","Передать опись имущества и документы","Не раскрывать стратегию защиты сделок","Контролировать публикации в ЕФРСБ","Фиксировать все запросы письменно","Согласовать порядок реализации имущества"]},
    {id:"CL·03",c:"#4ADE80",pct:72,n:18,t:"Внесудебное банкротство через МФЦ",d:"Когда и кому подходит. Документы, сроки, ограничения процедуры.",
     items:["Проверить сумму долга (25k–1 млн ₽)","Убедиться в окончании исполнит. производства","Сверить отсутствие имущества к взысканию","Заполнить заявление по форме","Подать в МФЦ по месту жительства","Дождаться публикации (6 месяцев)"]},
    {id:"CL·04",c:"#F0B84B",pct:94,n:38,t:"Анализ сделок должника",d:"Что искать, как доказывать недействительность, сроки исковой давности.",
     items:["Выгрузка всех сделок за 3 года","Сделки с заинтересованными лицами","Безвозмездные и заниженные сделки","Расчёт сроков исковой давности","Оценка рисков оспаривания","Подготовка возражений управляющему"]},
    {id:"CL·05",c:"#FF2E9A",pct:90,n:28,t:"Первая консультация · скрипт + чек-лист",d:"От встречи до закрытия сделки. С возражениями и контр-аргументами.",
     items:["Квалификация: подходит ли банкротство","Сбор вводных по долгам и имуществу","Презентация стратегии и сроков","Отработка возражения «вдруг не спишут»","Расчёт стоимости и рассрочки","Закрытие на договор + предоплату"]},
    {id:"CL·06",c:"#38BDF8",pct:78,n:22,t:"Защита единственного жилья",d:"Исполнительский иммунитет, тактика, прецеденты. Что говорить в суде.",
     items:["Подтвердить статус единственного жилья","Исполнительский иммунитет (ст. 446 ГПК)","Контр-аргументы к «роскошному жилью»","Подготовка позиции для суда","Прецеденты ВС РФ в подкрепление","Возражения на замену жилья управляющим"]},
    {id:"CL·07",c:"#2DD4BF",pct:64,n:52,t:"Запуск БФЛ-практики с нуля",d:"Юр. лицо, лицензии, реклама, найм. План на 90 дней до первого клиента.",
     items:["Регистрация юр. лица / ИП","Сайт, оффер и воронка лидов","Скрипты продаж и консультаций","Юнит-экономика и прайсинг","Найм первого юриста-ассистента","План на 90 дней до первого клиента"]}
  ];

  var CSS = `
.pt-cl{font-family:'Space Grotesk',system-ui,sans-serif;--desc:#9aa3b4;--meta:#6b7385;--line:rgba(255,255,255,.08);}
.pt-cl *{box-sizing:border-box;}
.pt-cl .cl-eyebrow{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:#00E5FF;margin-bottom:22px;}
.pt-cl .cl-2col{display:grid;grid-template-columns:360px minmax(0,1fr);gap:22px;align-items:start;}
@media(max-width:860px){.pt-cl .cl-2col{grid-template-columns:1fr;}}
.pt-cl .cl-list{display:flex;flex-direction:column;gap:6px;}
.pt-cl .cl-tab{--c:#00E5FF;--crgb:0,229,255;position:relative;display:flex;align-items:flex-start;gap:13px;width:100%;text-align:left;cursor:pointer;padding:13px 15px 13px 16px;border-radius:12px;border:1px solid transparent;background:transparent;color:#fff;font-family:inherit;transition:background .24s,border-color .24s;outline:none;}
.pt-cl .cl-tab::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:2px;background:var(--c);transform:scaleY(0);transform-origin:center;transition:transform .26s cubic-bezier(.22,.61,.36,1);}
.pt-cl .cl-tab:hover{background:rgba(255,255,255,.03);}
.pt-cl .cl-tab.act{background:linear-gradient(90deg,rgba(var(--crgb),.1),rgba(var(--crgb),.02));border-color:rgba(var(--crgb),.28);}
.pt-cl .cl-tab.act::before{transform:scaleY(1);}
.pt-cl .cl-tab:focus-visible{outline:2px solid var(--c);outline-offset:2px;}
.pt-cl .cl-tab-id{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:.08em;color:var(--c);white-space:nowrap;font-variant-numeric:tabular-nums;margin-top:2px;}
.pt-cl .cl-tab-main{min-width:0;flex:1;}
.pt-cl .cl-tab-t{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:14px;font-weight:500;line-height:1.3;letter-spacing:-.005em;color:#fff;}
.pt-cl .cl-tab-n{display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--meta);font-variant-numeric:tabular-nums;margin-top:4px;}
.pt-cl .cl-panel{--c:#00E5FF;--crgb:0,229,255;position:relative;border-radius:16px;border:1px solid rgba(var(--crgb),.22);overflow:hidden;background:linear-gradient(150deg,rgba(var(--crgb),.07),rgba(8,10,18,.5) 55%);padding:clamp(22px,2.2vw,30px);min-height:420px;animation:ptClFade .42s cubic-bezier(.22,.61,.36,1) both;}
@keyframes ptClFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.pt-cl .cl-pan-top{display:flex;align-items:center;gap:12px;margin-bottom:14px;}
.pt-cl .cl-pan-id{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:.14em;color:var(--c);padding:4px 10px;border-radius:6px;border:1px solid rgba(var(--crgb),.3);background:rgba(var(--crgb),.08);}
.pt-cl .cl-pan-badge{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--meta);margin-left:auto;}
.pt-cl .cl-pan-t{font-weight:700;font-size:clamp(20px,2.2vw,26px);line-height:1.2;letter-spacing:-.015em;margin:0 0 10px;color:#fff;}
.pt-cl .cl-pan-d{font-size:14px;line-height:1.55;color:var(--desc);margin:0 0 20px;max-width:60ch;}
.pt-cl .cl-prog{display:flex;align-items:center;gap:14px;margin-bottom:22px;}
.pt-cl .cl-prog-bar{flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,.07);overflow:hidden;}
.pt-cl .cl-prog-fill{height:100%;width:100%;border-radius:3px;background:var(--c);transform-origin:left;transform:scaleX(0);box-shadow:0 0 10px rgba(var(--crgb),.6);animation:ptClFill .7s cubic-bezier(.22,.61,.36,1) both;animation-delay:.1s;}
@keyframes ptClFill{to{transform:scaleX(var(--w,0))}}
.pt-cl .cl-prog-n{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--desc);font-variant-numeric:tabular-nums;white-space:nowrap;}
.pt-cl .cl-prog-n b{color:var(--c);font-weight:500;}
.pt-cl .cl-items{display:flex;flex-direction:column;gap:2px;margin-bottom:22px;}
.pt-cl .cl-item{display:flex;align-items:flex-start;gap:12px;padding:10px 6px;border-bottom:1px solid rgba(255,255,255,.05);opacity:0;transform:translateX(-8px);animation:ptClItem .4s cubic-bezier(.22,.61,.36,1) both;}
@keyframes ptClItem{to{opacity:1;transform:none}}
.pt-cl .cl-tick{flex:none;width:18px;height:18px;border-radius:6px;border:1.5px solid rgba(var(--crgb),.45);display:flex;align-items:center;justify-content:center;margin-top:1px;background:rgba(var(--crgb),.1);}
.pt-cl .cl-tick svg{width:11px;height:11px;color:var(--c);}
.pt-cl .cl-it-t{font-size:13.5px;line-height:1.45;color:#cdd3de;}
.pt-cl .cl-more{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--meta);padding:6px;}
.pt-cl .cl-cta{display:inline-flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--c);background:rgba(var(--crgb),.1);border:1px solid rgba(var(--crgb),.3);border-radius:10px;padding:11px 16px;cursor:pointer;transition:transform .2s,background .2s;}
.pt-cl .cl-cta:hover{transform:translateY(-2px);background:rgba(var(--crgb),.16);}
.pt-cl .cl-cta svg{width:14px;height:14px;}
@media(prefers-reduced-motion:reduce){.pt-cl .cl-panel,.pt-cl .cl-item{animation:none!important;opacity:1!important;transform:none!important;}.pt-cl .cl-prog-fill{animation:none!important;transform:scaleX(var(--w,0))!important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-cl-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-cl-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function rgb(hex){var n=parseInt(hex.slice(1),16);return (n>>16)+","+((n>>8)&255)+","+(n&255);}
  function esc(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function panelHTML(ch){
    var preview=ch.items.slice(0,6),rest=ch.n-preview.length;
    return '<div class="cl-panel" style="--c:'+ch.c+';--crgb:'+rgb(ch.c)+'">'
      +'<div class="cl-pan-top"><span class="cl-pan-id">'+ch.id+'</span><span class="cl-pan-badge">verification · flow</span></div>'
      +'<h3 class="cl-pan-t">'+esc(ch.t)+'</h3><p class="cl-pan-d">'+esc(ch.d)+'</p>'
      +'<div class="cl-prog"><div class="cl-prog-bar"><div class="cl-prog-fill" style="--w:'+(ch.pct/100)+'"></div></div><span class="cl-prog-n"><b>'+ch.n+'</b> пунктов · готовность '+ch.pct+'%</span></div>'
      +'<div class="cl-items">'+preview.map(function(it,k){return '<div class="cl-item" style="animation-delay:'+(90+k*70)+'ms"><span class="cl-tick">'+IC_CHK+'</span><span class="cl-it-t">'+esc(it)+'</span></div>';}).join('')
      +(rest>0?'<div class="cl-more">+ ещё '+rest+' пунктов в полном чек-листе</div>':'')+'</div>'
      +'<button class="cl-cta" type="button">Открыть чек-лист '+IC_ARR+'</button></div>';
  }
  function tabHTML(ch,i){
    return '<button class="cl-tab'+(i===0?" act":"")+'" type="button" role="tab" data-idx="'+i+'" style="--c:'+ch.c+';--crgb:'+rgb(ch.c)+'">'
      +'<span class="cl-tab-id">'+ch.id+'</span><span class="cl-tab-main"><span class="cl-tab-t">'+esc(ch.t)+'</span><span class="cl-tab-n">'+ch.n+' пунктов</span></span></button>';
  }

  function renderPanel(c, idx) {
    var ch = CH[idx]; if (!ch) return;
    c.dataset.ptIdx = idx;
    var tabs = c.querySelectorAll(".cl-tab");
    [].forEach.call(tabs, function (t) { t.classList.toggle("act", +t.getAttribute("data-idx") === idx); });
    var panel = c.querySelector('[data-r="panel"]');
    if (panel) panel.innerHTML = panelHTML(ch);
  }

  function buildChecklists(c) {
    if (!c) return;
    if (c.dataset.ptCl === "1" && c.querySelector(".cl-tab")) return;
    c.dataset.ptCl = "1";
    if (!c.dataset.ptIdx) c.dataset.ptIdx = "0";
    c.classList.add("pt-cl");
    c.innerHTML = '<div class="cl-eyebrow">// catalog</div>'
      + '<div class="cl-2col"><div class="cl-list" role="tablist">' + CH.map(tabHTML).join("") + '</div><div data-r="panel"></div></div>';
    renderPanel(c, +c.dataset.ptIdx || 0);
  }

  function findContainer() {
    if (!document.body) return null;
    // ВАЖНО: на табе ДВЕ секции с текстом «Подготовка заявления…»:
    //  A) настоящий каталог (все 7 чек-листов) — его и берём;
    //  B) секция-сканер «// preview · CL_01» (только CL·01) — пропускаем,
    //     иначе получаем ВТОРОЙ каталог. Матчим только секцию, где есть
    //     И первый, И последний чек-лист (значит — полный каталог).
    var first = CH[0].t, last = CH[CH.length - 1].t;
    var secs = [].slice.call(document.body.querySelectorAll("section"));
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i];
      if (s.querySelector('script[type^="__bundler"]')) continue; // страховка: не трогаем блобы
      var txt = s.textContent || "";
      if (txt.indexOf(first) >= 0 && txt.indexOf(last) >= 0) return s.querySelector(":scope > div");
    }
    return null;
  }

  // делегирование кликов на document — переживает пересборку/клонирование DOM рантаймом
  if (!window.__ptClClick) {
    window.__ptClClick = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest(".pt-cl .cl-tab");
      if (!btn) return;
      var c = btn.closest(".pt-cl"), idx = +btn.getAttribute("data-idx");
      if (c && idx >= 0) renderPanel(c, idx);
    });
  }

  // Скрываем оригинальный блок-«сканер CL_01» («// preview · CL_01 · scanning»):
  // он дублирует пункты CL·01, которые уже есть в панели каталога. По просьбе — убрать.
  function hideScanner() {
    var secs = [].slice.call(document.body ? document.body.querySelectorAll("section") : []);
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i];
      if (s.querySelector(".pt-cl")) continue; // это наш каталог — не трогаем
      var t = s.textContent || "";
      if (/scanning|preview\s*·\s*CL_?0?1/i.test(t) && t.indexOf(CH[0].t) >= 0) {
        if (s.style.display !== "none") { s.style.setProperty("display", "none", "important"); s.setAttribute("data-pt-hidden", "1"); }
      }
    }
  }

  function apply() { injectCSS(); var c = findContainer(); if (c) buildChecklists(c); hideScanner(); }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 250) { clearInterval(iv); setInterval(apply, 1200); } }, 200); /* прогрев → вечный пульс */
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () { var c = findContainer(); if (c && (c.dataset.ptCl !== "1" || !c.querySelector(".cl-tab"))) buildChecklists(c); });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

/* ============================================================
   BOT ADD-ON — флагман «NeuroPravo Bot» (таб Продукты, секция
   «Featured: NeuroPravo Bot»).
   Дизайн V2 «Возможности-табы + панель»: сверху идентити бота +
   «Активировать», ниже underline-табы по возможностям (Книга /
   Чек-листы / Исследования / Консультант), под ними крупная
   морфинг-панель (иконка, заголовок, описание, пункты, команда)
   + голографическая эмблема-счётчик. Цвет = возможность.

   Заменяет содержимое .glass-карточки флагмана, рамку/градиент
   карточки оставляет. УСТОЙЧИВОСТЬ К dc-runtime: клики — ДЕЛЕГАЦИЕЙ
   на document, активный индекс — в data-атрибуте, морфинг панели —
   на чистом CSS (срабатывает при рендере) → переживает гидрацию.
   Anchor — секция с «flagship» + «NeuroPravo Bot» (не каталог).
   ============================================================ */
(function () {
  if (window.__ptBot) return;
  window.__ptBot = true;

  var IC = {
    book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M18 3v18"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
    chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-4.5A8.4 8.4 0 1 1 21 11.5Z"/></svg>'
  };
  var IC_CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var IC_ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

  var CAPS = [
    {label:"Книга",icon:IC.book,c:"#00E5FF",rgb:"0,229,255",title:"Книга «Банкротство физлиц»",cmd:"отправьте: Книгу",
     desc:"Полное практическое руководство по БФЛ — от первой консультации до завершения процедуры. Всегда под рукой в Telegram.",
     pts:["117 страниц практики","PDF · 2.4 МБ","Регулярные обновления"],n:"117",nl:"страниц"},
    {label:"Чек-листы",icon:IC.check,c:"#4ADE80",rgb:"74,222,128",title:"7 боевых чек-листов",cmd:"команда: /checklists",
     desc:"Готовые пошаговые чек-листы под каждый этап дела: заявление, анализ сделок, защита жилья, консультация и другие.",
     pts:["214 пунктов всего","PDF + редактируемые","Версии для команды"],n:"214",nl:"пунктов"},
    {label:"Исследования",icon:IC.search,c:"#F0B84B",rgb:"240,184,75",title:"Исследования рынка БФЛ",cmd:"команда: /research",
     desc:"Свежие отчёты, датасеты и разборы рынка банкротств. Цифры и тренды, на которые можно опереться в работе и продажах.",
     pts:["42 отчёта в архиве","Датасеты и графики","Обновления раз в 2 недели"],n:"42",nl:"отчёта"},
    {label:"Консультант",icon:IC.chat,c:"#A78BFA",rgb:"167,139,250",title:"AI-консультант 24/7",cmd:"просто напишите вопрос",
     desc:"Задайте вопрос по конкретному делу — бот ответит со ссылками на нормы и подскажет следующий шаг. Круглосуточно.",
     pts:["Ответы со ссылками на нормы","Разбор вашей ситуации","Без выходных, 24/7"],n:"24/7",nl:"на связи"}
  ];

  var CSS = `
.pt-bot{font-family:'Space Grotesk',system-ui,sans-serif;--cyan:#00E5FF;--mag:#FF2E9A;--desc:#A6ADBA;--meta:#6b7385;--line:rgba(255,255,255,.08);position:relative;}
.pt-bot *{box-sizing:border-box;}
.glass.pt-bot-host:hover{transform:none !important;}
.pt-bot .fb-cn{position:absolute;top:-1px;right:-1px;width:58px;height:58px;border-top:1px solid rgba(0,229,255,.6);border-right:1px solid rgba(0,229,255,.6);border-top-right-radius:18px;pointer-events:none;}
.pt-bot .fb-top{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:24px;position:relative;}
.pt-bot .fb-av{width:46px;height:46px;border-radius:12px;background:conic-gradient(from 200deg,#7C3AED,#00E5FF,#FF2E9A,#7C3AED);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:14px;color:#fff;flex:none;}
.pt-bot .fb-id{flex:1;min-width:160px;}
.pt-bot .fb-name{font-weight:700;font-size:clamp(22px,2.6vw,30px);line-height:1;letter-spacing:-.02em;margin:0 0 6px;color:#fff;}
.pt-bot .fb-idr{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.pt-bot .fb-flag{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--mag);padding:4px 9px;border-radius:5px;background:rgba(255,46,154,.12);border:1px solid rgba(255,46,154,.32);}
.pt-bot .fb-ver{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan);}
.pt-bot .fb-cta{display:inline-flex;align-items:center;gap:9px;font-weight:600;font-size:14px;text-decoration:none;color:#04121a;background:var(--cyan);border-radius:10px;padding:12px 18px;box-shadow:0 12px 34px -12px rgba(0,229,255,.6);transition:transform .2s;white-space:nowrap;}
.pt-bot .fb-cta:hover{transform:translateY(-2px);}
.pt-bot .fb-cta svg{width:15px;height:15px;}
.pt-bot .fb-tabs{position:relative;display:flex;gap:2px;border-bottom:1px solid var(--line);margin-bottom:26px;flex-wrap:wrap;}
.pt-bot .fb-tab{--c:#00E5FF;appearance:none;border:0;background:transparent;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--desc);padding:12px 16px 14px;transition:color .26s;}
.pt-bot .fb-tab svg{width:15px;height:15px;}
.pt-bot .fb-tab:hover{color:#fff;}
.pt-bot .fb-tab.act{color:var(--c);}
.pt-bot .fb-ink{position:absolute;bottom:-1px;left:0;height:2px;border-radius:2px;background:var(--cyan);box-shadow:0 0 10px currentColor;transition:transform .42s cubic-bezier(.34,1.4,.5,1),width .42s cubic-bezier(.34,1.4,.5,1),background .3s;}
.pt-bot .fb-panel{--c:#00E5FF;--crgb:0,229,255;display:grid;grid-template-columns:1fr 300px;gap:2.5rem;align-items:center;}
@media(max-width:820px){.pt-bot .fb-panel{grid-template-columns:1fr;gap:1.5rem;}.pt-bot .fb-vis{display:none;}}
.pt-bot .fb-panel{animation:ptBotFade .44s cubic-bezier(.22,.61,.36,1) both;}
.pt-bot .fb-panel .fb-vis{animation:ptBotVis .5s cubic-bezier(.22,.61,.36,1) both;}
@keyframes ptBotFade{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
@keyframes ptBotVis{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:none}}
.pt-bot .fb-main{min-width:0;}
.pt-bot .fb-p-ic{width:48px;height:48px;border-radius:12px;background:rgba(var(--crgb),.12);border:1px solid rgba(var(--crgb),.35);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.pt-bot .fb-p-ic svg{width:24px;height:24px;color:var(--c);}
.pt-bot .fb-p-t{font-weight:700;font-size:clamp(22px,2.6vw,30px);line-height:1.1;letter-spacing:-.02em;margin:0 0 12px;color:#fff;}
.pt-bot .fb-p-d{font-size:15px;line-height:1.6;color:var(--desc);margin:0 0 20px;max-width:52ch;}
.pt-bot .fb-p-pts{display:flex;flex-wrap:wrap;gap:9px 18px;margin-bottom:24px;}
.pt-bot .fb-p-pt{display:inline-flex;align-items:center;gap:8px;font-size:13.5px;color:#E8ECF2;}
.pt-bot .fb-p-pt svg{width:15px;height:15px;color:var(--c);flex:none;}
.pt-bot .fb-p-cmd{display:inline-flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-size:12.5px;color:var(--c);background:rgba(var(--crgb),.1);border:1px solid rgba(var(--crgb),.3);border-radius:9px;padding:10px 14px;}
.pt-bot .fb-vis{position:relative;height:200px;display:flex;align-items:center;justify-content:center;}
.pt-bot .fb-vis-ring{position:absolute;border:1px solid rgba(var(--crgb),.22);border-radius:50%;}
.pt-bot .fb-vis-d{position:relative;width:130px;height:130px;border-radius:22px;border:1.5px solid var(--c);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;box-shadow:0 0 40px -8px rgba(var(--crgb),.7),inset 0 0 26px -10px rgba(var(--crgb),.6);}
.pt-bot .fb-vis-n{font-weight:700;font-size:30px;letter-spacing:-.02em;color:var(--c);font-variant-numeric:tabular-nums;}
.pt-bot .fb-vis-l{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--meta);}
@media(prefers-reduced-motion:reduce){.pt-bot .fb-panel,.pt-bot .fb-panel .fb-vis{animation:none !important;}.pt-bot .fb-tab,.pt-bot .fb-ink,.pt-bot .fb-cta{transition:none !important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-bot-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-bot-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function tabHTML(cap, i) {
    return '<button class="fb-tab' + (i===0?" act":"") + '" type="button" role="tab" data-idx="' + i + '" style="--c:' + cap.c + '">' + cap.icon + cap.label + '</button>';
  }
  function panelHTML(c) {
    return '<div class="fb-panel" style="--c:' + c.c + ';--crgb:' + c.rgb + '">'
      + '<div class="fb-main"><div class="fb-p-ic">' + c.icon + '</div><h3 class="fb-p-t">' + esc(c.title) + '</h3><p class="fb-p-d">' + esc(c.desc) + '</p>'
      + '<div class="fb-p-pts">' + c.pts.map(function (p) { return '<span class="fb-p-pt">' + IC_CHK + esc(p) + '</span>'; }).join("") + '</div>'
      + '<span class="fb-p-cmd">' + esc(c.cmd) + '</span></div>'
      + '<div class="fb-vis"><span class="fb-vis-ring" style="width:190px;height:190px"></span><span class="fb-vis-ring" style="width:150px;height:150px"></span><span class="fb-vis-d"><span class="fb-vis-n">' + esc(c.n) + '</span><span class="fb-vis-l">' + esc(c.nl) + '</span></span></div>'
      + '</div>';
  }

  function moveInk(card, idx) {
    var ink = card.querySelector('[data-r="ink"]'), b = card.querySelectorAll(".fb-tab")[idx];
    if (ink && b && b.offsetWidth) { ink.style.width = b.offsetWidth + "px"; ink.style.transform = "translateX(" + b.offsetLeft + "px)"; ink.style.background = CAPS[idx] ? CAPS[idx].c : "#00E5FF"; }
  }
  function renderPanel(card, idx) {
    if (!CAPS[idx]) return;
    card.dataset.ptIdx = idx;
    var tabs = card.querySelectorAll(".fb-tab");
    [].forEach.call(tabs, function (t) { t.classList.toggle("act", +t.getAttribute("data-idx") === idx); });
    moveInk(card, idx);
    var panel = card.querySelector('[data-r="panel"]');
    if (panel) panel.innerHTML = panelHTML(CAPS[idx]);
  }

  function buildBot(card) {
    if (!card) return;
    if (card.dataset.ptBot === "1" && card.querySelector(".fb-tab")) return;
    card.dataset.ptBot = "1";
    if (!card.dataset.ptIdx) card.dataset.ptIdx = "0";
    card.classList.add("pt-bot", "pt-bot-host");
    card.innerHTML = '<span class="fb-cn"></span>'
      + '<div class="fb-top"><span class="fb-av">NP</span>'
      + '<div class="fb-id"><h2 class="fb-name">NeuroPravo Bot</h2><div class="fb-idr"><span class="fb-flag">flagship</span><span class="fb-ver">v 1.4 · activated · бесплатно</span></div></div>'
      + '<a class="fb-cta" href="https://t.me/NeuroPravo_Bot" target="_blank" rel="noopener">Активировать ' + IC_ARR + '</a></div>'
      + '<div class="fb-tabs" role="tablist">' + CAPS.map(tabHTML).join("") + '<span class="fb-ink" data-r="ink"></span></div>'
      + '<div data-r="panel"></div>';
    renderPanel(card, +card.dataset.ptIdx || 0);
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { for (var k=0;k<es.length;k++){ if (es[k].isIntersecting){ moveInk(card, +card.dataset.ptIdx || 0); io.disconnect(); break; } } }, {threshold:0.1});
      io.observe(card);
    }
  }

  function findCard() {
    if (!document.body) return null;
    var secs = [].slice.call(document.body.querySelectorAll("section"));
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i], t = s.textContent || "";
      if (t.indexOf("Голографическ") >= 0) continue;          // это каталог модулей — пропускаем
      if (/flagship/i.test(t) && /NeuroPravo Bot/.test(t)) {   // секция флагмана
        if (s.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
        return s.querySelector(".glass");
      }
    }
    return null;
  }

  // делегирование кликов на document — переживает пересборку/клонирование DOM рантаймом
  if (!window.__ptBotClick) {
    window.__ptBotClick = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest(".pt-bot .fb-tab");
      if (!btn) return;
      var card = btn.closest(".pt-bot"), idx = +btn.getAttribute("data-idx");
      if (card && idx >= 0) renderPanel(card, idx);
    });
    window.addEventListener("resize", function () { clearTimeout(window.__ptBotRz); window.__ptBotRz = setTimeout(function () { var c = findCard(); if (c && c.dataset.ptBot === "1") moveInk(c, +c.dataset.ptIdx || 0); }, 150); });
  }

  function apply() { injectCSS(); var c = findCard(); if (c) buildBot(c); }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 250) { clearInterval(iv); setInterval(apply, 1200); } }, 200); /* прогрев → вечный пульс */
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () { var c = findCard(); if (c && (c.dataset.ptBot !== "1" || !c.querySelector(".fb-tab"))) buildBot(c); });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

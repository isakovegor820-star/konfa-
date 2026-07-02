/* ============================================================
   PLANS ADD-ON — блок «Соберите свою Legal AI OS» (таб Продукты,
   секция «// full · stack · activation», последняя на табе).
   Дизайн V3 «Премиум-стекло»: 3 градиентные стеклянные тариф-
   колонки (Starter / Practice / Enterprise) с эмблемами-ромбами,
   Practice — герой (шире, ярче, свечение), градиентные кнопки.
   Заменяет прежние 3 компактные строки на полноценные колонки
   с составом тарифа. Цвет: Starter·бирюза / Practice·cyan /
   Enterprise·magenta.

   Статичный блок (никаких вкладок): карточки — обычный HTML со
   ссылками <a href> + CSS-анимации входа → переживает гидрацию
   dc-runtime нативно (нет JS-обработчиков). Anchor — заголовок
   блока; контейнер помечен dataset → без рекурсии.
   ⚠ Enterprise = «По запросу» (заглушка), заменить на реальную цену.
   ============================================================ */
(function () {
  if (window.__ptPlans) return;
  window.__ptPlans = true;

  var IC_CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var IC_ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var TIERS = [
    {key:"starter",name:"Starter",price:"Бесплатно",per:"",tagline:"Старт и знакомство с системой",color:"#7FE3D0",rgb:"127,227,208",
     feats:["NeuroPravo Bot в Telegram","Книга «БФЛ» — 117 страниц","3 базовых чек-листа","AI-консультант — базовый режим"],
     cta:"Начать бесплатно",link:"https://t.me/NeuroPravo_Bot"},
    {key:"practice",name:"Practice",price:"9 900 ₽",per:"/ мес",tagline:"Для активной ежедневной практики",popular:true,color:"#00E5FF",rgb:"0,229,255",
     feats:["Всё из Starter","AI Trainer Suite — тренажёры","Все 7 чек-листов + 64 шаблона","Research Feed — исследования рынка","AI-консультант 24/7 · безлимит"],
     cta:"Оформить Practice",link:"mailto:pravotechhub@mail.ru"},
    {key:"enterprise",name:"Enterprise",price:"По запросу",per:"",tagline:"Для команды и юридического бюро",color:"#FF2E9A",rgb:"255,46,154",
     feats:["Всё из Practice","Полный стек модулей + Academy","Команда от 5 юристов","Аналитика и роли команды","Кастомизация под ваши процессы","Приоритетная поддержка + менеджер"],
     cta:"Связаться с командой",link:"mailto:pravotechhub@mail.ru"}
  ];

  var CSS = `
.pt-plan{font-family:'Space Grotesk',system-ui,sans-serif;--desc:#9aa3b4;--meta:#6b7385;--line:rgba(255,255,255,.08);}
.pt-plan *{box-sizing:border-box;}
.pt-plan-head{text-align:center;margin-bottom:44px;}
.pt-plan-eyebrow{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#00E5FF;margin:0 0 14px;}
.pt-plan-title{font-weight:700;font-size:clamp(28px,4vw,44px);line-height:1.03;letter-spacing:-.02em;margin:0 0 14px;color:#fff;}
.pt-plan-sub{font-size:15px;line-height:1.55;color:var(--desc);max-width:560px;margin:0 auto;}
.pt-plan-grid{display:grid;grid-template-columns:1fr 1.12fr 1fr;gap:16px;align-items:center;max-width:1120px;margin:0 auto;}
@media(max-width:900px){.pt-plan-grid{grid-template-columns:1fr;max-width:440px;}}
.pl-card{--c:#00E5FF;--crgb:0,229,255;position:relative;display:flex;flex-direction:column;padding:32px 28px;border-radius:20px;border:1px solid rgba(var(--crgb),.28);overflow:hidden;
  background:linear-gradient(165deg,rgba(var(--crgb),.12),rgba(8,10,18,.55) 52%,rgba(var(--crgb),.04));
  opacity:0;transform:translateY(22px) scale(.98);animation:ptPlIn .55s cubic-bezier(.22,.61,.36,1) both;transition:transform .3s cubic-bezier(.22,.61,.36,1),box-shadow .3s,border-color .3s;}
.pl-card:nth-child(1){animation-delay:.06s}.pl-card:nth-child(2){animation-delay:.02s}.pl-card:nth-child(3){animation-delay:.14s}
@keyframes ptPlIn{to{opacity:1;transform:none}}
.pl-card::after{content:"";position:absolute;top:-1px;right:-1px;width:52px;height:52px;border-top:1px solid rgba(var(--crgb),.6);border-right:1px solid rgba(var(--crgb),.6);border-top-right-radius:20px;pointer-events:none;}
.pl-corner{position:absolute;bottom:-1px;left:-1px;width:52px;height:52px;border-bottom:1px solid rgba(var(--crgb),.45);border-left:1px solid rgba(var(--crgb),.45);border-bottom-left-radius:20px;pointer-events:none;}
.pl-card:hover{transform:translateY(-6px);box-shadow:0 26px 60px -26px rgba(var(--crgb),.55);}
.pl-card.pop{border-color:rgba(0,229,255,.5);box-shadow:0 0 0 1px rgba(0,229,255,.22),0 30px 70px -30px rgba(0,229,255,.6);z-index:1;background:linear-gradient(165deg,rgba(0,229,255,.16),rgba(8,10,18,.55) 48%,rgba(255,46,154,.06));}
.pl-card.pop:hover{transform:translateY(-12px);}
.pl-emb{width:46px;height:46px;position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:20px;}
.pl-emb::before{content:"";position:absolute;inset:0;border:1.5px solid var(--c);border-radius:9px;transform:rotate(45deg);box-shadow:0 0 22px -6px rgba(var(--crgb),.7),inset 0 0 16px -6px rgba(var(--crgb),.6);}
.pl-emb span{position:relative;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:15px;color:var(--c);}
.pl-badge{position:absolute;top:20px;right:20px;padding:5px 12px;background:#00E5FF;color:#04121a;border-radius:6px;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:10px;letter-spacing:.16em;text-transform:uppercase;box-shadow:0 6px 16px -6px rgba(0,229,255,.8);}
.pl-tier{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--c);margin-bottom:10px;}
.pl-price{display:flex;align-items:baseline;gap:8px;margin-bottom:6px;}
.pl-price b{font-weight:700;font-size:clamp(30px,3.6vw,42px);letter-spacing:-.025em;line-height:1;color:#fff;}
.pl-price .per{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--meta);}
.pl-tag{font-size:13.5px;color:var(--desc);line-height:1.45;margin-bottom:22px;min-height:38px;}
.pl-feats{list-style:none;padding:0;margin:0 0 26px;display:flex;flex-direction:column;gap:12px;flex:1;}
.pl-feat{display:flex;align-items:flex-start;gap:11px;font-size:14px;line-height:1.4;color:#e8ecf2;}
.pl-feat i{flex:none;width:18px;height:18px;border-radius:6px;background:rgba(var(--crgb),.14);border:1px solid rgba(var(--crgb),.4);display:flex;align-items:center;justify-content:center;margin-top:1px;}
.pl-feat i svg{width:11px;height:11px;color:var(--c);}
.pl-cta{display:flex;align-items:center;justify-content:center;gap:9px;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;padding:15px 18px;border-radius:12px;transition:transform .2s,box-shadow .2s,filter .2s;color:#04121a;background:linear-gradient(120deg,var(--c),rgba(var(--crgb),.75));}
.pl-card[data-k="enterprise"] .pl-cta{color:#fff;}
.pl-card.pop .pl-cta{color:#04121a;}
.pl-cta:hover{transform:translateY(-2px);box-shadow:0 14px 32px -12px rgba(var(--crgb),.85);filter:brightness(1.06);}
.pl-cta svg{width:14px;height:14px;}
@media(prefers-reduced-motion:reduce){.pl-card{animation:none!important;opacity:1!important;transform:none!important;}.pl-card:hover{transform:none!important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-plan-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-plan-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function esc(t){return(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function cardHTML(t) {
    return '<div class="pl-card' + (t.popular ? " pop" : "") + '" data-k="' + t.key + '" style="--c:' + t.color + ';--crgb:' + t.rgb + '"><span class="pl-corner"></span>'
      + (t.popular ? '<span class="pl-badge">Popular</span>' : '')
      + '<div class="pl-emb"><span>' + t.name.slice(0, 2).toUpperCase() + '</span></div>'
      + '<div class="pl-tier">' + esc(t.name) + '</div>'
      + '<div class="pl-price"><b>' + esc(t.price) + '</b>' + (t.per ? '<span class="per">' + esc(t.per) + '</span>' : '') + '</div>'
      + '<div class="pl-tag">' + esc(t.tagline) + '</div>'
      + '<ul class="pl-feats">' + t.feats.map(function (f) { return '<li class="pl-feat"><i>' + IC_CHK + '</i><span>' + esc(f) + '</span></li>'; }).join("") + '</ul>'
      + '<a class="pl-cta" href="' + t.link + '"' + (/^http/.test(t.link) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(t.cta) + ' ' + IC_ARR + '</a>'
      + '</div>';
  }

  function buildPlans(c) {
    if (!c) return;
    if (c.dataset.ptPlan === "1" && c.querySelector(".pl-card")) return;
    c.dataset.ptPlan = "1";
    c.classList.add("pt-plan");
    c.innerHTML = '<div class="pt-plan-head"><div class="pt-plan-eyebrow">// full · stack · activation</div>'
      + '<h3 class="pt-plan-title">Соберите свою Legal AI OS</h3>'
      + '<p class="pt-plan-sub">Подключайте отдельные модули или весь стек. Полный комплект — со скидкой 30% и приоритетной поддержкой команды «ТехнологИИ права».</p></div>'
      + '<div class="pt-plan-grid">' + TIERS.map(cardHTML).join("") + '</div>';
  }

  function findContainer() {
    if (!document.body) return null;
    // «Соберите свою<br>Legal AI OS» → в textContent «Соберите своюLegal AI OS» (без пробела)
    var hs = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4"));
    var h = null;
    for (var i = 0; i < hs.length; i++) { if (/Соберите\s*свою/i.test(hs[i].textContent || "")) { h = hs[i]; break; } }
    if (!h) return null;
    var sec = h.closest("section"); if (!sec) return null;
    if (sec.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
    return sec.querySelector(":scope > div");
  }

  function apply() { injectCSS(); var c = findContainer(); if (c) buildPlans(c); }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 250) { clearInterval(iv); setInterval(apply, 1200); } }, 200); /* прогрев → вечный пульс */
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () { var c = findContainer(); if (c && (c.dataset.ptPlan !== "1" || !c.querySelector(".pl-card"))) buildPlans(c); });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

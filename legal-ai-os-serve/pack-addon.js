/* ============================================================
   PACK / PLATES ADD-ON — облегчает большие «жирные» CTA-плашки
   (центрированные .glass-коробки с eyebrow + крупным заголовком +
   описанием + кнопкой, много пустоты). Заменяет их на единый
   дизайн V2 «минимал-строка»: тонкая градиент-черта, eyebrow,
   компактный заголовок, кнопка + мета. Легко и воздушно.

   Обрабатывает ВСЕ 3 такие плашки:
   • // pack · download   — «Скачайте набор из 7 чек-листов» (Чек-листы)
   • // enrollment · open — «Начните путь в академии» (Академия)
   • // platform · access — «Подключите команду к тренажёрам» (Обучение)

   Статичные блоки: только ссылка <a> + CSS-анимации входа →
   переживают гидрацию dc-runtime нативно (нет JS-обработчиков).
   Заменяем содержимое контейнера секции целиком (убираем .glass).
   Anchor — исходный заголовок; при пересборке артефакта оригинал
   вернётся и снова заменится; dataset-гард от повторной сборки.
   ============================================================ */
(function () {
  if (window.__ptPack) return;
  window.__ptPack = true;

  var IC_ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

  // anchor — уникальный кусок исходного заголовка (по нему находим оригинал)
  var PLATES = [
    {anchor:"Скачайте набор", eyebrow:"// pack · download",
     title:'Набор из <b>7 чек-листов</b> — забирайте',
     desc:"PDF и редактируемые версии для команды. Бесплатно, по запросу в боте.",
     btn:"Получить в @NeuroPravo_Bot", href:"https://t.me/NeuroPravo_Bot", meta:"PDF · 214 пунктов"},
    {anchor:"Начните путь", eyebrow:"// enrollment · open",
     title:'Начните путь в <b>академии</b>',
     desc:"Активируйте бесплатный диагностический модуль и узнайте, с какого уровня стартовать.",
     btn:"Открыть @NeuroPravo_Bot", href:"https://t.me/NeuroPravo_Bot", meta:"диагностика · бесплатно"},
    {anchor:"Подключите команду", eyebrow:"// platform · access",
     title:'Подключите команду к <b>тренажёрам</b>',
     desc:"Демо-доступ на 14 дней — без оплаты. Группа от 3 человек. Свои сценарии — на тарифе Pro.",
     btn:"Запросить демо", href:"mailto:pravotechhub@mail.ru", meta:"демо · 14 дней"}
  ];

  var CSS = `
.pt-pack{max-width:760px;margin:0 auto;text-align:center;font-family:'Space Grotesk',system-ui,sans-serif;--cyan:#00E5FF;--grn:#4ADE80;--desc:#9aa3b4;--meta:#6b7385;}
.pt-pack *{box-sizing:border-box;}
.pt-pack .pk-rule{width:52px;height:2px;margin:0 auto 22px;border-radius:2px;background:linear-gradient(90deg,var(--grn),var(--cyan));opacity:0;animation:ptPkR .5s ease forwards;}
@keyframes ptPkR{to{opacity:1}}
.pt-pack .pk-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--cyan);margin-bottom:16px;opacity:0;animation:ptPkU .5s cubic-bezier(.22,.61,.36,1) .05s forwards;}
.pt-pack .pk-title{font-weight:600;font-size:clamp(24px,3.2vw,34px);line-height:1.12;letter-spacing:-.015em;margin:0 0 14px;color:#fff;opacity:0;animation:ptPkU .5s cubic-bezier(.22,.61,.36,1) .1s forwards;}
.pt-pack .pk-title b{color:var(--cyan);font-weight:600;}
.pt-pack .pk-desc{font-size:14.5px;line-height:1.55;color:var(--desc);margin:0 auto 26px;max-width:460px;opacity:0;animation:ptPkU .5s cubic-bezier(.22,.61,.36,1) .16s forwards;}
@keyframes ptPkU{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.pt-pack .pk-row{display:inline-flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center;opacity:0;animation:ptPkU .5s cubic-bezier(.22,.61,.36,1) .22s forwards;}
.pt-pack .pk-cta{display:inline-flex;align-items:center;gap:9px;font-weight:600;font-size:14.5px;text-decoration:none;color:#04121a;background:var(--cyan);border-radius:11px;padding:13px 20px;box-shadow:0 12px 34px -12px rgba(0,229,255,.55);transition:transform .2s,box-shadow .2s;}
.pt-pack .pk-cta:hover{transform:translateY(-2px);box-shadow:0 16px 40px -12px rgba(0,229,255,.75);}
.pt-pack .pk-cta svg{width:15px;height:15px;}
.pt-pack .pk-meta{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--meta);letter-spacing:.04em;}
.pt-pack .pk-meta i{width:6px;height:6px;border-radius:50%;background:var(--grn);}
@media(prefers-reduced-motion:reduce){.pt-pack .pk-rule,.pt-pack .pk-eyebrow,.pt-pack .pk-title,.pt-pack .pk-desc,.pt-pack .pk-row{animation:none !important;opacity:1 !important;transform:none !important;}.pt-pack .pk-cta:hover{transform:none !important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-pack-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-pack-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }
  function ext(h){ return /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : ''; }

  function buildPlate(c, p) {
    if (!c) return;
    if (c.dataset.ptPack === "1" && c.querySelector(".pt-pack")) return;
    c.dataset.ptPack = "1";
    c.innerHTML = '<div class="pt-pack">'
      + '<div class="pk-rule"></div>'
      + '<div class="pk-eyebrow">' + p.eyebrow + '</div>'
      + '<h3 class="pk-title">' + p.title + '</h3>'
      + '<p class="pk-desc">' + p.desc + '</p>'
      + '<div class="pk-row"><a class="pk-cta" href="' + p.href + '"' + ext(p.href) + '>' + p.btn + ' ' + IC_ARR + '</a>'
      + (p.meta ? '<span class="pk-meta"><i></i> ' + p.meta + '</span>' : '')
      + '</div></div>';
  }

  function findContainer(anchor) {
    if (!document.body) return null;
    var hs = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4"));
    var h = null;
    for (var i = 0; i < hs.length; i++) { if ((hs[i].textContent || "").indexOf(anchor) >= 0) { h = hs[i]; break; } }
    if (!h) return null;
    var sec = h.closest("section"); if (!sec) return null;
    if (sec.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
    return sec.querySelector(":scope > div");
  }

  function apply() {
    injectCSS();
    for (var i = 0; i < PLATES.length; i++) {
      var c = findContainer(PLATES[i].anchor);
      if (c) buildPlate(c, PLATES[i]);
    }
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 250) { clearInterval(iv); setInterval(apply, 1200); } }, 200); /* прогрев → вечный пульс */
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(apply);
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

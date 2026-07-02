/* ============================================================
   PRODHERO ADD-ON — хиро таба Продукты (секция-интро
   «Продукты · цифровой арсенал · юриста БФЛ»).
   Было: фейковый «// ACTIVATION · KEY · PT-26·9F·BX21·07 · ACTIVE»
   (выглядел игрушечно и ничего не значил) + пустота.
   Стало: дизайн V2 — слева заголовок + описание + «Активировать»,
   справа быстрая навигация по 6 модулям (иконка + название +
   free/pro/подписка, цвет по типу). Убран фейк-ключ и sci-fi-
   маркер «MARKETPLACE · HOLOGRAPHIC · V3». Тело крупнее (16px),
   контраст выше, mono только в eyebrow/тегах.

   Статичная разметка (ссылка + чипы + CSS-hover) → переживает
   гидрацию dc-runtime нативно. Заменяем содержимое контейнера
   секции. Anchor «цифровой арсенал» (в нашей разметке он есть →
   рекурсию гасит dataset-гард).
   ============================================================ */
(function () {
  if (window.__ptPhero) return;
  window.__ptPhero = true;

  var IC = {
    ai:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-4.5A8.4 8.4 0 1 1 21 11.5Z"/></svg>',
    tpl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    tr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
    cl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></svg>',
    rs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
    ac:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 3 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg>'
  };
  var IC_ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var MODS = [
    {n:"AI-помощник", t:"бесплатно", ic:IC.ai, c:"c-cy"},
    {n:"Шаблоны",     t:"pro",       ic:IC.tpl,c:"c-cy"},
    {n:"Тренажёры",   t:"pro",       ic:IC.tr, c:"c-cy"},
    {n:"Чек-листы",   t:"бесплатно", ic:IC.cl, c:"c-gr"},
    {n:"Исследования",t:"подписка",  ic:IC.rs, c:"c-am"},
    {n:"Курсы",       t:"подписка",  ic:IC.ac, c:"c-vi"}
  ];

  var CSS = `
.pt-phero{max-width:1240px;margin:0 auto;font-family:'Space Grotesk',system-ui,sans-serif;--cyan:#00E5FF;--grn:#4ADE80;--amber:#F0B84B;--vio:#A78BFA;--desc:#aeb4c0;--meta:#8891a3;--dim:#7d8492;--line:rgba(255,255,255,.08);}
.pt-phero *{box-sizing:border-box;}
.pt-phero .ph-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,56px);align-items:center;}
@media(max-width:900px){.pt-phero .ph-grid{grid-template-columns:1fr;gap:32px;}}
.pt-phero .ph-eyebrow{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--cyan);margin-bottom:22px;}
.pt-phero .ph-title{font-weight:700;font-size:clamp(38px,5.6vw,66px);line-height:1.02;letter-spacing:-.03em;margin:0 0 24px;color:#fff;}
.pt-phero .ph-title .a{color:var(--cyan);}
.pt-phero .ph-title .b{color:var(--dim);}
.pt-phero .ph-desc{font-size:16px;line-height:1.6;color:var(--desc);margin:0 0 30px;max-width:48ch;}
.pt-phero .ph-cta{display:inline-flex;align-items:center;gap:10px;font-weight:600;font-size:15.5px;text-decoration:none;color:#04121a;background:var(--cyan);border-radius:12px;padding:15px 24px;box-shadow:0 0 0 1px rgba(0,229,255,.35),0 16px 44px -14px rgba(0,229,255,.55);transition:transform .2s,box-shadow .2s;}
.pt-phero .ph-cta:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(0,229,255,.45),0 20px 50px -14px rgba(0,229,255,.75);}
.pt-phero .ph-cta svg{width:16px;height:16px;}
.pt-phero .ph-mods{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
@media(max-width:460px){.pt-phero .ph-mods{grid-template-columns:1fr;}}
.pt-phero .ph-mod{--c:var(--cyan);--crgb:0,229,255;position:relative;display:flex;align-items:center;gap:12px;padding:15px 16px;border-radius:13px;border:1px solid var(--line);background:linear-gradient(150deg,rgba(var(--crgb),.05),rgba(255,255,255,.012) 60%);transition:transform .22s cubic-bezier(.22,.61,.36,1),border-color .22s,box-shadow .22s;}
.pt-phero .ph-mod:hover{transform:translateY(-3px);border-color:rgba(var(--crgb),.4);box-shadow:0 14px 32px -16px rgba(var(--crgb),.5);}
.pt-phero .ph-mod.c-cy{--c:var(--cyan);--crgb:0,229,255;}.pt-phero .ph-mod.c-gr{--c:var(--grn);--crgb:74,222,128;}.pt-phero .ph-mod.c-am{--c:var(--amber);--crgb:240,184,75;}.pt-phero .ph-mod.c-vi{--c:var(--vio);--crgb:167,139,250;}
.pt-phero .ph-mi{width:38px;height:38px;flex:none;border-radius:10px;border:1px solid rgba(var(--crgb),.3);background:rgba(var(--crgb),.1);display:flex;align-items:center;justify-content:center;}
.pt-phero .ph-mi svg{width:19px;height:19px;color:var(--c);}
.pt-phero .ph-mm{flex:1;min-width:0;}
.pt-phero .ph-mn{font-size:14.5px;font-weight:500;line-height:1.2;letter-spacing:-.005em;color:#fff;}
.pt-phero .ph-mt{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--c);margin-top:3px;}
@media(prefers-reduced-motion:reduce){.pt-phero .ph-cta:hover,.pt-phero .ph-mod:hover{transform:none;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-phero-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-phero-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }

  function buildHero(c) {
    if (!c) return;
    if (c.dataset.ptPhero === "1" && c.querySelector(".pt-phero")) return;
    c.dataset.ptPhero = "1";
    var mods = MODS.map(function (m) {
      return '<div class="ph-mod ' + m.c + '"><div class="ph-mi">' + m.ic + '</div><div class="ph-mm"><div class="ph-mn">' + m.n + '</div><div class="ph-mt">' + m.t + '</div></div></div>';
    }).join("");
    c.innerHTML = '<div class="pt-phero"><div class="ph-grid">'
      + '<div class="ph-main">'
      +   '<div class="ph-eyebrow">// продукты · 07</div>'
      +   '<h1 class="ph-title">Продукты<br><span class="a">цифровой арсенал</span><br><span class="b">юриста БФЛ</span></h1>'
      +   '<p class="ph-desc">Шесть модулей под практические задачи. Подключайте только то, что нужно практике — старт бесплатно, в Telegram.</p>'
      +   '<a class="ph-cta" href="https://t.me/NeuroPravo_Bot" target="_blank" rel="noopener">Активировать @NeuroPravo_Bot ' + IC_ARR + '</a>'
      + '</div>'
      + '<div class="ph-mods">' + mods + '</div>'
      + '</div></div>';
  }

  function findContainer() {
    if (!document.body) return null;
    var hs = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4"));
    var h = null;
    for (var i = 0; i < hs.length; i++) { if (/цифровой\s*арсенал/i.test(hs[i].textContent || "")) { h = hs[i]; break; } }
    if (!h) return null;
    var sec = h.closest("section"); if (!sec) return null;
    if (sec.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
    return sec.querySelector(":scope > div");
  }

  function apply() { injectCSS(); var c = findContainer(); if (c) buildHero(c); }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 250) { clearInterval(iv); setInterval(apply, 1200); } }, 200); /* прогрев → вечный пульс */
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () { var c = findContainer(); if (c) buildHero(c); });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

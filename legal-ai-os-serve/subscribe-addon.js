/* ============================================================
   SUBSCRIBE ADD-ON — блок «Подписка на исследования» (таб
   Исследования, секция «subscription · research feed»).
   Было: большая «жирная» .glass-коробка (2-кол, много пустоты).
   Стало: единый минимал-стиль (как pack-плашки) — тонкая
   градиент-черта, eyebrow, компактный заголовок, описание +
   аккуратная форма (email + «Подписаться»). Легко и воздушно.

   Форма без бэкенда: <form action="mailto:…"> — по «Подписаться»
   открывается письмо команде (email пользователя уходит отправителем).
   Статичная разметка + CSS-анимации входа → переживает гидрацию
   dc-runtime нативно. Anchor — заголовок; dataset-гард от повторной
   сборки; наш заголовок содержит якорь → рекурсию гасит гард.
   ============================================================ */
(function () {
  if (window.__ptSub) return;
  window.__ptSub = true;

  var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
.pt-sub{max-width:620px;margin:0 auto;text-align:center;font-family:'Space Grotesk',system-ui,sans-serif;--cyan:#00E5FF;--grn:#4ADE80;--desc:#9aa3b4;--meta:#6b7385;--line:rgba(255,255,255,.14);}
.pt-sub *{box-sizing:border-box;}
.pt-sub .sb-rule{width:52px;height:2px;margin:0 auto 22px;border-radius:2px;background:linear-gradient(90deg,var(--grn),var(--cyan));opacity:0;animation:ptSbR .5s ease forwards;}
@keyframes ptSbR{to{opacity:1}}
.pt-sub .sb-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--cyan);margin-bottom:16px;opacity:0;animation:ptSbU .5s cubic-bezier(.22,.61,.36,1) .05s forwards;}
.pt-sub .sb-title{font-weight:600;font-size:clamp(24px,3.2vw,34px);line-height:1.12;letter-spacing:-.015em;margin:0 0 14px;color:#fff;opacity:0;animation:ptSbU .5s cubic-bezier(.22,.61,.36,1) .1s forwards;}
.pt-sub .sb-title b{color:var(--cyan);font-weight:600;}
.pt-sub .sb-desc{font-size:14.5px;line-height:1.55;color:var(--desc);margin:0 auto 24px;max-width:460px;opacity:0;animation:ptSbU .5s cubic-bezier(.22,.61,.36,1) .16s forwards;}
@keyframes ptSbU{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.pt-sub .sb-form{display:flex;gap:10px;max-width:470px;margin:0 auto;opacity:0;animation:ptSbU .5s cubic-bezier(.22,.61,.36,1) .22s forwards;}
.pt-sub .sb-input{flex:1;min-width:0;padding:14px 16px;background:rgba(7,8,11,.5);border:1px solid var(--line);border-radius:11px;color:#fff;font-family:inherit;font-size:14.5px;outline:none;transition:border-color .2s,box-shadow .2s;}
.pt-sub .sb-input::placeholder{color:var(--meta);}
.pt-sub .sb-input:focus{border-color:rgba(0,229,255,.5);box-shadow:0 0 0 3px rgba(0,229,255,.12);}
.pt-sub .sb-btn{flex:none;display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:14.5px;font-family:inherit;color:#04121a;background:var(--cyan);border:0;border-radius:11px;padding:0 20px;cursor:pointer;box-shadow:0 12px 34px -12px rgba(0,229,255,.55);transition:transform .2s,box-shadow .2s;}
.pt-sub .sb-btn:hover{transform:translateY(-2px);box-shadow:0 16px 40px -12px rgba(0,229,255,.75);}
.pt-sub .sb-btn svg{width:15px;height:15px;}
.pt-sub .sb-note{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--meta);letter-spacing:.04em;margin-top:14px;opacity:0;animation:ptSbU .5s cubic-bezier(.22,.61,.36,1) .28s forwards;}
@media(max-width:520px){.pt-sub .sb-form{flex-direction:column;}.pt-sub .sb-btn{padding:14px 20px;justify-content:center;}}
@media(prefers-reduced-motion:reduce){.pt-sub .sb-rule,.pt-sub .sb-eyebrow,.pt-sub .sb-title,.pt-sub .sb-desc,.pt-sub .sb-form,.pt-sub .sb-note{animation:none !important;opacity:1 !important;transform:none !important;}.pt-sub .sb-btn:hover{transform:none !important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-sub-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-sub-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }

  function buildSub(c) {
    if (!c) return;
    if (c.dataset.ptSub === "1" && c.querySelector(".pt-sub")) return;
    c.dataset.ptSub = "1";
    c.innerHTML = '<div class="pt-sub">'
      + '<div class="sb-rule"></div>'
      + '<div class="sb-eyebrow">// subscription · research feed</div>'
      + '<h3 class="sb-title">Подписка на <b>исследования</b></h3>'
      + '<p class="sb-desc">Свежие отчёты, разборы и датасеты по рынку БФЛ — первыми. Раз в две недели, на email.</p>'
      + '<form class="sb-form" action="mailto:pravotechhub@mail.ru" method="get" target="_blank">'
      +   '<input class="sb-input" type="email" name="email" required placeholder="ivan@firm.ru" autocomplete="email">'
      +   '<button class="sb-btn" type="submit">Подписаться <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>'
      + '</form>'
      + '<div class="sb-note">// раз в 2 недели · без спама</div>'
      + '</div>';
  }

  function findContainer() {
    if (!document.body) return null;
    var hs = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4"));
    var h = null;
    for (var i = 0; i < hs.length; i++) { if (/Подписка\s*на\s*исследования/i.test(hs[i].textContent || "")) { h = hs[i]; break; } }
    if (!h) return null;
    var sec = h.closest("section"); if (!sec) return null;
    if (sec.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
    return sec.querySelector(":scope > div");
  }

  function apply() { injectCSS(); var c = findContainer(); if (c) buildSub(c); }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 250) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () { var c = findContainer(); if (c) buildSub(c); });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 60000);
  } catch (e) {}
})();

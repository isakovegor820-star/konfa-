/* ============================================================
   CTA ADD-ON — блок «Скачать книгу в @NeuroPravo_Bot» (таб Книга).
   Вариант «Telegram-мокап»: слева текст+кнопки+3 шага, справа
   стилизованный чат с ботом (/book → PDF), сообщения печатаются.
   Заменяет содержимое 2-колоночной сетки внутри .glass-рамки.
   Поиск по «Отправить на email», recursion-гард, без блобов.
   ============================================================ */
(function () {
  if (window.__ptCta) return;
  window.__ptCta = true;

  var HTML = `
<div class="ntg-grid">
  <div class="ntg-left">
    <p class="ntg-eyebrow">// ACCESS · VIA · TELEGRAM</p>
    <h3 class="ntg-title">Скачать книгу в <span class="ntg-handle">@NeuroPravo_Bot</span></h3>
    <p class="ntg-desc">PDF на 117 страниц, исходники шаблонов, чек-листы и обновления — всё внутри телеграм-бота, бесплатно.</p>
    <div class="ntg-btns">
      <a href="https://t.me/NeuroPravo_Bot" target="_blank" rel="noopener" class="ntg-btn ntg-btn--primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21.5 4.5 2.8 11.4c-.9.34-.88 1.62.03 1.93l4.7 1.6 1.8 5.4c.27.8 1.32.97 1.83.3l2.5-3.3 4.7 3.5c.6.45 1.47.12 1.63-.62l3.2-14.9c.18-.86-.66-1.6-1.49-1.31Z" fill="#04121a"/></svg>
        Открыть бота
        <svg class="ntg-arrow" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" stroke="#04121a" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
      <button type="button" class="ntg-btn ntg-btn--ghost">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#9aa3b4" stroke-width="1.7"/><path d="m4 7 8 6 8-6" stroke="#00E5FF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Отправить на email
      </button>
    </div>
    <div class="ntg-steps">
      <span class="ntg-step"><span class="ntg-num">01</span> Откройте <span class="ntg-cmd">@NeuroPravo_Bot</span></span>
      <span class="ntg-step"><span class="ntg-num">02</span> Команда <span class="ntg-cmd">/book</span></span>
      <span class="ntg-step ntg-step--accent"><span class="ntg-num">03</span> Получите PDF · 117 стр.</span>
    </div>
  </div>
  <div class="ntg-right">
    <div class="ntg-chat" role="img" aria-label="Мокап телеграм-чата: пользователь отправляет /book, бот NeuroPravo присылает PDF на 117 страниц.">
      <div class="ntg-chat-head">
        <div class="ntg-avatar"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="3.2" stroke="#00E5FF" stroke-width="1.6"/><circle cx="9" cy="13" r="1.4" fill="#00E5FF"/><circle cx="15" cy="13" r="1.4" fill="#00E5FF"/><path d="M12 4v3M8.5 19v1.5M15.5 19v1.5" stroke="#00E5FF" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="3.4" r="1.1" fill="#00E5FF"/></svg></div>
        <div>
          <div class="ntg-chat-name">NeuroPravo</div>
          <div class="ntg-chat-status"><span class="ntg-online-dot"></span>online</div>
        </div>
        <svg class="ntg-tg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21.5 4.5 2.8 11.4c-.9.34-.88 1.62.03 1.93l4.7 1.6 1.8 5.4c.27.8 1.32.97 1.83.3l2.5-3.3 4.7 3.5c.6.45 1.47.12 1.63-.62l3.2-14.9c.18-.86-.66-1.6-1.49-1.31Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      </div>
      <div class="ntg-chat-body">
        <div class="ntg-msg ntg-msg--user" style="--d:.15s"><div class="ntg-bubble">/book</div></div>
        <div class="ntg-typing"><span></span><span></span><span></span></div>
        <div class="ntg-msg ntg-msg--bot ntg-bot-msg" style="--d:1.25s; display:none">
          <div class="ntg-bubble">
            <span class="ntg-bubble-text"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H17a2 2 0 0 1 2 2v15.2a.8.8 0 0 1-1.16.71L12 18l-5.84 2.91A.8.8 0 0 1 5 20.2V4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>Держите вашу книгу</span>
            <div class="ntg-pdf">
              <div class="ntg-pdf-doc"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 3v5h5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 13.5h7M8.5 16.5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>
              <div><div class="ntg-pdf-title">Банкротство физических лиц</div><div class="ntg-pdf-meta">PDF<span class="ntg-pdf-dot"></span>117 стр.<span class="ntg-pdf-dot"></span>4.2 MB</div></div>
            </div>
          </div>
        </div>
        <div class="ntg-sent ntg-msg ntg-sent-msg" style="--d:1.55s; display:none"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 12 5 5L20 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>отправлено</div>
      </div>
    </div>
  </div>
</div>`;

  var CSS = `
.ntg-host{--ntg-cyan:#00E5FF;--ntg-magenta:#FF2E9A;--ntg-white:#f4f7fb;--ntg-desc:#9aa3b4;--ntg-meta:#5f6878;--ntg-glass:rgba(255,255,255,.04);--ntg-glass-line:rgba(255,255,255,.09);font-family:'Space Grotesk',system-ui,sans-serif;display:block !important;width:100%;}
.ntg-host *,.ntg-host *::before,.ntg-host *::after{box-sizing:border-box;}
.ntg-host .ntg-grid{display:grid !important;grid-template-columns:1.05fr .95fr !important;gap:clamp(32px,5vw,64px) !important;align-items:center;width:100%;}
@media(max-width:760px){ .ntg-host .ntg-grid{grid-template-columns:1fr !important;gap:40px !important;} }

.ntg-host .ntg-eyebrow{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;line-height:1.5;letter-spacing:.22em;text-transform:uppercase;color:var(--ntg-cyan);margin:0 0 24px;display:inline-flex;align-items:center;gap:8px;}
.ntg-host .ntg-eyebrow::before{content:"";width:24px;height:1px;background:linear-gradient(90deg,transparent,var(--ntg-cyan));}
.ntg-host .ntg-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(28px,3.4vw,40px);line-height:1.18;letter-spacing:-.015em;margin:0 0 16px;color:var(--ntg-white);}
.ntg-host .ntg-title .ntg-handle{color:var(--ntg-cyan);font-variant-numeric:tabular-nums;}
.ntg-host .ntg-desc{font-size:16px;font-weight:400;line-height:1.6;color:var(--ntg-desc);margin:0 0 32px;max-width:30em;font-variant-numeric:tabular-nums;}
.ntg-host .ntg-btns{display:flex;flex-wrap:wrap;gap:16px;margin:0 0 32px;}
.ntg-host .ntg-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 24px;border-radius:12px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;line-height:1.5;letter-spacing:.005em;cursor:pointer;text-decoration:none;border:1px solid transparent;transition:transform .2s ease-out,box-shadow .25s ease-out,background-color .2s ease-out,border-color .2s ease-out;white-space:nowrap;}
.ntg-host .ntg-btn svg{display:block;flex:none;}
.ntg-host .ntg-btn:focus-visible{outline:2px solid var(--ntg-cyan);outline-offset:3px;}
.ntg-host .ntg-btn--primary{background:var(--ntg-cyan);color:#04121a;}
.ntg-host .ntg-btn--primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px -10px rgba(0,229,255,.55);background:#2bedff;}
.ntg-host .ntg-btn--primary .ntg-arrow{transition:transform .2s ease-out;}
.ntg-host .ntg-btn--primary:hover .ntg-arrow{transform:translateX(4px);}
.ntg-host .ntg-btn--ghost{background:var(--ntg-glass);color:var(--ntg-white);border-color:var(--ntg-glass-line);}
.ntg-host .ntg-btn--ghost:hover{transform:translateY(-2px);border-color:rgba(0,229,255,.45);background:rgba(0,229,255,.07);}

.ntg-host .ntg-steps{display:flex;flex-wrap:wrap;gap:12px 24px;padding-top:24px;border-top:1px solid var(--ntg-glass-line);}
.ntg-host .ntg-step{display:inline-flex;align-items:baseline;gap:8px;font-family:'JetBrains Mono',monospace;font-weight:400;font-size:12.5px;line-height:1.5;color:var(--ntg-desc);font-variant-numeric:tabular-nums;}
.ntg-host .ntg-step .ntg-num{font-weight:500;font-size:12px;letter-spacing:.08em;color:var(--ntg-cyan);}
.ntg-host .ntg-step--accent .ntg-num{color:var(--ntg-magenta);}
.ntg-host .ntg-step--accent{color:#c9b3c4;}
.ntg-host .ntg-step .ntg-cmd{color:var(--ntg-white);}

.ntg-host .ntg-chat{position:relative;background:rgba(11,14,24,.72);border:1px solid var(--ntg-glass-line);border-radius:24px;overflow:hidden;box-shadow:0 30px 70px -34px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.04);max-width:420px;margin:0 auto;}
.ntg-host .ntg-chat::before{content:"";position:absolute;inset:0;border-radius:24px;padding:1px;background:linear-gradient(150deg,rgba(0,229,255,.40),transparent 38%,transparent 70%,rgba(255,46,154,.26));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
.ntg-host .ntg-chat-head{display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid var(--ntg-glass-line);background:rgba(255,255,255,.015);}
.ntg-host .ntg-avatar{width:40px;height:40px;border-radius:50%;flex:none;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#0a3a44,#06222a);border:1px solid rgba(0,229,255,.45);}
.ntg-host .ntg-avatar svg{width:22px;height:22px;}
.ntg-host .ntg-chat-name{font-weight:600;font-size:14.5px;color:var(--ntg-white);line-height:1.5;}
.ntg-host .ntg-chat-status{font-family:'JetBrains Mono',monospace;font-weight:300;font-size:11px;line-height:1.5;letter-spacing:.04em;color:var(--ntg-cyan);display:inline-flex;align-items:center;gap:6px;margin-top:2px;}
.ntg-host .ntg-online-dot{width:6px;height:6px;border-radius:50%;background:var(--ntg-cyan);}
.ntg-host .ntg-chat-head .ntg-tg-icon{margin-left:auto;color:var(--ntg-meta);}
.ntg-host .ntg-chat-body{padding:24px 16px;display:flex;flex-direction:column;gap:16px;min-height:256px;}
.ntg-host .ntg-msg{max-width:84%;opacity:0;transform:translateY(10px);}
.ntg-host.ntg-anim .ntg-msg{animation:ntg-pop .42s cubic-bezier(.2,.7,.3,1) forwards;}
.ntg-host .ntg-msg--user{align-self:flex-end;}
.ntg-host .ntg-msg--bot{align-self:flex-start;}
.ntg-host .ntg-bubble{padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.5;}
.ntg-host .ntg-msg--user .ntg-bubble{background:rgba(0,229,255,.14);border:1px solid rgba(0,229,255,.32);border-bottom-right-radius:4px;color:#d6fbff;font-family:'JetBrains Mono',monospace;font-weight:400;letter-spacing:.02em;}
.ntg-host .ntg-msg--bot .ntg-bubble{background:rgba(255,255,255,.05);border:1px solid var(--ntg-glass-line);border-bottom-left-radius:4px;color:var(--ntg-desc);}
.ntg-host .ntg-bubble-text{display:inline-flex;align-items:center;gap:7px;}
.ntg-host .ntg-bubble-text svg{flex:none;color:var(--ntg-cyan);}
.ntg-host .ntg-typing{align-self:flex-start;display:inline-flex;gap:5px;padding:12px 16px;background:rgba(255,255,255,.05);border:1px solid var(--ntg-glass-line);border-radius:16px;border-bottom-left-radius:4px;}
.ntg-host .ntg-typing span{width:6px;height:6px;border-radius:50%;background:var(--ntg-meta);display:block;opacity:.85;}
.ntg-host.ntg-anim .ntg-typing span{animation:ntg-wave 1s ease-in-out 6;}
.ntg-host .ntg-typing span:nth-child(2){animation-delay:.15s;}
.ntg-host .ntg-typing span:nth-child(3){animation-delay:.3s;}
.ntg-host .ntg-pdf{display:flex;align-items:center;gap:12px;margin-top:12px;padding:12px;background:rgba(255,255,255,.04);border:1px solid var(--ntg-glass-line);border-radius:12px;}
.ntg-host .ntg-pdf-doc{width:42px;height:50px;flex:none;border-radius:8px;display:grid;place-items:center;background:linear-gradient(160deg,rgba(0,229,255,.16),rgba(0,229,255,.04));border:1px solid rgba(0,229,255,.30);color:var(--ntg-cyan);}
.ntg-host .ntg-pdf-doc svg{width:22px;height:22px;}
.ntg-host .ntg-pdf-title{font-weight:600;font-size:13.5px;color:var(--ntg-white);line-height:1.5;}
.ntg-host .ntg-pdf-meta{font-family:'JetBrains Mono',monospace;font-weight:400;font-size:11px;line-height:1.5;letter-spacing:.05em;text-transform:uppercase;color:var(--ntg-meta);margin-top:4px;font-variant-numeric:tabular-nums;display:inline-flex;align-items:center;gap:7px;}
.ntg-host .ntg-pdf-meta .ntg-pdf-dot{width:3px;height:3px;border-radius:50%;background:var(--ntg-meta);}
.ntg-host .ntg-sent{align-self:flex-start;display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-weight:300;font-size:11px;line-height:1.5;letter-spacing:.06em;text-transform:uppercase;color:var(--ntg-meta);}
.ntg-host .ntg-sent svg{color:var(--ntg-cyan);}
@keyframes ntg-pop{to{opacity:1;transform:translateY(0);}}
@keyframes ntg-wave{0%,100%{transform:translateY(0);}40%{transform:translateY(-3px);}}
@media(prefers-reduced-motion:reduce){
  .ntg-host.ntg-anim .ntg-msg,.ntg-host.ntg-anim .ntg-typing span,.ntg-host .ntg-btn,.ntg-host .ntg-btn .ntg-arrow{animation:none !important;transition:none !important;}
  .ntg-host .ntg-msg{opacity:1 !important;transform:none !important;}
  .ntg-host .ntg-typing{display:none !important;}
}
`;

  function injectCSS() {
    if (!document.getElementById("pt-cta-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-cta-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }

  function runChat(host) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var typing = host.querySelector(".ntg-typing");
    var bot = host.querySelector(".ntg-bot-msg");
    var sent = host.querySelector(".ntg-sent-msg");
    if (reduce) { if (bot) bot.style.display = ""; if (sent) sent.style.display = ""; if (typing) typing.style.display = "none"; return; }
    host.classList.add("ntg-anim");
    [].slice.call(host.querySelectorAll(".ntg-msg, .ntg-typing")).forEach(function (el) {
      el.style.animationDelay = el.style.getPropertyValue("--d") || "0s";
    });
    setTimeout(function () {
      if (typing) typing.style.display = "none";
      if (bot) { bot.style.display = ""; bot.style.animationDelay = "0s"; }
      if (sent) { sent.style.display = ""; sent.style.animationDelay = ".25s"; }
    }, 1150);
  }

  function findGrid() {
    if (document.querySelector(".ntg-host")) return null; /* уже собрано */
    if (!document.body) return null;
    var anchor = [].slice.call(document.body.querySelectorAll("*")).filter(function (e) {
      var tg = e.tagName;
      return e.children.length === 0 && tg !== "SCRIPT" && tg !== "STYLE" && tg !== "TEMPLATE"
        && (e.textContent || "").indexOf("Отправить на email") >= 0;
    })[0];
    if (!anchor) return null;
    var n = anchor;
    for (var i = 0; i < 12 && n; i++) {
      if (n.className && /ntg-(host|grid)/.test(String(n.className))) return null; // уже наша разметка → стоп (от рекурсии)
      if (n.querySelector && n.querySelector('script[type^="__bundler"]')) return null;
      var p = n.parentElement;
      if (p && p.classList && p.classList.contains("grid-2-mobile")) return p; // 2-колоночная сетка блока
      n = p;
    }
    return null;
  }

  function render(grid) {
    if (!grid) return;
    if (grid.dataset.ptCta === "1" && grid.querySelector(".ntg-grid")) return;
    grid.dataset.ptCta = "1";
    grid.classList.add("ntg-host");
    grid.innerHTML = HTML;
    runChat(grid);
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
      if (g && (g.dataset.ptCta !== "1" || !g.querySelector(".ntg-grid"))) apply();
    });
    mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */
    /* observer живёт вечно */
  } catch (e) {}
})();

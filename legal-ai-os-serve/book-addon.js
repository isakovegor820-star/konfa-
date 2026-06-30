/* ============================================================
   BOOK ADD-ON — секция «Книга» (таб Книга).
   Заменяет статичную обложку на 3D-книгу, которая открывается
   по клику: обложка распахивается, видна страница «Глава 01 ·
   Банкротство физических лиц». Вписана в правую колонку секции.
   Поиск только в <body>, по «templates» (регистронезависимо,
   уникально для обложки), климб до правого столбца grid-2-mobile,
   без блоб-узлов (см. CLAUDE.md).
   ============================================================ */
(function () {
  if (window.__ptBook) return;
  window.__ptBook = true;

  // клик/клавиатура через делегирование на document — переживает пересборку
  // dc-runtime и ре-рендеры React (листенер на самом .bk иначе слетает).
  document.addEventListener("click", function (e) {
    var bk = e.target && e.target.closest ? e.target.closest(".bk") : null;
    if (bk) bk.classList.toggle("is-open");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = document.activeElement;
    if (el && el.classList && el.classList.contains("bk")) { e.preventDefault(); el.classList.toggle("is-open"); }
  });

  var HTML =
    '<div class="bk-scene"><div class="bk" role="button" tabindex="0" aria-label="Открыть книгу «Банкротство физических лиц»">'
    + '<div class="bk-thick"></div>'
    + '<div class="bk-page">'
      + '<p class="pg-ch">// Глава 01</p>'
      + '<h4 class="pg-h">Банкротство <b>физических лиц</b></h4>'
      + '<p class="pg-lead">Законный способ списать непосильные долги — кредиты, займы, налоги, расписки — под защитой суда (ФЗ-127).</p>'
      + '<p class="pg-sub">Кому подходит</p>'
      + '<ul><li>долг от 500 000 ₽ (меньше — упрощённо через МФЦ)</li><li>просрочка платежей более 90 дней</li></ul>'
      + '<p class="pg-sub">Что даёт</p>'
      + '<ul><li>списание долгов и стоп процентам, пеням, штрафам</li><li>защита от коллекторов и приставов</li></ul>'
      + '<div class="pg-foot"><span>ФЗ-127 · банкротство граждан</span><span>стр. 12</span></div>'
    + '</div>'
    + '<div class="bk-cover">'
      + '<div class="bk-face bk-front">'
        + '<div class="bk-top">Технологии права</div>'
        + '<div class="bk-ed">Издание · 2026 · V1</div>'
        + '<div class="bk-tt"><div class="t1">Банкротство</div><div class="t2">физических лиц</div>'
        + '<div class="bk-desc">Практическое руководство для юристов и арбитражных управляющих</div>'
        + '<div class="bk-meta"><div class="m">117 PAGES<br>06 CHAPTERS · 24 TEMPLATES</div><div class="bk-gem"><i></i></div></div></div>'
      + '</div>'
      + '<div class="bk-face bk-inner"><span class="ex">Из предисловия</span><div class="ln"></div>'
        + '<p class="q">«Банкротство — это не крах, а <b>законный перезапуск</b>. Эта книга — карта, как пройти его без ошибок.»</p></div>'
    + '</div>'
    + '</div>'
    + '<p class="bk-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v11a2.5 2.5 0 0 0-2.5-2.5H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v11a2.5 2.5 0 0 1 2.5-2.5H22z"/></svg>'
      + '<span class="o">Нажмите, чтобы открыть</span><span class="c">Нажмите, чтобы закрыть</span></p>'
    + '</div>';

  var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

.pt-book-col{--cyan:#00E5FF;--mag:#FF2E9A;font-family:'Space Grotesk',system-ui,sans-serif;}
.pt-book-col *{box-sizing:border-box;}
.bk-scene{position:relative;perspective:2200px;perspective-origin:50% 40%;width:100%;min-height:440px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;}
.bk{position:relative;width:clamp(232px,86%,290px);aspect-ratio:28/39;transform-style:preserve-3d;
  transform:rotateY(-26deg) rotateX(5deg);transition:transform .85s cubic-bezier(.25,.8,.25,1);cursor:pointer;outline:none;}
.bk:focus-visible{outline:2px solid var(--cyan);outline-offset:14px;border-radius:4px;}
.bk.is-open{transform:translateX(50%) rotateY(-12deg) rotateX(3deg);}

.bk-thick{position:absolute;top:5px;bottom:5px;right:-2px;width:22px;border-radius:3px;
  background:repeating-linear-gradient(90deg,#cdd6e6 0 2px,#aab4c6 2px 4px);
  transform:translateZ(-11px) translateX(11px) rotateY(90deg);transform-origin:right center;opacity:.8;}

.bk-page{position:absolute;inset:0;border-radius:5px 11px 11px 5px;overflow:hidden;
  background:linear-gradient(135deg,#161d31,#0e1322);border:1px solid rgba(255,255,255,.08);
  padding:26px 24px 24px 32px;box-shadow:inset 20px 0 30px -20px rgba(0,0,0,.85);}
.bk-page .pg-ch{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--cyan);margin:0 0 10px;}
.bk-page .pg-h{font-size:20px;font-weight:700;line-height:1.12;margin:0 0 11px;color:#fff;}
.bk-page .pg-h b{color:var(--cyan);font-weight:700;}
.bk-page .pg-lead{font-size:12px;line-height:1.5;color:#aeb6c4;margin:0 0 14px;}
.bk-page .pg-sub{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#7c879b;margin:0 0 7px;}
.bk-page ul{list-style:none;margin:0 0 13px;padding:0;display:grid;gap:7px;}
.bk-page li{position:relative;padding-left:18px;font-size:12px;line-height:1.38;color:#d7dce6;}
.bk-page li::before{content:"";position:absolute;left:0;top:5px;width:6px;height:6px;border-radius:2px;background:var(--cyan);transform:rotate(45deg);}
.bk-page .pg-foot{position:absolute;left:32px;right:24px;bottom:18px;border-top:1px solid rgba(255,255,255,.1);padding-top:10px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;color:#6f7a8e;display:flex;justify-content:space-between;}

.bk-cover{position:absolute;inset:0;transform-style:preserve-3d;transform-origin:left center;transition:transform 1s cubic-bezier(.32,.06,.2,1);z-index:3;}
.bk.is-open .bk-cover{transform:rotateY(-158deg);}
.bk-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:5px 11px 11px 5px;overflow:hidden;}
.bk-front{background:linear-gradient(150deg,#12203a 0%,#0b1326 55%,#0a0f1c 100%);border:1px solid rgba(120,160,220,.22);padding:26px 24px;display:flex;flex-direction:column;box-shadow:inset 0 0 0 1px rgba(0,229,255,.05),0 30px 70px -30px rgba(0,0,0,.8);}
.bk-front::before{content:"";position:absolute;left:0;top:0;bottom:0;width:12px;background:linear-gradient(90deg,rgba(0,0,0,.45),transparent);}
.bk-top{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);}
.bk-ed{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:#5f6c82;margin-top:7px;}
.bk-tt{margin-top:auto;}
.bk-tt .t1{font-size:25px;font-weight:700;line-height:1.04;color:#fff;}
.bk-tt .t2{font-size:25px;font-weight:700;line-height:1.04;color:var(--cyan);}
.bk-desc{font-size:11px;line-height:1.45;color:#9aa3b4;margin-top:12px;max-width:92%;}
.bk-meta{display:flex;justify-content:space-between;align-items:flex-end;margin-top:15px;}
.bk-meta .m{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;color:#6f7a8e;line-height:1.6;}
.bk-gem{width:26px;height:26px;border:1px solid rgba(0,229,255,.5);border-radius:6px;display:flex;align-items:center;justify-content:center;}
.bk-gem i{width:8px;height:8px;background:var(--cyan);transform:rotate(45deg);box-shadow:0 0 10px var(--cyan);}
.bk-inner{transform:rotateY(180deg);background:linear-gradient(135deg,#0e1322,#0a0e1a);border:1px solid rgba(255,255,255,.07);padding:30px 26px;display:flex;flex-direction:column;justify-content:center;gap:12px;box-shadow:inset -20px 0 30px -20px rgba(0,0,0,.85);}
.bk-inner .ex{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#5f6c82;}
.bk-inner .q{font-size:14px;line-height:1.5;color:#cdd5e2;font-weight:500;}
.bk-inner .q b{color:var(--mag);font-weight:700;}
.bk-inner .ln{height:1px;width:50px;background:var(--cyan);}

.bk-hint{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7c879b;display:flex;align-items:center;gap:8px;}
.bk-hint svg{width:14px;height:14px;color:var(--cyan);flex:none;}
.bk-hint .c{display:none;}
.bk.is-open ~ .bk-hint .o{display:none;}
.bk.is-open ~ .bk-hint .c{display:inline;}

@media(prefers-reduced-motion:reduce){ .bk,.bk-cover{transition:none !important;} }
`;

  function injectCSS() {
    if (!document.getElementById("pt-book-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-book-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }

  function findBookCol() {
    if (!document.body) return null;
    var anchor = [].slice.call(document.body.querySelectorAll("*")).filter(function (e) {
      var tg = e.tagName;
      return e.children.length === 0 && tg !== "SCRIPT" && tg !== "STYLE" && tg !== "TEMPLATE"
        && /templates/i.test(e.textContent || "");
    })[0];
    if (!anchor) return null;
    var n = anchor;
    for (var i = 0; i < 12 && n; i++) {
      if (n.querySelector && n.querySelector('script[type^="__bundler"]')) return null; // не трогаем блобы
      var p = n.parentElement;
      if (p && p.classList && p.classList.contains("grid-2-mobile")) return n; // n = правый столбец с книгой
      n = p;
    }
    return null;
  }

  function render(col) {
    if (!col) return;
    if (col.dataset.ptBook === "1" && col.querySelector(".bk")) return; // уже наша книга на месте
    col.dataset.ptBook = "1";
    col.classList.add("pt-book-col");
    col.innerHTML = HTML;
  }

  function apply() {
    injectCSS();
    var c = findBookCol();
    if (c) render(c);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 250) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () {
      var c = findBookCol();
      if (c && (c.dataset.ptBook !== "1" || !c.querySelector(".bk"))) apply();
    });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 60000);
  } catch (e) {}
})();

/* ============================================================
   POLISH ADD-ON — глобально де-квадратит и оживляет карточки.
   .glass (17 шт по всему сайту) + спец-обработка countdown.
   CSS применяется и к ленивым модулям автоматически.
   ============================================================ */
(function () {
  if (window.__ptPolish) return;
  window.__ptPolish = true;

  var CSS = `
/* === глобальная полировка всех карточек .glass === */
.glass{
  border-radius:16px!important;
  background-image:linear-gradient(158deg, rgba(0,229,255,.05), rgba(255,46,154,.025) 60%, transparent)!important;
  transition:transform .22s cubic-bezier(.2,.7,.2,1), box-shadow .22s, border-color .22s!important;
}
.glass:hover{
  transform:translateY(-4px);
  border-color:rgba(0,229,255,.45)!important;
  box-shadow:0 16px 40px rgba(0,229,255,.10), 0 0 0 1px rgba(0,229,255,.22)!important;
}
/* варианты карточек */
.scp3,.scp4{border-radius:16px!important;}

/* === countdown V1: единая панель, ровные сегменты === */
.pt-cd-card{position:relative !important;overflow:hidden !important;}
.pt-cd-card::before{content:"" !important;position:absolute !important;top:0;left:0;right:0;height:2px !important;
  background:linear-gradient(90deg,#00E5FF,#FF2E9A) !important;opacity:.6 !important;z-index:2;}
.pt-cd-card:hover{transform:none !important;}
.pt-cd-grid{gap:0 !important;}
.pt-cd-seg{
  border:0 !important;border-radius:0 !important;background:none !important;background-image:none !important;
  box-shadow:none !important;border-right:1px solid rgba(255,255,255,.08) !important;
  transition:none !important;overflow:visible !important;
  display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important;
  padding:16px 8px !important;
}
.pt-cd-seg:last-child{border-right:0 !important;}
.pt-cd-seg::before,.pt-cd-seg::after{display:none !important;}
.pt-cd-seg:hover{transform:none !important;box-shadow:none !important;}
.pt-cd-seg>:first-child{font-family:'Space Grotesk',system-ui,sans-serif !important;font-weight:700 !important;
  font-size:44px !important;line-height:1 !important;color:#EEF3FA !important;
  font-variant-numeric:tabular-nums !important;font-feature-settings:"tnum" 1 !important;letter-spacing:.01em !important;}
.pt-cd-seg>:last-child{margin-top:11px !important;color:#8b92a0 !important;letter-spacing:.18em !important;}
`;

  function tagCountdown() {
    if (window.__ptCdDone) return;
    var labels = [].slice.call(document.querySelectorAll("span,div")).filter(function (e) {
      if (e.children.length) return false;
      var t = e.textContent.trim().toLowerCase();
      return /^(дн(ей|я)?|час(ов|а)?|мин(ут[аы]?)?|сек(унд[аы]?)?)$/.test(t);
    });
    if (labels.length < 3) return;
    labels.forEach(function (l) {
      var labWrap = l.parentElement;
      var cell = labWrap && labWrap.parentElement;   // настоящая ячейка (номер + подпись)
      if (!cell) return;
      cell.classList.add("pt-cd-seg");
      var grid = cell.parentElement;                 // грид из 4 ячеек
      if (grid) {
        grid.classList.add("pt-cd-grid");
        if (grid.parentElement) grid.parentElement.classList.add("pt-cd-card"); // внешняя .glass-карточка
      }
    });
    window.__ptCdDone = true;
    console.log("[polish] countdown ячейки оформлены:", labels.length);
  }

  function init() {
    if (!document.getElementById("pt-polish-style") && document.head) {
      var st = document.createElement("style"); st.id = "pt-polish-style"; st.textContent = CSS;
      document.head.appendChild(st);
      console.log("[polish] глобальный слой по .glass подключён");
    }
    tagCountdown();
  }

  // .glass-стили применяются сами; интервал нужен только чтобы поймать countdown
  // (и countdown в ленивых модулях при скролле)
  var n = 0;
  var iv = setInterval(function () { n++; init(); if (window.__ptCdDone || n > 150) clearInterval(iv); }, 150);
  window.addEventListener("load", init);
  window.addEventListener("DOMContentLoaded", init);
  // на случай ленивой подгрузки секций со своими countdown — лёгкий наблюдатель
  try {
    var mo = new MutationObserver(function () { if (!window.__ptCdDone) tagCountdown(); });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 25000);
  } catch (e) {}
})();

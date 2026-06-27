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

/* === countdown: ячейки === */
.pt-cd-cell{
  border-radius:14px!important;position:relative;overflow:hidden;
  background-image:linear-gradient(160deg, rgba(0,229,255,.14), rgba(0,229,255,.02))!important;
  border:1px solid rgba(0,229,255,.24)!important;
  transition:transform .2s, border-color .2s, box-shadow .2s!important;
}
.pt-cd-cell:hover{transform:translateY(-3px);border-color:rgba(0,229,255,.55)!important;
  box-shadow:0 10px 26px rgba(0,229,255,.16)!important;}
.pt-cd-cell::after{content:"";position:absolute;left:0;right:0;top:0;height:2px;
  background:linear-gradient(90deg,#00E5FF,#FF2E9A);opacity:.7;}
.pt-cd-cell::before{content:"";position:absolute;inset:0;pointer-events:none;
  box-shadow:inset 0 -22px 30px -22px rgba(0,229,255,.5);}
`;

  function tagCountdown() {
    if (window.__ptCdDone) return;
    var labels = [].slice.call(document.querySelectorAll("span,div")).filter(function (e) {
      if (e.children.length) return false;
      var t = e.textContent.trim().toLowerCase();
      return /^(дн(ей|я)?|час(ов|а)?|мин(ут[аы]?)?|сек(унд[аы]?)?)$/.test(t);
    });
    if (labels.length < 3) return;
    labels.forEach(function (l) { if (l.parentElement) l.parentElement.classList.add("pt-cd-cell"); });
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

/* ============================================================
   NO-BLINK ADD-ON — убирает мигающие статус-точки по всему сайту.
   Переопределяет кейфреймы в статику; держит свой <style> последним
   в <head>, чтобы побеждать каскад и пережить пересборку бандла.
   ============================================================ */
(function () {
  if (window.__ptNoBlink) return;
  window.__ptNoBlink = true;

  var CSS =
    "@keyframes blink{0%,100%{opacity:1}}" +
    "@keyframes pulse-dot{0%,100%{opacity:1;transform:none}}" +
    "@keyframes pulse-soft{0%,100%{opacity:1;transform:none}}" +
    "@keyframes pulse-ring{0%,100%{opacity:0}}";

  function ensure() {
    if (!document.head) return;
    var s = document.getElementById("pt-noblink");
    if (!s) { s = document.createElement("style"); s.id = "pt-noblink"; s.textContent = CSS; }
    if (document.head.lastElementChild !== s) document.head.appendChild(s);
  }

  var n = 0, iv = setInterval(function () { n++; ensure(); if (n > 80) clearInterval(iv); }, 150);
  ensure();
  window.addEventListener("load", ensure);
  window.addEventListener("DOMContentLoaded", ensure);
  try {
    var mo = new MutationObserver(ensure);
    if (document.head) mo.observe(document.head, { childList: true });
    setTimeout(function () { mo.disconnect(); }, 20000);
  } catch (e) {}
})();

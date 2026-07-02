/* ============================================================
   REMOVE-ARTICLES ADD-ON — полностью убирает пункт «Статьи»:
   таб-кнопку в навигации + ссылку в футере, и перенумеровывает
   «Продукты» 08 → 07, чтобы не оставалось дырки в нумерации.
   Переживает пересборку bundle (interval + observer).
   ============================================================ */
(function () {
  if (window.__ptNoArticles) return;
  window.__ptNoArticles = true;

  function apply() {
    // 1) скрыть таб-кнопку «Статьи»
    [].slice.call(document.querySelectorAll("button")).forEach(function (b) {
      if (/Статьи/.test(b.textContent || "")) {
        if (b.style.display !== "none") b.style.display = "none";
      }
    });
    // 2) перенумеровать «Продукты» 08 → 07
    [].slice.call(document.querySelectorAll("button")).forEach(function (b) {
      if (/Продукты/.test(b.textContent || "")) {
        var num = [].slice.call(b.querySelectorAll("*")).filter(function (e) {
          return !e.children.length && /^0*8$/.test((e.textContent || "").trim());
        })[0];
        if (num && num.textContent.trim() !== "07") num.textContent = "07";
      }
    });
    // 3) скрыть ссылку «Статьи» в футере (и в любых меню-списках)
    [].slice.call(document.querySelectorAll("a")).forEach(function (a) {
      if ((a.textContent || "").trim() === "Статьи" && a.style.display !== "none") a.style.display = "none";
    });
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

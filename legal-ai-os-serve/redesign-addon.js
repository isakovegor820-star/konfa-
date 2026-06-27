/* ============================================================
   REDESIGN ADD-ON — чинит раскладку всех проблемных секций
   на реальных данных + ленивых модулях (MutationObserver):
   • гриды 4+2 → 3×2, равная высота, кнопка вниз
   • широкие строки (чек-листы, содержание) → 2 колонки
   • сигнальная лента → ограничить ширину
   • убрать декор: ACTIVATION KEY, прогресс-бары каталога
   • appearance: stagger-появление, featured-пульс
   ============================================================ */
(function () {
  if (window.__ptRedesign) return;
  window.__ptRedesign = true;

  var CSS = `
.pt-g3{display:grid !important;grid-template-columns:repeat(3,1fr) !important;gap:14px !important;align-items:stretch !important;}
.pt-g2{display:grid !important;grid-template-columns:repeat(2,1fr) !important;gap:14px !important;align-items:stretch !important;}
@media(max-width:880px){.pt-g3{grid-template-columns:repeat(2,1fr) !important;}}
@media(max-width:600px){.pt-g3,.pt-g2{grid-template-columns:1fr !important;}}
.pt-card{display:flex !important;flex-direction:column !important;height:100% !important;}
.pt-card>*:last-child{margin-top:auto;}
.pt-feed{max-width:940px !important;margin-left:auto !important;margin-right:auto !important;}
.pt-hide{display:none !important;}
/* появление */
.pt-anim{opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .5s cubic-bezier(.2,.7,.2,1);}
.pt-anim.pt-in{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){.pt-anim{opacity:1 !important;transform:none !important;transition:none !important;}}
/* featured-пульс */
@keyframes ptPulse{0%,100%{box-shadow:0 0 0 1px rgba(0,229,255,.18),0 10px 30px rgba(0,229,255,.06);}50%{box-shadow:0 0 0 1px rgba(0,229,255,.45),0 12px 38px rgba(0,229,255,.16);}}
.pt-featured{animation:ptPulse 3.2s ease-in-out infinite;}
@media(prefers-reduced-motion:reduce){.pt-featured{animation:none;}}
`;

  function injectCSS() {
    if (document.getElementById("pt-redesign-style") || !document.head) return;
    var st = document.createElement("style"); st.id = "pt-redesign-style"; st.textContent = CSS;
    document.head.appendChild(st);
  }

  var norm = function (s) { return (s || "").replace(/\s+/g, " ").trim().toLowerCase(); };
  function isCard(el) { var c = el.className || ""; c = c.baseVal || c; return /glass|scp4|scp3/.test(c); }
  function cardChildren(el) { var n = 0, k = el.children; for (var i = 0; i < k.length; i++) if (isCard(k[i])) n++; return n; }

  // ближайший предыдущий заголовок в порядке документа
  var allHeads = function () { return [].slice.call(document.querySelectorAll("h1,h2,h3")); };
  function precedingHeadingText(el) {
    var hs = allHeads(), r = el.getBoundingClientRect().top + window.scrollY, best = "", by = -1e9;
    hs.forEach(function (h) { var y = h.getBoundingClientRect().top + window.scrollY; if (y <= r + 4 && y > by) { by = y; best = h.textContent; } });
    return norm(best);
  }

  function modeFor(headingText, count) {
    var h = headingText;
    if (/лент|сигнальн/.test(h)) return "feed";
    if (/содержан|оглавлен/.test(h)) return "list2";
    if (/чек-?лист|checklist|каталог.*чек|пункт/.test(h)) return "list2";
    if (count >= 4) return "grid3";
    return null;
  }

  function pinFooter(container) {
    var k = container.children;
    for (var i = 0; i < k.length; i++) { if (isCard(k[i])) k[i].classList.add("pt-card"); }
  }

  function hideProgressBars(container) {
    // тонкие цветные полоски внутри карточек каталога — на удаление
    var divs = container.querySelectorAll("div");
    for (var i = 0; i < divs.length; i++) {
      var d = divs[i];
      if (d.children.length === 0 && !norm(d.textContent)) {
        var h = d.offsetHeight, w = d.offsetWidth;
        if (h > 0 && h <= 6 && w > 50) d.classList.add("pt-hide");
      }
    }
  }

  function entrance(container) {
    var k = container.children, idx = 0;
    for (var i = 0; i < k.length; i++) {
      if (!isCard(k[i])) continue;
      var el = k[i]; el.classList.add("pt-anim");
      el.style.transitionDelay = (idx * 45) + "ms"; idx++;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("pt-in"); io.unobserve(e.target); } });
    }, { threshold: 0.05 });
    for (var j = 0; j < k.length; j++) if (k[j].classList && k[j].classList.contains("pt-anim")) io.observe(k[j]);
  }

  function fixGrids() {
    var divs = [].slice.call(document.querySelectorAll("div"));
    for (var i = 0; i < divs.length; i++) {
      var c = divs[i];
      if (c.dataset.ptDone) continue;
      var cnt = cardChildren(c);
      if (cnt < 3) continue;
      var mode = modeFor(precedingHeadingText(c), cnt);
      if (!mode) continue;
      c.dataset.ptDone = "1";
      if (mode === "grid3") { c.classList.add("pt-g3"); pinFooter(c); entrance(c); }
      else if (mode === "list2") { c.classList.add("pt-g2"); pinFooter(c); hideProgressBars(c); entrance(c); }
      else if (mode === "feed") { c.classList.add("pt-feed"); var f = firstCard(c); if (f) f.classList.add("pt-featured"); entrance(c); }
      console.log("[redesign] секция исправлена:", mode, "·", cnt, "карт");
    }
  }
  function firstCard(c) { var k = c.children; for (var i = 0; i < k.length; i++) if (isCard(k[i])) return k[i]; return null; }

  function hideActivationKey() {
    if (window.__ptAkDone) return;
    var els = [].slice.call(document.querySelectorAll("span,div"));
    for (var i = 0; i < els.length; i++) {
      var t = els[i].textContent || "";
      if (/activation\s*·?\s*key/i.test(t) && els[i].children.length === 0) {
        var card = els[i].closest(".glass") || els[i].parentElement && els[i].parentElement.parentElement;
        if (card) { card.classList.add("pt-hide"); window.__ptAkDone = true; console.log("[redesign] ACTIVATION KEY скрыт"); }
        return;
      }
    }
  }

  function run() { injectCSS(); fixGrids(); hideActivationKey(); }

  var n = 0;
  var iv = setInterval(function () { n++; run(); if (n > 240) clearInterval(iv); }, 160);
  window.addEventListener("load", run);
  window.addEventListener("DOMContentLoaded", run);
  try {
    var mo = new MutationObserver(function () { run(); });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 40000);
  } catch (e) {}
})();

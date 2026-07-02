/* ============================================================
   PRICING ADD-ON — секция «Забронируйте место в зале» →
   3 колонки тарифов (Standard / Pro популярный / VIP) с
   чек-листами включённого. Без верхних акцент-полосок.
   Находит обёртку по ценам/заголовку, переживает пересборку.
   ============================================================ */
(function () {
  if (window.__ptPricing) return;
  window.__ptPricing = true;

  var CHK = '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>';
  function li(t, base) { return '<li' + (base ? ' class="base"' : '') + '>' + CHK + t + '</li>'; }
  var TIERS = [
    { a: "#7d8492", name: "Standard", price: "24 900", note: "доступ ко всей программе", feat: false, items: [
      ["Доступ оба дня · 25–26 сентября"], ["Все 6 параллельных потоков"], ["Networking-зона"], ["Кофе-брейки"], ["Сертификат участника"] ] },
    { a: "#00E5FF", name: "Pro", price: "49 900", note: "программа + практика и материалы", feat: true, items: [
      ["Всё из Standard", true], ["Воркшопы и мастер-классы"], ["Доступ в VIP-зону"], ["Записи всех выступлений"], ["Материалы, чек-листы, шаблоны"] ] },
    { a: "#FF2E9A", name: "VIP", price: "89 900", note: "максимум доступа и привилегий", feat: false, items: [
      ["Всё из Pro", true], ["Закрытая сессия со спикерами"], ["Гала-ужин с экспертами"], ["Подарочный набор"], ["Приоритетные места в зале"] ] }
  ];
  function card(t) {
    return '<article class="pt-pr-card' + (t.feat ? ' pt-pr-feat' : '') + '" style="--a:' + t.a + '">'
      + (t.feat ? '<span class="pt-pr-badge">популярный</span>' : '')
      + '<div class="pt-pr-tier">' + t.name + '</div>'
      + '<div class="pt-pr-price"><b>' + t.price + '</b><span>₽ / билет</span></div>'
      + '<p class="pt-pr-note">' + t.note + '</p>'
      + '<ul class="pt-pr-list">' + t.items.map(function (it) { return li(it[0], it[1]); }).join("") + '</ul>'
      + '<a class="pt-pr-cta">Купить билет →</a></article>';
  }
  var HTML =
    '<div class="pt-pr-head"><p class="pt-pr-cap">// registration · open</p>'
    + '<h2 class="pt-pr-h">Забронируйте место в зале</h2>'
    + '<p class="pt-pr-sub">Регистрация открыта. Три тарифа — Standard, Pro, VIP.</p></div>'
    + '<div class="pt-pr-grid">' + TIERS.map(card).join("") + '</div>';

  var CSS = `
.pt-price{display:block !important;}
.glass.pt-pr-bare{border:0 !important;background:none !important;background-image:none !important;box-shadow:none !important;border-radius:0 !important;padding:0 !important;}
.glass.pt-pr-bare:hover{transform:none !important;box-shadow:none !important;border-color:transparent !important;}
.pt-pr-head{margin-bottom:22px;}
.pt-pr-cap{font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:#00E5FF;margin:0 0 8px;}
.pt-pr-h{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.9rem;letter-spacing:-.01em;color:#EEF3FA;margin:0 0 8px;line-height:1.1;}
.pt-pr-sub{color:#A6AEBD;font-size:.95rem;line-height:1.55;margin:0;max-width:640px;}
.pt-pr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px;}
@media(max-width:860px){.pt-pr-grid{grid-template-columns:1fr;}}
.pt-pr-card{position:relative;display:flex;flex-direction:column;border:1px solid #1C2230;border-radius:16px;padding:26px 22px;background:linear-gradient(165deg,color-mix(in srgb,var(--a) 7%,#0c0e14),#0a0c12);transition:transform .2s,border-color .2s,box-shadow .2s;}
.pt-pr-card:hover{transform:translateY(-4px);}
.pt-pr-feat{border:2px solid color-mix(in srgb,var(--a) 60%,#1C2230);box-shadow:0 0 0 1px color-mix(in srgb,var(--a) 18%,transparent),0 18px 50px color-mix(in srgb,var(--a) 12%,transparent);}
.pt-pr-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#06222a;background:var(--a);border-radius:999px;padding:4px 12px;font-weight:500;white-space:nowrap;}
.pt-pr-tier{font-family:'JetBrains Mono',monospace;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;color:var(--a);margin-bottom:14px;}
.pt-pr-price{display:flex;align-items:baseline;gap:6px;margin-bottom:4px;}
.pt-pr-price b{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:2.1rem;color:#EEF3FA;line-height:1;font-variant-numeric:tabular-nums;}
.pt-pr-price span{font-size:.82rem;color:#8b92a0;}
.pt-pr-note{font-size:.72rem;color:#717c8c;margin:0 0 18px;}
.pt-pr-list{list-style:none;margin:0 0 22px;padding:0;display:flex;flex-direction:column;gap:11px;flex:1;}
.pt-pr-list li{display:flex;align-items:flex-start;gap:10px;font-size:.85rem;line-height:1.4;color:#C6CDD9;}
.pt-pr-list li.base{color:#9AA6B8;}
.pt-pr-list svg{width:16px;height:16px;stroke:var(--a);fill:none;stroke-width:2.4;margin-top:2px;flex:0 0 auto;}
.pt-pr-cta{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.9rem;text-align:center;border-radius:10px;padding:13px;cursor:pointer;transition:.18s;border:1px solid var(--a);color:var(--a);background:transparent;text-decoration:none;display:block;}
.pt-pr-card:hover .pt-pr-cta,.pt-pr-feat .pt-pr-cta{background:var(--a);color:#06222a;border-color:var(--a);}
.pt-pr-foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-top:20px;font-size:.82rem;color:#8b92a0;}
.pt-pr-foot a{color:#00E5FF;cursor:pointer;}
`;

  function injectCSS() { if (!document.getElementById("pt-pricing-style") && document.head) { var s = document.createElement("style"); s.id = "pt-pricing-style"; s.textContent = CSS; document.head.appendChild(s); } }

  function findWrap() {
    var prices = [].slice.call(document.querySelectorAll("span,div")).filter(function (e) { return !e.children.length && /₽/.test(e.textContent || "") && /24 9|49 9|89 9/.test(e.textContent); });
    if (prices.length < 2) return null;
    var n = prices[0], tariffs = null;
    for (var k = 0; k < 7 && n.parentElement; k++) { var par = n.parentElement, cnt = 0; for (var i = 0; i < par.children.length; i++) { if (/₽/.test(par.children[i].textContent || "")) cnt++; } if (cnt >= 3) { tariffs = par; break; } n = par; }
    if (!tariffs) return null;
    var w = tariffs;
    for (var j = 0; j < 8 && w.parentElement; j++) { w = w.parentElement; if (/Забронируйте/.test(w.textContent || "")) return w; }
    return null;
  }

  function apply() {
    injectCSS();
    var wrap = findWrap();
    if (!wrap || wrap.dataset.ptPrice) return;
    wrap.dataset.ptPrice = "1";
    wrap.classList.add("pt-price");
    var glass = wrap;
    for (var g = 0; g < 5 && glass; g++) { if (glass.classList && glass.classList.contains("glass")) { glass.classList.add("pt-pr-bare"); break; } glass = glass.parentElement; }
    wrap.innerHTML = HTML;
    console.log("[pricing] секция тарифов → 3 колонки");
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n===15||n===50||n===150) { try { mo.disconnect(); mo.observe(document, { childList: true, subtree: true }); } catch (e) {} } if (n > 200) { clearInterval(iv); setInterval(apply, 1200); } }, 160); /* прогрев → вечный пульс */
  apply(); window.addEventListener("load", apply); window.addEventListener("DOMContentLoaded", apply);
  try { var mo = new MutationObserver(apply); mo.observe(document, { childList: true, subtree: true }); /* document переживает пересоздание при boot */ /* observer живёт вечно */ } catch (e) {}
})();

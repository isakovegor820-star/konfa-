/* ============================================================
   SCHEDULE ADD-ON — секция «Расписание двух дней» → вкладки дней
   + карточки сессий 2-в-ряд с раскрытием описания на hover,
   stagger-влёт, подъём/свечение. Цвет по типу трека.
   Данные берёт из существующих .glass-карточек дней, переживает ре-рендер.
   prefers-reduced-motion → без анимаций.
   ============================================================ */
(function () {
  if (window.__ptSchedule) return;
  window.__ptSchedule = true;
  if (window.__ptSchDay == null) window.__ptSchDay = 0;

  var cy = "#00E5FF", mg = "#FF2E9A", am = "#F0B84B";
  function acc(k) { k = (k || "").toLowerCase(); if (/stream|demo/.test(k)) return am; if (/panel|lounge|showcase|vip/.test(k)) return mg; return cy; }
  var DESC = {
    "Открытие. Манифест Legal AI": "Главный зал · вступительный кейноут о будущем юрпрофессии.",
    "Тренды БФЛ 2026. Дискуссия": "Панель с лидерами практики банкротства физлиц.",
    "Параллельные треки": "6 потоков одновременно — выбираешь свой.",
    "Воркшоп AI-юриста": "Практика с реальными ИИ-инструментами.",
    "Networking · welcome": "Нетворкинг-зона и приветственный бокал.",
    "Утренние мастермайнды": "Малые группы по 8 человек, разбор кейсов.",
    "Кейсы лидеров рынка": "Реальные истории внедрения ИИ в юрфирмах.",
    "Закрытие. AI-демо стенд": "Демонстрация продуктов резидентов.",
    "Закрытая VIP-сессия": "Только для обладателей VIP-билетов."
  };
  var DATA = [];

  var CSS = `
.pt-sch-host{display:block !important;}
.pt-sch-days{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;}
.pt-sch-dtab{font-family:'JetBrains Mono',monospace;font-size:12.5px;color:#9aa6b8;background:transparent;border:1px solid #1c2230;border-radius:9px;padding:9px 16px;cursor:pointer;transition:.16s;}
.pt-sch-dtab:hover{border-color:#2c3650;color:#cfe9ff;}
.pt-sch-dtab.on{color:#EEF3FA;border-color:color-mix(in srgb,#00E5FF 45%,#1c2230);background:color-mix(in srgb,#00E5FF 9%,transparent);}
.pt-sch-meta{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.06em;color:#7d8492;margin:0 0 16px;}
.pt-sch-meta b{color:#aeb6c4;font-weight:400;}
.pt-sch-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:760px){.pt-sch-cards{grid-template-columns:1fr;}}
.pt-sch-c{position:relative;border:1px solid #1c2230;border-radius:14px;padding:16px 18px;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 7%,#0b0d13),#0a0c12);opacity:0;animation:ptSchIn .5s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:calc(var(--i)*60ms);transition:border-color .2s,transform .2s,box-shadow .2s;}
.pt-sch-c:hover{transform:translateY(-3px);border-color:var(--a);box-shadow:0 14px 40px color-mix(in srgb,var(--a) 14%,transparent);}
.pt-sch-c .top{display:flex;align-items:center;gap:12px;}
.pt-sch-c .t{font-family:'JetBrains Mono',monospace;font-size:15px;color:var(--a);font-weight:500;font-variant-numeric:tabular-nums;}
.pt-sch-c .k{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--a);border:1px solid color-mix(in srgb,var(--a) 40%,#1c2230);border-radius:5px;padding:3px 8px;}
.pt-sch-c .s{font-family:'Space Grotesk',system-ui,sans-serif;font-weight:600;font-size:16px;color:#EEF3FA;margin-top:11px;line-height:1.2;}
.pt-sch-c .desc{max-height:0;overflow:hidden;opacity:0;transition:max-height .28s ease,opacity .28s ease,margin-top .28s ease;font-size:13px;color:#aab3c2;line-height:1.45;}
.pt-sch-c:hover .desc{max-height:60px;opacity:1;margin-top:9px;}
@keyframes ptSchIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media(max-width:760px){.pt-sch-c .desc{max-height:60px;opacity:1;margin-top:9px;}}
@media(prefers-reduced-motion:reduce){.pt-sch-c{animation:none !important;opacity:1 !important;}.pt-sch-c .desc,.pt-sch-c{transition:none !important;}}
`;

  function injectCSS() { if (!document.getElementById("pt-sch-style") && document.head) { var s = document.createElement("style"); s.id = "pt-sch-style"; s.textContent = CSS; document.head.appendChild(s); } }
  function esc(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function leaves(el) { return [].slice.call(el.querySelectorAll("*")).filter(function (e) { return !e.children.length && (e.textContent || "").trim(); }).map(function (e) { return e.textContent.trim(); }); }
  function cardOf(el) { var n = el; for (var i = 0; i < 9 && n.parentElement; i++) { n = n.parentElement; if (n.classList && n.classList.contains("glass")) return n; } return null; }
  function findDayCards() {
    var marks = [].slice.call(document.querySelectorAll("*")).filter(function (e) { return !e.children.length && /day\s*0[12]/i.test(e.textContent || "") && (e.textContent || "").length < 16; });
    var cards = [];
    marks.forEach(function (m) { var c = cardOf(m); if (c && cards.indexOf(c) < 0) cards.push(c); });
    return cards;
  }
  function extract(card) {
    var lv = leaves(card);
    var items = [];
    for (var i = 3; i + 1 < lv.length; i += 3) items.push({ t: lv[i], s: lv[i + 1], k: lv[i + 2] || "" });
    return { date: lv[1] || "", span: lv[2] || "", items: items };
  }

  function tabs(day) { return '<div class="pt-sch-days">' + DATA.map(function (D, i) { return '<button class="pt-sch-dtab' + (i === day ? " on" : "") + '" data-d="' + i + '">День ' + (i + 1) + "</button>"; }).join("") + "</div>"; }
  function meta(D) { return '<p class="pt-sch-meta"><b>' + esc(D.date) + "</b> · " + esc(D.span) + "</p>"; }
  function cards(D) {
    return '<div class="pt-sch-cards">' + D.items.map(function (x, i) {
      var a = acc(x.k), d = DESC[x.s] || "";
      return '<div class="pt-sch-c" style="--a:' + a + ";--i:" + i + '"><div class="top"><span class="t">' + esc(x.t) + '</span><span class="k">' + esc(x.k) + '</span></div><div class="s">' + esc(x.s) + "</div>" + (d ? '<div class="desc">' + esc(d) + "</div>" : "") + "</div>";
    }).join("") + "</div>";
  }

  function renderInto(host) {
    var day = window.__ptSchDay || 0; if (day >= DATA.length) day = 0;
    host.classList.add("pt-sch-host");
    host.removeAttribute("style");
    host.innerHTML = tabs(day) + meta(DATA[day]) + cards(DATA[day]);
    [].slice.call(host.querySelectorAll(".pt-sch-dtab")).forEach(function (b) {
      b.addEventListener("click", function () { window.__ptSchDay = +b.getAttribute("data-d"); renderInto(host); });
    });
  }

  function apply() {
    injectCSS();
    var dc = findDayCards();
    if (dc.length < 2) return;
    var grid = dc[0].parentElement;
    if (!grid) return;
    DATA = dc.map(extract);
    if (!DATA[0].items.length) return;
    renderInto(grid);
    console.log("[schedule] карточки сессий, дней:", DATA.length);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 200) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(apply);
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 40000);
  } catch (e) {}
})();

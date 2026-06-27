/* ============================================================
   REDESIGN v2 — ставит утверждённый макет на сайт ТОЧЕЧНО.
   Каждую секцию находим по УНИКАЛЬНОЙ фразе внутри карточки,
   берём контейнер карточек (.glass → parent) и заменяем на
   redizайн-грид. Никакого авто-детектора → стат-ряды не трогаются.
   ============================================================ */
(function () {
  if (window.__ptRD2) return; window.__ptRD2 = true;
  var CY = "#00E5FF", MAG = "#FF2E9A", GRN = "#46E08A", AMB = "#F0B84B";

  var CSS = `
.rd-g3{display:grid !important;grid-template-columns:repeat(3,1fr) !important;gap:14px !important;align-items:stretch !important;}
.rd-g2{display:grid !important;grid-template-columns:repeat(2,1fr) !important;gap:14px !important;align-items:stretch !important;}
@media(max-width:880px){.rd-g3{grid-template-columns:repeat(2,1fr) !important;}}
@media(max-width:600px){.rd-g3,.rd-g2{grid-template-columns:1fr !important;}}
.rd-card{position:relative;display:flex;flex-direction:column;background:#0C0E14;border:1px solid #1C2230;border-radius:14px;padding:20px;overflow:hidden;transition:transform .22s cubic-bezier(.2,.7,.2,1),box-shadow .22s,border-color .22s;}
.rd-card::before{content:"";position:absolute;inset:0 0 auto 0;height:2px;background:var(--a,#00E5FF);opacity:.85;}
.rd-card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--a,#00E5FF) 55%,#1C2230);box-shadow:0 16px 38px color-mix(in srgb,var(--a,#00E5FF) 14%,transparent);}
.rd-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;}
.rd-h{font-family:'Space Grotesk','Inter',sans-serif;font-weight:700;font-size:18px;line-height:1.2;margin:0 0 8px;color:#EEF3FA;}
.rd-desc{color:#AAB4C4;font-size:13.5px;line-height:1.5;}
.rd-foot{margin-top:auto;padding-top:16px;display:flex;justify-content:space-between;align-items:center;gap:10px;}
.rd-metric{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;color:#AAB4C4;}
.rd-kbd{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:color-mix(in srgb,var(--a,#00E5FF) 90%,#fff);}
.rd-tag{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:6px;color:var(--a,#00E5FF);border:1px solid color-mix(in srgb,var(--a,#00E5FF) 40%,transparent);background:color-mix(in srgb,var(--a,#00E5FF) 9%,transparent);}
.rd-cta{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:13px;color:var(--a,#00E5FF);display:inline-flex;align-items:center;gap:6px;border:1px solid color-mix(in srgb,var(--a,#00E5FF) 42%,transparent);border-radius:8px;padding:8px 13px;transition:.18s;white-space:nowrap;cursor:pointer;}
.rd-card:hover .rd-cta{background:var(--a,#00E5FF);color:#06222a;border-color:transparent;}
.rd-card:hover .rd-arr{transform:translateX(3px);}.rd-arr{transition:transform .18s;display:inline-block;}
.rd-dia{width:34px;height:34px;flex:0 0 auto;transform:rotate(45deg);border-radius:8px;display:flex;align-items:center;justify-content:center;border:1px solid color-mix(in srgb,var(--a,#00E5FF) 60%,transparent);background:color-mix(in srgb,var(--a,#00E5FF) 12%,#0c0f16);}
.rd-dia span{transform:rotate(-45deg);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;color:color-mix(in srgb,var(--a,#00E5FF) 92%,#fff);}
.rd-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px;}
.rd-tags span{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:color-mix(in srgb,var(--a,#00E5FF) 85%,#fff);border:1px solid color-mix(in srgb,var(--a,#00E5FF) 35%,transparent);border-radius:999px;padding:3px 9px;background:color-mix(in srgb,var(--a,#00E5FF) 8%,transparent);}
.rd-num{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:26px;color:transparent;-webkit-text-stroke:1.3px color-mix(in srgb,var(--a,#00E5FF) 75%,#888);opacity:.6;line-height:1;}
.rd-feed{display:flex !important;flex-direction:column !important;gap:10px !important;max-width:940px !important;}
.rd-frow{position:relative;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;background:#0C0E14;border:1px solid #1C2230;border-left:3px solid var(--a,#00E5FF);border-radius:12px;padding:16px 18px;transition:transform .2s,box-shadow .2s;}
.rd-frow:hover{transform:translateX(3px);box-shadow:0 10px 28px color-mix(in srgb,var(--a,#00E5FF) 12%,transparent);}
.rd-ft{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:16px;line-height:1.25;margin:0 0 5px;color:#EEF3FA;}
.rd-fd{color:#AAB4C4;font-size:13.5px;line-height:1.45;}
.rd-fmeta{text-align:right;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#717c8c;display:flex;flex-direction:column;gap:6px;align-items:flex-end;white-space:nowrap;}
.rd-fmeta .go{color:var(--a,#00E5FF);}
.rd-featured{box-shadow:0 0 0 1px rgba(0,229,255,.2),0 12px 36px rgba(0,229,255,.08);}
@media(max-width:600px){.rd-frow{grid-template-columns:1fr;}.rd-fmeta{flex-direction:row;gap:14px;align-items:center;text-align:left;}}
.rd-anim{opacity:0;transform:translateY(14px);transition:opacity .5s,transform .5s cubic-bezier(.2,.7,.2,1);}
.rd-anim.rd-in{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){.rd-anim{opacity:1 !important;transform:none !important;}}
.rd-hide{display:none !important;}
`;

  function gcard(o) {
    var badge = o.badge ? `<span class="rd-dia"><span>${o.badge}</span></span>` : o.kbd ? `<span class="rd-kbd">${o.kbd}</span>` : `<span class="rd-kbd"></span>`;
    var right = o.tag ? `<span class="rd-tag">${o.tag}</span>` : `<span class="rd-metric">${o.tr || ""}</span>`;
    var num = o.num ? `<div class="rd-num">${o.num}</div>` : "";
    var tags = o.tags ? `<div class="rd-tags">${o.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("")}</div>` : "";
    var footRight = o.cta ? `<a class="rd-cta">${o.cta} <span class="rd-arr">→</span></a>` : `<span class="rd-tag">${o.m2 || ""}</span>`;
    return `<article class="rd-card rd-anim" style="--a:${o.a}"><div class="rd-top">${badge}${right}</div>${num}<div><h3 class="rd-h">${o.title}</h3><div class="rd-desc">${o.desc}</div>${tags}</div><div class="rd-foot"><span class="rd-metric">${o.m1}</span>${footRight}</div></article>`;
  }
  function frow(o) {
    return `<div class="rd-frow ${o.feat ? "rd-featured" : ""}" style="--a:${o.a}"><div><div class="rd-ft">${o.title}</div><div class="rd-fd">${o.desc}</div><div style="margin-top:9px"><span class="rd-tag">${o.tag}</span></div></div><div class="rd-fmeta"><span style="color:#AAB4C4">${o.date}</span><span>${o.read}</span><span class="go">читать →</span></div></div>`;
  }

  // ---------- ДАННЫЕ СЕКЦИЙ (= утверждённый макет) ----------
  var SECTIONS = [
    { anchor: "Templates Pack", grid: "rd-g3", html: function () { return [
      { a: GRN, badge: "NP", tag: "free", title: "NeuroPravo Bot", desc: "AI-помощник в Telegram: книга, чек-листы, исследования, консультант 24/7.", m1: "@NeuroPravo_Bot", cta: "Активировать" },
      { a: CY, badge: "TP", tag: "pro", title: "Templates Pack", desc: "64 шаблона документов: заявления, претензии, ходатайства. Word + Google Docs.", m1: "модуль · 04", cta: "Активировать" },
      { a: CY, badge: "TR", tag: "pro", title: "AI Trainer Suite", desc: "Тренажёры консультаций, переговоров, судебных кейсов. Аналитика команды.", m1: "модуль · 03", cta: "Активировать" },
      { a: GRN, badge: "CL", tag: "free", title: "Checklists Bundle", desc: "Все 7 чек-листов в одном пакете. PDF + редактируемые версии для команды.", m1: "@NeuroPravo_Bot", cta: "Активировать" },
      { a: MAG, badge: "RS", tag: "sub", title: "Research Feed", desc: "Подписка на свежие отчёты, датасеты, разборы рынка БФЛ. Раз в 2 недели.", m1: "e-mail · feed", cta: "Подписаться" },
      { a: MAG, badge: "AC", tag: "sub", title: "Academy Pass", desc: "28 курсов академии — от уровня Junior до Expert. Сертификация и наставник.", m1: "модуль · 02", cta: "Активировать" },
    ].map(gcard).join(""); } },

    { anchor: "Старт практики БФЛ", grid: "rd-g3", html: function () { return [
      { a: CY, kbd: "lvl 01 · junior", tr: "14 дней", title: "Старт практики БФЛ", desc: "Базовые процедуры, документооборот, первая консультация. Для тех, кто только пришёл в банкротство физлиц.", m1: "12 модулей", m2: "video + chat" },
      { a: CY, kbd: "lvl 02 · practitioner", tr: "28 дней", title: "Судебная защита должника", desc: "Стратегия защиты, оспаривание сделок, исполнительский иммунитет. Все типы судебных баталий.", m1: "20 модулей", m2: "live · group" },
      { a: CY, kbd: "lvl 02 · practitioner", tr: "21 день", title: "AI в работе юриста", desc: "Промпт-инжиниринг, генерация документов, AI-ассистенты, автоматизация рутины.", m1: "16 модулей", m2: "practice" },
      { a: AMB, kbd: "lvl 03 · senior", tr: "45 дней", title: "Управление командой", desc: "Найм, мотивация, KPI юристов. Регулярный менеджмент в юр. бюро. От 5 до 50 человек.", m1: "24 модуля", m2: "mentorship" },
      { a: AMB, kbd: "lvl 03 · senior", tr: "35 дней", title: "Продажи и упаковка БФЛ-услуги", desc: "Воронки, скрипты, маркетинг. Как делать высокую конверсию первой консультации.", m1: "18 модулей", m2: "workshop" },
      { a: MAG, kbd: "lvl 04 · expert", tr: "90 дней", title: "Масштабирование юр. бюро", desc: "Юнит-экономика, франшиза, выход в регионы. Программа для собственников и партнёров.", m1: "32 модуля", m2: "mastermind" },
    ].map(gcard).join(""); } },

    { anchor: "Влияние ИИ на работу юриста", grid: "rd-g3", html: function () { return [
      { a: CY, tag: "отчёт", tr: "18.09.2026", title: "Влияние ИИ на работу юриста БФЛ", desc: "Опрос 412 практикующих юристов. Какие задачи делегируют AI, сколько времени экономят.", m1: "64 стр · PDF", m2: "↓ 2.1k" },
      { a: CY, tag: "отчёт", tr: "02.09.2026", title: "Экономика юр. практики в банкротстве", desc: "Юнит-экономика. Доходы, расходы, маржа. Срезы по типам бюро и регионам.", m1: "48 стр · PDF", m2: "↓ 3.8k" },
      { a: CY, tag: "отчёт", tr: "24.08.2026", title: "Технологии лидеров рынка БФЛ", desc: "Стек 17 крупнейших юр. бюро России. CRM, AI, документооборот, BI.", m1: "72 стр · PDF", m2: "↓ 1.4k" },
      { a: CY, tag: "отчёт", tr: "10.08.2026", title: "Автоматизация документов в БФЛ", desc: "Какие шаблоны работают, какие — нет. Сравнение AI-генераторов на 1000 кейсов.", m1: "52 стр · PDF", m2: "↓ 2.7k" },
      { a: CY, tag: "отчёт", tr: "28.07.2026", title: "AI для продаж юридических услуг", desc: "Скрипты, скоринг лидов, авто-квалификация. Кейсы внедрения у трёх бюро.", m1: "36 стр · PDF", m2: "↓ 4.2k" },
      { a: CY, tag: "отчёт", tr: "14.07.2026", title: "Судебная практика и тренды 2025–2026", desc: "Топ-200 ключевых дел. Тренды, прецеденты, изменение позиций ВС РФ.", m1: "88 стр · PDF", m2: "↓ 1.9k" },
    ].map(gcard).join(""); } },

    { anchor: "Переговоры с кредитором", grid: "rd-g3", html: function () { return [
      { a: CY, kbd: "consult · 01", tr: "easy · 12 мин", title: "Первая консультация", desc: "Должник 1.4 млн ₽ долга, дети, ипотека. Возражения, эмпатия, продажа стратегии.", m1: "8 реплик", m2: "124k попыток" },
      { a: MAG, kbd: "consult · 04", tr: "hard · 22 мин", title: "Сложный кейс с активами", desc: "Должник с авто, дачей, долей в ООО. Управляющий начнёт оспаривать сделки.", m1: "14 реплик", m2: "38k попыток" },
      { a: AMB, kbd: "nego · 02", tr: "medium · 18 мин", title: "Переговоры с кредитором", desc: "Банк против мирового. Закрытие переговоров с минимальными уступками.", m1: "12 реплик", m2: "76k попыток" },
      { a: MAG, kbd: "court · 01", tr: "hard · 25 мин", title: "Защита единственного жилья", desc: "Судебное заседание. Возражения управляющего. Демонстрация исполнит. иммунитета.", m1: "18 реплик", m2: "52k попыток" },
      { a: CY, kbd: "object · 03", tr: "easy · 10 мин", title: "Работа с возражениями клиента", desc: "«Сосед оформил, через месяц ему всё списали». Контр-аргументация, мягкий разворот.", m1: "6 реплик", m2: "198k попыток" },
      { a: AMB, kbd: "team · 02", tr: "medium · 15 мин", title: "Делегирование младшему юристу", desc: "Постановка задачи, контрольные точки, обратная связь. Сценарий для управляющих.", m1: "10 реплик", m2: "42k попыток" },
    ].map(gcard).join(""); } },

    { anchor: "Подготовка заявления о банкротстве", grid: "rd-g2", html: function () { return [
      { a: CY, num: "01", tag: "32 пункта", title: "Подготовка заявления о банкротстве", desc: "Все шаги — от сбора документов до подачи в арбитраж. Проверено на 5k+ дел.", m1: "PDF + редактируемый", cta: "Открыть" },
      { a: CY, num: "02", tag: "24 пункта", title: "Взаимодействие с арбитражным управляющим", desc: "Что просить, что давать, на что не отвечать. Тактика переговоров.", m1: "PDF + редактируемый", cta: "Открыть" },
      { a: CY, num: "03", tag: "18 пунктов", title: "Внесудебное банкротство через МФЦ", desc: "Когда и кому подходит. Документы, сроки, ограничения процедуры.", m1: "PDF + редактируемый", cta: "Открыть" },
      { a: CY, num: "04", tag: "38 пунктов", title: "Анализ сделок должника", desc: "Что искать, как доказывать недействительность, сроки исковой давности.", m1: "PDF + редактируемый", cta: "Открыть" },
      { a: CY, num: "05", tag: "28 пунктов", title: "Первая консультация · скрипт + чек-лист", desc: "От встречи до закрытия сделки. С возражениями и контр-аргументами.", m1: "PDF + редактируемый", cta: "Открыть" },
      { a: CY, num: "06", tag: "22 пункта", title: "Защита единственного жилья", desc: "Исполнительский иммунитет, тактика, прецеденты. Что говорить в суде.", m1: "PDF + редактируемый", cta: "Открыть" },
    ].map(gcard).join(""); } },

    { anchor: "Введение в банкротство", grid: "rd-g2", html: function () { return [
      { a: CY, num: "01", tr: "стр. 12", title: "Введение в банкротство физлиц", desc: "Кому это нужно. Когда подавать. Базовые мифы и реалии процедуры.", m1: "глава 1", cta: "Превью" },
      { a: CY, num: "02", tr: "стр. 14–28", title: "Подготовка и подача заявления", desc: "Документы, расчёт суммы, выбор СРО. Чек-листы и шаблоны заявлений.", m1: "глава 2", cta: "Превью" },
      { a: CY, num: "03", tr: "стр. 29–48", title: "Анализ сделок и оспаривание", desc: "Подозрительные сделки, исковая давность, тактика управляющего и должника.", m1: "глава 3", cta: "Превью" },
      { a: CY, num: "04", tr: "стр. 49–72", title: "Защита единственного жилья", desc: "Исполнительский иммунитет. Ипотека. Совместная собственность. Кейсы судов.", m1: "глава 4", cta: "Превью" },
      { a: CY, num: "05", tr: "стр. 73–96", title: "Взаимодействие с АУ и кредиторами", desc: "Тактика общения, собрание кредиторов, реестр, торги имущества.", m1: "глава 5", cta: "Превью" },
      { a: CY, num: "06", tr: "стр. 97–117", title: "Завершение процедуры", desc: "Освобождение от долгов. Когда суд может отказать. Последствия банкротства.", m1: "глава 6", cta: "Превью" },
    ].map(gcard).join(""); } },

    { anchor: "изменил позицию по оспариванию", grid: "rd-feed", html: function () { return [
      { a: CY, feat: true, title: "ВС РФ изменил позицию по оспариванию сделок должника", desc: "Определение от 22.09.2026 №305-ЭС26-12. Что теперь делать управляющим и юристам должника.", tag: "суды", date: "24.09", read: "6 мин" },
      { a: MAG, title: "Как мы автоматизировали 70% документов с AI · кейс", desc: "Бюро «Поток-БФЛ» делится опытом внедрения AI-генератора заявлений и претензий за 4 месяца.", tag: "ai", date: "23.09", read: "9 мин" },
      { a: CY, title: "Поправки в ФЗ-127. Новый порог суммы долга", desc: "Объясняем нормы простым языком. Что изменится для должников и для юристов в работе.", tag: "закон", date: "22.09", read: "5 мин" },
      { a: MAG, title: "Защита единственного жилья. Свежая практика", desc: "Топ-12 определений АС за лето 2026. На что суды стали обращать внимание чаще.", tag: "кейсы", date: "20.09", read: "11 мин" },
      { a: CY, title: "Найм юриста в БФЛ-бюро. Метрики и тесты", desc: "Что мерять на собеседовании. Тестовое задание и поведенческие интервью.", tag: "практика", date: "19.09", read: "8 мин" },
    ].map(frow).join(""); } },
  ];

  function injectCSS() { if (!document.getElementById("pt-rd2-style") && document.head) { var s = document.createElement("style"); s.id = "pt-rd2-style"; s.textContent = CSS; document.head.appendChild(s); } }

  // Независимо от класса: находим элемент с фразой, поднимаемся вверх до
  // ближайшего предка, у которого >=3 детей-карточек (это и есть грид).
  function findGridByAnchor(phrase) {
    var els = document.querySelectorAll("h1,h2,h3,h4,p,span,div,a,article,li,b,strong");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if ((el.textContent || "").indexOf(phrase) === -1) continue;
      if (el.children.length > 2) continue; // ближе к текстовому листу
      var node = el;
      for (var up = 0; up < 9 && node.parentElement; up++) {
        var parent = node.parentElement;
        if (parent.dataset && parent.dataset.rdDone) { node = parent; continue; }
        var sibs = parent.children, cardish = 0, ours = false;
        for (var j = 0; j < sibs.length; j++) {
          if ((sibs[j].textContent || "").replace(/\s+/g, "").length > 15) cardish++;
          if (sibs[j] === node) ours = true;
        }
        // грид: >=3 карточек-соседей, и наша карточка среди них, и это не <body>/секция-обёртка
        if (sibs.length >= 3 && cardish >= 3 && ours && parent.tagName !== "BODY" && parent.tagName !== "MAIN") return parent;
        node = parent;
      }
    }
    return null;
  }

  function entrance(container) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("rd-in"); io.unobserve(e.target); } }); }, { threshold: 0.04 });
    var k = container.children, idx = 0;
    for (var i = 0; i < k.length; i++) { if (k[i].classList && k[i].classList.contains("rd-anim")) { k[i].style.transitionDelay = (idx * 45) + "ms"; idx++; io.observe(k[i]); } }
  }

  function apply() {
    injectCSS();
    SECTIONS.forEach(function (s) {
      if (s.done) return;
      var grid = findGridByAnchor(s.anchor);
      if (!grid) return;
      s.done = true;
      grid.className = s.grid;
      grid.removeAttribute("style");
      grid.innerHTML = s.html();
      entrance(grid);
      console.log("[rd2] секция поставлена:", s.anchor);
    });
    // спрятать ACTIVATION KEY
    if (!window.__ptAk2) {
      var es = document.querySelectorAll("span,div");
      for (var i = 0; i < es.length; i++) { if (/activation\s*·?\s*key/i.test(es[i].textContent || "") && es[i].children.length === 0) { var c = es[i].closest(".glass"); if (c) { c.classList.add("rd-hide"); window.__ptAk2 = true; } break; } }
    }
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 300) clearInterval(iv); }, 160);
  window.addEventListener("load", apply); window.addEventListener("DOMContentLoaded", apply);
  try { var mo = new MutationObserver(function () { apply(); }); if (document.body) mo.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 45000); } catch (e) {}
})();

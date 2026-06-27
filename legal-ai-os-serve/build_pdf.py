# -*- coding: utf-8 -*-
"""Сборка PDF с продающими фразами сайта 'ТехнологИИ права — Legal AI OS'."""
import html as H

def esc(s): return H.escape(str(s))

# ───────────────────────── КОНТЕНТ ─────────────────────────

positioning = [
    ("legal · ai · operating system",
     "ТехнологИИ права"),
    ("главный заголовок (H1)",
     "Операционная система для юристов БФЛ"),
    ("подзаголовок hero",
     "ИИ, цифровые инструменты и аналитика для практики банкротства физических лиц. "
     "Восемь направлений, выстроенных в один связный модуль — от конференции до боевых тренажёров."),
    ("дескриптор платформы",
     "Платформа про ИИ, цифровые технологии и масштабирование юридического бизнеса "
     "в сфере банкротства физических лиц."),
]

selling = {
    "Ценностные хуки": [
        "Восемь направлений, выстроенных в один связный модуль — от конференции до боевых тренажёров.",
        "Соберите свою Legal AI OS.",
        "Подключайте только то, что нужно практике.",
        "Подключайте отдельные модули или весь стек.",
        "Поднимайте уровень всей команды — без раздувания тренерского ФОТ.",
        "Академия: путь юриста БФЛ — от старта до эксперта.",
        "Четыре уровня. Один путь.",
        "Прокачка одного навыка — от 14 дней.",
        "Чек-листы — боевые инструменты практики БФЛ.",
        "Продукты — цифровой арсенал юриста БФЛ.",
        "Исследования рынка БФЛ: данные. тренды. AI.",
        "Без воды. Поток обновляется каждый день.",
        "Каждый чек-лист собран на основе реальных кейсов, протестирован на тысячах дел.",
        "Реальные кейсы, шаблоны, чек-листы.",
    ],
    "Призывы к действию (CTA)": [
        "Войти в систему →",
        "Программа →",
        "Купить билет →",
        "Корпоративная группа",
        "Начать обучение →",
        "Пройти диагностику",
        "Получить в @NeuroPravo_Bot ↗",
        "Начать тренинг →",
        "Demo · 14 дней",
        "Запросить демо →",
        "Тарифы для команд",
        "Подписаться →",
        "Активировать @NeuroPravo_Bot ↗",
        "Связаться с командой →",
        "Открыть бота →",
        "Читать →",
    ],
    "Срочность и выгода": [
        "Регистрация открыта.",
        "После 1 июня цены поднимаются.",
        "Забронируйте место в зале.",
        "Демо-доступ на 14 дней — без оплаты.",
        "Получите книгу бесплатно через @NeuroPravo_Bot.",
        "Полный комплект — со скидкой 30% и приоритетной поддержкой команды.",
        "Скидка на конференцию «ТехнологИИ права» для выпускников академии.",
        "PDF на 117 страниц, исходники шаблонов, чек-листы и обновления — всё бесплатно.",
    ],
    "Цифры и социальное доказательство": [
        "80+ спикеров · 1500+ участников · 6 потоков · 2 дня",
        "28 курсов · 4 уровня · 3200+ выпускников · 94% доходят до сертификата",
        "Книга: 117 страниц · 6 глав · 24 шаблона",
        "AI-тренажёры: 42 сценария · 6 ролей",
        "Аналитика команды: средний балл 86/100 · +18% сессий за неделю · конверсия 38%",
        "Исследования: 42 отчёта · рынок ≈ 332K кейсов · +24% YoY · прогноз 410K к 2026",
        "Чек-листы: 7 наборов · 214 пунктов",
        "Статьи: 312 материалов · обновление каждые 6 часов",
        "Telegram-канал: 12K+ подписчиков · 3–5 постов в день · 100% профильный контент",
    ],
}

modules = [
    ("01", "Конференция «ТехнологИИ права»", "event · command center",
     "Два дня, шесть параллельных потоков, более 80 спикеров и 1500 практикующих участников. "
     "Москва, БЦ «Красные Ворота». 25–26 сентября 2026."),
    ("02", "Академия — путь юриста БФЛ", "learning · pathway",
     "Четыре уровня экспертизы, 28 курсов, практические интенсивы и боевые тренажёры. "
     "Сертификация на каждом уровне. Прокачка одного навыка — от 14 дней."),
    ("03", "Книга «Банкротство физических лиц»", "digital · artifact",
     "Практическое руководство на 117 страницах для юристов, арбитражных управляющих и должников. "
     "Реальные кейсы, шаблоны, чек-листы. Бесплатно через @NeuroPravo_Bot."),
    ("04", "Обучение — AI-тренажёры для команды", "simulator · cockpit",
     "AI-диалоги, сценарные тренажёры консультации, экзамены и аналитика прогресса. "
     "Поднимайте уровень всей команды — без раздувания тренерского ФОТ."),
    ("05", "Исследования рынка БФЛ", "archive · data · AI",
     "Аналитическая библиотека отрасли. Цифры рынка, влияние ИИ на работу юристов, "
     "экономика практики, технологии лидеров, тренды судебной практики."),
    ("06", "Чек-листы — боевые инструменты", "verification · flow",
     "Семь рабочих чек-листов: от первой консультации до запуска БФЛ-практики. "
     "Каждый собран на реальных кейсах, протестирован на тысячах дел."),
    ("07", "Статьи — сигнальная лента отрасли", "signal · feed · live",
     "Разборы судебных дел, ключевые изменения законодательства, кейсы лидеров и "
     "объясняющие материалы. Без воды. Поток обновляется каждый день."),
    ("08", "Продукты — цифровой арсенал юриста", "marketplace",
     "Шесть модулей под практические задачи: AI-помощник, шаблоны, тренажёры, чек-листы, "
     "исследования, курсы. Подключайте только то, что нужно практике."),
]

conf_intro = ("Конференция «ТехнологИИ права»", "25–26 сентября 2026",
    "Два дня, шесть параллельных потоков, более 80 спикеров и 1500 практикующих "
    "участников. Москва, БЦ «Красные Ворота».")

conf_blocks = [
    ("Место проведения", [
        "БЦ «Красные Ворота», Москва · Садовая-Спасская, 21/1",
        "Метро «Красные Ворота» · geo 55.7720N / 37.6493E",
        "Формат: Offline + Online · Язык: RU",
    ]),
    ("Шесть параллельных потоков", [
        "Каждый поток — собственный продюсер, собственная программа и плотная "
        "боевая повестка для практикующих юристов.",
    ]),
    ("Спикеры и эксперты отрасли БФЛ", [
        "Более 80 спикеров и экспертов отрасли. Полный список — на сайте.",
    ]),
    ("Расписание двух дней", [
        "25.09 → 26.09 — программа, разбитая по потокам и сессиям.",
    ]),
    ("Регистрация открыта", [
        "Забронируйте место в зале. Билеты делятся на три тарифа — Standard, Pro, VIP.",
        "После 1 июня цены поднимаются.",
        "CTA: Программа → · Билеты · Купить билет → · Корпоративная группа",
    ]),
]

pricing = [
    ("STARTER", "бесплатно", "Бот · книга · 3 чек-листа"),
    ("PRACTICE · popular", "9 900 ₽ / мес", "+ тренажёры · все чек-листы · исследования"),
    ("ENTERPRISE", "по запросу", "Полный стек · команда от 5 · кастомизация"),
]

contacts = [
    ("Telegram-канал", "@kredit_advokat — 12K+ подписчиков"),
    ("Telegram-бот", "@NeuroPravo_Bot — AI-помощник юриста БФЛ"),
    ("E-mail", "pravotechhub@mail.ru"),
    ("Адрес", "Москва · Садовая-Спасская, 21/1"),
    ("Платформа", "© 2026 ТехнологИИ права · Legal AI OS · v 26.09"),
]

# ───────────────────────── ВЁРСТКА ─────────────────────────

CSS = """
:root{ --bg:#07080B; --panel:#0C0E14; --panel2:#10131C; --line:#1C2230;
 --cy:#00E5FF; --cy-dim:#1Fb6c8; --tx:#E8ECF2; --mut:#8A93A6; --mut2:#5C6678; }
*{box-sizing:border-box; margin:0; padding:0;
 -webkit-print-color-adjust:exact; print-color-adjust:exact;}
@page{ size:A4; margin:14mm 13mm; }
body{ background:var(--bg); color:var(--tx);
 font-family:"Inter","Helvetica Neue",Arial,system-ui,sans-serif;
 font-size:10.5pt; line-height:1.5; }
.mono{ font-family:"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace; }
h1,h2,h3{ font-family:"Space Grotesk","Inter",sans-serif; font-weight:700; letter-spacing:-.01em;}
.cy{color:var(--cy);} .mut{color:var(--mut);} .mut2{color:var(--mut2);}

/* COVER */
.cover{ height:267mm; display:flex; flex-direction:column; justify-content:center;
 page-break-after:always; position:relative; padding:0 4mm;}
.cover::before{content:""; position:absolute; inset:0;
 background:radial-gradient(60% 45% at 50% 38%, rgba(0,229,255,.16), transparent 70%);}
.cover .kick{ position:relative; font-size:9pt; letter-spacing:.32em; color:var(--cy);
 text-transform:uppercase; margin-bottom:18px;}
.cover h1{ position:relative; font-size:40pt; line-height:1.04; margin-bottom:18px;}
.cover h1 .cy{display:block;}
.cover .sub{ position:relative; max-width:150mm; color:var(--mut); font-size:12pt; margin-bottom:34px;}
.cover .meta{ position:relative; display:flex; gap:30px; flex-wrap:wrap;
 border-top:1px solid var(--line); padding-top:18px; font-size:9pt;}
.cover .meta b{display:block; font-size:19pt; color:var(--tx); font-family:"Space Grotesk",sans-serif;}
.badge{ position:relative; display:inline-block; align-self:flex-start; margin-bottom:30px;
 border:1px solid var(--cy); color:var(--cy); border-radius:6px; padding:5px 12px;
 font-size:8.5pt; letter-spacing:.18em;}

/* SECTIONS */
.sec{ page-break-before:always; padding-top:2mm;}
.sec-tag{ font-size:8.5pt; letter-spacing:.22em; color:var(--cy); text-transform:uppercase;
 border-bottom:1px solid var(--line); padding-bottom:7px; margin-bottom:4px;}
.sec h2{ font-size:23pt; margin:8px 0 4px; line-height:1.08;}
.sec .lead{ color:var(--mut); font-size:11pt; margin-bottom:18px; max-width:165mm;}

.grp{ margin:16px 0 8px; }
.grp-h{ font-size:9pt; letter-spacing:.16em; text-transform:uppercase; color:var(--cy-dim);
 display:flex; align-items:center; gap:10px; margin-bottom:9px;}
.grp-h::after{content:""; flex:1; height:1px; background:var(--line);}

.cards{ display:grid; grid-template-columns:1fr 1fr; gap:7px; }
.card{ background:var(--panel); border:1px solid var(--line); border-left:2px solid var(--cy);
 border-radius:7px; padding:9px 12px; font-size:10pt; page-break-inside:avoid;}
.card.full{grid-column:1 / -1;}
.cta{ background:var(--panel2); border:1px solid var(--line); border-radius:7px;
 padding:8px 12px; font-size:10pt; color:var(--tx); page-break-inside:avoid;}
.cta .cy{font-weight:600;}
.q{display:grid; grid-template-columns:1fr; gap:7px;}
.q .card{border-left-color:var(--cy);}

/* modules */
.mod{ background:var(--panel); border:1px solid var(--line); border-radius:9px;
 padding:12px 14px; margin-bottom:9px; page-break-inside:avoid; position:relative;}
.mod .num{ font-size:8.5pt; letter-spacing:.2em; color:var(--cy);}
.mod .ttl{ font-family:"Space Grotesk",sans-serif; font-weight:700; font-size:13.5pt; margin:3px 0 1px;}
.mod .tag{ font-size:8pt; letter-spacing:.16em; color:var(--mut2); text-transform:uppercase; margin-bottom:7px;}
.mod .desc{ color:var(--mut); font-size:10pt;}

/* conference */
.conf-hero{ background:linear-gradient(135deg, rgba(0,229,255,.10), rgba(0,229,255,0));
 border:1px solid var(--line); border-radius:11px; padding:18px 20px; margin-bottom:16px;}
.conf-hero .date{ color:var(--cy); font-size:13pt; font-weight:700; font-family:"Space Grotesk",sans-serif;}
.conf-hero h3{font-size:20pt; margin:4px 0 8px;}
.conf-hero p{color:var(--mut); font-size:10.5pt; max-width:150mm;}
.cblock{ background:var(--panel); border:1px solid var(--line); border-radius:8px;
 padding:11px 14px; margin-bottom:8px; page-break-inside:avoid;}
.cblock h4{ font-family:"Space Grotesk",sans-serif; font-size:11.5pt; margin-bottom:6px;}
.cblock li{ list-style:none; color:var(--mut); font-size:9.8pt; padding-left:14px; position:relative; margin:3px 0;}
.cblock li::before{content:"▸"; position:absolute; left:0; color:var(--cy);}

/* pricing */
.price-row{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin:10px 0 18px;}
.tier{ background:var(--panel); border:1px solid var(--line); border-radius:9px; padding:13px; page-break-inside:avoid;}
.tier .name{ font-size:8.5pt; letter-spacing:.16em; color:var(--cy); text-transform:uppercase;}
.tier .amt{ font-family:"Space Grotesk",sans-serif; font-weight:700; font-size:15pt; margin:6px 0 6px;}
.tier .feat{ color:var(--mut); font-size:9pt;}
.ctab{ width:100%; border-collapse:collapse; margin-top:6px;}
.ctab td{ border:1px solid var(--line); padding:8px 12px; font-size:10pt; vertical-align:top;}
.ctab td.k{ color:var(--cy); width:38mm; white-space:nowrap; font-size:9pt; letter-spacing:.06em;}

.foot{ margin-top:14px; border-top:1px solid var(--line); padding-top:10px;
 color:var(--mut2); font-size:8pt; letter-spacing:.04em; display:flex; justify-content:space-between;}
"""

def cards(items, cls="card"):
    return "".join(f'<div class="{cls}">{esc(t)}</div>' for t in items)

out = []
out.append(f"<!DOCTYPE html><html lang='ru'><head><meta charset='utf-8'><style>{CSS}</style></head><body>")

# COVER
out.append(f"""
<section class="cover">
  <span class="badge mono">LEGAL · AI · OPERATING SYSTEM · v 2026.09</span>
  <div class="kick mono">ТехнологИИ права — сборник фраз сайта</div>
  <h1>Продающие фразы,<span class="cy">проект и конференция</span></h1>
  <div class="sub">Вся ключевая текстовка лендинга «ТехнологИИ права / Legal AI OS»:
   позиционирование, продающие формулировки и призывы, описание восьми модулей
   и блок конференции 25–26 сентября 2026.</div>
  <div class="meta mono">
    <div><b>4</b>раздела продающих фраз</div>
    <div><b>8</b>модулей проекта</div>
    <div><b>80+</b>спикеров конференции</div>
    <div><b>1500+</b>участников</div>
  </div>
</section>
""")

# 1. POSITIONING
out.append('<section class="sec"><div class="sec-tag mono">// 01 · positioning</div>')
out.append('<h2>Позиционирование</h2>')
out.append('<div class="lead">Как проект называет и подаёт себя — главные смысловые якоря.</div>')
out.append('<div class="q">')
for label, text in positioning:
    out.append(f'<div class="card"><div class="mono mut2" style="font-size:8pt;letter-spacing:.12em;margin-bottom:4px;text-transform:uppercase">{esc(label)}</div>{esc(text)}</div>')
out.append('</div></section>')

# 2. SELLING
out.append('<section class="sec"><div class="sec-tag mono">// 02 · sales copy</div>')
out.append('<h2>Продающие фразы</h2>')
out.append('<div class="lead">Формулировки, которые продают: ценностные хуки, призывы к действию, '
           'триггеры срочности и цифры-доказательства.</div>')
for grp, items in selling.items():
    cls = "cta" if grp == "Призывы к действию (CTA)" else "card"
    out.append(f'<div class="grp"><div class="grp-h mono">{esc(grp)}</div><div class="cards">{cards(items, cls)}</div></div>')
out.append('</section>')

# 3. PROJECT / MODULES
out.append('<section class="sec"><div class="sec-tag mono">// 03 · the project</div>')
out.append('<h2>О проекте — восемь модулей</h2>')
out.append('<div class="lead">«Восемь направлений, выстроенных в один связный модуль — '
           'от конференции до боевых тренажёров.»</div>')
for num, ttl, tag, desc in modules:
    out.append(f'''<div class="mod"><div class="num mono">// module · {esc(num)}</div>
      <div class="ttl">{esc(ttl)}</div><div class="tag mono">{esc(tag)}</div>
      <div class="desc">{esc(desc)}</div></div>''')
out.append('</section>')

# 4. CONFERENCE
out.append('<section class="sec"><div class="sec-tag mono">// 04 · conference</div>')
out.append('<h2>О конференции</h2>')
ci_t, ci_d, ci_p = conf_intro
out.append(f'''<div class="conf-hero"><div class="date mono">{esc(ci_d)}</div>
  <h3>{esc(ci_t)}</h3><p>{esc(ci_p)}</p></div>''')
for h, items in conf_blocks:
    lis = "".join(f"<li>{esc(x)}</li>" for x in items)
    out.append(f'<div class="cblock"><h4>{esc(h)}</h4><ul>{lis}</ul></div>')
out.append('</section>')

# 5. PRICING + CONTACTS
out.append('<section class="sec"><div class="sec-tag mono">// 05 · tariffs &amp; contacts</div>')
out.append('<h2>Тарифы и контакты</h2>')
out.append('<div class="lead">Тарифная лестница платформы и точки входа для клиента.</div>')
out.append('<div class="grp"><div class="grp-h mono">Тарифы платформы</div><div class="price-row">')
for name, amt, feat in pricing:
    out.append(f'<div class="tier"><div class="name mono">{esc(name)}</div><div class="amt">{esc(amt)}</div><div class="feat">{esc(feat)}</div></div>')
out.append('</div></div>')
out.append('<div class="grp"><div class="grp-h mono">Контакты</div><table class="ctab">')
for k, v in contacts:
    out.append(f'<tr><td class="k mono">{esc(k)}</td><td>{esc(v)}</td></tr>')
out.append('</table></div>')
out.append('<div class="foot mono"><span>ТехнологИИ права · Legal AI OS</span>'
           '<span>сборник фраз сайта · извлечено из standalone-сборки</span></div>')
out.append('</section>')

out.append("</body></html>")

open("Legal_AI_OS_phrases.html", "w", encoding="utf-8").write("\n".join(out))
print("HTML written:", len("\n".join(out)), "bytes")

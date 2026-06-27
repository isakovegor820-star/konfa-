# -*- coding: utf-8 -*-
"""PDF: продающие фразы для билетов на конференцию — одиночки / команды / владельцы."""
import html as H
def e(s): return H.escape(str(s))

PRINCIPLE = [
    ("Никто не покупает «билет»", "Покупают исход. Одиночка — больше дел и «не проиграть». "
     "Команда — навык и единый стандарт. Владелец — систему роста и ROI."),
    ("Две задачи каждой фразы", "1) Доказать пользу — конкретной программой, а не словом «полезно». "
     "2) Доказать, что будет круто — масштаб, связи, статус, дефицит."),
    ("Сегмент = тариф", "Одиночка → «Стандарт». Команда → «Бизнес»/групповой. "
     "Владелец → «Корпоративный»/«Full Pass»."),
]

personas = [
    {
        "no": "01", "name": "Для одиночек",
        "who": "Соло-юрист или ИП по БФЛ. Покупает билет себе.",
        "ticket": "Билет «Стандарт» · 15 500 ₽ (было 52 000)",
        "pain": "Конкуренция выросла втрое, 12 поправок за 2024–2026, страх проиграть дело, рутина, дорогой лид.",
        "ignore": None,
        "groups": [
            ("Крючки — что зацепит", "card", [
                "Два дня, которые окупит одно выигранное дело.",
                "Заберите свою долю рынка, пока конкуренты учатся на своих ошибках.",
                "Всё, что изменилось в БФЛ за 2024–2026 — за два дня, без чтения 12 поправок.",
                "Перестаньте гуглить по ночам — получите готовые алгоритмы из первых рук.",
            ]),
            ("Чем доказать пользу", "card", [
                "Поток «Банкротство физлиц»: оспаривание сделок, единственное жильё, неосвобождение — свежая судебная практика.",
                "Галкин — «Стратегии защиты должников 2026». Путин — «Практика с 0 до 100 дел/мес».",
                "AI-воркшопы: ИИ готовит документы за вас — попробуете руками.",
                "Уносите готовые шаблоны и чек-листы, а не конспекты.",
            ]),
            ("Чем доказать, что будет круто", "card", [
                "1500+ коллег и 80+ спикеров — весь рынок БФЛ в одном зале.",
                "Сертификат «AI для юристов» (15 000 ₽) в подарок при покупке до 30 июля.",
                "Партнёрства с арбитражными управляющими, которые приносят дела.",
            ]),
            ("Призывы к действию", "cta", [
                "Забронировать место — «Стандарт» от 15 500 ₽",
                "Успеть по ранней цене",
                "Подобрать билет в @NeuroPravo_Bot",
            ]),
        ],
        "math": None,
        "punch": "Один новый клиент с конференции окупает билет 5–10 раз.",
    },
    {
        "no": "02", "name": "Для команды",
        "who": "Юристы, ассистенты, продажники практики. Едут группой.",
        "ticket": "Билет «Бизнес» · 24 600 ₽ (было 68 000) · или групповой",
        "pain": "Команда работает вразнобой, навыки разного уровня, брак в делах → возвраты и злые отзывы.",
        "ignore": None,
        "groups": [
            ("Крючки — что зацепит", "card", [
                "Привезите команду — вернётесь с единым стандартом работы, а не с разными конспектами.",
                "Пусть вся команда заговорит на одном языке БФЛ.",
                "Сильная команда = меньше брака в делах и меньше возвратов.",
                "2 дня вне рутины: обучение и тимбилдинг одновременно.",
            ]),
            ("Чем доказать пользу", "card", [
                "Потоки «Рост и масштабирование» и «Автоматизация практики»: продажи, документооборот, CRM, регламенты.",
                "В тарифе «Бизнес» — тренинги для руководителей, круглые столы и бизнес-игра.",
                "Тренажёры с AI-должниками и модульная аттестация — навык, а не теория.",
                "Каждый сотрудник уносит сертификат участника.",
            ]),
            ("Чем доказать, что будет круто", "card", [
                "В зале — Сбербанк, Яндекс, Газпром: уровень, связи, выставка решений.",
                "Приложение конференции у каждого: AI-ассистент, расписание, нетворкинг.",
                "Общий опыт команды, который потом держит её вместе.",
            ]),
            ("Призывы к действию", "cta", [
                "Взять командой — «Бизнес» от 24 600 ₽",
                "Запросить групповые условия",
                "Обсудить участие команды",
            ]),
        ],
        "math": None,
        "punch": "Один не ушедший сотрудник и +5% к конверсии воронки окупают все билеты.",
    },
    {
        "no": "03", "name": "Для владельцев команды",
        "who": "Собственник практики / руководитель. ЛПР, мыслит P&L и потоком дел.",
        "ticket": "Билет «Корпоративный» · 69 000 ₽ (было 231 000, 5 мест) · или «Full Pass» 40 800 ₽",
        "pain": "Себестоимость дела, маржа, дел/мес, найм, текучка, дорогой лид, зависимость бизнеса от собственника.",
        "ignore": "Пролистываю не глядя: «что такое банкротство», «ИИ — будущее», мотивацию, "
                  "спикеров-теоретиков и нетворкинг ради нетворкинга. Продайте мне прибыль, а не мероприятие.",
        "groups": [
            ("Крючки — что зацепит", "card", [
                "С 0 до 100 дел в месяц: оргструктура, найм, финмодель.",
                "Уберите рутину раньше конкурентов — на каких этапах ИИ снимает часы юриста.",
                "Обучите команду без себя: тренажёры, аттестация, регламенты.",
                "Один невозвращённый кейс окупает все 5 билетов.",
            ]),
            ("Чем доказать пользу", "card", [
                "Доклад Путина «с 0 до 100 дел/мес» + отчёт «Построение юркомпании от соло до 50+ дел/мес».",
                "Юнит-экономика привлечения: реальные CPL/CPA, рейтинг каналов, воронка.",
                "Закрытые форматы «Full Pass»: мастермайнды для ТОПов, стратегическая сессия, Спикерская.",
            ]),
            ("Чем доказать, что будет круто", "card", [
                "За закрытыми столами — владельцы практик, которые уже делают 100+ дел/мес.",
                "Партнёрства с АУ и регионалами — реферальный поток на годы.",
                "Участники уровня Сбер / Яндекс / Газпром — реальные B2B-связки.",
            ]),
            ("Призывы к действию", "cta", [
                "Привести команду — «Корпоративный» 69 000 ₽ (5 билетов)",
                "Обсудить корпоративные условия",
                "Забрать раннюю цену до 30 июля",
            ]),
        ],
        "math": [
            ("Корпоративный билет (5 чел)", "69 000 ₽"),
            ("Средний чек одного дела", "~100 000 ₽"),
            ("Бонус-сертификаты 15 000 ₽ × 5", "75 000 ₽ ценности"),
            ("Окупаемость", "1 дело — остальное в плюс"),
        ],
        "punch": "Билет — самый дешёвый способ купить чужие 5 лет ошибок.",
    },
]

universal = {
    "Срочность и дефицит": [
        "Ранние цены — до −70%. После 30 июля дороже.",
        "Осталось 340 мест.",
        "Купи до 30 июля — сертификат «AI для юристов» (15 000 ₽) в подарок.",
        "До старта 91 день. Цена растёт не в день Х, а сейчас.",
    ],
    "Снятие риска": [
        "Не сможете быть очно — все выступления в записи остаются с вами.",
        "Не выбрали тариф — бот подберёт под вас за 2 минуты (@NeuroPravo_Bot).",
    ],
}

ticket_map = [
    ("Одиночка", "«Стандарт»", "15 500 ₽", "Себе. Личный рост, больше дел, «не проиграть»."),
    ("Команда", "«Бизнес» / групповой", "24 600 ₽", "Сотрудникам. Единый стандарт, навык, сертификаты."),
    ("Владелец", "«Корпоративный» / «Full Pass»", "69 000 / 40 800 ₽", "Систему роста, ROI, обучение команды без себя."),
]

# ───────── CSS ─────────
CSS = """
:root{--bg:#07080B;--panel:#0C0E14;--panel2:#10131C;--line:#1C2230;--cy:#00E5FF;--cy2:#1fb6c8;
 --tx:#E8ECF2;--mut:#8A93A6;--mut2:#5C6678;--gold:#E8B84B;--red:#E26;}
*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
@page{size:A4;margin:13mm 12mm;}
body{background:var(--bg);color:var(--tx);font-family:"Inter","Helvetica Neue",Arial,sans-serif;font-size:10pt;line-height:1.5;}
.mono{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;}
h1,h2,h3{font-family:"Space Grotesk","Inter",sans-serif;font-weight:700;letter-spacing:-.01em;}
.cy{color:var(--cy);} .mut{color:var(--mut);} .gold{color:var(--gold);}
/* cover */
.cover{height:268mm;display:flex;flex-direction:column;justify-content:center;page-break-after:always;position:relative;padding:0 3mm;}
.cover::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 42% at 50% 36%,rgba(0,229,255,.17),transparent 70%);}
.badge{position:relative;align-self:flex-start;border:1px solid var(--cy);color:var(--cy);border-radius:6px;padding:5px 12px;font-size:8.5pt;letter-spacing:.16em;margin-bottom:24px;}
.cover .kick{position:relative;font-size:9pt;letter-spacing:.3em;color:var(--cy);text-transform:uppercase;margin-bottom:16px;}
.cover h1{position:relative;font-size:37pt;line-height:1.05;margin-bottom:16px;}
.cover h1 .cy{display:block;}
.cover .sub{position:relative;max-width:160mm;color:var(--mut);font-size:11.5pt;margin-bottom:26px;}
.three{position:relative;display:flex;gap:9px;}
.three .b{flex:1;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--cy);border-radius:8px;padding:11px 13px;}
.three .b .n{font-family:"Space Grotesk";font-weight:700;font-size:9pt;letter-spacing:.1em;color:var(--cy);text-transform:uppercase;}
.three .b .t{font-family:"Space Grotesk";font-weight:700;font-size:13pt;margin:5px 0 3px;}
.three .b .d{color:var(--mut);font-size:8.6pt;}
/* principle */
.sec{page-break-before:always;padding-top:1mm;}
.sec-tag{font-size:8.5pt;letter-spacing:.2em;color:var(--cy);text-transform:uppercase;border-bottom:1px solid var(--line);padding-bottom:6px;}
.sec h2{font-size:22pt;margin:8px 0 3px;line-height:1.08;}
.sec .lead{color:var(--mut);font-size:10.5pt;margin-bottom:14px;max-width:170mm;}
.pr{background:var(--panel);border:1px solid var(--line);border-left:2px solid var(--cy);border-radius:7px;padding:11px 13px;margin-bottom:8px;page-break-inside:avoid;}
.pr .t{font-family:"Space Grotesk";font-weight:700;font-size:11.5pt;margin-bottom:2px;}
.pr .d{color:var(--mut);font-size:9.6pt;}
/* persona band */
.band{position:relative;background:linear-gradient(135deg,rgba(0,229,255,.12),rgba(0,229,255,0));
 border:1px solid var(--line);border-left:3px solid var(--cy);border-radius:10px;padding:11px 15px;margin-bottom:9px;page-break-inside:avoid;}
.band .no{font-family:"Space Grotesk";font-weight:700;font-size:9pt;letter-spacing:.18em;color:var(--cy);}
.band h2{font-size:21pt;margin:2px 0 5px;}
.band .who{color:var(--tx);font-size:10pt;}
.band .pain{color:var(--mut);font-size:9.2pt;margin-top:4px;}
.band .tk{display:inline-block;margin-top:9px;background:var(--panel2);border:1px solid var(--cy);color:var(--cy);
 border-radius:999px;padding:4px 13px;font-size:9pt;font-family:"Space Grotesk";font-weight:600;}
.ignore{background:#160d0f;border:1px solid #3a1f22;border-left:2px solid var(--red);border-radius:7px;
 padding:8px 12px;margin-bottom:8px;color:#d9a;font-size:9.2pt;font-style:italic;page-break-inside:avoid;}
.grp{margin:8px 0 4px;}
.grp-h{font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--cy2);display:flex;align-items:center;gap:9px;margin-bottom:7px;}
.grp-h::after{content:"";flex:1;height:1px;background:var(--line);}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:5px;}
.card{background:var(--panel);border:1px solid var(--line);border-left:2px solid var(--cy);border-radius:6px;padding:7px 11px;font-size:9.5pt;page-break-inside:avoid;}
.cta{background:var(--panel2);border:1px solid var(--line);border-radius:999px;padding:7px 13px;font-size:9.3pt;page-break-inside:avoid;color:var(--tx);}
.cta::before{content:"▸ ";color:var(--cy);}
.punch{background:var(--panel);border:1px dashed var(--cy);border-radius:8px;padding:9px 13px;margin-top:7px;
 font-size:10.5pt;font-family:"Space Grotesk";font-weight:600;color:var(--tx);page-break-inside:avoid;}
.punch::before{content:"➜  ";color:var(--cy);}
.math{background:#0a0d12;border:1px solid var(--line);border-radius:8px;padding:10px 14px;margin-top:7px;page-break-inside:avoid;}
.math .mh{font-size:8pt;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:7px;}
.math table{width:100%;border-collapse:collapse;}
.math td{padding:4px 0;font-size:10pt;}
.math td.v{text-align:right;color:var(--cy);font-family:"Space Grotesk";font-weight:700;white-space:nowrap;}
.math tr+tr td{border-top:1px solid var(--line);}
.math tr:last-child td{color:var(--gold);font-weight:700;border-top:1px solid var(--gold);}
/* map */
.tbl{width:100%;border-collapse:collapse;margin-top:6px;}
.tbl th{background:var(--panel2);color:var(--cy);font-size:8pt;letter-spacing:.12em;text-transform:uppercase;
 text-align:left;padding:8px 11px;border:1px solid var(--line);font-weight:600;}
.tbl td{border:1px solid var(--line);padding:9px 11px;font-size:9.5pt;vertical-align:top;}
.tbl td.p{color:var(--cy);white-space:nowrap;font-family:"Space Grotesk";font-weight:700;}
.tbl td.s{font-family:"Space Grotesk";font-weight:700;color:var(--tx);}
.subh{font-family:"Space Grotesk";font-weight:700;font-size:13pt;margin:16px 0 7px;}
.foot{margin-top:13px;border-top:1px solid var(--line);padding-top:9px;color:var(--mut2);font-size:8pt;display:flex;justify-content:space-between;}
"""

def cards(items, cls):
    return "".join(f'<div class="{cls}">{e(t)}</div>' for t in items)

o=[f"<!DOCTYPE html><html lang='ru'><head><meta charset='utf-8'><style>{CSS}</style></head><body>"]

# COVER
o.append(f"""<section class="cover">
<span class="badge mono">КОНФЕРЕНЦИЯ «ТЕХНОЛОГИИ ПРАВА» · 25–26 СЕНТЯБРЯ 2026</span>
<div class="kick mono">скрипт продаж билетов · pravotech.pro</div>
<h1>Продающие фразы<span class="cy">для билетов на конференцию</span></h1>
<div class="sub">Готовые формулировки под три типа покупателя — одиночки, команды и владельцы практик БФЛ.
Для каждого: крючки, доказательства пользы, аргументы «будет круто», призывы и ROI.</div>
<div class="three">
<div class="b"><div class="n">персона 01</div><div class="t">Одиночки</div><div class="d">Соло-юрист. Билет «Стандарт» от 15 500 ₽.</div></div>
<div class="b"><div class="n">персона 02</div><div class="t">Команды</div><div class="d">Юрфирма группой. Билет «Бизнес» от 24 600 ₽.</div></div>
<div class="b"><div class="n">персона 03</div><div class="t">Владельцы</div><div class="d">Собственник практики. «Корпоративный» 69 000 ₽.</div></div>
</div></section>""")

# PRINCIPLE
o.append('<section class="sec"><div class="sec-tag mono">// принцип</div><h2>Главное перед фразами</h2>')
o.append('<div class="lead">Три правила, на которых держатся все формулировки ниже.</div>')
for t,d in PRINCIPLE:
    o.append(f'<div class="pr"><div class="t">{e(t)}</div><div class="d">{e(d)}</div></div>')
o.append('</section>')

# PERSONAS
for p in personas:
    o.append('<section class="sec"><div class="sec-tag mono">// персона '+e(p["no"])+'</div>')
    o.append(f'''<div class="band"><div class="no mono">ПЕРСОНА · {e(p["no"])}</div>
      <h2>{e(p["name"])}</h2><div class="who">{e(p["who"])}</div>
      <div class="pain">Боль: {e(p["pain"])}</div>
      <span class="tk">{e(p["ticket"])}</span></div>''')
    if p["ignore"]:
        o.append(f'<div class="ignore">⛌ {e(p["ignore"])}</div>')
    for gh,cls,items in p["groups"]:
        o.append(f'<div class="grp"><div class="grp-h mono">{e(gh)}</div><div class="cards">{cards(items,cls)}</div></div>')
    if p["math"]:
        o.append('<div class="math"><div class="mh mono">математика, которая закрывает сделку</div><table>')
        for k,v in p["math"]:
            o.append(f'<tr><td>{e(k)}</td><td class="v">{e(v)}</td></tr>')
        o.append('</table></div>')
    o.append(f'<div class="punch">{e(p["punch"])}</div>')
    o.append('</section>')

# UNIVERSAL + MAP
o.append('<section class="sec"><div class="sec-tag mono">// для всех</div><h2>Универсальные усилители</h2>')
o.append('<div class="lead">Работают для любой персоны — добавляйте в конец оффера.</div>')
for gh,items in universal.items():
    o.append(f'<div class="grp"><div class="grp-h mono">{e(gh)}</div><div class="cards">{cards(items,"card")}</div></div>')
o.append('<div class="subh">Какой билет кому продавать</div>')
o.append('<table class="tbl"><tr><th>Персона</th><th>Тариф</th><th>Цена</th><th>За что платит</th></tr>')
for s,t,pr,d in ticket_map:
    o.append(f'<tr><td class="s">{e(s)}</td><td>{e(t)}</td><td class="p">{e(pr)}</td><td>{e(d)}</td></tr>')
o.append('</table>')
o.append('<div class="foot mono"><span>Конференция «ТехнологИИ права» · pravotech.pro</span><span>скрипт продаж билетов · 3 персоны</span></div>')
o.append('</section></body></html>')

open("Tickets_sales_phrases.html","w",encoding="utf-8").write("\n".join(o))
print("HTML written:",len("\n".join(o)),"bytes")

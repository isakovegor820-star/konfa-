# -*- coding: utf-8 -*-
"""PDF: продающие фразы / проект / конференция сайта pravotech.pro (live)."""
import html as H
def e(s): return H.escape(str(s))

# ────────────────────────────── КОНТЕНТ (pravotech.pro) ──────────────────────────────
positioning = [
    ("бренд", "ТехнологИИ права"),
    ("тэглайн", "ИИ, технологии и масштабирование юрбизнеса в банкротстве"),
    ("три опоры", "Аналитика · Обучение · Конференция"),
    ("главное обещание (hero)",
     "Увеличьте доход практики банкротства физлиц с помощью ИИ, аналитики и экспертного сообщества."),
    ("заголовок-крючок",
     "Всё, чтобы ваша практика росла быстрее рынка."),
    ("суть экосистемы",
     "ТехнологИИ права — единая экосистема для юристов и руководителей практик: обучение, "
     "аналитика рынка, ИИ-инструменты и сообщество лидеров в одном пространстве. Меньше рутины "
     "и догадок — больше дохода, скорости и уверенных решений."),
    ("почему нас выбирают",
     "Нас выбирают не за отдельный курс или отчёт, а за цельную систему роста — "
     "от первого клиента до федерального масштаба."),
]

selling = {
    "Ценностные обещания": [
        "Увеличьте доход практики банкротства физлиц с помощью ИИ, аналитики и экспертного сообщества.",
        "Всё, чтобы ваша практика росла быстрее рынка.",
        "Меньше рутины и догадок — больше дохода, скорости и уверенных решений.",
        "Цельная система роста — от первого клиента до федерального масштаба.",
        "Юристы, которые зарабатывают на банкротстве — учились здесь.",
        "Единственная образовательная платформа в России, где юристы осваивают БФЛ "
        "от первого дела до масштабирования практики на миллионы.",
        "Экспертиза, которой обычно делятся только за закрытыми дверями.",
        "Не теория из учебников, а выводы тех, кто ведёт банкротные дела каждый день.",
        "Те самые чек-листы, по которым работают опытные банкротные юристы.",
        "Ничего лишнего: только то, что действительно влияет на исход процедуры.",
        "Без воды и маркетинговых обещаний — только реальные кейсы и рабочие инструменты.",
        "LegalHunter — обучение, которое работает.",
        "Превращаем 24 обязательных часа из формальности в реальный рост квалификации.",
    ],
    "Боли клиента (проблемы, которые закрываем)": [
        "Почему юристу в БФЛ опасно учиться на своих ошибках.",
        "Рынок банкротства не прощает некомпетентности.",
        "Одна ошибка в процедуре БФЛ — и клиент не освобождается от долгов. Репутация теряется мгновенно.",
        "За 2024–2026 приняли 12 ключевых поправок в закон о банкротстве. Вы уверены, что знаете все?",
        "Количество юристов в БФЛ выросло в 3 раза. Выигрывает тот, кто знает больше и работает точнее.",
        "Формальные лекции — мимо практики: между знанием закона и умением применить его — пропасть.",
        "Слабые места управляющего выявляет не аттестация, а арбитражный суд. "
        "Цена ошибки — отстранение, убытки, репутационный ущерб.",
    ],
    "Призывы к действию (CTA)": [
        "Академия →", "Получить билет", "от 15 500 ₽ · Получить билет", "Забрать билет + бонус",
        "Программа · 6 потоков", "Скачать полную программу (PDF)", "Подробнее",
        "Смотреть курсы", "Выбрать курс", "Написать боту", "Получить книгу",
        "Все 22 отчёта", "Читать отчёт", "Открыть чек-лист", "Получить консультацию",
        "Начать бесплатно", "Выбрать тариф", "Оставить заявку", "Скачать приложение",
        "Подписаться", "Открыть бот",
    ],
    "Срочность · скидки · дефицит": [
        "Ранние цены — скидка до 70%.",
        "Количество мест ограничено.",
        "До старта: 91 дн · 10 ч · 59 мин.",
        "Купи билет до 30 июля и получи сертификат «AI для юристов» стоимостью 15 000 ₽ в подарок.",
        "Осталось 340 мест.",
        "Ранние цены действуют ограниченное время.",
        "Билеты: 52 000 ₽ → 15 500 ₽ · 68 000 → 24 600 · 136 000 → 40 800 · 231 000 → 69 000.",
        "Курс окупается ×10 с одного клиента.",
    ],
    "Цифры и факты": [
        "Рынок БФЛ: более 500 000 новых процедур в год и рост на 30%+ ежегодно.",
        "Конференция: 1 500+ участников · 80+ спикеров · 6 потоков · 32 сессии и воркшопы.",
        "Академия: 94% клиентов выпускников освобождены от долгов · 500+ юристов обучено · 12 модулей.",
        "Книга: 117 страниц · 12 глав · редакция 2026 · бесплатно.",
        "Исследования: 22 отчёта (10 безоплатных + 12 экспертных) · данные Федресурса и ЕФРСБ.",
        "LegalHunter: 24 академических часа · сертификат с QR-верификацией по ФЗ-127.",
        "Книга экономит 10+ часов на каждом новом деле.",
    ],
    "Отзывы и цитаты": [
        "«Юрист без системы продаёт надежду. Юрист с системой — продаёт результат.» "
        "— Артин Василий, арбитражный управляющий, СРО «Дело»",
        "«Идеально для старта — структурировано, без воды, с практическими шагами.» "
        "— Алексей К., арбитражный управляющий",
        "«Раздала сотрудникам — теперь все на одной волне. Особенно полезны чек-листы внутри.» "
        "— Мария С., юрист по БФЛ",
        "«117 страниц концентрированной пользы. Регулярно ссылаюсь на неё в работе.» "
        "— Дмитрий Л., руководитель практики",
    ],
}

directions = [
    ("Академия и курсы", "Системное обучение от старта до экспертного уровня с аттестацией и сертификатом."),
    ("Исследования и аналитика", "Глубокие отчёты по рынку БФЛ, экономика практики, ИИ-инструменты и технологии лидеров."),
    ("Инструменты юриста", "Чек-листы, тренажёры, шаблоны — всё для ускорения и масштабирования практики."),
    ("Сообщество и нетворкинг", "Площадка для обмена опытом, партнёрства и роста вместе с лидерами юридического рынка."),
]

academy_courses = [
    ("Юридические аспекты БФЛ", "Продвинутый", "Полный курс по юридическим аспектам БФЛ. 13 видеоуроков с тестами и презентациями."),
    ("Неосвобождение от обязательств", "Экспертный · Флагман", "Когда долги не списывают: недобросовестность, сокрытие имущества, как защитить доверителя."),
    ("Оспаривание сделок", "Рост", "Подозрительные сделки и сделки с предпочтением: сроки, основания, защита."),
    ("Эффективная команда", "Практика", "Стандарты, документооборот и чек-листы для масштабирования качества работы."),
    ("Продажи юридических услуг", "Практика", "Работа с заявкой, квалификация, возражения и доведение клиента до договора."),
    ("Эксперты рынка БФЛ", "Экспертный", "Продвинутый курс для опытных: экспертные стратегии, сложные кейсы, масштабирование практики."),
]

book = {
    "hook": "Клиент спрашивает: «Заберут ли квартиру?», «А машину?», «Сколько это будет длиться?» — "
            "и ждёт чёткий ответ. Эта книга — чтобы он у вас был.",
    "bullets": [
        "Экономит 10+ часов на каждом новом деле — алгоритмы и шаблоны уже готовы.",
        "Отвечаете клиенту уверенно с первой консультации — без «надо уточнить».",
        "Актуальное законодательство и судебная практика 2026, готовые формулировки.",
    ],
    "parts": [
        ("Часть 1 · Правовые основы", "Что такое банкротство, кто может подать, 127-ФЗ и позиции ВС РФ, признаки неплатёжеспособности."),
        ("Часть 2 · Подготовка к процедуре", "Альтернативы банкротству, сбор документов, оспаривание сделок за 3 года."),
        ("Часть 3 · Судебная процедура", "Реструктуризация, реализация имущества, завершение и списание долгов."),
        ("Часть 4 · Новый старт", "Банкротство через МФЦ, последствия и ограничения, восстановление кредитной истории."),
    ],
}

research_free = [
    "Рынок БФЛ в России 2026 — объём, динамика, ключевые игроки и прогнозы.",
    "Кто выигрывает рынок БФЛ — сравнение юрфирм, сетей и платформ.",
    "Как ИИ меняет работу юриста по банкротству — AI-инструменты и кейсы автоматизации.",
    "Цифровой путь клиента в БФЛ — как клиенты находят юриста и принимают решение.",
    "Оспаривание сделок должника: судебная практика 2026.",
    "Закредитованность как топливо рынка БФЛ — что разгоняет спрос.",
    "Портрет банкрота-2026 — кто на самом деле списывает долги.",
    "ИИ в арбитражных судах — от автоматизации к предсказаниям.",
    "Банкротство глазами кредитора — списания, цессия, пассивность взыскателей.",
    "Реструктуризация vs реализация — почему реабилитация не работает.",
]
research_paid = [
    ("Экономика юридической практики в БФЛ", "2 490 ₽"),
    ("Какие технологии внедряют лидеры рынка", "1 990 ₽"),
    ("Тренды автоматизации документооборота", "1 990 ₽"),
    ("AI-инструменты для коммуникации и продаж", "2 490 ₽"),
    ("Судебная практика ВС РФ по БФЛ: позиции 2024–2026", "2 990 ₽"),
    ("Единственное жильё в банкротстве: защита и атака", "2 490 ₽"),
    ("Привлечение клиентов в БФЛ: каналы, конверсии, юнит-экономика", "2 990 ₽"),
    ("Субсидиарная ответственность при БФЛ", "2 490 ₽"),
    ("Финансовый управляющий: взаимодействие и стратегии", "1 990 ₽"),
    ("Региональная карта БФЛ: где растёт рынок", "2 990 ₽"),
    ("Внесудебное банкротство через МФЦ: практика", "1 990 ₽"),
    ("Построение юркомпании в БФЛ: от соло до 50+ дел/мес", "3 490 ₽"),
]

checklists = [
    "Подготовка заявления о банкротстве гражданина",
    "Взаимодействие с арбитражным управляющим",
    "Внесудебное банкротство через МФЦ: проверка условий",
    "Анализ сделок должника на риск оспаривания",
    "Что НЕЛЬЗЯ делать перед банкротством: чек-лист рисков",
    "Полный список документов для подачи на банкротство",
    "Действия после списания долгов: восстановление финансов",
    "Первая консультация с юристом: чек-лист подготовки",
    "Опись имущества при банкротстве: полная инвентаризация",
    "Подготовка к банкротству за 1–3 года: превентивный чек-лист",
    "Защита единственного жилья при банкротстве",
    "Запуск БФЛ-практики: чек-лист первых 90 дней",
]

legalhunter = {
    "intro": "LegalHunter — повышение квалификации по ФЗ-127. Тренировки с AI-должниками, "
             "интерактивные кейсы из арбитражной практики и модульная аттестация с сертификатом — "
             "всё, что нужно арбитражному управляющему для реального роста навыков.",
    "modules": [
        ("AI-тренировки", "Реалистичные диалоги с должниками — текст и голос. ИИ моделирует уклонения, агрессию, манипуляции."),
        ("Интерактивные кейсы", "Кейсы из арбитражной практики с ветвящимися сценариями — каждое решение влияет на исход."),
        ("Модульная аттестация", "Тестирование по модулям с сертификатом. QR-код мгновенно проверяет подлинность."),
        ("База знаний + AI-помощник", "База по ФЗ-127, подзаконным актам и практике. AI-помощник находит ответ за секунды."),
        ("Мониторинг ВС РФ", "Отслеживание изменений законодательства и позиций Верховного Суда в реальном времени."),
        ("Telegram-бот", "Доступ к тренировкам и базе знаний через Telegram — учитесь в дороге, между заседаниями."),
    ],
    "tariffs": [("Старт", "0 ₽ / мес", "Тесты, база знаний, AI-помощник «Маняша», курс «Сопровождение процедуры» бесплатно."),
                ("Эксперт", "120 000 ₽ · разовый доступ", "Безлимит, AI-тренировки без лимита, оба полных курса, AI-помощник в базе.")],
}

arbitrage = {
    "title": "Сопровождение банкротства под ключ",
    "lead": "Профессиональное арбитражное управление и сопровождение процедур БФЛ — "
            "от подготовки заявления до завершения дела и списания долгов.",
    "steps": ["Безоплатная консультация", "Анализ ситуации и документов", "Подача заявления в суд",
              "Сопровождение процедуры", "Списание долгов"],
    "trust": ["Опытные АУ в реестре СРО", "Полное сопровождение от заявления до завершения",
              "Прозрачные сроки и фиксированная стоимость", "Работа с кредиторами, ФНС и приставами"],
}

# ── Конференция ──
conf = {
    "date": "25–26 сентября 2026 · Москва",
    "venue": "БЦ «Красные Ворота», Садовая-Спасская 21/1",
    "leads": [
        "Конференция «ТехнологИИ права» — флагманское событие 2026.",
        "Главная индустриальная площадка о технологиях и ИИ в юридическом бизнесе. "
        "6 потоков, 80+ спикеров, мастер-классы, выставка и нетворкинг.",
        "Крупнейшая конференция и выставка, посвящённая технологиям в юриспруденции: "
        "банкротство физлиц, AI-инструменты, масштабирование практики.",
        "Два дня погружения в Legal Tech, ИИ и практику банкротства. "
        "Без воды и маркетинговых обещаний — только реальные кейсы и рабочие инструменты.",
    ],
    "stats": ["1 500+ участников", "80+ спикеров", "6 потоков", "32 сессии и воркшопы"],
    "bonus": "Купи билет до 30 июля — сертификат «AI для юристов» (15 000 ₽) в подарок. Осталось 340 мест.",
    "streams": [
        ("Банкротство физических лиц", "Ключевой поток", "Процедуры, судебная практика, автоматизация документов и масштабирование БФЛ-практики."),
        ("ИИ в юридическом бизнесе", "Стратегическое направление", "Нейросети и LLM-ассистенты, анализ документов, предиктивная аналитика решений."),
        ("Автоматизация практики", "", "CRM, документооборот, workflow и интеграции в юридических процессах."),
        ("Legal Tech и сервисы", "", "Цифровые инструменты, онлайн-платформы и стандарты юридической практики."),
        ("Данные и безопасность", "", "Защита персональных данных, конфиденциальность и compliance в юрбизнесе."),
        ("Рост и масштабирование", "", "Управление командой, продажи, операционка и рост практики."),
    ],
    "speakers": [
        ("Галкин Владислав Сергеевич", "Управляющий партнёр · ЮК «Галкин и партнёры»", "Стратегии защиты должников в 2026 году"),
        ("Сизов Дмитрий Александрович", "CEO · LegalTech Solutions", "ИИ-ассистент юриста: от теории к практике"),
        ("Артин Василий Алексеевич", "Арбитражный управляющий · СРО «Дело»", "Цифровая трансформация работы АУ"),
        ("Путин Дмитрий Алексеевич", "Руководитель направления · ПравоТех", "Как вырастить практику с 0 до 100 дел/мес"),
        ("Шабалин Егор Александрович", "CTO · NeuroPravo", "NeuroPravo Bot: архитектура юридического AI-ассистента"),
    ],
    "companies": ["Сбербанк", "Яндекс", "Газпром", "Росбанк", "МегаФон", "Ростелеком", "и другие лидеры отрасли"],
    "app": [
        ("Живое расписание", "32 сессии, 6 треков. Добавь доклад в календарь одним нажатием."),
        ("AI-ассистент", "Спроси что угодно о программе — ИИ знает каждого спикера и каждый доклад."),
        ("Электронный билет", "Покажи QR на входе — без бумажных талонов и очередей."),
        ("Нетворкинг", "Общий чат, профили участников, обмен контактами прямо в приложении."),
    ],
    "tickets": [
        ("Стандарт", "52 000 ₽", "15 500 ₽", "Все потоки, мастер-классы, AI-воркшопы, выставка, приложение, видеозаписи."),
        ("Бизнес", "68 000 ₽", "24 600 ₽", "Всё из «Стандарт» + круглые столы, тренинги для руководителей, бизнес-игра."),
        ("Full Pass", "136 000 ₽", "40 800 ₽", "Всё из «Бизнес» + групповой менторинг, стратсессия, мастермайнды, Спикерская."),
        ("Корпоративный", "231 000 ₽", "69 000 ₽", "5 билетов: Full Pass + Бизнес + 3 Стандарта. Для команды от руководства до специалистов."),
    ],
    "expo": "Экспозона — прямой выход к юридическому рынку: юрфирмам, арбитражным управляющим, "
            "ТОП-менеджменту и партнёрам. Стенды 4 / 9 / 16 / 25 м².",
    "sponsors": [("Серебро", "от 300 000 ₽", "Логотип на сайте, 2 билета, упоминание в рассылке 5000+, сертификат партнёра."),
                 ("Золото", "от 700 000 ₽", "Всё из «Серебро» + стенд 3×3, 5+2 VIP билета, доклад 15 мин, страница спонсора."),
                 ("Платина", "от 1 500 000 ₽", "Всё из «Золото» + стенд 5×5, пленарный доклад 30 мин, статус «Генеральный партнёр».")],
}

contacts = [
    ("Telegram-бот", "@NeuroPravo_Bot — AI-помощник, книга, чек-листы, отчёты"),
    ("Telegram-канал", "@kredit_advokat / @ainovaci — разборы дел, изменения закона, кейсы"),
    ("Конференция", "25–26 сентября 2026 · Москва, БЦ «Красные Ворота», Садовая-Спасская 21/1"),
    ("Приложение", "TechForum — расписание, AI-ассистент, билет (RuStore)"),
    ("Сайт", "pravotech.pro · LegalHunter — legalhunter.pro"),
]

# ────────────────────────────── CSS ──────────────────────────────
CSS = """
:root{--bg:#07080B;--panel:#0C0E14;--panel2:#10131C;--line:#1C2230;--cy:#00E5FF;
 --cy2:#1fb6c8;--tx:#E8ECF2;--mut:#8A93A6;--mut2:#5C6678;--gold:#E8B84B;}
*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
@page{size:A4;margin:13mm 12mm;}
body{background:var(--bg);color:var(--tx);font-family:"Inter","Helvetica Neue",Arial,sans-serif;font-size:10pt;line-height:1.5;}
.mono{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;}
h1,h2,h3,h4{font-family:"Space Grotesk","Inter",sans-serif;font-weight:700;letter-spacing:-.01em;}
.cy{color:var(--cy);} .mut{color:var(--mut);} .gold{color:var(--gold);}
/* cover */
.cover{height:268mm;display:flex;flex-direction:column;justify-content:center;page-break-after:always;position:relative;padding:0 3mm;}
.cover::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 42% at 50% 36%,rgba(0,229,255,.17),transparent 70%);}
.badge{position:relative;align-self:flex-start;border:1px solid var(--cy);color:var(--cy);border-radius:6px;padding:5px 12px;font-size:8.5pt;letter-spacing:.16em;margin-bottom:26px;}
.cover .kick{position:relative;font-size:9pt;letter-spacing:.3em;color:var(--cy);text-transform:uppercase;margin-bottom:16px;}
.cover h1{position:relative;font-size:38pt;line-height:1.05;margin-bottom:16px;}
.cover h1 .cy{display:block;}
.cover .sub{position:relative;max-width:158mm;color:var(--mut);font-size:11.5pt;margin-bottom:30px;}
.cover .meta{position:relative;display:flex;gap:26px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:16px;font-size:8.5pt;color:var(--mut);}
.cover .meta b{display:block;font-size:17pt;color:var(--tx);font-family:"Space Grotesk",sans-serif;}
/* sections */
.sec{page-break-before:always;padding-top:1mm;}
.sec-tag{font-size:8.5pt;letter-spacing:.2em;color:var(--cy);text-transform:uppercase;border-bottom:1px solid var(--line);padding-bottom:6px;}
.sec h2{font-size:22pt;margin:8px 0 3px;line-height:1.08;}
.sec .lead{color:var(--mut);font-size:10.5pt;margin-bottom:14px;max-width:170mm;}
.grp{margin:14px 0 6px;}
.grp-h{font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--cy2);display:flex;align-items:center;gap:9px;margin-bottom:8px;}
.grp-h::after{content:"";flex:1;height:1px;background:var(--line);}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.card{background:var(--panel);border:1px solid var(--line);border-left:2px solid var(--cy);border-radius:6px;padding:8px 11px;font-size:9.5pt;page-break-inside:avoid;}
.card.full{grid-column:1/-1;}
.cta{background:var(--panel2);border:1px solid var(--line);border-radius:6px;padding:7px 11px;font-size:9.5pt;page-break-inside:avoid;}
.quote{background:var(--panel);border:1px solid var(--line);border-left:2px solid var(--cy);border-radius:6px;padding:9px 12px;font-size:9.5pt;font-style:italic;color:var(--tx);page-break-inside:avoid;}
.lab{font-size:7.5pt;letter-spacing:.1em;text-transform:uppercase;color:var(--mut2);margin-bottom:3px;}
/* block list */
.blk{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:10px 13px;margin-bottom:7px;page-break-inside:avoid;}
.blk .t{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:12pt;margin-bottom:2px;}
.blk .tag{font-size:7.5pt;letter-spacing:.12em;text-transform:uppercase;color:var(--cy);margin-bottom:4px;}
.blk .d{color:var(--mut);font-size:9.3pt;}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;}
/* tickets / tariffs */
.tk{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:11px 12px;page-break-inside:avoid;}
.tk .n{font-size:8pt;letter-spacing:.14em;text-transform:uppercase;color:var(--cy);}
.tk .price{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:15pt;margin:4px 0 1px;}
.tk .old{color:var(--mut2);text-decoration:line-through;font-size:9pt;}
.tk .f{color:var(--mut);font-size:8.6pt;margin-top:5px;}
/* speakers */
.sp{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:9px 12px;page-break-inside:avoid;}
.sp .nm{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:10.5pt;}
.sp .ro{color:var(--cy);font-size:8.4pt;margin:2px 0;}
.sp .tp{color:var(--mut);font-size:9pt;font-style:italic;}
/* simple list / chips */
.chips{display:flex;flex-wrap:wrap;gap:6px;}
.chip{background:var(--panel2);border:1px solid var(--line);border-radius:999px;padding:4px 11px;font-size:9pt;color:var(--tx);}
.steps{display:flex;flex-wrap:wrap;gap:6px;counter-reset:s;}
.step{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:7px 11px;font-size:9pt;flex:1 1 30%;}
.step b{color:var(--cy);margin-right:6px;}
ul.li{list-style:none;margin:2px 0;} ul.li li{position:relative;padding-left:15px;color:var(--mut);font-size:9.3pt;margin:3px 0;}
ul.li li::before{content:"▸";position:absolute;left:0;color:var(--cy);}
.tbl{width:100%;border-collapse:collapse;}
.tbl td{border:1px solid var(--line);padding:7px 10px;font-size:9.2pt;vertical-align:top;}
.tbl td.p{color:var(--cy);white-space:nowrap;width:24mm;text-align:right;font-family:"Space Grotesk",sans-serif;}
.tbl td.k{color:var(--cy);width:34mm;font-size:8.5pt;}
.foot{margin-top:12px;border-top:1px solid var(--line);padding-top:9px;color:var(--mut2);font-size:8pt;display:flex;justify-content:space-between;}
.subh{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:13pt;margin:16px 0 6px;color:var(--tx);}
.subh .cy{font-weight:700;}
"""

def cards(items, cls="card"):
    return "".join(f'<div class="{cls}">{e(t)}</div>' for t in items)

o=[f"<!DOCTYPE html><html lang='ru'><head><meta charset='utf-8'><style>{CSS}</style></head><body>"]

# COVER
o.append(f"""<section class="cover">
<span class="badge mono">PRAVOTECH.PRO · LEGAL · AI · ECOSYSTEM</span>
<div class="kick mono">ТехнологИИ права — сборник фраз сайта</div>
<h1>Продающие фразы,<span class="cy">проект и конференция</span></h1>
<div class="sub">Полная маркетинговая текстовка живого сайта pravotech.pro: позиционирование,
продающие формулировки и призывы, экосистема продуктов (академия, книга, исследования,
чек-листы, LegalHunter) и блок конференции 25–26 сентября 2026 — со спикерами, потоками и тарифами.</div>
<div class="meta mono">
<div><b>6</b>групп продающих фраз</div><div><b>7</b>продуктов экосистемы</div>
<div><b>80+</b>спикеров</div><div><b>4</b>тарифа билетов</div><div><b>1500+</b>участников</div></div>
</section>""")

# 01 POSITIONING
o.append('<section class="sec"><div class="sec-tag mono">// 01 · positioning</div><h2>Позиционирование</h2>')
o.append('<div class="lead">Как проект называет и подаёт себя — главные смысловые якоря.</div><div class="cards">')
for lab,txt in positioning:
    o.append(f'<div class="card full"><div class="lab mono">{e(lab)}</div>{e(txt)}</div>')
o.append('</div></section>')

# 02 SELLING
o.append('<section class="sec"><div class="sec-tag mono">// 02 · sales copy</div><h2>Продающие фразы</h2>')
o.append('<div class="lead">Формулировки, которые продают: обещания, боли, призывы, срочность, цифры и отзывы.</div>')
for grp,items in selling.items():
    if grp=="Призывы к действию (CTA)": cls="cta"
    elif grp=="Отзывы и цитаты": cls="quote"
    else: cls="card"
    o.append(f'<div class="grp"><div class="grp-h mono">{e(grp)}</div><div class="cards">{cards(items,cls)}</div></div>')
o.append('</section>')

# 03 PROJECT
o.append('<section class="sec"><div class="sec-tag mono">// 03 · the project</div><h2>О проекте — экосистема</h2>')
o.append('<div class="lead">Единая система роста практики БФЛ: обучение, аналитика, инструменты и сообщество.</div>')
o.append('<div class="grp"><div class="grp-h mono">Четыре направления</div><div class="row2">')
for t,d in directions:
    o.append(f'<div class="blk"><div class="t">{e(t)}</div><div class="d">{e(d)}</div></div>')
o.append('</div></div>')
# Academy
o.append('<div class="subh">Академия <span class="cy">— «Юристы, которые зарабатывают на банкротстве, учились здесь»</span></div>')
o.append('<div class="row2">')
for t,lvl,d in academy_courses:
    o.append(f'<div class="blk"><div class="tag mono">{e(lvl)}</div><div class="t" style="font-size:11pt">{e(t)}</div><div class="d">{e(d)}</div></div>')
o.append('</div>')
o.append('</section>')

# Book + Research
o.append('<section class="sec"><div class="sec-tag mono">// 03 · the project</div><h2>Книга и исследования</h2>')
o.append(f'<div class="subh">Книга «Банкротство физических лиц» <span class="cy">· 117 стр · бесплатно</span></div>')
o.append(f'<div class="quote full" style="margin-bottom:7px">{e(book["hook"])}</div>')
o.append(f'<ul class="li">{"".join(f"<li>{e(x)}</li>" for x in book["bullets"])}</ul>')
o.append('<div class="row2" style="margin-top:7px">')
for t,d in book["parts"]:
    o.append(f'<div class="blk"><div class="t" style="font-size:10.5pt">{e(t)}</div><div class="d">{e(d)}</div></div>')
o.append('</div>')
o.append('<div class="subh">Исследования <span class="cy">· 22 отчёта · данные Федресурса и ЕФРСБ</span></div>')
o.append(f'<div class="lead" style="margin-bottom:8px">Экспертиза, которой обычно делятся только за закрытыми дверями. Не теория, а выводы тех, кто ведёт дела каждый день.</div>')
o.append('<div class="grp"><div class="grp-h mono">Безоплатные отчёты (10)</div><ul class="li">')
o.append("".join(f"<li>{e(x)}</li>" for x in research_free))
o.append('</ul></div>')
o.append('<div class="grp"><div class="grp-h mono">Экспертные отчёты (12) · 25–40 стр</div><table class="tbl">')
for t,pr in research_paid:
    o.append(f'<tr><td>{e(t)}</td><td class="p">{e(pr)}</td></tr>')
o.append('</table></div></section>')

# Checklists + LegalHunter + Arbitrage
o.append('<section class="sec"><div class="sec-tag mono">// 03 · the project</div><h2>Инструменты и платформа</h2>')
o.append('<div class="subh">Чек-листы <span class="cy">· боевые инструменты практики</span></div>')
o.append('<div class="lead" style="margin-bottom:8px">Те самые чек-листы, по которым работают опытные банкротные юристы. Ничего лишнего — только то, что влияет на исход.</div>')
o.append('<div class="row2"><ul class="li">'+ "".join(f"<li>{e(x)}</li>" for x in checklists[:6]) +'</ul>')
o.append('<ul class="li">'+ "".join(f"<li>{e(x)}</li>" for x in checklists[6:]) +'</ul></div>')
o.append('<div class="subh">LegalHunter <span class="cy">— обучение, которое работает</span></div>')
o.append(f'<div class="lead" style="margin-bottom:8px">{e(legalhunter["intro"])}</div>')
o.append('<div class="row3">')
for t,d in legalhunter["modules"]:
    o.append(f'<div class="blk"><div class="t" style="font-size:10pt">{e(t)}</div><div class="d" style="font-size:8.8pt">{e(d)}</div></div>')
o.append('</div><div class="row2" style="margin-top:7px">')
for n,p,f in legalhunter["tariffs"]:
    o.append(f'<div class="tk"><div class="n mono">{e(n)}</div><div class="price">{e(p)}</div><div class="f">{e(f)}</div></div>')
o.append('</div>')
o.append(f'<div class="subh">{e(arbitrage["title"])}</div>')
o.append(f'<div class="lead" style="margin-bottom:8px">{e(arbitrage["lead"])}</div>')
o.append('<div class="steps">'+"".join(f'<div class="step"><b>{i+1}</b>{e(s)}</div>' for i,s in enumerate(arbitrage["steps"]))+'</div>')
o.append('</section>')

# 04 CONFERENCE
o.append('<section class="sec"><div class="sec-tag mono">// 04 · conference</div><h2>О конференции</h2>')
o.append(f'<div class="lead">«ТехнологИИ права» · {e(conf["date"])} · {e(conf["venue"])}</div>')
o.append('<div class="cards">'+ "".join(f'<div class="card full">{e(x)}</div>' for x in conf["leads"]) +'</div>')
o.append('<div class="chips" style="margin:10px 0">'+ "".join(f'<span class="chip">{e(x)}</span>' for x in conf["stats"]) +'</div>')
o.append(f'<div class="quote full gold" style="border-left-color:var(--gold);font-style:normal">★ {e(conf["bonus"])}</div>')
o.append('<div class="subh">Шесть потоков</div><div class="row2">')
for t,tag,d in conf["streams"]:
    tg=f'<div class="tag mono">{e(tag)}</div>' if tag else ''
    o.append(f'<div class="blk">{tg}<div class="t" style="font-size:10.5pt">{e(t)}</div><div class="d">{e(d)}</div></div>')
o.append('</div></section>')

# conference: speakers, app, tickets
o.append('<section class="sec"><div class="sec-tag mono">// 04 · conference</div><h2>Спикеры · приложение · билеты</h2>')
o.append('<div class="subh">Спикеры и эксперты</div><div class="row2">')
for nm,ro,tp in conf["speakers"]:
    o.append(f'<div class="sp"><div class="nm">{e(nm)}</div><div class="ro mono">{e(ro)}</div><div class="tp">«{e(tp)}»</div></div>')
o.append('</div>')
o.append('<div class="subh">Участники — компании рынка</div>')
o.append('<div class="chips">'+ "".join(f'<span class="chip">{e(x)}</span>' for x in conf["companies"]) +'</div>')
o.append('<div class="subh">Конференция в кармане (приложение TechForum)</div><div class="row2">')
for t,d in conf["app"]:
    o.append(f'<div class="blk"><div class="t" style="font-size:10pt">{e(t)}</div><div class="d">{e(d)}</div></div>')
o.append('</div>')
o.append('<div class="subh">Билеты и тарифы <span class="cy">· ранние цены до −70%</span></div><div class="row2">')
for n,old,now,f in conf["tickets"]:
    o.append(f'<div class="tk"><div class="n mono">{e(n)}</div><div class="price">{e(now)} <span class="old">{e(old)}</span></div><div class="f">{e(f)}</div></div>')
o.append('</div></section>')

# conference: expo + sponsors
o.append('<section class="sec"><div class="sec-tag mono">// 04 · conference · B2B</div><h2>Экспозона и спонсорство</h2>')
o.append(f'<div class="lead">{e(conf["expo"])}</div>')
o.append('<div class="subh">Спонсорские пакеты</div><div class="row3">')
for n,p,f in conf["sponsors"]:
    o.append(f'<div class="tk"><div class="n mono gold">{e(n)}</div><div class="price">{e(p)}</div><div class="f">{e(f)}</div></div>')
o.append('</div>')
# contacts
o.append('<div class="subh">Контакты и точки входа</div><table class="tbl">')
for k,v in contacts:
    o.append(f'<tr><td class="k mono">{e(k)}</td><td>{e(v)}</td></tr>')
o.append('</table>')
o.append('<div class="foot mono"><span>ТехнологИИ права · pravotech.pro</span><span>сборник продающих фраз · извлечено с живого сайта</span></div>')
o.append('</section></body></html>')

open("Pravotech_phrases.html","w",encoding="utf-8").write("\n".join(o))
print("HTML written:",len("\n".join(o)),"bytes")

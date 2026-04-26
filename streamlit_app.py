import pandas as pd
import streamlit as st


st.set_page_config(
    page_title="SHIFT Space Digital Core",
    page_icon="",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown(
    """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

    :root {
        --ink: #172033;
        --muted: #667085;
        --line: #dfe4f0;
        --surface: #ffffff;
        --soft: #f7f8fc;
        --violet: #5b4bdb;
        --violet-soft: #f0eeff;
        --blue: #2563eb;
        --blue-soft: #edf4ff;
        --orange: #e36f2c;
        --orange-soft: #fff3eb;
        --danger: #b42338;
        --danger-soft: #fff0f2;
    }

    html, body, [class*="css"] {
        font-family: "IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .stApp {
        background:
            linear-gradient(90deg, rgba(91, 75, 219, 0.05) 1px, transparent 1px),
            linear-gradient(180deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px),
            radial-gradient(circle at 8% 4%, rgba(91, 75, 219, 0.16), transparent 28rem),
            radial-gradient(circle at 92% 12%, rgba(227, 111, 44, 0.1), transparent 22rem),
            linear-gradient(180deg, #ffffff 0%, #f6f7fb 42%, #f0f3fa 100%);
        background-size: 28px 28px, 28px 28px, auto, auto, auto;
    }

    .block-container {
        max-width: 1480px;
        padding-top: 2rem;
        padding-bottom: 3rem;
    }

    .hero {
        border: 1px solid var(--line);
        border-radius: 24px;
        background: white;
        padding: 28px;
        box-shadow: 0 28px 70px -56px rgba(23, 32, 51, 0.75);
        margin-bottom: 22px;
    }

    .eyebrow {
        display: inline-flex;
        border: 1px solid #cfc9ff;
        background: var(--violet-soft);
        color: #4b3ac7;
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
        margin-right: 6px;
        margin-bottom: 10px;
    }

    .hero h1 {
        color: var(--ink);
        font-size: clamp(40px, 5vw, 68px);
        line-height: .98;
        letter-spacing: -0.04em;
        margin: 8px 0 18px;
    }

    .hero p, .muted {
        color: var(--muted);
        line-height: 1.65;
        font-size: 16px;
    }

    .card {
        border: 1px solid var(--line);
        border-radius: 20px;
        background: white;
        padding: 18px;
        box-shadow: 0 22px 60px -48px rgba(23,32,51,.55);
        height: 100%;
    }

    .card.soft {
        background: var(--soft);
    }

    .metric {
        border-left: 4px solid var(--violet);
    }

    .metric-label {
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: .1em;
        font-size: 12px;
        font-weight: 700;
    }

    .metric-value {
        color: var(--ink);
        font-family: "IBM Plex Mono", monospace;
        font-size: 26px;
        font-weight: 700;
        margin-top: 8px;
    }

    .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 700;
        border: 1px solid var(--line);
        background: white;
        color: #34405a;
    }

    .ok { border-color: #cfc9ff; background: var(--violet-soft); color: #4b3ac7; }
    .info { border-color: #c7dcff; background: var(--blue-soft); color: #1d5fd1; }
    .warn { border-color: #ffd8bd; background: var(--orange-soft); color: #b84f16; }
    .bad { border-color: #ffc4cc; background: var(--danger-soft); color: var(--danger); }

    .hub {
        border: 1px solid #cfc9ff;
        background: var(--violet-soft);
        border-radius: 24px;
        padding: 26px;
        text-align: center;
        min-height: 270px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .node {
        border: 1px solid var(--line);
        background: white;
        border-radius: 16px;
        padding: 12px 14px;
        margin-bottom: 10px;
        color: #34405a;
        font-weight: 600;
    }

    .process-step {
        min-width: 170px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: white;
        padding: 14px;
        margin-right: 8px;
        display: inline-block;
        vertical-align: top;
    }

    .process-title {
        color: var(--ink);
        font-weight: 700;
    }

    .process-source {
        color: var(--muted);
        font-size: 12px;
        margin-top: 6px;
    }

    .timeline-item {
        border-left: 2px solid var(--line);
        padding: 0 0 18px 16px;
        position: relative;
    }

    .timeline-item:before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 999px;
        left: -6px;
        top: 4px;
        background: var(--violet);
    }

    div[data-testid="stMetric"] {
        border: 1px solid var(--line);
        border-left: 4px solid var(--violet);
        border-radius: 18px;
        background: white;
        padding: 12px 14px;
    }
    </style>
    """,
    unsafe_allow_html=True,
)


dashboard_kpis = [
    ("Всего объектов", "18", "+2 к плану", "ok"),
    ("Средняя готовность", "64.8%", "+3.2% за месяц", "ok"),
    ("Бюджет vs факт", "18.4 / 19.1 млрд", "факт выше плана", "warn"),
    ("Отклонение бюджета", "+3.8%", "2 объекта критично", "bad"),
    ("Активные договоры", "247", "43 в работе", "info"),
    ("На согласовании", "31", "7 старше SLA", "warn"),
    ("Заявки арендаторов", "126", "18 требуют внимания", "warn"),
    ("Юр. риски", "14", "4 high / critical", "bad"),
    ("Критичные отклонения", "9", "сейчас", "bad"),
]

objects = [
    ["Glass Tower III", "строительство", 72, "30.11.2026", "+18 дней", "6.2 млрд", "6.7 млрд", "+8.1%", "61%", 12, 6, "critical"],
    ["North Yard Offices", "эксплуатация", 96, "15.05.2026", "0 дней", "3.4 млрд", "3.3 млрд", "-2.4%", "88%", 4, 1, "normal"],
    ["Atrium Park Residence", "проектирование", 38, "22.08.2027", "+7 дней", "4.8 млрд", "4.9 млрд", "+2.1%", "34%", 9, 3, "attention"],
    ["South Gate Mall", "строительство", 57, "12.03.2027", "+24 дня", "8.1 млрд", "8.8 млрд", "+8.6%", "72%", 16, 7, "critical"],
]

live_alerts = [
    ("Смета корпуса A превышает бюджет на 8%", "Estimate model", "bad"),
    ("Договор аренды Tenant X завис на согласовании 5 дней", "CLM", "warn"),
    ("GR-документ требует ответа до 28.04.2026", "GR tracker", "bad"),
    ("Планировка этажа 12 обновлена, закупка требует пересчета", "BIM", "info"),
    ("3 сервисные заявки нарушают SLA", "Service desk", "warn"),
]

object_kpis = [
    ("Готовность строительства", "72%", "+4.1% за месяц", "ok"),
    ("Бюджет", "6.2 млрд", "утвержденный baseline", "info"),
    ("Факт", "6.7 млрд", "из 1C / Finance", "warn"),
    ("Отклонение бюджета", "+8.1%", "выше лимита", "bad"),
    ("Арендная заполненность", "61%", "CRM + passport", "info"),
    ("Активные договоры", "47", "аренда + подряд", "info"),
    ("Помещения", "186", "актуальная BIM версия", "ok"),
    ("Закупочные заявки", "28", "5 требуют пересчета", "warn"),
    ("Документы", "412", "36 на согласовании", "info"),
    ("Юридические риски", "6", "2 high / critical", "bad"),
    ("Сервисные заявки", "19", "3 SLA breach", "warn"),
    ("KPI рентабельности", "17.4%", "-1.6 п.п. к плану", "warn"),
]

hub_entities = [
    "Участок", "Разрешения", "BIM-модель", "Сметы", "Бюджет", "Договоры подряда", "Договоры аренды",
    "Акты", "Платежи", "Помещения", "Арендаторы", "Сервисные заявки", "Юридические события", "KPI рентабельности",
]

processes = [
    ("Revenue chain", "connected", "Commercial Director", "Маркетинг|Marketing Ads / Call-tracking;Лид|CRM;Сделка|CRM;Договор аренды|CLM / Document Management;Выручка|1C / Finance", "Еженедельная сверка лидов, сделок и договоров в Excel."),
    ("Construction spend", "risk", "Construction Director", "Проект|BIM / Project tools;Смета|Estimate model;Закупка|Tender platform;Договор подряда|CLM;Акт|Document management;Оплата|1C", "Ручная передача объемов из проектного ПО в тендерную площадку."),
    ("Premise readiness to tenant", "connected", "Asset Director", "Стройка|Construction reports;Готовность помещения|Digital Passport;Продажи|CRM;Договор|CLM;Арендатор|Tenant profile", "Отправка PDF-планировок и статусов помещений по почте."),
    ("Tenant service", "partly manual", "Service Director", "Арендатор|Tenant portal;Сервисная заявка|Service desk;Исполнитель|Mobile task;SLA|SLA tracker;Обратная связь|CRM / Tenant profile", "Ручное обновление CRM по результатам сервисной заявки."),
    ("Hiring to access", "partly manual", "HR Director", "Кандидат|Recruiting system;Найм|HR portal;1C|1C;Доступы|IT service desk;Адаптация|HR portal", "Повторный ввод данных сотрудника в HR portal и IT service desk."),
    ("GR permit loop", "risk", "GR Director", "GR-документ|Document management;Подача|GR tracker;Замечание|Government feedback;Исправление|BIM / Project tools;Разрешение|Permit registry;Стройка|Construction plan", "Поиск актуальной версии документа в сетевой папке."),
    ("Design change impact", "connected", "Project Office", "Проектное изменение|BIM;Новая версия|Document versions;Пересчет сметы|Estimate model;Обновление закупки|Procurement;Уведомление продаж|CRM", "Рассылка изменений планировок между проектным офисом и продажами."),
    ("Contract to dashboard", "connected", "CFO", "Договор|CLM;Акт|Document management;Счет|1C;Платеж|Bank / Finance;План-факт|Planning model;Dashboard|BI Dashboard", "Сбор план-факта из актов, счетов и платежей в пятницу."),
]

integrations = [
    ["CRM", "лиды, сделки, арендаторы, показы", "актуальные помещения, статусы готовности, договорные статусы", "connected", "26.04.2026 10:50", "96%"],
    ["1C", "платежи, акты, счета", "договоры, будущие обязательства, статьи бюджета", "connected", "26.04.2026 10:30", "92%"],
    ["BIM / Project tools", "планировки, версии, объемы", "статусы согласований и замечания", "connected", "26.04.2026 09:55", "89%"],
    ["Tender platform", "закупки, поставщики, предложения", "актуальные объемы и бюджеты", "manual import", "25.04.2026 17:20", "73%"],
    ["Document management", "договоры, версии, согласования", "карточки объектов, контрагентов и сделок", "connected", "26.04.2026 11:00", "94%"],
    ["HR portal", "сотрудники, роли, адаптация", "заявки на доступы и оргструктуру проекта", "planned", "planned Q2", "n/a"],
    ["Recruiting system", "кандидаты, офферы, статусы найма", "профили вакансий и центры затрат", "planned", "planned Q2", "n/a"],
    ["Legal systems", "дела, претензии, судебные статусы", "контрагенты, договоры и объектные связи", "manual import", "25.04.2026 12:45", "78%"],
    ["Finance model", "план-факт, NPV, IRR, сценарии", "факт платежей, договорные обязательства, occupancy", "connected", "26.04.2026 10:15", "91%"],
    ["Call-tracking", "звонки, источники, конверсии", "объекты, помещения, рекламные кампании", "connected", "26.04.2026 10:49", "88%"],
    ["Marketing ads", "расходы, кампании, лиды", "статусы сделок и аренды", "connected", "26.04.2026 10:45", "90%"],
    ["Tenant portal", "сервисные заявки, обратную связь", "статусы заявок, документы, счета", "connected", "26.04.2026 10:58", "93%"],
    ["Service desk", "исполнители, SLA, статусы работ", "объект, помещение, арендатор, приоритет", "connected", "26.04.2026 10:57", "87%"],
]

premises = [
    ["A-1201", "A", "12", "184.6 м2", "Available", "-", "-", "BIM v4.8", "BIM", "26.04.2026 09:55"],
    ["A-1202", "A", "12", "96.3 м2", "Reserved", "Tenant X", "LOI-448", "BIM v4.8", "CRM + BIM", "26.04.2026 10:11"],
    ["A-1203", "A", "12", "142.1 м2", "Leased", "Monolith Legal", "AGR-2197", "BIM v4.8", "CRM + CLM", "26.04.2026 10:12"],
    ["B-0704", "B", "7", "211.8 м2", "In fit-out", "Vector Labs", "AGR-2041", "BIM v4.7", "Tenant portal", "26.04.2026 08:31"],
    ["C-0302", "C", "3", "74.9 м2", "Under construction", "-", "-", "BIM v4.6", "Construction reports", "25.04.2026 18:02"],
]

documents = [
    ["Планировка этажа 12", "проектная документация", "v4.8", "Actual", "Project Office", "26.04.2026", "Glass Tower III / Floor 12", "BIM", "Project change impact", "Используется в закупке"],
    ["Смета корпуса A", "смета", "v2.3", "Requires update", "CFO Office", "25.04.2026", "Корпус A", "Estimate model", "Construction spend", "Требует согласования"],
    ["Договор аренды Tenant X", "договор", "v1.6", "On approval", "Commercial", "21.04.2026", "Tenant X / A-1202", "CLM", "Revenue chain", "Связан с договором"],
    ["Акт выполненных работ 04-26", "акт", "v1.0", "Draft", "Construction", "24.04.2026", "Подрядчик BetonPro", "Document management", "Contract to dashboard", "Блокирует оплату"],
    ["GR ответ по замечанию", "GR", "v3.1", "On approval", "GR Office", "26.04.2026", "Разрешение на работы", "GR tracker", "GR permit loop", "Блокирует старт работ"],
]

activities = [
    ("26.04.2026 11:08", "обновлена версия планировки", "BIM v4.8 synced to Digital Passport"),
    ("26.04.2026 10:51", "смета требует пересчета", "Корпус A, бюджет +8.1%"),
    ("26.04.2026 10:32", "договор ушел на согласование", "Tenant X, step Legal review"),
    ("25.04.2026 18:15", "закупка превысила бюджет", "Facade works PR-1208"),
    ("25.04.2026 16:44", "GR-документ получил замечание", "Ответ до 28.04.2026"),
    ("25.04.2026 14:03", "помещение переведено в статус leased", "A-1203, Monolith Legal"),
    ("25.04.2026 12:20", "платеж ожидает подтверждения", "Акт 04-26, 1C"),
    ("24.04.2026 19:06", "сервисная заявка нарушила SLA", "HVAC / B-0704"),
]

risks = [
    ["Устаревшая проектная документация", "Project Office", "high", "Продажи могут использовать старую планировку этажа 11."],
    ["Превышение бюджета", "CFO Office", "critical", "Корпус A выше baseline на 8.1%."],
    ["Задержка согласования договора", "Commercial", "high", "Tenant X висит на Legal review 5 дней."],
    ["Зависшая закупка", "Procurement", "medium", "Tender platform ждет новые объемы из BIM."],
    ["Просроченный GR-документ", "GR Office", "critical", "Ответ требуется до 28.04.2026."],
    ["SLA нарушен", "Service", "medium", "3 сервисные заявки требуют эскалации."],
]


def badge(text: str, tone: str = "ok") -> str:
    tone_class = {
        "connected": "ok",
        "normal": "ok",
        "Actual": "ok",
        "planned": "info",
        "Available": "info",
        "info": "info",
        "partly manual": "warn",
        "attention": "warn",
        "medium": "warn",
        "Reserved": "warn",
        "On approval": "warn",
        "Draft": "warn",
        "warning": "warn",
        "warn": "warn",
        "risk": "bad",
        "critical": "bad",
        "high": "bad",
        "Requires update": "bad",
        "danger": "bad",
        "bad": "bad",
    }.get(text, tone)
    return f"<span class='badge {tone_class}'>{text}</span>"


def metric_card(label: str, value: str, hint: str, tone: str = "ok") -> None:
    st.markdown(
        f"""
        <div class="card metric">
            <div class="metric-label">{label}</div>
            <div class="metric-value">{value}</div>
            <div style="margin-top:10px;">{badge(hint, tone)}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def section_title(eyebrow: str, title: str, description: str) -> None:
    st.markdown(
        f"""
        <div style="margin: 14px 0 20px;">
            <span class="eyebrow">{eyebrow}</span>
            <h2 style="color:var(--ink); font-size:34px; line-height:1.08; letter-spacing:-.035em; margin:8px 0 8px;">{title}</h2>
            <p class="muted">{description}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )


st.markdown(
    """
    <div class="hero">
        <span class="eyebrow">SHIFT Space</span>
        <span class="badge">Digital Core MVP</span>
        <span class="badge">Mock data only</span>
        <h1>Digital Core вокруг цифрового паспорта объекта</h1>
        <p>Раньше CRM, 1C, BIM, Excel, тендерная площадка, документы, HR и юридические системы жили островами.
        Теперь Digital Core связывает их вокруг объекта, помещений, договоров, финансов, GR, сервиса и рисков.</p>
        <div class="card soft" style="margin-top:22px;">
            <b style="color:var(--ink);">Source systems to management loop</b>
            <div style="display:grid; gap:10px; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); margin-top:14px;">
                <div class="node">CRM / 1C / BIM / HR / Legal / Service</div>
                <div class="node" style="border-color:#cfc9ff; background:#f0eeff; color:#4b3ac7;">Digital Core</div>
                <div class="node" style="border-color:#c7dcff; background:#edf4ff;">Object Passport / Live Dashboard / E2E</div>
            </div>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)

tabs = st.tabs([
    "Дашборд руководства",
    "Паспорт объекта",
    "Сквозные процессы",
    "Связи / Интеграции",
    "Помещения",
    "Документы",
    "Активность / Риски",
])

with tabs[0]:
    section_title(
        "Executive live dashboard",
        "CEO видит live-картину без ручных пятничных отчетов",
        "Объекты, бюджеты, договоры, заявки арендаторов, документы и риски сведены в управленческий контур.",
    )
    for row_start in range(0, len(dashboard_kpis), 3):
        cols = st.columns(3)
        for col, item in zip(cols, dashboard_kpis[row_start : row_start + 3]):
            with col:
                metric_card(*item)

    st.markdown("### Object Portfolio")
    st.dataframe(
        pd.DataFrame(
            objects,
            columns=["Объект", "Стадия", "Готовность", "Сдача", "Сроки", "Бюджет", "Факт", "Откл.", "Аренда", "Docs", "Риски", "Статус"],
        ),
        use_container_width=True,
        hide_index=True,
    )
    st.markdown("### Live Alerts")
    alert_cols = st.columns(5)
    for col, (title, source, tone) in zip(alert_cols, live_alerts):
        with col:
            st.markdown(f"<div class='card soft'><b>{title}</b><br><br>{badge(source, tone)}</div>", unsafe_allow_html=True)

with tabs[1]:
    section_title(
        "Object passport",
        "Glass Tower III как единая цифровая сущность",
        "Один объект — единая цифровая сущность, к которой привязаны все данные.",
    )
    st.markdown(
        """
        <div class="card">
            <div>{critical} {stage}</div>
            <h2 style="font-size:48px; margin:16px 0 20px; letter-spacing:-.04em;">Glass Tower III</h2>
            <p class="muted"><b>Адрес:</b> Москва, Пресненский район, квартал 11<br>
            <b>Ответственный директор:</b> Алексей Морозов<br>
            <b>Плановая дата сдачи:</b> 30.11.2026<br>
            <b>Общий статус:</b> critical deviations active</p>
        </div>
        """.format(critical=badge("critical"), stage=badge("строительство", "info")),
        unsafe_allow_html=True,
    )
    for row_start in range(0, len(object_kpis), 4):
        cols = st.columns(4)
        for col, item in zip(cols, object_kpis[row_start : row_start + 4]):
            with col:
                metric_card(*item)

    st.markdown("### Object Data Hub")
    left, center, right = st.columns([1, 1.2, 1])
    with left:
        for item in hub_entities[:7]:
            st.markdown(f"<div class='node'>{item}</div>", unsafe_allow_html=True)
    with center:
        st.markdown(
            """
            <div class="hub">
                <h3 style="font-size:28px; margin-bottom:8px;">Glass Tower III</h3>
                <div style="color:#4b3ac7; font-weight:700;">Digital Object Passport</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:22px;">
                    <div class="node">single object ID</div>
                    <div class="node">versioned data</div>
                    <div class="node">process links</div>
                    <div class="node">live status</div>
                </div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with right:
        for item in hub_entities[7:]:
            st.markdown(f"<div class='node'>{item}</div>", unsafe_allow_html=True)

with tabs[2]:
    section_title(
        "E2E processes",
        "Сквозные цепочки вместо островных систем",
        "Данные проходят через процесс без ручного копирования между системами.",
    )
    for name, status, owner, steps_raw, removed in processes:
        steps = [part.split("|") for part in steps_raw.split(";")]
        html_steps = "".join(
            f"<div class='process-step'><div class='process-title'>{step}</div><div class='process-source'>{source}</div></div>"
            for step, source in steps
        )
        st.markdown(
            f"""
            <div class="card" style="margin-bottom:14px;">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <h3 style="margin:0;">{name}</h3>{badge(status)}
                </div>
                <p class="muted"><b>Owner:</b> {owner} · <b>Manual removed:</b> {removed}</p>
                <div style="overflow-x:auto; white-space:nowrap; padding-bottom:6px;">{html_steps}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

with tabs[3]:
    section_title(
        "Relations / integrations",
        "Digital Core связывает существующие системы, а не заменяет их",
        "Показано, какие данные системы отдают и получают, статус интеграции, последний sync и качество данных.",
    )
    st.markdown(
        """
        <div class="hub" style="background:#172033; color:white; margin-bottom:18px; min-height:180px;">
            <h2>Digital Core</h2>
            <div style="color:#c8d0df;">Single Source of Truth</div>
        </div>
        """,
        unsafe_allow_html=True,
    )
    st.dataframe(
        pd.DataFrame(integrations, columns=["Система", "Отдает", "Получает", "Статус", "Последний sync", "Качество"]),
        use_container_width=True,
        hide_index=True,
    )

with tabs[4]:
    section_title(
        "Premises",
        "Продажи видят актуальное состояние помещений",
        "Помещения синхронизированы с BIM, CRM, CLM и паспортом объекта.",
    )
    st.markdown(f"<div class='card' style='background:#fff7f1; border-color:#ffd8bd;'>{badge('Floor 12: BIM version updated -> sales data synced', 'warn')}</div>", unsafe_allow_html=True)
    st.dataframe(
        pd.DataFrame(premises, columns=["Помещение", "Башня", "Этаж", "Площадь", "Статус", "Арендатор", "Договор", "Версия планировки", "Источник", "Sync"]),
        use_container_width=True,
        hide_index=True,
    )

with tabs[5]:
    section_title(
        "Documents",
        "Документы и версии вместо сетевой папки",
        "Документный контур показывает актуальность, владельца, связанную сущность, процесс и предупреждение.",
    )
    st.dataframe(
        pd.DataFrame(documents, columns=["Документ", "Категория", "Версия", "Статус", "Владелец", "Обновлено", "Связь", "Источник", "Процесс", "Предупреждение"]),
        use_container_width=True,
        hide_index=True,
    )

with tabs[6]:
    section_title(
        "Activity / risks",
        "События и риски связаны с объектом и процессами",
        "Timeline фиксирует изменения из систем-источников, а risk panel показывает приоритеты.",
    )
    left, right = st.columns([0.9, 1.1])
    with left:
        st.markdown("### Activity timeline")
        for time, title, detail in activities:
            st.markdown(
                f"<div class='timeline-item'><b>{time}</b><br>{title}<br><span class='muted'>{detail}</span></div>",
                unsafe_allow_html=True,
            )
    with right:
        st.markdown("### Risk panel")
        for title, owner, severity, impact in risks:
            st.markdown(
                f"<div class='card soft' style='margin-bottom:10px;'><b>{title}</b> {badge(severity)}<p class='muted'>{impact}</p><span class='badge'>Owner: {owner}</span></div>",
                unsafe_allow_html=True,
            )

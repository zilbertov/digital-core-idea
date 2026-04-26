# SHIFT Space Digital Core

Frontend-only MVP веб-приложения для демонстрации цифрового ядра девелоперской компании на кейс-чемпионате.

## Идея

SHIFT Space Digital Core показывает переход от разрозненных ИТ-систем к единому слою данных вокруг цифрового паспорта объекта. Существующие CRM, 1C, BIM, закупки, документы, HR, юридические и сервисные системы не заменяются, а связываются через Digital Core.

## Проблема

Данные об объектах, помещениях, договорах, бюджетах, документах, закупках, рисках и сервисе живут в отдельных системах. Руководство вынуждено собирать ручные отчеты, продажи работают по устаревшим файлам, а e2e-процессы разваливаются на ручной перенос данных.

## Что Реализовано

- Executive Live Dashboard для CEO и директоров.
- Object Passport для объекта Glass Tower III.
- Object Data Hub visualization вокруг цифрового паспорта.
- E2E Processes с 8 сквозными цепочками.
- Relations / Integrations map с Digital Core в центре.
- Premises table с актуальными статусами помещений.
- Documents table with versions, statuses and warnings.
- Activity timeline и Risk panel.
- Static mock data only, без backend и настоящих API.

## Как Запустить

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

## Используемый Стек

- Next.js
- React
- TypeScript
- TailwindCSS
- shadcn/ui-style components
- lucide-react
- Mock/static data

## Структура Проекта

```text
src/app/                 Next.js app router
src/components/          Product screens and UI primitives
src/components/ui/       shadcn-style UI primitives
src/data/mock.ts         All MVP mock data
src/lib/utils.ts         Shared className utility
```

## Mock-Данные

Все данные являются статичными mock-данными в `src/data/mock.ts`: objects, premises, documents, contracts, procurement, integrations, e2eProcesses, risks, activities, dashboardKpis.

## Что Нужно Для Production

- Real backend API.
- Authentication.
- Real integrations with CRM, 1C, BIM, CLM, HR and service systems.
- Document storage and version control.
- Role-based access control.
- Production workflow engine.
- Audit trail, permissions and data quality monitoring.

## Implementation Plan

### Stage 1. Project setup

- [x] Проверить структуру проекта.
- [x] Установить зависимости.
- [x] Настроить shadcn/ui-style конфигурацию.
- [x] Подготовить layout.

### Stage 2. Mock data

- [x] Создать mock objects.
- [x] Создать mock premises.
- [x] Создать mock documents.
- [x] Создать mock contracts.
- [x] Создать mock procurement.
- [x] Создать mock integrations.
- [x] Создать mock e2eProcesses.
- [x] Создать mock risks.
- [x] Создать mock activities.
- [x] Создать mock dashboardKpis.

### Stage 3. Core screens

- [x] Executive Live Dashboard.
- [x] Object Passport.
- [x] Object Data Hub.
- [x] E2E Processes.
- [x] Relations / Integrations.
- [x] Documents.
- [x] Premises.
- [x] Activity / Risks.

### Stage 4. Polish

- [x] Аккуратные badges.
- [x] Hover states.
- [x] Responsive layout.
- [x] Empty states.
- [x] README.
- [x] Progress checklist.

## Implementation Progress

- [x] Project setup
- [x] Mock data model
- [x] Executive Live Dashboard
- [x] Object Passport
- [x] Object Data Hub visualization
- [x] E2E Processes screen
- [x] Relations / Integrations map
- [x] Premises table
- [x] Documents table with versions
- [x] Activity timeline
- [x] Risk panel
- [x] README
- [ ] Real backend API
- [ ] Authentication
- [ ] Real integrations
- [ ] Document storage
- [ ] Role-based access control
- [ ] Production workflow engine

"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Blocks,
  Building2,
  ChevronDown,
  CircleDot,
  DatabaseZap,
  FileStack,
  GitBranch,
  LayoutDashboard,
  Network,
  RefreshCw,
  Search,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  activities,
  contracts,
  dashboardKpis,
  documents,
  e2eProcesses,
  integrations,
  liveAlerts,
  objectHubEntities,
  objectKpis,
  objectPassport,
  objects,
  premises,
  procurement,
  risks,
  type FlowStatus,
  type HealthStatus,
  type IntegrationStatus,
  type Severity,
} from "@/data/mock";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "dashboard", label: "Дашборд руководства", icon: LayoutDashboard },
  { id: "passport", label: "Паспорт объекта", icon: Building2 },
  { id: "processes", label: "Сквозные процессы", icon: Workflow },
  { id: "relations", label: "Связи / Интеграции", icon: Network },
  { id: "documents", label: "Документы", icon: FileStack },
  { id: "premises", label: "Помещения", icon: Blocks },
  { id: "risks", label: "Активность / Риски", icon: ShieldAlert },
] as const;

type TabId = (typeof tabs)[number]["id"];

const badgeTone = {
  normal: "success",
  attention: "warning",
  critical: "danger",
  connected: "success",
  "partly manual": "warning",
  risk: "danger",
  planned: "info",
  "manual import": "warning",
  low: "info",
  medium: "warning",
  high: "danger",
} as const;

function statusVariant(status: string) {
  if (status === "Actual" || status === "Signed" || status === "Leased" || status === "connected") return "success";
  if (status === "Outdated" || status === "Requires update" || status === "critical" || status === "risk") return "danger";
  if (status === "On approval" || status === "Draft" || status === "Reserved" || status === "manual import") return "warning";
  if (status === "Available" || status === "planned" || status === "In fit-out") return "info";
  return "default";
}

function AppBadge({
  children,
  status,
  className,
}: {
  children: React.ReactNode;
  status?: HealthStatus | FlowStatus | IntegrationStatus | Severity | string;
  className?: string;
}) {
  return (
    <Badge
      variant={
        status && status in badgeTone
          ? badgeTone[status as keyof typeof badgeTone]
          : (statusVariant(String(status)) as "default")
      }
      className={className}
    >
      <CircleDot className="h-3 w-3" />
      {children}
    </Badge>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 w-fit rounded-full border border-[#dfe4f0] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5b4bdb]">{eyebrow}</div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#172033] md:text-3xl">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-[#667085]">{description}</p>
    </div>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-[#cfd6e5] bg-white p-8 text-center text-sm text-[#667085]">
      {title}
    </div>
  );
}

function MobileMetric({ label, value, danger }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a94aa]">{label}</div>
      <div className={cn("mt-1 font-semibold text-[#34405a]", danger && "text-[#b42338]")}>{value}</div>
    </div>
  );
}

export function DigitalCoreApp() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const ActiveIcon = useMemo(() => tabs.find((tab) => tab.id === activeTab)?.icon ?? LayoutDashboard, [activeTab]);
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label;

  return (
    <main className="editorial-shell min-h-[100dvh] px-4 py-5 text-[#172033] md:px-8 md:py-8">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-6 overflow-hidden rounded-[1.4rem] border border-[#dfe4f0] bg-white p-4 shadow-[0_28px_70px_-56px_rgba(23,32,51,0.75)] md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="success" className="uppercase tracking-[0.14em]">
                  SHIFT Space
                </Badge>
                <Badge variant="outline">Digital Core MVP</Badge>
                <Badge variant="outline">Mock data only</Badge>
              </div>
              <h1 className="max-w-4xl text-3xl font-semibold leading-[0.98] tracking-tight text-[#172033] md:text-5xl">
                Digital Core вокруг цифрового паспорта объекта
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#59647c] md:text-base">
                Раньше CRM, 1C, BIM, Excel, тендерная площадка, документы, HR и юридические системы жили островами.
                Теперь Digital Core связывает их вокруг объекта, помещений, договоров, финансов, GR, сервиса и рисков.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-[#dfe4f0] bg-[#f7f8fc] p-2">
              <div className="rounded-[1rem] border border-white bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#34405a]">
                <DatabaseZap className="h-4 w-4 text-[#5b4bdb]" />
                Source systems to management loop
              </div>
              <div className="grid gap-2 text-xs text-[#59647c] sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                <span className="rounded-xl border border-[#e6e9f2] bg-[#f9faff] p-3">CRM / 1C / BIM / HR / Legal / Service</span>
                <ArrowRight className="hidden h-4 w-4 text-[#8a94aa] sm:block" />
                <span className="rounded-xl border border-[#cfc9ff] bg-[#f0eeff] p-3 font-semibold text-[#4b3ac7]">Digital Core</span>
                <ArrowRight className="hidden h-4 w-4 text-[#8a94aa] sm:block" />
                <span className="rounded-xl border border-[#d5e3ff] bg-[#edf4ff] p-3">Object Passport / Live Dashboard / E2E</span>
              </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="relative z-[2] mb-6 rounded-[1.2rem] border border-[#dfe4f0] bg-white p-2 shadow-[0_18px_50px_-44px_rgba(23,32,51,0.65)]">
          <div className="md:hidden">
            <button
              type="button"
              className="flex h-11 w-full cursor-pointer items-center justify-between rounded-xl border border-[#dfe4f0] bg-white px-3 text-left text-sm font-medium text-[#34405a] transition-colors active:scale-[0.99]"
              onPointerDown={(event) => {
                event.preventDefault();
                setMobileNavOpen((open) => !open);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setMobileNavOpen((open) => !open);
                }
              }}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-section-nav"
            >
              <span className="flex min-w-0 items-center gap-2">
                <ActiveIcon className="h-4 w-4 shrink-0 text-[#5b4bdb]" />
                <span className="truncate">{activeLabel}</span>
              </span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", mobileNavOpen && "rotate-180")} />
            </button>

            {mobileNavOpen && (
              <div id="mobile-section-nav" className="mt-2 grid gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors active:translate-y-px",
                        active ? "bg-[#172033] text-white" : "text-[#34405a] hover:bg-[#f2f4fa]",
                      )}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        setActiveTab(tab.id);
                        setMobileNavOpen(false);
                      }}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="soft-scrollbar hidden gap-2 overflow-x-auto md:flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  variant={active ? "default" : "ghost"}
                  size="sm"
                  className={cn("shrink-0", active && "bg-[#172033]")}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </nav>

        <div className="mb-4 flex items-center gap-2 text-sm text-[#667085]">
          <ActiveIcon className="h-4 w-4 text-[#5b4bdb]" />
          <span>Активный экран: {activeLabel}</span>
        </div>

        <div className="fade-in">
          {activeTab === "dashboard" && <ExecutiveDashboard />}
          {activeTab === "passport" && <ObjectPassport />}
          {activeTab === "processes" && <E2EProcesses />}
          {activeTab === "relations" && <RelationsIntegrations />}
          {activeTab === "documents" && <DocumentsScreen />}
          {activeTab === "premises" && <PremisesScreen />}
          {activeTab === "risks" && <ActivityRisks />}
        </div>
      </div>
    </main>
  );
}

function ExecutiveDashboard() {
  const portfolioObjects = [...objects];

  return (
    <section>
      <SectionHeader
        eyebrow="Executive live dashboard"
        title="CEO видит live-картину без ручных пятничных отчетов"
        description="Объекты, бюджеты, договоры, заявки арендаторов, документы и риски сведены в управленческий контур."
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-9">
        {dashboardKpis.map((kpi) => (
          <Card key={kpi.label} className="border-l-4 border-l-[#5b4bdb] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5">
            <CardContent className="p-3">
              <div className="text-xs font-medium uppercase tracking-[0.1em] text-[#667085]">{kpi.label}</div>
              <div className="metric-font mt-2 text-xl font-semibold tracking-tight text-[#172033]">{kpi.value}</div>
              <Badge variant={kpi.tone as "success"} className="mt-2">
                {kpi.delta}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-5">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle>Object Portfolio</CardTitle>
            <CardDescription>Состояние объектов, план-факт бюджета, документы, риски и арендная заполненность.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {portfolioObjects.length === 0 ? (
              <EmptyState title="Objects will appear after first source sync." />
            ) : (
              <div>
                <div className="grid gap-3 md:hidden">
                  {portfolioObjects.map((object) => (
                    <div key={object.name} className="rounded-[1.2rem] border border-[#dfe4f0] bg-[#f8f9fd] p-4">
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-[#172033]">{object.name}</div>
                          <div className="mt-1 text-sm text-[#667085]">{object.stage} · сдача {object.deliveryDate}</div>
                        </div>
                        <AppBadge status={object.status}>{object.status}</AppBadge>
                      </div>
                      <div className="mb-3 flex items-center gap-2">
                        <Progress value={object.readiness} />
                        <span className="metric-font text-xs text-[#5b657c]">{object.readiness}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#5b657c]">
                        <MobileMetric label="Сроки" value={object.scheduleDelta} />
                        <MobileMetric label="Бюджет" value={object.budget} />
                        <MobileMetric label="Факт" value={object.actual} />
                        <MobileMetric label="Откл." value={object.budgetDelta} danger />
                        <MobileMetric label="Аренда" value={`${object.occupancy}%`} />
                        <MobileMetric label="Docs / риски" value={`${object.docsOnApproval} / ${object.risks}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="soft-scrollbar hidden max-h-[340px] overflow-auto md:block">
                  <Table className="min-w-[1080px] text-xs">
                    <TableHeader className="sticky top-0 z-[1] bg-white">
                      <TableRow>
                        <TableHead className="h-9">Объект</TableHead>
                        <TableHead className="h-9">Стадия</TableHead>
                        <TableHead className="h-9">Готовность</TableHead>
                        <TableHead className="h-9">Сдача</TableHead>
                        <TableHead className="h-9">Сроки</TableHead>
                        <TableHead className="h-9">Бюджет</TableHead>
                        <TableHead className="h-9">Факт</TableHead>
                        <TableHead className="h-9">Откл.</TableHead>
                        <TableHead className="h-9">Аренда</TableHead>
                        <TableHead className="h-9">Docs</TableHead>
                        <TableHead className="h-9">Риски</TableHead>
                        <TableHead className="h-9">Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioObjects.map((object) => (
                        <TableRow key={object.name}>
                          <TableCell className="py-2 font-semibold text-[#172033]">{object.name}</TableCell>
                          <TableCell className="py-2">{object.stage}</TableCell>
                          <TableCell className="py-2">
                            <div className="flex min-w-32 items-center gap-2">
                              <Progress value={object.readiness} />
                              <span className="metric-font text-xs">{object.readiness}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-2">{object.deliveryDate}</TableCell>
                          <TableCell className="py-2">{object.scheduleDelta}</TableCell>
                          <TableCell className="py-2">{object.budget}</TableCell>
                          <TableCell className="py-2">{object.actual}</TableCell>
                          <TableCell className="py-2 font-semibold text-[#b42338]">{object.budgetDelta}</TableCell>
                          <TableCell className="py-2">{object.occupancy}%</TableCell>
                          <TableCell className="py-2">{object.docsOnApproval}</TableCell>
                          <TableCell className="py-2">{object.risks}</TableCell>
                          <TableCell className="py-2">
                            <AppBadge status={object.status}>{object.status}</AppBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[#e36f2c]" />
              Live Alerts
            </CardTitle>
            <CardDescription>События из систем-источников, поднятые до уровня управленческого решения.</CardDescription>
          </CardHeader>
          <CardContent className="soft-scrollbar flex gap-3 overflow-x-auto p-4 pt-2">
            {liveAlerts.map((alert) => (
              <div key={alert.title} className="min-w-[260px] flex-1 rounded-[1.2rem] border border-[#dfe4f0] bg-[#f8f9fd] p-4 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white md:min-w-[320px]">
                <div className="mb-2 text-sm font-semibold text-[#172033]">{alert.title}</div>
                <Badge variant={alert.tone as "warning"}>{alert.source}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ObjectPassport() {
  return (
    <section>
      <SectionHeader
        eyebrow="Object passport"
        title="Glass Tower III как единая цифровая сущность"
        description="Паспорт объекта связывает участок, BIM, сметы, договоры, акты, платежи, помещения, арендаторов, сервис и юридические события."
      />
      <Card className="mb-5 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <AppBadge status={objectPassport.status}>{objectPassport.status}</AppBadge>
                <Badge variant="outline">{objectPassport.stage}</Badge>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#172033] md:text-5xl">{objectPassport.name}</h2>
              <div className="mt-5 grid gap-3 text-sm text-[#667085] sm:grid-cols-2">
                <div>Адрес: <span className="font-medium text-[#172033]">{objectPassport.address}</span></div>
                <div>Директор: <span className="font-medium text-[#172033]">{objectPassport.director}</span></div>
                <div>Плановая сдача: <span className="font-medium text-[#172033]">{objectPassport.deliveryDate}</span></div>
                <div>Общий статус: <span className="font-medium text-[#b42338]">critical deviations active</span></div>
              </div>
            </div>
            <div className="border-t border-[#dfe4f0] bg-[#f7f8fc] p-6 lg:border-l lg:border-t-0">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#34405a]">
                <Search className="h-4 w-4 text-[#5b4bdb]" />
                Digital passport lookup
              </div>
              <div className="rounded-[1.15rem] border border-[#dfe4f0] bg-white p-4 text-sm text-[#667085]">
                Любая карточка помещения, документа, закупки или договора возвращает пользователя к одному объекту и его версии данных.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {objectKpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="text-xs font-medium uppercase tracking-[0.1em] text-[#667085]">{kpi.label}</div>
              <div className="metric-font mt-3 text-2xl font-semibold text-[#172033]">{kpi.value}</div>
              <Badge variant={kpi.tone as "default"} className="mt-3">
                {kpi.hint}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <ObjectDataHub />
    </section>
  );
}

function ObjectDataHub() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Object Data Hub</CardTitle>
        <CardDescription>Объект больше не папка с файлами. Это цифровой узел, к которому привязана вся экосистема данных.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[1fr_320px_1fr] lg:items-center">
          <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1">
            {objectHubEntities.slice(0, 7).map((entity) => (
              <HubNode key={entity} label={entity} />
            ))}
          </div>
          <div className="relative order-1 rounded-[1.5rem] border border-[#cfc9ff] bg-[#f0eeff] p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] lg:order-2 lg:p-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[1rem] bg-[#5b4bdb] text-white">
              <DatabaseZap className="h-7 w-7" />
            </div>
            <div className="text-xl font-semibold text-[#172033]">Glass Tower III</div>
            <div className="mt-1 text-sm font-medium text-[#4b3ac7]">Digital Object Passport</div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-[#4b3ac7]">
              <span className="rounded-xl bg-white/75 p-2">single object ID</span>
              <span className="rounded-xl bg-white/75 p-2">versioned data</span>
              <span className="rounded-xl bg-white/75 p-2">process links</span>
              <span className="rounded-xl bg-white/75 p-2">live status</span>
            </div>
          </div>
          <div className="order-3 grid gap-3 sm:grid-cols-2">
            {objectHubEntities.slice(7).map((entity) => (
              <HubNode key={entity} label={entity} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HubNode({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[1rem] border border-[#dfe4f0] bg-white p-3 text-sm font-medium text-[#34405a] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[#cfc9ff] hover:bg-[#fbfaff]">
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 text-[#5b4bdb]" />
    </div>
  );
}

function E2EProcesses() {
  return (
    <section>
      <SectionHeader
        eyebrow="E2E processes"
        title="Сквозные цепочки вместо островных систем"
        description="Каждая цепочка показывает путь данных через системы-источники, Digital Core и управленческий результат без ручного копирования."
      />
      <div className="space-y-4">
        {e2eProcesses.map((process) => (
          <Card key={process.name}>
            <CardContent className="p-5">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-[#172033]">{process.name}</h3>
                    <AppBadge status={process.status}>{process.status}</AppBadge>
                  </div>
                  <div className="mt-2 text-sm text-[#667085]">
                    Owner: {process.owner} · Last update: {process.lastUpdate}
                  </div>
                </div>
                <div className="max-w-xl rounded-[1rem] border border-[#dfe4f0] bg-[#f8f9fd] p-3 text-sm text-[#667085]">
                  <span className="font-semibold text-[#34405a]">Manual removed:</span> {process.removedManual}
                </div>
              </div>
              <div className="soft-scrollbar flex gap-3 overflow-x-auto pb-2">
                {process.steps.map(([step, source], index) => (
                  <div key={`${process.name}-${step}`} className="flex shrink-0 items-center gap-3">
                    <div className="w-48 rounded-[1rem] border border-[#dfe4f0] bg-white p-4">
                      <div className="text-sm font-semibold text-[#172033]">{step}</div>
                      <div className="mt-2 text-xs leading-5 text-[#667085]">{source}</div>
                    </div>
                    {index < process.steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-[#5b4bdb]" />}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#667085]">
                <AlertTriangle className="h-4 w-4 text-[#e36f2c]" />
                {process.issue}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function RelationsIntegrations() {
  return (
    <section>
      <SectionHeader
        eyebrow="Relations / integrations"
        title="Digital Core связывает существующие системы, а не заменяет их"
        description="Схема показывает, какие данные системы отдают и получают, статус интеграции, последний sync и качество данных."
      />
      <Card className="mb-5">
        <CardContent className="p-5">
          <div className="grid gap-4 xl:grid-cols-[1fr_360px_1fr] xl:items-center">
            <IntegrationColumn items={integrations.slice(0, 6)} className="order-2 xl:order-1" />
            <div className="order-1 rounded-[1.5rem] border border-[#1f2a44] bg-[#172033] p-6 text-center text-white shadow-[0_26px_64px_-48px_rgba(23,32,51,0.8)] xl:order-2 xl:p-7">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[1rem] bg-white/10">
                <GitBranch className="h-8 w-8 text-[#b9b2ff]" />
              </div>
              <div className="text-2xl font-semibold">Digital Core</div>
              <div className="mt-2 text-sm text-[#c8d0df]">Single Source of Truth</div>
              <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/5 p-4 text-left text-xs leading-5 text-[#c8d0df]">
                Нормализует идентификаторы объекта, помещения, договора, документа, контрагента, платежа и риска.
              </div>
            </div>
            <IntegrationColumn items={integrations.slice(6)} className="order-3" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function IntegrationColumn({
  items,
  className,
}: {
  items: ReadonlyArray<(typeof integrations)[number]>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <div key={item.system} className="rounded-[1.15rem] border border-[#dfe4f0] bg-white p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[#cfc9ff] hover:bg-[#fbfaff]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="font-semibold text-[#172033]">{item.system}</div>
            <AppBadge status={item.status}>{item.status}</AppBadge>
          </div>
          <div className="space-y-2 text-xs leading-5 text-[#667085]">
            <p><span className="font-semibold text-[#34405a]">Отдает:</span> {item.gives}</p>
            <p><span className="font-semibold text-[#34405a]">Получает:</span> {item.receives}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline"><RefreshCw className="h-3 w-3" /> {item.sync}</Badge>
            <Badge variant="outline">Quality {item.quality}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

function PremisesScreen() {
  return (
    <section>
      <SectionHeader
        eyebrow="Premises"
        title="Продажи видят актуальное состояние помещений"
        description="Помещения синхронизированы с BIM, CRM, CLM и паспортом объекта, поэтому команда не работает по старым PDF или Excel."
      />
      <Card className="mb-5 border-[#ffd8bd] bg-[#fff7f1]">
        <CardContent className="flex items-center gap-3 p-4 text-sm text-[#b84f16]">
          <AlertTriangle className="h-4 w-4" />
          Floor 12: BIM version updated {"->"} sales data synced
        </CardContent>
      </Card>
      <DataTable
        headers={["Помещение", "Башня", "Этаж", "Площадь", "Статус", "Арендатор", "Договор", "Версия планировки", "Источник", "Sync"]}
        rows={premises}
        badgeColumn={4}
      />
    </section>
  );
}

function DocumentsScreen() {
  return (
    <section>
      <SectionHeader
        eyebrow="Documents"
        title="Документы и версии вместо сетевой папки"
        description="Контролируемый документный контур показывает актуальность, владельца, связанную сущность, процесс и предупреждение."
      />
      <DataTable
        headers={["Документ", "Категория", "Версия", "Статус", "Владелец", "Обновлено", "Связь", "Источник", "Процесс", "Предупреждение"]}
        rows={documents}
        badgeColumn={3}
        warningColumn={9}
      />
    </section>
  );
}

function DataTable({
  headers,
  rows,
  badgeColumn,
  warningColumn,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  badgeColumn?: number;
  warningColumn?: number;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-3 md:hidden">
          {rows.map((row) => (
            <div key={row.join("-")} className="rounded-[1.2rem] border border-[#dfe4f0] bg-[#f8f9fd] p-4">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div className="max-w-[220px] font-semibold text-[#172033]">{row[0]}</div>
                {badgeColumn !== undefined && <AppBadge status={row[badgeColumn]}>{row[badgeColumn]}</AppBadge>}
              </div>
              <div className="grid gap-2">
                {row.slice(1).map((cell, offset) => {
                  const index = offset + 1;
                  if (index === badgeColumn) return null;
                  return (
                    <div key={`${cell}-${index}`} className="grid grid-cols-[108px_1fr] gap-3 rounded-xl bg-white p-3 text-xs">
                      <div className="font-medium text-[#8a94aa]">{headers[index]}</div>
                      <div className="min-w-0 text-[#34405a]">
                        {index === warningColumn ? (
                          <Badge variant={statusVariant(cell) === "danger" ? "danger" : "warning"} className="max-w-full whitespace-normal leading-4">
                            <AlertTriangle className="h-3 w-3 shrink-0" />
                            {cell}
                          </Badge>
                        ) : (
                          <span className="break-words">{cell}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="soft-scrollbar hidden overflow-x-auto md:block">
          <Table className="min-w-[1180px]">
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.join("-")}>
                  {row.map((cell, index) => (
                    <TableCell key={`${cell}-${index}`} className={index === 0 ? "font-semibold text-[#172033]" : ""}>
                      {index === badgeColumn ? (
                        <AppBadge status={cell}>{cell}</AppBadge>
                      ) : index === warningColumn ? (
                        <Badge variant={statusVariant(cell) === "danger" ? "danger" : "warning"}>
                          <AlertTriangle className="h-3 w-3" />
                          {cell}
                        </Badge>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityRisks() {
  return (
    <section>
      <SectionHeader
        eyebrow="Activity / risks"
        title="События и риски связаны с объектом и процессами"
        description="Timeline фиксирует изменения из систем-источников, а risk panel показывает приоритеты для CEO и директоров."
      />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#2563eb]" />
              Activity timeline
            </CardTitle>
            <CardDescription>Последние события по Glass Tower III и связанным процессам.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map(([time, title, detail]) => (
              <div key={`${time}-${title}`} className="grid gap-2 sm:grid-cols-[100px_1fr] sm:gap-4">
                <div className="metric-font text-xs text-[#667085]">{time}</div>
                <div className="relative border-l border-[#dfe4f0] pl-4">
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#5b4bdb]" />
                  <div className="text-sm font-semibold text-[#172033]">{title}</div>
                  <div className="mt-1 text-sm text-[#667085]">{detail}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[#b42338]" />
              Risk panel
            </CardTitle>
            <CardDescription>Риски сгруппированы по severity и владельцу действия.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {risks.map((risk) => (
              <div key={risk.title} className="rounded-[1.15rem] border border-[#dfe4f0] bg-[#f8f9fd] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="font-semibold text-[#172033]">{risk.title}</div>
                  <AppBadge status={risk.severity}>{risk.severity}</AppBadge>
                </div>
                <div className="text-sm leading-6 text-[#667085]">{risk.impact}</div>
                <Badge variant="outline" className="mt-3">
                  Owner: {risk.owner}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contracts sample</CardTitle>
            <CardDescription>Mock contracts attached to the digital object context.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contracts.map((contract) => (
              <div key={contract.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[1.15rem] border border-[#dfe4f0] p-4">
                <div>
                  <div className="font-semibold text-[#172033]">{contract.id} · {contract.counterparty}</div>
                  <div className="text-sm text-[#667085]">{contract.type} · {contract.value}</div>
                </div>
                <AppBadge status={contract.status}>{contract.status}</AppBadge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Procurement sample</CardTitle>
            <CardDescription>Mock procurement items linked to estimates, BIM volumes and budget control.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {procurement.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[1.15rem] border border-[#dfe4f0] p-4">
                <div>
                  <div className="font-semibold text-[#172033]">{item.id} · {item.category}</div>
                  <div className="text-sm text-[#667085]">{item.object} · delta {item.delta}</div>
                </div>
                <AppBadge status={item.status}>{item.status}</AppBadge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

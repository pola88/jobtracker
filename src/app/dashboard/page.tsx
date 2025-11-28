import Link from "next/link";

import { requireCurrentUser } from "@/lib/auth";
import { getDashboardData, getInterviews } from "@/lib/data/interviews";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatusKanban } from "@/components/dashboard/status-kanban";
import { InterviewsTable } from "@/components/dashboard/interviews-table";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StepsTimeline } from "@/components/dashboard/steps-timeline";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const user = await requireCurrentUser();
  const [dashboardData, interviews] = await Promise.all([
    getDashboardData(user.id),
    getInterviews(user.id),
  ]);

  const inProgress = dashboardData.byStatus
    .filter((bucket) => bucket.status !== "rejected")
    .reduce((acc, bucket) => acc + bucket.count, 0);
  const offers = dashboardData.byStatus.find((s) => s.status === "offer")?.count ?? 0;
  const rejected = dashboardData.byStatus.find((s) => s.status === "rejected")?.count ?? 0;

  const action = (
    <Button asChild>
      <Link href="/interviews/new">Nueva entrevista</Link>
    </Button>
  );

  return (
    <AppShell
      title="Dashboard"
      description="KPIs accionables de tu pipeline de entrevistas"
      actions={action}
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total entrevistas" value={dashboardData.total} />
        <MetricCard title="En proceso" value={inProgress} />
        <MetricCard title="Ofertas" value={offers} />
        <MetricCard title="Rechazos" value={rejected} />
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-lg font-semibold">Kanban por estado</h2>
        <StatusKanban
          columns={dashboardData.byStatus.map((bucket) => ({
            status: bucket.status,
            items: interviews.filter((interview) => interview.status === bucket.status),
          }))}
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Tabla de entrevistas</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/interviews">Ver todas</Link>
            </Button>
          </div>
          <InterviewsTable interviews={interviews.slice(0, 10)} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Últimas entrevistas</h2>
          <RecentActivity interviews={dashboardData.latest} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Timeline de pasos</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Seguimiento de tus últimas instancias (challenge, técnicas, clientes, etc.).
        </p>
        <StepsTimeline steps={dashboardData.recentSteps} />
      </section>
    </AppShell>
  );
}


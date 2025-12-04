import Link from "next/link";

import { requireCurrentUser } from "@/lib/auth";
import { getDashboardData, getInterviews } from "@/lib/data/interviews";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/metric-card";
import { InterviewsTable } from "@/components/dashboard/interviews-table";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const user = await requireCurrentUser();
  const [dashboardData, interviews] = await Promise.all([
    getDashboardData(user.id),
    getInterviews(user.id),
  ]);

  const inProgress = dashboardData.byStatus
    .filter((bucket) => bucket.status !== "rejected" && bucket.status !== "not_interested")
    .reduce((acc, bucket) => acc + bucket.count, 0);
  const offers = dashboardData.byStatus.find((s) => s.status === "stand_by")?.count ?? 0;
  const notInterested = dashboardData.byStatus.find((s) => s.status === "not_interested")?.count ?? 0;

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
        <MetricCard title="Stand by" value={offers} />
        <MetricCard title="No interesado" value={notInterested} />
        <MetricCard
          title="Feeling general"
          value={`${dashboardData.recentSentiment.positive}% 👍`}
          description="Últimos 10 procesos"
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
    </AppShell>
  );
}


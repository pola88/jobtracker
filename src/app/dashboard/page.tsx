import Link from 'next/link';

import { Card } from '@/components/card';
import { InterviewsTable } from '@/components/interviews-table';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { requireCurrentUser } from '@/lib/auth';
import { getApplications, getLatestInterviews } from '@/lib/data/interviews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const user = await requireCurrentUser();
  const [applications, latestInterviews] = await Promise.all([
    getApplications(user.id),
    getLatestInterviews(user.id),
  ]);

  const action = (
    <Button asChild>
      <Link href='/interviews/new'>Nueva entrevista</Link>
    </Button>
  );

  return (
    <AppShell
      title='Dashboard'
      description='KPIs accionables de tu pipeline de entrevistas'
      actions={action}
    >
      <Card title='Postulaciones'>
        <div className='space-y-4'>
          <InterviewsTable interviews={applications} />
        </div>
      </Card>

      <Card title='Entrevistas'>
        <InterviewsTable interviews={latestInterviews} />
      </Card>
    </AppShell>
  );
}

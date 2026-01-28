import Link from 'next/link';

import { InterviewsTable } from '@/components/interviews-table';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { requireCurrentUser } from '@/lib/auth';
import { getInterviews } from '@/lib/data/interviews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InterviewsPage() {
  const user = await requireCurrentUser();
  const interviews = await getInterviews(user.id);

  const action = (
    <Button asChild>
      <Link href='/interviews/new'>Registrar entrevista</Link>
    </Button>
  );

  return (
    <AppShell
      title='Entrevistas'
      description='Gestiona todas las oportunidades en un solo lugar'
      actions={action}
      className='space-y-6'
    >
      <InterviewsTable interviews={interviews} />
    </AppShell>
  );
}

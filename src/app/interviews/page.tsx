import { Card } from '@/components/card';
import { InterviewsTable } from '@/components/interviews-table';
import { Metrics } from '@/components/interviews/metrics';
import { requireCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InterviewsPage() {
  const user = await requireCurrentUser();

  return (
    <>
      <Metrics userId={user.id} />
      <Card
        title='All Applications'
        description='Track and manage your job applications'
        noBorder
      >
        <InterviewsTable userId={user.id} />
      </Card>
    </>
  );
}

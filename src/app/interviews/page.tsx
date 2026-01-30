import { Card } from '@/components/card';
import { InterviewsTable } from '@/components/interviews-table';
import { requireCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InterviewsPage() {
  const user = await requireCurrentUser();

  return (
    <Card title='Interviews'>
      <InterviewsTable userId={user.id} />
    </Card>
  );
}

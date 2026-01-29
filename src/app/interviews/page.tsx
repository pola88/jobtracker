import { Card } from '@/components/card';
import { InterviewsTable } from '@/components/interviews-table';
import { requireCurrentUser } from '@/lib/auth';
import { getInterviews } from '@/lib/data/interviews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InterviewsPage() {
  const user = await requireCurrentUser();
  const interviews = await getInterviews(user.id);

  return (
    <Card title='Interviews'>
      <InterviewsTable interviews={interviews} />
    </Card>
  );
}

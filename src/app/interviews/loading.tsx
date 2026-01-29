import { Card } from '@/components/card';
import { InterviewsTableLoading } from '@/components/interviews-table/loading';

export default function Loading() {
  return (
    <Card title='Entrevistas'>
      <InterviewsTableLoading />
    </Card>
  );
}

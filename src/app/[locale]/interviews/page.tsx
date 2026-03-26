import { getLocale, getTranslations } from 'next-intl/server';

import { Card } from '@/components/card';
import { InterviewsTable } from '@/components/interviews-table';
import { Metrics } from '@/components/interviews/metrics';
import { ShowInterviewModal } from '@/components/interviews/show-interview-modal';
import { requireCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InterviewsPage() {
  const user = await requireCurrentUser();
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'interviews.page' });

  return (
    <>
      <Metrics userId={user.id} />
      <Card
        title={t('table.title')}
        description={t('table.description')}
        noBorder
      >
        <InterviewsTable userId={user.id} />
      </Card>
      <ShowInterviewModal />
    </>
  );
}

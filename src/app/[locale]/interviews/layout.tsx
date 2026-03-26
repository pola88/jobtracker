import { getLocale, getTranslations } from 'next-intl/server';

import { AddApplicationBtn } from '@/components/interviews/add-aplication-button';
import { NewInterviewModal } from '@/components/interviews/new-interview-modal';
import { AppShell } from '@/components/layout/app-shell';

export default async function InterviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'interviews.page' });
  return (
    <AppShell
      title='Job tracker'
      description={t('description')}
      actions={<AddApplicationBtn />}
    >
      <>
        {children}
        <NewInterviewModal />
      </>
    </AppShell>
  );
}

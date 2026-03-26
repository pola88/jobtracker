import { getLocale, getTranslations } from 'next-intl/server';

import { AppShell } from '@/components/layout/app-shell';

const InvoicesPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'invoices.page' });

  return (
    <AppShell title={t('title')} description={t('description')}>
      <div>InvoicesPage</div>
    </AppShell>
  );
};

export default InvoicesPage;

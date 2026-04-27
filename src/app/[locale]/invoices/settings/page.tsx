import { getLocale, getTranslations } from 'next-intl/server';

import { BusinessModal } from '@/components/business-profile/business-modal';
import { BusinessProfileList } from '@/components/invoice/business-profile/business-profile-list';
import { ClientList } from '@/components/invoice/clients/client-list';
import { InvoiceLineItemsTable } from '@/components/invoice/items/table';
import { AppShell } from '@/components/layout/app-shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InvoicesSettingsPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'invoices-settings.page',
  });

  return (
    <AppShell title={t('title')} description={t('description')}>
      <Tabs defaultValue='business-profile'>
        <TabsList>
          <TabsTrigger value='business-profile'>
            {t('tabs.business-profile')}
          </TabsTrigger>
          <TabsTrigger value='customers'>{t('tabs.customers')}</TabsTrigger>
          <TabsTrigger value='items'>{t('tabs.items')}</TabsTrigger>
        </TabsList>
        <TabsContent value='business-profile'>
          <BusinessProfileList />
        </TabsContent>
        <TabsContent value='customers'>
          <ClientList />
        </TabsContent>
        <TabsContent value='items'>
          <InvoiceLineItemsTable />
        </TabsContent>
      </Tabs>
      <BusinessModal />
    </AppShell>
  );
};

export default InvoicesSettingsPage;

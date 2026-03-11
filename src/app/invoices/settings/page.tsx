import { BusinessModal } from '@/components/business-profile/business-modal';
import { BusinessProfileList } from '@/components/invoice/business-profile/business-profile-list';
import { ClientList } from '@/components/invoice/clients/client-list';
import { AppShell } from '@/components/layout/app-shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InvoicesSettingsPage = () => {
  return (
    <AppShell
      title='Configuración de facturas'
      description='Configura las facturas para tu empresa'
    >
      <Tabs defaultValue='business-profile'>
        <TabsList>
          <TabsTrigger value='business-profile'>Business Profile</TabsTrigger>
          <TabsTrigger value='customers'>Customers</TabsTrigger>
          <TabsTrigger value='items'>Items</TabsTrigger>
        </TabsList>
        <TabsContent value='business-profile'>
          <BusinessProfileList />
        </TabsContent>
        <TabsContent value='customers'>
          <ClientList />
        </TabsContent>
        <TabsContent value='items'>
          <>Items</>
        </TabsContent>
      </Tabs>
      <BusinessModal />
    </AppShell>
  );
};

export default InvoicesSettingsPage;

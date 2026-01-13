import BusinessProfile from '@/components/invoice/settings/business-profile';
import { AppShell } from '@/components/layout/app-shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InvoicesSettingsPage = () => {
  return (
    <AppShell
      title='Configuración de facturas'
      description='Configura las facturas para tu empresa'
    >
      <Tabs defaultValue='individual'>
        <TabsList>
          <TabsTrigger value='individual'>Invdividual</TabsTrigger>
          <TabsTrigger value='company'>Company</TabsTrigger>
        </TabsList>
        <TabsContent value='individual'>
          <BusinessProfile isOrganization={false} />
        </TabsContent>
        <TabsContent value='company'>
          <BusinessProfile isOrganization={true} />
        </TabsContent>
      </Tabs>
    </AppShell>
  );
};

export default InvoicesSettingsPage;

'use client';

import { useEffect, useState, useTransition } from 'react';

import { useTranslations } from 'next-intl';

import { Card } from '@/components/card';
import InvoiceForm from '@/components/forms/invoice/invoice-form';
import Preview from '@/components/invoice/preview/preview';
import { AppShell } from '@/components/layout/app-shell';
import InvoiceFormSkeleton from '@/components/skeletons/invoice-form';
// import { getBusinessProfile } from '@/lib/data/business-profiles';
import { ActionResponseBase } from '@/lib/types';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';
import { InvoiceDTO } from '@/lib/validators/invoice';

const NewInvoicePage = () => {
  const t = useTranslations('invoices-new.page');
  const [isPending, startTransition] = useTransition();
  // const [isOrganization, setIsOrganization] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceDTO | null>(null);

  const [businessProfile] = useState<BusinessProfileDTO | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const fetchBusinessProfile = async () => {
        // const profile = await getBusinessProfile();
        // if (profile) {
        // setBusinessProfile(profile);
        // }
      };
      fetchBusinessProfile();
    });
  }, []);

  const handleOnPreview = async (
    newInvoice: InvoiceDTO,
  ): Promise<ActionResponseBase> => {
    setInvoice(newInvoice as unknown as InvoiceDTO);
    return { success: true };
  };

  return (
    <AppShell title={t('title')} description={t('description')}>
      <Card>
        {isPending ? (
          <InvoiceFormSkeleton />
        ) : (
          <InvoiceForm
            businessProfile={businessProfile}
            onPreview={handleOnPreview}
          />
        )}
      </Card>
      {invoice && (
        <Preview
          data={invoice}
          open={true}
          onOpenChange={() => setInvoice(null)}
        />
      )}
    </AppShell>
  );
};

export default NewInvoicePage;

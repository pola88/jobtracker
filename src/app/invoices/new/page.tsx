'use client';

import { useEffect, useState, useTransition } from 'react';

import { BusinessProfile } from '@prisma/client';

import { getBusinessProfile } from '@/actions/invoices-settings';
import { Card } from '@/components/card';
import InvoiceForm from '@/components/forms/invoice/invoice-form';
import { Invoice } from '@/components/forms/invoice/types';
import Preview from '@/components/invoice/preview/preview';
import { AppShell } from '@/components/layout/app-shell';
import InvoiceFormSkeleton from '@/components/skeletons/invoice-form';
import { ActionResponseBase } from '@/lib/types';

const NewInvoicePage = () => {
  const [isPending, startTransition] = useTransition();
  // const [isOrganization, setIsOrganization] = useState(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfile | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const fetchBusinessProfile = async () => {
        const profile = await getBusinessProfile(false);
        if (profile) {
          setBusinessProfile(profile);
        }
      };
      fetchBusinessProfile();
    });
  }, []);

  const handleOnPreview = async (
    newInvoice: FormData,
  ): Promise<ActionResponseBase> => {
    setInvoice(newInvoice as unknown as Invoice);
    return { success: true };
  };

  return (
    <AppShell title='Nueva factura' description='Crea una nueva factura'>
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

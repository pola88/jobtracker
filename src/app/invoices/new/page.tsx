'use client';

import { useEffect, useState, useTransition } from 'react';

import { getBusinessProfile } from '@/actions/invoices-settings';
import { Card } from '@/components/card';
import InvoiceForm from '@/components/forms/invoice/invoice-form';
import Preview from '@/components/invoice/preview/preview';
import { AppShell } from '@/components/layout/app-shell';
import InvoiceFormSkeleton from '@/components/skeletons/invoice-form';
import { ActionResponseBase } from '@/lib/types';
import { BusinessProfileDTO } from '@/lib/validators/business-profile-individual';
import { InvoiceDTO } from '@/lib/validators/invoice';

const NewInvoicePage = () => {
  const [isPending, startTransition] = useTransition();
  // const [isOrganization, setIsOrganization] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceDTO | null>(null);

  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfileDTO | null>(null);

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
    newInvoice: InvoiceDTO,
  ): Promise<ActionResponseBase> => {
    setInvoice(newInvoice as unknown as InvoiceDTO);
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

'use client';

import { useEffect, useState, useTransition } from 'react';

import { BusinessProfile } from '@prisma/client';
import { z } from 'zod';

import { getBusinessProfile } from '@/actions/invoices-settings';
import { Card } from '@/components/card';
import InvoiceForm from '@/components/forms/invoice/invoice-form';
import { invoiceSchema } from '@/components/forms/invoice/types';
import Preview from '@/components/invoice/preview/preview';
import { AppShell } from '@/components/layout/app-shell';
import InvoiceFormSkeleton from '@/components/skeletons/invoice-form';

const NewInvoicePage = () => {
  const [isPending, startTransition] = useTransition();
  // const [isOrganization, setIsOrganization] = useState(false);
  const [invoice, setInvoice] = useState<z.infer<typeof invoiceSchema> | null>(
    null,
  );

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

  return (
    <AppShell title='Nueva factura' description='Crea una nueva factura'>
      <Card>
        {isPending ? (
          <InvoiceFormSkeleton />
        ) : (
          <InvoiceForm
            businessProfile={businessProfile}
            onPreview={(newInvoice) => setInvoice(newInvoice)}
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

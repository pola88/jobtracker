'use client';

import { useState } from 'react';

import { z } from 'zod';

import { Card } from '@/components/card';
import InvoiceForm from '@/components/forms/invoice/invoice-form';
import { invoiceSchema } from '@/components/forms/invoice/types';
import Preview from '@/components/invoice/preview/preview';
import { AppShell } from '@/components/layout/app-shell';

const NewInvoicePage = () => {
  const [invoice, setInvoice] = useState<z.infer<typeof invoiceSchema> | null>(
    null,
  );

  return (
    <AppShell title='Nueva factura' description='Crea una nueva factura'>
      <Card>
        <InvoiceForm onPreview={(newInvoice) => setInvoice(newInvoice)} />
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

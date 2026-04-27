'use client';

import { forwardRef } from 'react';

import type { ActionResponse } from '@/actions/invoice-line-items';
import Form, { type FormRef } from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import {
  InvoiceLineItemFormDTO,
  invoiceLineItemFormSchema,
} from '@/lib/validators/invoice-line-item';

const DEFAULT_VALUES: InvoiceLineItemFormDTO = {
  description: '',
  quantity: 1,
  rate: 1,
};

const fields: FieldType<InvoiceLineItemFormDTO>[] = [
  {
    name: 'description',
    type: 'text',
    fullWidth: false,
  },
  {
    name: 'quantity',
    type: 'number',
    fullWidth: false,
  },
  {
    name: 'rate',
    type: 'number',
  },
];

type InvoiceLineItemFormProps = {
  action: (formData: InvoiceLineItemFormDTO) => Promise<ActionResponse>;
  defaultValues?: InvoiceLineItemFormDTO;
  afterSubmit: (success: boolean) => void;
};

export const InvoiceLineItemForm = forwardRef<
  FormRef,
  InvoiceLineItemFormProps
>(({ action, defaultValues = DEFAULT_VALUES, afterSubmit }, ref) => {
  return (
    <Form<InvoiceLineItemFormDTO>
      basei18nkey='invoice-line-item.form'
      ref={ref}
      defaultValues={defaultValues}
      onSubmit={action}
      schema={invoiceLineItemFormSchema}
      fields={fields}
      afterSubmit={afterSubmit}
      btnSize='sm'
    />
  );
});

InvoiceLineItemForm.displayName = 'InvoiceLineItemForm';

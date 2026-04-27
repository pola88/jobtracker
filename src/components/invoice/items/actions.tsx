'use client';

import { cn } from '@/lib/utils';
import { InvoiceLineItemDTO } from '@/lib/validators/invoice-line-item';

import { DeleteBtn } from './delete-btn';

type InvoiceLineItemActionsProps = {
  invoiceLineItem: InvoiceLineItemDTO;
  className?: string;
};

export const InvoiceLineItemActions = ({
  invoiceLineItem,
  className,
}: InvoiceLineItemActionsProps) => {
  return (
    <div className={cn(className)} onClick={(evt) => evt.stopPropagation()}>
      <DeleteBtn invoiceLineItemId={invoiceLineItem.id} />
    </div>
  );
};

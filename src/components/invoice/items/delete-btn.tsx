import { useCallback } from 'react';

import { deleteInvoiceLineItemAction } from '@/actions/invoice-line-items';
import { DeleteButtonWithConfirm } from '@/components/button/delete-btn';
import { useInvoiceLineItemStore } from '@/stores/invoice-line-item';

interface DeleteBtnProps {
  invoiceLineItemId: string;
}

export const DeleteBtn = ({ invoiceLineItemId }: DeleteBtnProps) => {
  const touch = useInvoiceLineItemStore((state) => state.touch);

  const handleDelete = useCallback(async () => {
    await deleteInvoiceLineItemAction(invoiceLineItemId);
    touch();
  }, [invoiceLineItemId, touch]);

  return <DeleteButtonWithConfirm onConfirm={handleDelete} />;
};

'use server';

import { updateTag } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth';
import {
  GetInvoiceLineItemsProps,
  countInvoiceLineItems,
  createOne,
  deleteInvoiceLineItem,
  getInvoiceLineItems,
  getOne,
} from '@/lib/repository/invoice-line-items';
import { ActionResponseBase } from '@/lib/types';
import {
  InvoiceLineItemDTO,
  InvoiceLineItemFormDTO,
  invoiceLineItemFormSchema,
  mapInvoiceLineItemToDTO,
} from '@/lib/validators/invoice-line-item';

export type ActionResponse = ActionResponseBase & {
  invoiceLineItem?: InvoiceLineItemDTO;
};

type GetInvoiceLineItemsActionProps = Omit<GetInvoiceLineItemsProps, 'userId'>;

export const getInvoiceLineItemsAction = async (
  args: GetInvoiceLineItemsActionProps,
) => {
  const user = await requireCurrentUser();

  return getInvoiceLineItems({
    userId: user.id,
    ...args,
  });
};

export const countInvoiceLineItemsAction = async () => {
  const user = await requireCurrentUser();

  return countInvoiceLineItems(user.id);
};

export const deleteInvoiceLineItemAction = async (id: string) => {
  try {
    if (!id) {
      throw new Error('Invalid id');
    }

    const user = await requireCurrentUser();

    const invoiceLineItem = await getOne({ id, userId: user.id });

    if (!invoiceLineItem) {
      return;
    }

    await deleteInvoiceLineItem({ id, userId: user.id });

    updateTag('invoice-line-items');
    updateTag('invoice-line-items-size');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createInvoiceLineItem = async (
  formData: InvoiceLineItemFormDTO,
): Promise<ActionResponse> => {
  const parsed = invoiceLineItemFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: 'Invalid data' };
  }

  const { ...invoiceLineItemData } = parsed.data;

  const user = await requireCurrentUser();
  const invoiceLineItem = await createOne({
    ...invoiceLineItemData,
    user: {
      connect: { id: user.id },
    },
  });

  updateTag('invoice-line-items');
  updateTag('invoice-line-items-size');

  return {
    success: true,
    message: 'Created',
    invoiceLineItem: mapInvoiceLineItemToDTO(invoiceLineItem),
  };
};

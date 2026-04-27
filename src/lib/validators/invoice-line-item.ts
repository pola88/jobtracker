import { InvoiceLineItem } from '@prisma/client';
import { z } from 'zod';

export const invoiceLineItemSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  quantity: z.coerce.number().min(1),
  rate: z.coerce.number().min(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const invoiceLineItemFormSchema = invoiceLineItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InvoiceLineItemFormDTO = z.infer<typeof invoiceLineItemFormSchema>;
export type InvoiceLineItemDTO = z.infer<typeof invoiceLineItemSchema>;

export const mapInvoiceLineItemToDTO = (
  item: InvoiceLineItem,
): InvoiceLineItemDTO => ({
  ...item,
  quantity: Number(item.quantity),
  rate: Number(item.rate),
  createdAt: new Date(item.createdAt),
  updatedAt: new Date(item.updatedAt),
});

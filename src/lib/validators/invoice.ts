import { z } from 'zod';

import { invoiceLineItemSchema } from './invoice-line-item';

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1),
  invoiceDate: z
    .string()
    .min(1)
    .default(new Date().toISOString().split('T')[0]),
  dueDate: z.string().min(1),
  fromName: z.string().min(1),
  fromEmail: z.email(),
  fromAddress: z.string().min(1),
  fromCity: z.string().min(1),
  fromCountry: z.string().min(1),
  toName: z.string().min(1),
  toEmail: z.email(),
  toAddress: z.string().min(1),
  lineItems: z.array(
    invoiceLineItemSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  ),
});

export type InvoiceDTO = z.infer<typeof invoiceSchema>;

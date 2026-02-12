import { z } from 'zod';

const lineItemSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().min(1),
  rate: z.number().min(0),
});

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
  lineItems: z.array(lineItemSchema),
});

export type LineItemDTO = z.infer<typeof lineItemSchema>;
export type InvoiceDTO = z.infer<typeof invoiceSchema>;

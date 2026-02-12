import { CompensationType, InterviewStatus } from '@prisma/client';
import { z } from 'zod';

export const CURRENCIES = ['USD', 'ARS', 'EUR', 'GBP'] as const;
export const interviewBaseSchema = z.object({
  id: z.uuid(),
  company: z.string().min(2, 'La empresa es obligatoria'),
  position: z.string().optional(),
  recruiter: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  date: z.coerce.date({ error: 'La fecha es obligatoria' }),
  compensationType: z.nativeEnum(CompensationType),
  compensationLower: z.coerce
    .number()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }),
  compensationUpper: z.coerce
    .number()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }),
  currency: z.enum(CURRENCIES),
  status: z.nativeEnum(InterviewStatus, {
    error: 'El estado es obligatorio',
  }),
  link: z.url().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const interviewFormSchema = interviewBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InterviewFormDTO = z.infer<typeof interviewFormSchema>;
export type InterviewDTO = z.infer<typeof interviewBaseSchema>;

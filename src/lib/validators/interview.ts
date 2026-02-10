import { CompensationType, InterviewStatus } from '@prisma/client';
import { z } from 'zod';

export const CURRENCIES = ['USD', 'ARS', 'EUR', 'GBP'] as const;
export const interviewSchema = z.object({
  company: z.string().min(2, 'La empresa es obligatoria'),
  position: z.string().optional(),
  recruiter: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  date: z.coerce.date({ required_error: 'La fecha es obligatoria' }),
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
    required_error: 'El estado es obligatorio',
  }),
});

export type InterviewType = z.infer<typeof interviewSchema>;

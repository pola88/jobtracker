import { CompensationType, InterviewStatus } from '@prisma/client';
import { Interview } from '@prisma/client';
import { z } from 'zod';

export const CURRENCIES = ['USD', 'ARS', 'EUR', 'GBP'] as const;

export const interviewBaseSchema = z.object({
  id: z.uuid(),
  company: z.string().min(2, 'La empresa es obligatoria'),
  position: z.string().optional().nullable(),
  recruiter: z
    .string()
    .optional()
    .nullable()
    .transform((value) => value?.trim() || null),
  date: z.coerce.date({ error: 'La fecha es obligatoria' }),
  compensationType: z.enum(CompensationType),
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
  status: z.enum(InterviewStatus, {
    error: 'El estado es obligatorio',
  }),
  link: z.url().optional().nullable(),
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

const getCurrency = (currentCurrency: string | null) =>
  CURRENCIES.find((currency: string) => currency === currentCurrency) ?? 'USD';

export function mapInterviewToDTO(interview: Interview): InterviewDTO {
  return {
    ...interview,
    currency: getCurrency(interview.currency),
    compensationUpper: Number(interview.compensationUpper),
    compensationLower: Number(interview.compensationLower),
    date: new Date(interview.date),
    createdAt: new Date(interview.createdAt),
    updatedAt: new Date(interview.updatedAt),
  };
}

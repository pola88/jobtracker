import { InterviewStepStatus } from '@prisma/client';
import { z } from 'zod';

export const interviewStepSchema = z.object({
  interviewId: z.string().cuid('Entrevista inválida'),
  title: z.string().min(2, 'El título es obligatorio'),
  status: z.nativeEnum(InterviewStepStatus),
  scheduledAt: z.coerce.date(),
  notes: z
    .union([z.string(), z.literal('')])
    .optional()
    .transform((value): string | undefined => {
      if (!value) return undefined;
      const trimmed = value.trim();
      return trimmed === '' ? undefined : trimmed;
    }),
});

export type InterviewStepType = z.infer<typeof interviewStepSchema>;

export const updateStepSchema = interviewStepSchema.extend({
  stepId: z.string().cuid('Paso inválido'),
});

export const deleteStepSchema = z.object({
  stepId: z.string().cuid('Paso inválido'),
  interviewId: z.string().cuid('Entrevista inválida'),
});

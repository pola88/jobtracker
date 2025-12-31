import { z } from 'zod';

export const interviewStepSchema = z.object({
  interviewId: z.string().cuid('Entrevista inválida'),
  title: z.string().min(2, 'El título es obligatorio'),
  type: z.string().min(2, 'Define el tipo de instancia'),
  scheduledAt: z
    .string()
    .optional()
    .transform((value) => (value ? new Date(value) : undefined)),
  completedAt: z
    .string()
    .optional()
    .transform((value) => (value ? new Date(value) : undefined)),
  outcome: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export const updateStepSchema = interviewStepSchema.extend({
  stepId: z.string().cuid('Paso inválido'),
});

export const deleteStepSchema = z.object({
  stepId: z.string().cuid('Paso inválido'),
  interviewId: z.string().cuid('Entrevista inválida'),
});

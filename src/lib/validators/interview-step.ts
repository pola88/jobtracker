import { InterviewStepStatus } from '@prisma/client';
import { z } from 'zod';

export { InterviewStepStatus };

export const interviewStepBaseSchema = z.object({
  id: z.uuid(),
  interviewId: z.uuid('Interview ID is invalid'),
  title: z.string().min(2, 'Title is required'),
  status: z.enum(InterviewStepStatus, { error: 'Status is invalid' }),
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

export const interviewStepFormSchema = interviewStepBaseSchema.omit({
  id: true,
  interviewId: true,
});

export type InterviewStepDTO = z.infer<typeof interviewStepBaseSchema>;
export type InterviewStepFormDTO = z.infer<typeof interviewStepFormSchema>;

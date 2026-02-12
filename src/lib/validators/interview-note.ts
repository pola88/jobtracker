import { z } from 'zod';

export const interviewNoteBaseSchema = z.object({
  id: z.uuid('ID is invalid'),
  interviewId: z.uuid('Interview ID is invalid'),
  content: z
    .string()
    .min(3, 'Note must be at least 3 characters')
    .max(2000, 'Note is too long'),
  createdAt: z.date('Created at is invalid'),
  updatedAt: z.date('Updated at is invalid'),
});

export const interviewNoteFormSchema = interviewNoteBaseSchema.pick({
  content: true,
});

export type InterviewNoteDTO = z.infer<typeof interviewNoteBaseSchema>;
export type InterviewNoteFormDTO = z.infer<typeof interviewNoteFormSchema>;

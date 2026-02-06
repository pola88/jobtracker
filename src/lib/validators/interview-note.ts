import { z } from 'zod';

export const interviewNoteSchema = z.object({
  interviewId: z.string().cuid('Identificador inválido'),
  content: z
    .string()
    .min(3, 'La nota debe tener al menos 3 caracteres')
    .max(2000, 'La nota es demasiado extensa'),
});

export type InterviewNoteType = z.infer<typeof interviewNoteSchema>;

'use server';

import { InterviewNote } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import {
  invalidateInterviewCaches,
  touchInterview,
} from '@/actions/interviews';
import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { interviewNoteSchema } from '@/lib/validators/interview-note';

const deleteNoteSchema = z.object({
  noteId: z.string().cuid('Identificador inválido'),
  interviewId: z.string().cuid('Identificador inválido'),
});

export interface ActionResponse {
  success: boolean;
  message?: string;
  note?: InterviewNote;
}

export async function addInterviewNoteAction(
  _prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const parsed = interviewNoteSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, message: 'Nota inválida' };
    }

    const user = await requireCurrentUser();
    const interview = await prisma.interview.findFirst({
      where: {
        id: parsed.data.interviewId,
        userId: user.id,
      },
    });

    if (!interview) {
      return { success: false, message: 'Entrevista no encontrada' };
    }

    const note = await prisma.$transaction(async (tx) => {
      const newNote = await tx.interviewNote.create({
        data: {
          interviewId: interview.id,
          content: parsed.data.content,
        },
      });

      await touchInterview(interview.id, tx);

      return newNote;
    });

    invalidateInterviewCaches();
    revalidateTag(`interviews-notes-${parsed.data.interviewId}`);
    await new Promise((res) => setTimeout(res, 10000));

    return { success: true, message: 'Nota agregada', note };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo guardar la nota' };
  }
}

export async function deleteInterviewNoteAction(
  formData: FormData,
): Promise<void> {
  try {
    const parsed = deleteNoteSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parsed.success) {
      throw new Error('Datos inválidos');
    }

    const user = await requireCurrentUser();
    const note = await prisma.interviewNote.findFirst({
      where: {
        id: parsed.data.noteId,
        interview: {
          id: parsed.data.interviewId,
          userId: user.id,
        },
      },
    });

    if (!note) {
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.interviewNote.delete({
        where: { id: parsed.data.noteId },
      });
      await touchInterview(note.interviewId, tx);
    });

    invalidateInterviewCaches();
    revalidateTag(`interviews-notes-${parsed.data.interviewId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

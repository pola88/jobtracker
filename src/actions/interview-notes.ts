'use server';

import { InterviewNote } from '@prisma/client';
import { updateTag } from 'next/cache';

import {
  invalidateInterviewCaches,
  touchInterview,
} from '@/actions/interviews';
import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActionResponseBase } from '@/lib/types';
import { interviewNoteSchema } from '@/lib/validators/interview-note';

type DeleteInterviewNoteAttrs = {
  noteId: string;
  interviewId: string;
};

export type ActionResponse = ActionResponseBase & {
  note?: InterviewNote;
};

export async function addInterviewNoteAction(
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
    updateTag(`interviews-notes-${parsed.data.interviewId}`);

    return { success: true, message: 'Nota agregada', note };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo guardar la nota' };
  }
}

export async function updateInterviewNote(
  noteId: string,
  formData: FormData,
): Promise<ActionResponse> {
  const parsed = interviewNoteSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: 'Invalid note' };
  }

  const user = await requireCurrentUser();
  const interview = await prisma.interview.findFirst({
    where: {
      id: parsed.data.interviewId,
      userId: user.id,
    },
  });

  if (!interview) {
    return { success: false, message: 'Invalid note' };
  }

  const note = await prisma.interviewNote.update({
    where: {
      id: noteId,
      interview: {
        id: interview.id,
      },
    },
    data: {
      content: parsed.data.content,
    },
  });

  if (!note) {
    return { success: false, message: 'Invalid note' };
  }

  return { success: true, note };
}

export async function deleteInterviewNoteAction({
  noteId,
  interviewId,
}: DeleteInterviewNoteAttrs): Promise<void> {
  try {
    const user = await requireCurrentUser();
    const note = await prisma.interviewNote.findFirst({
      where: {
        id: noteId,
        interview: {
          id: interviewId,
          userId: user.id,
        },
      },
    });

    if (!note) {
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.interviewNote.delete({
        where: { id: noteId },
      });
      await touchInterview(note.interviewId, tx);
    });

    invalidateInterviewCaches();
    updateTag(`interviews-notes-${interviewId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

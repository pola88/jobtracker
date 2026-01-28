'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';

import { touchInterview } from '@/actions/interviews';
import type { ActionResponse } from '@/actions/interviews';
import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const noteSchema = z.object({
  interviewId: z.string().cuid('Identificador inválido'),
  content: z
    .string()
    .min(3, 'La nota debe tener al menos 3 caracteres')
    .max(2000, 'La nota es demasiado extensa'),
});

const deleteNoteSchema = z.object({
  noteId: z.string().cuid('Identificador inválido'),
  interviewId: z.string().cuid('Identificador inválido'),
});

const initialState: ActionResponse = {
  success: false,
};

export async function addInterviewNoteAction(
  _prevState: ActionResponse = initialState,
  formData: FormData,
): Promise<ActionResponse> {
  void _prevState;
  try {
    const parsed = noteSchema.safeParse(Object.fromEntries(formData.entries()));
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

    await prisma.$transaction([
      prisma.interviewNote.create({
        data: {
          interviewId: interview.id,
          content: parsed.data.content,
        },
      }),
      touchInterview(interview.id),
    ]);

    revalidatePath(`/interviews/${interview.id}/edit`);
    revalidateTag('interviews');
    return { success: true, message: 'Nota agregada' };
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

    await prisma.$transaction([
      prisma.interviewNote.delete({
        where: { id: parsed.data.noteId },
      }),
      touchInterview(note.interviewId),
    ]);

    revalidatePath(`/interviews/${parsed.data.interviewId}/edit`);
    revalidateTag('interviews');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

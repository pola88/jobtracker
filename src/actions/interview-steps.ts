'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

import { touchInterview } from '@/actions/interviews';
import type { ActionResponse } from '@/actions/interviews';
import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  deleteStepSchema,
  interviewStepSchema,
  updateStepSchema,
} from '@/lib/validators/interview-step';

const initialState: ActionResponse = {
  success: false,
};

function refreshEditPage(interviewId: string) {
  revalidatePath(`/interviews/${interviewId}/edit`);
  revalidatePath('/dashboard');
}

export async function createInterviewStepAction(
  _prevState: ActionResponse = initialState,
  formData: FormData,
): Promise<ActionResponse> {
  void _prevState;
  try {
    const parsed = interviewStepSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parsed.success) {
      return { success: false, message: 'Paso inválido' };
    }

    const user = await requireCurrentUser();
    const interview = await prisma.interview.findFirst({
      where: { id: parsed.data.interviewId, userId: user.id },
    });

    if (!interview) {
      return { success: false, message: 'Entrevista no encontrada' };
    }

    await prisma.$transaction([
      prisma.interviewStep.create({
        data: {
          interviewId: interview.id,
          title: parsed.data.title,
          type: parsed.data.type,
          scheduledAt: parsed.data.scheduledAt,
          completedAt: parsed.data.completedAt,
          outcome: parsed.data.outcome,
          notes: parsed.data.notes,
        },
      }),
      touchInterview(interview.id),
    ]);

    refreshEditPage(interview.id);
    revalidateTag('interviews');
    return { success: true, message: 'Paso agregado' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo guardar el paso' };
  }
}

export async function updateInterviewStepAction(
  _prevState: ActionResponse = initialState,
  formData: FormData,
): Promise<ActionResponse> {
  void _prevState;
  try {
    const parsed = updateStepSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parsed.success) {
      return { success: false, message: 'Paso inválido' };
    }

    const user = await requireCurrentUser();
    const step = await prisma.interviewStep.findFirst({
      where: {
        id: parsed.data.stepId,
        interview: { id: parsed.data.interviewId, userId: user.id },
      },
      select: { id: true, interviewId: true },
    });

    if (!step) {
      return { success: false, message: 'Paso no encontrado' };
    }

    await prisma.interviewStep.update({
      where: { id: step.id },
      data: {
        title: parsed.data.title,
        type: parsed.data.type,
        scheduledAt: parsed.data.scheduledAt,
        completedAt: parsed.data.completedAt,
        outcome: parsed.data.outcome,
        notes: parsed.data.notes,
      },
    });

    refreshEditPage(step.interviewId);
    return { success: true, message: 'Paso actualizado' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo actualizar el paso' };
  }
}

export async function deleteInterviewStepAction(formData: FormData) {
  try {
    const parsed = deleteStepSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!parsed.success) {
      throw new Error('Paso inválido');
    }

    const user = await requireCurrentUser();
    const step = await prisma.interviewStep.findFirst({
      where: {
        id: parsed.data.stepId,
        interview: { id: parsed.data.interviewId, userId: user.id },
      },
    });

    if (!step) {
      return;
    }

    await prisma.$transaction([
      prisma.interviewStep.delete({
        where: { id: parsed.data.stepId },
      }),
      touchInterview(step.interviewId),
    ]);

    refreshEditPage(parsed.data.interviewId);
    revalidateTag('interviews');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

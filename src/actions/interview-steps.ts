'use server';

import { InterviewStep } from '@prisma/client';
import { revalidateTag } from 'next/cache';

import {
  invalidateInterviewCaches,
  touchInterview,
} from '@/actions/interviews';
import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActionResponseBase } from '@/lib/types';
import {
  deleteStepSchema,
  interviewStepSchema,
  updateStepSchema,
} from '@/lib/validators/interview-step';

type DeleteInterviewStepAttrs = {
  stepId: string;
  interviewId: string;
};

export type ActionResponse = ActionResponseBase & {
  step?: InterviewStep;
};

export async function addInterviewStepAction(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const parsed = interviewStepSchema.safeParse(formData);
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

    await prisma.$transaction(async (tx) => {
      await tx.interviewStep.create({
        data: {
          interviewId: interview.id,
          title: parsed.data.title,
          scheduledAt: parsed.data.scheduledAt,
          status: parsed.data.status,
          notes: parsed.data.notes,
        },
      });
      await touchInterview(interview.id, tx);
    });

    invalidateInterviewCaches();
    revalidateTag(`interviews-steps-${parsed.data.interviewId}`);
    return { success: true, message: 'Paso agregado' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo guardar el paso' };
  }
}

export async function updateInterviewStepAction(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const parsed = updateStepSchema.safeParse(formData);
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
        scheduledAt: parsed.data.scheduledAt,
        status: parsed.data.status,
        notes: parsed.data.notes,
      },
    });

    revalidateTag(`interviews-steps-${step.id}`);
    return { success: true, message: 'Paso actualizado' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo actualizar el paso' };
  }
}

export async function deleteInterviewStepAction({
  stepId,
  interviewId,
}: DeleteInterviewStepAttrs) {
  try {
    const user = await requireCurrentUser();
    const step = await prisma.interviewStep.findFirst({
      where: {
        id: stepId,
        interview: { id: interviewId, userId: user.id },
      },
    });

    if (!step) {
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.interviewStep.delete({
        where: { id: stepId },
      });
      await touchInterview(step.interviewId, tx);
    });

    revalidateTag(`interviews-steps-${step.interviewId}`);
    invalidateInterviewCaches();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

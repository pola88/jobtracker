'use server';

import { updateTag } from 'next/cache';

import {
  invalidateInterviewCaches,
  touchInterview,
} from '@/actions/interviews';
import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActionResponseBase } from '@/lib/types';
import {
  InterviewStepDTO,
  InterviewStepFormDTO,
  interviewStepFormSchema,
} from '@/lib/validators/interview-step';

type DeleteInterviewStepAttrs = {
  stepId: string;
  interviewId: string;
};

export type ActionResponse = ActionResponseBase & {
  step?: InterviewStepDTO;
};

export async function addInterviewStepAction(
  interviewId: string,
  formData: InterviewStepFormDTO,
): Promise<ActionResponse> {
  try {
    const parsed = interviewStepFormSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, message: 'Paso inválido' };
    }

    const user = await requireCurrentUser();
    const interview = await prisma.interview.findFirst({
      where: { id: interviewId, userId: user.id },
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
    updateTag(`interviews-steps-${interviewId}`);
    return { success: true, message: 'Paso agregado' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo guardar el paso' };
  }
}

export async function updateInterviewStepAction(
  interviewId: string,
  stepId: string,
  formData: InterviewStepFormDTO,
): Promise<ActionResponse> {
  try {
    const parsed = interviewStepFormSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, message: 'Paso inválido' };
    }

    const user = await requireCurrentUser();
    const step = await prisma.interviewStep.findFirst({
      where: {
        id: stepId,
        interview: { id: interviewId, userId: user.id },
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

    updateTag(`interviews-steps-${step.id}`);
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

    updateTag(`interviews-steps-${step.interviewId}`);
    invalidateInterviewCaches();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

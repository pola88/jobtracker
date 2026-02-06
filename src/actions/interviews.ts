'use server';

import { InterviewStatus, Prisma } from '@prisma/client';
import { revalidateTag } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActionResponseBase } from '@/lib/types';
import { interviewSchema } from '@/lib/validators/interview';

export type ActionResponse = ActionResponseBase & {
  interviewId?: string;
};

export const invalidateInterviewCaches = async (id?: string) => {
  revalidateTag('interviews');
  if (id) {
    revalidateTag(`interview:${id}`);
  }
};

export const touchInterview = (
  interviewId: string,
  tx: Prisma.TransactionClient = prisma,
) =>
  tx.interview.update({
    where: {
      id: interviewId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

export async function createInterviewAction(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const parsed = interviewSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, message: 'Datos inválidos' };
    }

    const { ...interviewData } = parsed.data;

    const user = await requireCurrentUser();
    const interview = await prisma.interview.create({
      data: {
        ...interviewData,
        compensationLower:
          interviewData.compensationLower !== undefined
            ? new Prisma.Decimal(interviewData.compensationLower)
            : undefined,
        compensationUpper:
          interviewData.compensationUpper !== undefined
            ? new Prisma.Decimal(interviewData.compensationUpper)
            : undefined,
        userId: user.id,
      },
    });

    invalidateInterviewCaches();
    revalidateTag('interviews-size');

    return {
      success: true,
      message: 'Entrevista creada',
      interviewId: interview.id,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo crear la entrevista' };
  }
}

export async function updateInterviewAction(
  interviewId: string,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const parsed = interviewSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, message: 'Datos inválidos' };
    }

    const { ...interviewData } = parsed.data;

    const user = await requireCurrentUser();

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });
    if (!interview || interview.userId !== user.id) {
      return { success: false, message: 'Entrevista no encontrada' };
    }

    await prisma.interview.update({
      where: { id: interviewId },
      data: {
        ...interviewData,
        compensationLower:
          interviewData.compensationLower !== undefined
            ? new Prisma.Decimal(interviewData.compensationLower)
            : null,
        compensationUpper:
          interviewData.compensationUpper !== undefined
            ? new Prisma.Decimal(interviewData.compensationUpper)
            : null,
      },
    });

    invalidateInterviewCaches(interviewId);
    return {
      success: true,
      message: 'Entrevista actualizada',
      interviewId: interviewId,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'No se pudo actualizar la entrevista' };
  }
}

export async function deleteInterviewAction(
  interviewId: string,
): Promise<void> {
  try {
    if (!interviewId || typeof interviewId !== 'string') {
      throw new Error('Identificador inválido');
    }

    const user = await requireCurrentUser();

    const existingInterview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!existingInterview || existingInterview.userId !== user.id) {
      return;
    }

    await prisma.interview.delete({
      where: { id: interviewId },
    });

    invalidateInterviewCaches();
    revalidateTag('interviews-size');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateInterviewStatus(
  interviewId: string,
  newStatus: InterviewStatus,
): Promise<void> {
  try {
    if (!interviewId || typeof interviewId !== 'string') {
      throw new Error('Identificador inválido');
    }

    const user = await requireCurrentUser();

    const existingInterview = await prisma.interview.findUnique({
      where: { id: interviewId, userId: user.id },
    });

    if (!existingInterview) {
      return;
    }

    await prisma.interview.update({
      where: { id: interviewId },
      data: {
        status: newStatus,
      },
    });

    invalidateInterviewCaches(interviewId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

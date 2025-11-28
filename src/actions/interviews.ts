"use server";

import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

import { prisma } from "@/lib/prisma";
import { interviewSchema } from "@/lib/validators/interview";
import { requireCurrentUser } from "@/lib/auth";

export type ActionResponse = {
  success: boolean;
  message?: string;
};

function invalidateInterviewCaches() {
  revalidateTag("interviews");
  revalidateTag("dashboard");
}

export async function createInterviewAction(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const parsed = interviewSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!parsed.success) {
      return { success: false, message: "Datos inválidos" };
    }

    const user = await requireCurrentUser();
    await prisma.interview.create({
      data: {
        ...parsed.data,
        salary:
          parsed.data.salary !== undefined
            ? new Prisma.Decimal(parsed.data.salary)
            : undefined,
        userId: user.id,
      },
    });

    invalidateInterviewCaches();
    return { success: true, message: "Entrevista creada" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "No se pudo crear la entrevista" };
  }
}

export async function updateInterviewAction(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const interviewId = formData.get("id");
    if (!interviewId || typeof interviewId !== "string") {
      return { success: false, message: "Identificador inválido" };
    }

    const parsed = interviewSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!parsed.success) {
      return { success: false, message: "Datos inválidos" };
    }

    const user = await requireCurrentUser();

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });
    if (!interview || interview.userId !== user.id) {
      return { success: false, message: "Entrevista no encontrada" };
    }

    await prisma.interview.update({
      where: { id: interviewId },
      data: {
        ...parsed.data,
        salary:
          parsed.data.salary !== undefined
            ? new Prisma.Decimal(parsed.data.salary)
            : null,
      },
    });

    invalidateInterviewCaches();
    return { success: true, message: "Entrevista actualizada" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "No se pudo actualizar la entrevista" };
  }
}

export async function deleteInterviewAction(interviewId: string) {
  try {
    const user = await requireCurrentUser();

    const existingInterview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!existingInterview || existingInterview.userId !== user.id) {
      return { success: false, message: "Entrevista no encontrada" };
    }

    await prisma.interview.delete({
      where: { id: interviewId },
    });

    invalidateInterviewCaches();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "No se pudo eliminar la entrevista" };
  }
}


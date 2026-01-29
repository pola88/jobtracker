import { InterviewStatus } from '@prisma/client';
import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const getInterviews = unstable_cache(
  async (userId: string, onlyActive: boolean = false) => {
    const rows = await prisma.interview.findMany({
      where: {
        userId,
        ...(onlyActive ? { status: InterviewStatus.active } : {}),
      },
      orderBy: { date: 'desc' },
    });

    return rows.map((row) => ({
      ...row,
      date: new Date(row.date),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    }));
  },
  ['interviews-list'],
  {
    revalidate: false,
    tags: ['interviews'],
  },
);

export async function getInterviewById(id: string, userId: string) {
  return prisma.interview.findFirst({
    where: { id, userId },
  });
}

export async function getInterviewStepsAndNotes(interviewId: string) {
  return Promise.all([
    prisma.interviewStep.findMany({
      where: { interviewId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.interviewNote.findMany({
      where: { interviewId },
      orderBy: { createdAt: 'desc' },
    }),
  ]);
}

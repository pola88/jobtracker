import { InterviewStatus } from '@prisma/client';
import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const getLatestInterviews = unstable_cache(
  async (userId: string) => {
    return prisma.interview.findMany({
      where: { userId, status: InterviewStatus.active },
      orderBy: { date: 'desc' },
      take: 5,
    });
  },
  ['latest-interviews'],
  {
    revalidate: 60,
    tags: ['latest-interviews'],
  },
);

export const getInterviews = unstable_cache(
  async (userId: string, onlyActive: boolean = false) => {
    return prisma.interview.findMany({
      where: {
        userId,
        ...(onlyActive ? { status: InterviewStatus.active } : {}),
      },
      orderBy: { date: 'desc' },
    });
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

export const getApplications = unstable_cache(
  async (userId: string) => {
    return prisma.interview.findMany({
      where: { userId, status: InterviewStatus.applied },
      orderBy: { date: 'desc' },
      take: 5,
    });
  },
  [],
  {
    revalidate: false,
    tags: ['applications'],
  },
);

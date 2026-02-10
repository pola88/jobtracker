'use server';

import { InterviewStatus } from '@prisma/client';
import { unstable_cache } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface GetInterviewsProps {
  userId: string;
  cursor?: string | null;
  pageSize?: number;
}

type GetMetricResult = Record<InterviewStatus, number> & {
  total: number;
};

export const getInterviews = async ({
  userId,
  cursor,
  pageSize = 10,
}: GetInterviewsProps) =>
  unstable_cache(
    async () => {
      const take = Math.min(pageSize ?? 10, 100);
      const rows = await prisma.interview.findMany({
        where: {
          userId,
        },
        orderBy: { updatedAt: 'desc' },
        take: take + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
      });

      const hasMore = rows.length > take;
      const sliced = hasMore ? rows.slice(0, take) : rows;
      const nextCursor = hasMore ? sliced[sliced.length - 1]?.id : undefined;

      return {
        interviews: sliced.map((row) => ({
          ...row,
          date: new Date(row.date),
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt),
        })),
        nextCursor,
      };
    },
    [
      'interviews-list',
      userId,
      cursor?.toString() || 'empty',
      pageSize.toString(),
    ],
    {
      revalidate: false,
      tags: ['interviews'],
    },
  )();

export const countInterview = async (userId: string) =>
  unstable_cache(
    async () => {
      return prisma.interview.count({
        where: { userId },
      });
    },
    ['interviews-count', userId],
    {
      revalidate: false,
      tags: ['interviews-size'],
    },
  )();

export const getInterviewById = async (id: string) => {
  const user = await requireCurrentUser();
  return unstable_cache(
    async () => {
      return prisma.interview.findFirst({
        where: { id, userId: user.id },
      });
    },
    ['getInterview', id, user.id],
    {
      tags: [`interview:${id}`],
    },
  )();
};

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

export const getInterviewSteps = async (interviewId: string) =>
  unstable_cache(
    async () => {
      return prisma.interviewStep.findMany({
        where: { interviewId },
        orderBy: { createdAt: 'desc' },
      });
    },
    ['interviews-count', interviewId],
    {
      revalidate: false,
      tags: [`interviews-steps-${interviewId}`],
    },
  )();

export const getInterviewNotes = async (interviewId: string) =>
  unstable_cache(
    async () => {
      return prisma.interviewNote.findMany({
        where: { interviewId },
        orderBy: { createdAt: 'desc' },
      });
    },
    ['interviews-count', interviewId],
    {
      revalidate: false,
      tags: [`interviews-notes-${interviewId}`],
    },
  )();

export const getMetric = async (userId: string) =>
  unstable_cache(
    async (): Promise<GetMetricResult> => {
      const [grouped, total] = await Promise.all([
        prisma.interview.groupBy({
          by: ['status'],
          _count: { status: true },
          where: { userId },
        }),
        prisma.interview.count({
          where: { userId },
        }),
      ]);

      const statsMap: Record<InterviewStatus, number> = Object.values(
        InterviewStatus,
      ).reduce(
        (acc, status) => {
          acc[status] = 0;
          return acc;
        },
        {} as Record<InterviewStatus, number>,
      );
      grouped.forEach((item) => {
        statsMap[item.status as InterviewStatus] = item._count.status || 0;
      });

      return {
        ...statsMap,
        total,
      };
    },
    ['metric', userId],
    {
      tags: ['interviews', 'interviews-size'],
    },
  )();

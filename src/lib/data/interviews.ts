'use server';

import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma';

interface GetInterviewsProps {
  userId: string;
  cursor?: string | null;
  pageSize?: number;
}

export const getInterviews = ({
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
        orderBy: { date: 'desc' },
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

export const countInterview = (userId: string) =>
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

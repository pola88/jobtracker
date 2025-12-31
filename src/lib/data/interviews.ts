import { ExperienceRating, Interview, InterviewStatus } from '@prisma/client';
import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const getDashboardData = unstable_cache(
  async (userId: string) => {
    const [statusBuckets, recentSteps, sentiment] = await Promise.all([
      prisma.interview.groupBy({
        by: ['status'],
        where: { userId },
        _count: { _all: true },
      }),
      prisma.interviewStep.findMany({
        where: {
          interview: { userId },
        },
        orderBy: [
          { completedAt: 'desc' },
          { scheduledAt: 'desc' },
          { createdAt: 'desc' },
        ],
        take: 6,
        include: {
          interview: {
            select: {
              id: true,
              company: true,
              position: true,
            },
          },
        },
      }),
      prisma.interview.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 10,
        select: {
          experienceRating: true,
        },
      }),
    ]);

    const total = statusBuckets.reduce(
      (acc, row) => acc + (row._count?._all ?? 0),
      0,
    );
    const byStatus = Object.values(InterviewStatus).map((status) => ({
      status,
      count:
        statusBuckets.find((row) => row.status === status)?._count?._all ?? 0,
    }));

    const totalSentiments = sentiment.length || 1;
    const positiveSentiments =
      sentiment.filter(
        (item) =>
          item.experienceRating === ExperienceRating.positive ||
          item.experienceRating === ExperienceRating.very_positive,
      ).length || 0;

    return {
      total,
      byStatus,
      recentSteps,
      recentSentiment: {
        positive: Math.round((positiveSentiments / totalSentiments) * 100),
      },
    };
  },
  ['dashboard-data'],
  {
    revalidate: false,
    tags: ['dashboard'],
  },
);

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

export const getMostRecentInterviews = unstable_cache(
  async (userId: string) => {
    const [interviewSteps, interviewsNotes] = await Promise.all([
      prisma.interviewStep.findMany({
        where: { interview: { userId } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          interview: true,
        },
      }),
      prisma.interviewNote.findMany({
        where: { interview: { userId } },
        orderBy: { createdAt: 'desc' },
        include: {
          interview: true,
        },
        take: 5,
      }),
    ]);
    const mostRecentInterviews = [...interviewSteps, ...interviewsNotes];
    const interviews = new Map<string, Interview>();
    mostRecentInterviews
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .forEach((item) => {
        if (item.interview) {
          interviews.set(item.interview.id, {
            ...item.interview,
            createdAt: item.createdAt,
          });
        }
      });

    return Array.from(interviews.values()).slice(0, 5);
  },
  ['most-recent-interviews'],
  {
    revalidate: 60,
    tags: ['most-recent-interviews'],
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

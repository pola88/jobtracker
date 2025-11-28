import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";

export const INTERVIEW_STATUSES = [
  "applied",
  "screening",
  "tech",
  "offer",
  "rejected",
] as const;

export const getDashboardData = unstable_cache(
  async (userId: string) => {
    const [interviews, statusBuckets, recentSteps, sentiment] = await Promise.all([
      prisma.interview.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        take: 5,
      }),
      prisma.interview.groupBy({
        by: ["status"],
        where: { userId },
        _count: { _all: true },
      }),
      prisma.interviewStep.findMany({
        where: {
          interview: { userId },
        },
        orderBy: [
          { completedAt: "desc" },
          { scheduledAt: "desc" },
          { createdAt: "desc" },
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
        orderBy: { updatedAt: "desc" },
        take: 10,
        select: {
          experienceRating: true,
        },
      }),
    ]);

    const total = statusBuckets.reduce(
      (acc, row) => acc + (row._count?._all ?? 0),
      0
    );
    const byStatus = INTERVIEW_STATUSES.map((status) => ({
      status,
      count:
        statusBuckets.find((row) => row.status === status)?._count?._all ?? 0,
    }));

    const totalSentiments = sentiment.length || 1;
    const positiveSentiments =
      sentiment.filter((item) =>
        ["positive", "very_positive"].includes(item.experienceRating)
      ).length || 0;

    return {
      total,
      byStatus,
      latest: interviews,
      recentSteps,
      recentSentiment: {
        positive: Math.round((positiveSentiments / totalSentiments) * 100),
      },
    };
  },
  ["dashboard-data"],
  {
    revalidate: false,
    tags: ["dashboard"],
  }
);

export const getInterviews = unstable_cache(
  async (userId: string) => {
    return prisma.interview.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  },
  ["interviews-list"],
  {
    revalidate: false,
    tags: ["interviews"],
  }
);

export async function getInterviewById(id: string, userId: string) {
  return prisma.interview.findFirst({
    where: { id, userId },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
      },
      steps: {
        orderBy: [
          { completedAt: "desc" },
          { scheduledAt: "desc" },
          { createdAt: "desc" },
        ],
      },
    },
  });
}


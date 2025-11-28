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
    const [interviews, statusBuckets] = await Promise.all([
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

    return {
      total,
      byStatus,
      latest: interviews,
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
    },
  });
}


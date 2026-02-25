'use server';

import { unstable_cache } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  BusinessProfileDTO,
  mapBusinessProfileToDTO,
} from '@/lib/validators/business-profile';

interface GetClientsProps {
  cursor?: string | null;
  pageSize?: number;
  sortBy?: { [id: string]: string };
}

interface GetClientsResult {
  clients: BusinessProfileDTO[];
  nextCursor?: string;
}

export const countClients = async (): Promise<number> => {
  const user = await requireCurrentUser();
  return unstable_cache(
    async () => {
      return prisma.businessProfile.count({
        where: { userId: user.id, isClient: true },
      });
    },
    ['client-size', user.id],
    {
      tags: ['client-size'],
    },
  )();
};

export const getClients = async ({
  cursor,
  pageSize = 10,
  sortBy,
}: GetClientsProps): Promise<GetClientsResult> => {
  const user = await requireCurrentUser();
  return unstable_cache(
    async () => {
      const take = Math.min(pageSize ?? 10, 100);
      const clients = await prisma.businessProfile.findMany({
        where: { userId: user.id, isClient: true },
        orderBy: sortBy ? sortBy : { updatedAt: 'desc' },
        take: take + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
      });
      const hasMore = clients.length > take;
      const sliced = hasMore ? clients.slice(0, take) : clients;
      const nextCursor = hasMore ? sliced[sliced.length - 1]?.id : undefined;

      return {
        clients: clients.map(mapBusinessProfileToDTO),
        nextCursor,
      };
    },
    [
      'clients',
      user.id,
      cursor?.toString() || 'empty',
      pageSize.toString(),
      JSON.stringify(sortBy),
    ],
    {
      tags: ['business-profile-clients'],
    },
  )();
};

export const getBusinessProfile = async (
  id: string,
): Promise<BusinessProfileDTO | null> => {
  const user = await requireCurrentUser();
  return unstable_cache(
    async () => {
      const businessProfile = await prisma.businessProfile.findFirst({
        where: { userId: user.id, id },
      });

      return businessProfile ? mapBusinessProfileToDTO(businessProfile) : null;
    },
    [`business-profile-${id}`, user.id],
    {
      tags: [`business-profile-${id}`],
    },
  )();
};

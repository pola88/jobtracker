'use server';

import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma';
import {
  InvoiceLineItemDTO,
  mapInvoiceLineItemToDTO,
} from '@/lib/validators/invoice-line-item';

export interface GetInvoiceLineItemsProps {
  userId: string;
  cursor?: string | null;
  pageSize?: number;
  sortBy?: { [id: string]: string };
}

interface GetInvoiceLineItemsResult {
  invoiceLineItems: InvoiceLineItemDTO[];
  nextCursor?: string;
}

interface IdAndUserIdProps {
  id: string;
  userId: string;
}

export const getOne = async ({ id, userId }: IdAndUserIdProps) =>
  prisma.invoiceLineItem.findUnique({
    where: { id, userId },
  });

export const deleteInvoiceLineItem = async ({ id, userId }: IdAndUserIdProps) =>
  prisma.invoiceLineItem.delete({
    where: { id, userId },
  });

export const getInvoiceLineItems = async ({
  userId,
  cursor,
  pageSize = 10,
  sortBy,
}: GetInvoiceLineItemsProps) =>
  unstable_cache(
    async (): Promise<GetInvoiceLineItemsResult> => {
      const take = Math.min(pageSize ?? 10, 100);
      const rows = await prisma.invoiceLineItem.findMany({
        where: {
          userId,
        },
        orderBy: sortBy ? sortBy : { updatedAt: 'desc' },
        take: take + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
      });

      const hasMore = rows.length > take;
      const sliced = hasMore ? rows.slice(0, take) : rows;
      const nextCursor = hasMore ? sliced[sliced.length - 1]?.id : undefined;

      return {
        invoiceLineItems: sliced.map(mapInvoiceLineItemToDTO),
        nextCursor,
      };
    },
    [
      'invoice-line-items-list',
      userId,
      cursor?.toString() || 'empty',
      pageSize.toString(),
      JSON.stringify(sortBy),
    ],
    {
      revalidate: false,
      tags: ['invoice-line-items'],
    },
  )();

export const countInvoiceLineItems = async (userId: string) =>
  unstable_cache(
    async () => {
      return prisma.interview.count({
        where: { userId },
      });
    },
    ['invoice-line-items', userId],
    {
      revalidate: false,
      tags: ['invoice-line-items-size'],
    },
  )();

export const createOne = async (args: Prisma.InvoiceLineItemCreateInput) =>
  prisma.invoiceLineItem.create({
    data: {
      ...args,
    },
  });

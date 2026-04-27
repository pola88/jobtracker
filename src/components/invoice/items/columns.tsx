'use client';

import { ColumnDef } from '@tanstack/react-table';

import { styles } from '@/components/data-table/styles';
import { formatDate } from '@/lib/helpers/date';
import { type TFunction } from '@/lib/types';
import { InvoiceLineItemDTO } from '@/lib/validators/invoice-line-item';

import { SortHeader } from '../../data-table/sort-header';
import { InvoiceLineItemActions } from './actions';

export const getColumns = (
  t: TFunction,
  tTable?: TFunction,
): ColumnDef<InvoiceLineItemDTO>[] => [
  {
    accessorKey: 'description',
    header: t('description'),
  },
  {
    accessorKey: 'quantity',
    header: t('quantity'),
  },
  {
    accessorKey: 'rate',
    header: t('rate'),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <SortHeader column={column} text={t('updatedAt')} />
    ),
    cell: ({ row }) => {
      return <span>{formatDate(row.original.updatedAt)}</span>;
    },
  },
  {
    accessorKey: '',
    header: tTable?.('actions'),
    cell: ({ row }) => {
      return (
        <InvoiceLineItemActions
          className={styles.actions}
          invoiceLineItem={row.original}
        />
      );
    },
  },
];

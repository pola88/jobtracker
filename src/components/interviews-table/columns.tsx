'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Interview } from '@prisma/client';

import { styles } from '@/components/data-table/styles';
import { daysFromNow, formatDate } from '@/lib/helpers/date';

import { InterviewActions } from './actions';
import { Status } from './status';

export const columns: ColumnDef<Interview>[] = [
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'position',
    header: 'Role',
    cell: ({ row }) => row.original.position || '-',
  },
  {
    accessorKey: 'date',
    header: 'Application Date',
    cell: ({ row }) => {
      return <span>{formatDate(row.original.date)}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <Status
          key={row.original.id}
          interviewId={row.original.id}
          status={row.original.status}
        />
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated at',
    cell: ({ row }) => {
      return <span>{daysFromNow(row.original.updatedAt)}</span>;
    },
  },
  {
    accessorKey: '',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <InterviewActions className={styles.actions} interview={row.original} />
      );
    },
  },
];

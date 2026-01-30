'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Interview } from '@prisma/client';

import { styles } from '@/components/data-table/styles';
import { parseDate } from '@/lib/helpers/date';

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
  },
  {
    accessorKey: 'date',
    header: 'Application Date',
    cell: ({ row }) => {
      return <span>{parseDate(row.original.date)}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <Status interview={row.original} />;
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

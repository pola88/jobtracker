'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import { styles } from '@/components/data-table/styles';
import { InterviewStatus } from '@/components/interview-status';
import { daysFromNow, formatDate } from '@/lib/helpers/date';
import { InterviewDTO } from '@/lib/validators/interview';

import { InterviewActions } from './actions';

export const columns: ColumnDef<InterviewDTO>[] = [
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
        <InterviewStatus
          key={row.original.id}
          interviewId={row.original.id}
          status={row.original.status}
        />
      );
    },
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      return row.original.link ? (
        <a
          target='_blank'
          href={row.original.link}
          rel='noopener noreferrer'
          onClick={(evt) => evt.stopPropagation()}
          className='flex gap-2 items-center'
        >
          Link <ExternalLink className='h-4 w-4' />
        </a>
      ) : (
        '-'
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

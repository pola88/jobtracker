'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Building2, ExternalLink } from 'lucide-react';

import { styles } from '@/components/data-table/styles';
import { InterviewStatus } from '@/components/interview-status';
import { daysFromNow, formatDate } from '@/lib/helpers/date';
import { type TFunction } from '@/lib/types';
import { InterviewDTO } from '@/lib/validators/interview';

import { SortHeader } from '../data-table/sort-header';
import { InterviewActions } from './actions';

export const getColumns = (
  t: TFunction,
  tTable?: TFunction,
): ColumnDef<InterviewDTO>[] => [
  {
    accessorKey: 'company',
    header: ({ column }) => <SortHeader column={column} text={t('company')} />,
    cell: ({ row }) => (
      <span className='flex gap-2 items-center'>
        <Building2 className='h-6 w-6' /> {row.original.company}
      </span>
    ),
  },
  {
    accessorKey: 'position',
    header: t('position'),
    cell: ({ row }) => row.original.position || '-',
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <SortHeader column={column} text={t('date')} />,
    cell: ({ row }) => {
      return <span>{formatDate(row.original.date)}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortHeader column={column} text={t('status')} />,
    enableSorting: true,
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
    header: t('link'),
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
    header: ({ column }) => (
      <SortHeader column={column} text={t('updatedAt')} />
    ),
    cell: ({ row }) => {
      return <span>{daysFromNow(row.original.updatedAt)}</span>;
    },
  },
  {
    accessorKey: '',
    header: tTable?.('actions'),
    cell: ({ row }) => {
      return (
        <InterviewActions className={styles.actions} interview={row.original} />
      );
    },
  },
];

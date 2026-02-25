'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Building2, UserRound } from 'lucide-react';

import { SortHeader } from '@/components/data-table/sort-header';
import { formatDate } from '@/lib/helpers/date';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';

// import { InterviewActions } from './actions';

export const columns: ColumnDef<BusinessProfileDTO>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => <SortHeader column={column} text='Name' />,
    cell: ({ row }) => {
      if (row.original.isOrganization) {
        return (
          <span className='flex gap-2 items-center'>
            <Building2 className='h-6 w-6' /> {row.original.companyName}
          </span>
        );
      }
      return (
        <span className='flex gap-2 items-center'>
          <UserRound className='h-6 w-6' />
          {row.original.firstName} {row.original.lastName}
        </span>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortHeader column={column} text='Added at' />,
    cell: ({ row }) => {
      return <span>{formatDate(row.original.createdAt)}</span>;
    },
  },
  {
    accessorKey: '',
    header: 'Actions',
    cell: () => {
      return (
        // <InterviewActions className={styles.actions} interview={row.original} />
        <>Actions</>
      );
    },
  },
];

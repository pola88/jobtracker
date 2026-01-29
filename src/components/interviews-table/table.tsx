'use client';

import { useCallback } from 'react';

import type { Interview } from '@prisma/client';
import { useRouter } from 'next/navigation';

import DataTable from '../data-table';
import { columns } from './columns';

type InterviewsTableProps = {
  interviews: Interview[];
};

export function InterviewsTable({ interviews }: InterviewsTableProps) {
  const router = useRouter();

  const handleOnRowClick = useCallback(
    (row: Interview) => {
      console.log('clicked');
      router.push(`/interviews/${row.id}/edit`);
    },
    [router],
  );

  return (
    <div className='glass-panel rounded-xl border'>
      <DataTable
        columns={columns}
        data={interviews}
        onRowClick={handleOnRowClick}
      />
    </div>
  );
}

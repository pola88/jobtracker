import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';

import { columns } from './columns';

export function InterviewsTableLoading() {
  return (
    <div className='glass-panel rounded-xl border'>
      <DataTableSkeleton columns={columns} data={[]} />
    </div>
  );
}

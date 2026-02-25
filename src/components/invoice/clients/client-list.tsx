'use client';

import { SortingState } from '@tanstack/react-table';
import { useCallback, useEffect, useState, useTransition } from 'react';

import DataTable from '@/components/data-table';
import { useModal } from '@/hooks/use-modal';
import { countClients, getClients } from '@/lib/data/business-profiles';
import { BusinessProfileDTO } from '@/lib/validators/business-profile';
import { useInterviewStore } from '@/stores/interview';

import { columns } from './columns';
import { NewButton } from './new-button';

export function ClientList() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);
  const [isLoading, startTransaction] = useTransition();
  const updatedAt = useInterviewStore((state) => state.updatedAt);
  const { toggleModal } = useModal({ modalName: 'ShowInterviewModal' });

  const [fetchResult, setFetchResult] = useState<{
    nextCursor?: string;
    clients: BusinessProfileDTO[] | null;
    totalClients: number;
  }>({ clients: null, totalClients: 0 });

  const [currentCursor, setCurrentCursor] = useState<string | null | undefined>(
    null,
  );
  const [prevCursor, setPrevCursor] = useState<string | null | undefined>(
    undefined,
  );
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    startTransaction(() => {
      const fetchInterviews = async () => {
        const sortBy = {
          [sorting[0].id]: sorting[0].desc ? 'desc' : 'asc',
        };
        const [result, totalClients] = await Promise.all([
          getClients({
            cursor: currentCursor,
            pageSize,
            sortBy,
          }),
          countClients(),
        ]);
        setFetchResult({
          nextCursor: result.nextCursor,
          clients: result.clients,
          totalClients,
        });
      };
      fetchInterviews();
    });
  }, [currentCursor, pageSize, updatedAt, sorting]);

  const handleOnRowClick = useCallback(
    (row: BusinessProfileDTO) => {
      toggleModal({ id: row.id });
    },
    [toggleModal],
  );

  return (
    <div className='glass-panel rounded-xl border'>
      <DataTable
        columns={columns}
        data={fetchResult.clients}
        onRowClick={handleOnRowClick}
        isLoading={isLoading}
        onPageSizeChange={setPageSize}
        setCursor={(cursor) => {
          setPrevCursor(currentCursor);
          setCurrentCursor(cursor);
        }}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={{
          prevCursor: prevCursor,
          nextCursor: fetchResult.nextCursor,
          pageSize,
          countElement: fetchResult.totalClients,
        }}
        topRight={<NewButton />}
      />
    </div>
  );
}

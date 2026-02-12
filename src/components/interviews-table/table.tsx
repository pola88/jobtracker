'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';

import { useModal } from '@/hooks/use-modal';
import { countInterview, getInterviews } from '@/lib/data/interviews';
import { InterviewDTO } from '@/lib/validators/interview';
import { useInterviewStore } from '@/stores/interview';

import DataTable from '../data-table';
import { columns } from './columns';

interface InterviewsTableProps {
  userId: string;
}

export function InterviewsTable({ userId }: InterviewsTableProps) {
  const [isLoading, startTransaction] = useTransition();
  const updatedAt = useInterviewStore((state) => state.updatedAt);
  const { toggleModal } = useModal({ modalName: 'ShowInterviewModal' });

  const [fetchResult, setFetchResult] = useState<{
    nextCursor?: string;
    interviews: InterviewDTO[] | null;
    totalInterview: number;
  }>({ interviews: null, totalInterview: 0 });

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
        const [result, totalInterview] = await Promise.all([
          getInterviews({
            userId,
            cursor: currentCursor,
            pageSize,
          }),
          countInterview(userId),
        ]);
        setFetchResult({
          nextCursor: result.nextCursor,
          interviews: result.interviews,
          totalInterview,
        });
      };
      fetchInterviews();
    });
  }, [userId, currentCursor, pageSize, updatedAt]);

  const handleOnRowClick = useCallback(
    (row: InterviewDTO) => {
      toggleModal(row.id);
    },
    [toggleModal],
  );

  return (
    <div className='glass-panel rounded-xl border'>
      <DataTable
        columns={columns}
        data={fetchResult.interviews}
        onRowClick={handleOnRowClick}
        isLoading={isLoading}
        onPageSizeChange={setPageSize}
        setCursor={(cursor) => {
          setPrevCursor(currentCursor);
          setCurrentCursor(cursor);
        }}
        pagination={{
          prevCursor: prevCursor,
          nextCursor: fetchResult.nextCursor,
          pageSize,
          countElement: fetchResult.totalInterview,
        }}
      />
    </div>
  );
}

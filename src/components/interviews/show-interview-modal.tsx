'use client';

import { Building2, Calendar, Luggage } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

import { ShowInterviewModalSkeleton } from '@/components/skeletons/show-interview';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { formatDate } from '@/lib/helpers/date';
import { getInterviewById } from '@/lib/repository/interviews';
import { InterviewDTO } from '@/lib/validators/interview';

import { InterviewStatus } from '../interview-status';
import { NotesPanel } from './notes-panel';
import { ShowPanel } from './show-panel';
import { StepsPanel } from './steps-panel';

const MODAL_NAME = 'ShowInterviewModal';

export const ShowInterviewModal = () => {
  const [interview, setInterview] = useState<InterviewDTO | null>(null);
  const [isLoading, startTransition] = useTransition();

  const { modalStatus, toggleModal } = useModal({
    modalName: MODAL_NAME,
  });

  useEffect(() => {
    if (!modalStatus.isOpen) return;
    startTransition(async () => {
      const fetchInterview = async () => {
        if (!modalStatus.id) return;
        const currentInterview = await getInterviewById(modalStatus.id);

        setInterview(currentInterview);
      };

      fetchInterview();
    });
  }, [modalStatus]);

  if (!modalStatus.isOpen || !modalStatus.id) return null;
  const showLoading = isLoading || !interview;

  return (
    <Dialog open={modalStatus.isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent className='max-w-[90%]'>
        <DialogTitle />
        <DialogDescription />
        {showLoading && <ShowInterviewModalSkeleton />}
        {!showLoading && (
          <>
            <DialogHeader>
              <div className='flex gap-5'>
                <div className='flex-shrink-0 h-14 w-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center'>
                  <Building2 className='h-7 w-7 text-white' />
                </div>

                <div>
                  <h2 className='text-2xl font-semibold text-gray-900'>
                    {interview.company}
                  </h2>
                  <div className='mt-1 flex items-center text-gray-600 gap-2'>
                    <Luggage />
                    {interview.position}
                  </div>
                  <div className='mt-2 flex'>
                    <Calendar className='mr-1.5' />
                    Applied {formatDate(interview.date, 'LLL dd, yyyy')}
                    <InterviewStatus
                      interviewId={interview.id}
                      status={interview.status}
                      className='ml-2'
                    />
                  </div>
                </div>
              </div>
            </DialogHeader>
            <hr className='-mx-6' />
            <div className='no-scrollbar -mx-4 max-h-9/10 px-4 py-4 flex'>
              <ShowPanel title='Interview timeline'>
                {/* <FlipCard /> */}
                <StepsPanel interviewId={modalStatus.id} />
              </ShowPanel>
              <ShowPanel title='Notes'>
                <NotesPanel interviewId={modalStatus.id} />
              </ShowPanel>
            </div>
            <DialogFooter className='mt-6'></DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

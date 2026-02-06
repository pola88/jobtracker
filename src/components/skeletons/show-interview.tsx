import { Building2, Calendar, Luggage } from 'lucide-react';

import { InterviewNotesStepListSkeleton } from '@/components/skeletons/interview-notes-steps-list';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { ShowPanel } from '../interviews/show-panel';

export const ShowInterviewModalSkeleton = () => (
  <>
    <DialogHeader>
      <div className='flex gap-5'>
        <div className='flex-shrink-0 h-14 w-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center'>
          <Building2 className='h-7 w-7 text-white' />
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-gray-900'>
            <Skeleton className='w-2xs h-8' />
          </h2>
          <div className='mt-1 flex items-center text-gray-600 gap-2'>
            <Luggage />
            <Skeleton className='w-3xs h-6' />
          </div>
          <div className='mt-2 flex'>
            <Calendar className='mr-1.5' />
            <Skeleton className='w-3xs h-5' />
          </div>
        </div>
      </div>
    </DialogHeader>
    <hr className='-mx-6' />
    <div className='no-scrollbar -mx-4 max-h-9/10 px-4 py-4 flex'>
      <ShowPanel title='Interview timeline'>
        <InterviewNotesStepListSkeleton />
      </ShowPanel>
      <ShowPanel title='Notes'>
        <InterviewNotesStepListSkeleton />
      </ShowPanel>
    </div>
    <DialogFooter className='mt-6'></DialogFooter>
  </>
);

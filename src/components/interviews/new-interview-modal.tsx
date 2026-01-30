'use client';

import { useCallback, useRef, useState } from 'react';

import { createInterviewAction } from '@/actions/interviews';
import { Button } from '@/components/button';
import type { FormRef } from '@/components/form';
import { InterviewForm } from '@/components/forms/interview-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { useInterviewStore } from '@/stores/interview';

const MODAL_NAME = 'NewInterviewModal';

export const NewInterviewModal = () => {
  const formRef = useRef<FormRef>();
  const touch = useInterviewStore((state) => state.touch);
  const [isLoading, setIsLoading] = useState(false);
  const { modalStatus, toggleModal } = useModal({
    modalName: MODAL_NAME,
  });

  const submitCallback = useCallback(
    (_isLoading: boolean, success: boolean) => {
      setIsLoading(_isLoading);
      if (success) {
        touch();
        toggleModal();
      }
    },
    [toggleModal, touch],
  );

  if (!modalStatus.isOpen) return null;

  return (
    <Dialog open={modalStatus.isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 py-4'>
          <InterviewForm
            ref={formRef}
            action={createInterviewAction}
            submitLabel='Add Application'
            showInitialNoteField
          />
        </div>
        <DialogFooter className='mt-6'>
          <Button
            isLoading={isLoading}
            onClick={() => formRef.current?.submit(submitCallback)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

'use client';

import { useRef, useState } from 'react';

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
  const formRef = useRef<FormRef>(null);
  const touch = useInterviewStore((state) => state.touch);
  const [isLoading, setIsLoading] = useState(false);
  const { modalStatus, toggleModal } = useModal({
    modalName: MODAL_NAME,
  });

  const submitCallback = (success: boolean) => {
    if (success) {
      touch();
      toggleModal();
    }
    setIsLoading(false);
  };

  const onSubmit = () => {
    setIsLoading(true);
    formRef.current?.submit();
  };

  if (!modalStatus.isOpen) return null;

  return (
    <Dialog open={modalStatus.isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4 pt-4'>
          <InterviewForm
            ref={formRef}
            action={createInterviewAction}
            afterSubmit={submitCallback}
          />
        </div>
        <DialogFooter className='mt-6'>
          <Button isLoading={isLoading} onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

'use client';

import { Trash2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { deleteInterviewStepAction } from '@/actions/interview-steps';
import { Button } from '@/components/ui/button';

type DeleteStepFormProps = {
  stepId: string;
  interviewId: string;
};

export function DeleteStepForm({ stepId, interviewId }: DeleteStepFormProps) {
  const { pending } = useFormStatus();

  return (
    <form action={deleteInterviewStepAction}>
      <input type='hidden' name='stepId' value={stepId} />
      <input type='hidden' name='interviewId' value={interviewId} />
      <Button
        type='submit'
        variant='ghost'
        size='sm'
        className='h-8 px-2 text-muted-foreground hover:text-destructive'
        disabled={pending}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </form>
  );
}

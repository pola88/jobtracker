'use client';

import { Trash2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { deleteInterviewNoteAction } from '@/actions/interview-notes';
import { Button } from '@/components/ui/button';

type DeleteNoteFormProps = {
  noteId: string;
  interviewId: string;
};

export function DeleteNoteForm({ noteId, interviewId }: DeleteNoteFormProps) {
  const { pending } = useFormStatus();
  return (
    <form action={deleteInterviewNoteAction} className='space-y-2'>
      <input type='hidden' name='noteId' value={noteId} />
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

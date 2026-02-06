'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { InterviewNote } from '@prisma/client';

import { addInterviewNoteAction } from '@/actions/interview-notes';
import { Button } from '@/components/button';

import { Card } from '../card';
import { InterviewNoteForm } from '../forms/interview-note';

type AddNoteFormProps = {
  interviewId: string;
  onCreate: (note: InterviewNote) => void;
};

export function AddNoteForm({ interviewId, onCreate }: AddNoteFormProps) {
  const [showForm, setShowForm] = useState(false);

  const onSuccess = (note: InterviewNote) => {
    onCreate(note);
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && (
        <Button
          variant='dashed'
          onClick={() => setShowForm(true)}
          size='xlg'
          className='flex items-center justify-start gap-2'
        >
          <Plus className='h4 w-4' /> Add a general note about this
          application...
        </Button>
      )}
      {showForm && (
        <Card className='mb-0'>
          <InterviewNoteForm
            action={addInterviewNoteAction}
            defaultValues={{
              interviewId,
              content: '',
            }}
            onCancel={() => setShowForm(false)}
            onSuccess={onSuccess}
          />
        </Card>
      )}
    </div>
  );
}

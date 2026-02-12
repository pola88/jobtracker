'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { addInterviewNoteAction } from '@/actions/interview-notes';
import { Button } from '@/components/button';
import { InterviewNoteDTO } from '@/lib/validators/interview-note';

import { Card } from '../card';
import { InterviewNoteForm } from '../forms/interview-note';

type AddNoteFormProps = {
  interviewId: string;
  onCreate: (note: InterviewNoteDTO) => void;
};

export function AddNoteForm({ interviewId, onCreate }: AddNoteFormProps) {
  const [showForm, setShowForm] = useState(false);

  const onSuccess = (note: InterviewNoteDTO) => {
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
            action={(data) => addInterviewNoteAction(interviewId, data)}
            defaultValues={{
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

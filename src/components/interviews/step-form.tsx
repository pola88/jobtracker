'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { addInterviewStepAction } from '@/actions/interview-steps';
import { Button } from '@/components/button';
import { InterviewStepDTO } from '@/lib/validators/interview-step';

import { Card } from '../card';
import { InterviewStepForm } from '../forms/interview-step';

type AddStepFormProps = {
  interviewId: string;
  onCreate: (step: InterviewStepDTO) => void;
};

export function AddStepForm({ interviewId, onCreate }: AddStepFormProps) {
  const [showForm, setShowForm] = useState(false);

  const onSuccess = (step: InterviewStepDTO) => {
    onCreate(step);
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
          <Plus className='h4 w-4' /> Add new step or interview to this
          application...
        </Button>
      )}
      {showForm && (
        <Card className='mb-0'>
          <InterviewStepForm
            action={(data) => addInterviewStepAction(interviewId, data)}
            defaultValues={{
              title: '',
              status: 'scheduled',
              notes: '',
              scheduledAt: new Date(),
            }}
            onCancel={() => setShowForm(false)}
            onSuccess={onSuccess}
          />
        </Card>
      )}
    </div>
  );
}

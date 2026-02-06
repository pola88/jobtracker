'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { InterviewStep } from '@prisma/client';

import { addInterviewStepAction } from '@/actions/interview-steps';
import { Button } from '@/components/button';

import { Card } from '../card';
import { InterviewStepForm } from '../forms/interview-step';

type AddStepFormProps = {
  interviewId: string;
  onCreate: (step: InterviewStep) => void;
};

export function AddStepForm({ interviewId, onCreate }: AddStepFormProps) {
  const [showForm, setShowForm] = useState(false);

  const onSuccess = (step: InterviewStep) => {
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
            action={addInterviewStepAction}
            defaultValues={{
              interviewId,
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

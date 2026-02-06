'use client';

import { forwardRef, useEffect } from 'react';
import { useFormState } from 'react-dom';

import { InterviewStep, InterviewStepStatus } from '@prisma/client';

import type { ActionResponse } from '@/actions/interview-steps';
import Form, { type FormRef } from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import {
  InterviewStepType,
  interviewStepSchema,
} from '@/lib/validators/interview-step';

const DEFAULT_VALUES: InterviewStepType = {
  interviewId: '',
  title: '',
  status: 'waiting',
  scheduledAt: new Date(),
};

const fields: FieldType<typeof interviewStepSchema>[] = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Technical, HR, etc..',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'scheduledAt',
    label: 'Date & Time',
    placeholder: 'Date & Time',
    type: 'date',
    fullWidth: false,
  },
  {
    name: 'status',
    label: 'How was it?',
    placeholder: 'Passed, neutral...',
    type: 'select',
    fullWidth: false,
    options: Object.values(InterviewStepStatus).map((type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
    })),
  },
  {
    name: 'notes',
    label: 'Notes & Feedback',
    placeholder: 'Add notes, impressions, or feedback from the interview...',
    type: 'textarea',
    fullWidth: true,
  },
];

type InterviewStepFormProps = {
  action: (
    state: ActionResponse,
    formData: FormData,
  ) => Promise<ActionResponse>;
  defaultValues?: InterviewStepType;
  onCancel: () => void;
  onSuccess?: (note: InterviewStep) => void;
};

const initialState: ActionResponse = {
  success: false,
};

export const InterviewStepForm = forwardRef<FormRef, InterviewStepFormProps>(
  ({ action, defaultValues = DEFAULT_VALUES, onCancel, onSuccess }, ref) => {
    const [state, formAction, isPending] = useFormState(action, initialState);
    useEffect(() => {
      if (state.success && state.step) {
        onSuccess?.(state.step);
      }
    }, [state, onSuccess]);

    return (
      <Form
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={(data) => formAction(data as unknown as FormData)}
        schema={interviewStepSchema}
        fields={fields}
        isLoading={isPending}
        submitLabel='Add note'
        onCancel={onCancel}
        error={!state.success ? state.message : null}
        btnSize='sm'
      />
    );
  },
);

InterviewStepForm.displayName = 'InterviewStepForm';

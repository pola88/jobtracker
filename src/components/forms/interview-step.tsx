'use client';

import { forwardRef } from 'react';

import type { ActionResponse } from '@/actions/interview-steps';
import Form, { type FormRef } from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import {
  InterviewStepDTO,
  type InterviewStepFormDTO,
  InterviewStepStatus,
  interviewStepFormSchema,
} from '@/lib/validators/interview-step';

const DEFAULT_VALUES: InterviewStepFormDTO = {
  title: '',
  status: 'waiting',
  notes: '',
  scheduledAt: new Date(),
};

const fields: FieldType<InterviewStepFormDTO>[] = [
  {
    name: 'title',
    label: 'Title*',
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
  action: (formData: InterviewStepFormDTO) => Promise<ActionResponse>;
  defaultValues?: InterviewStepFormDTO;
  onCancel: () => void;
  onSuccess?: (note: InterviewStepDTO) => void;
};

export const InterviewStepForm = forwardRef<FormRef, InterviewStepFormProps>(
  ({ action, defaultValues = DEFAULT_VALUES, onCancel, onSuccess }, ref) => {
    const onSubmit = async (data: InterviewStepFormDTO) => {
      const result = await action(data);
      if (result.success && result.step) {
        onSuccess?.(result.step);
      }
      return result;
    };

    return (
      <Form<InterviewStepFormDTO>
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        schema={interviewStepFormSchema}
        fields={fields}
        submitLabel='Add note'
        onCancel={onCancel}
        btnSize='sm'
      />
    );
  },
);

InterviewStepForm.displayName = 'InterviewStepForm';

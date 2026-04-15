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
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'scheduledAt',
    type: 'date',
    fullWidth: false,
  },
  {
    name: 'status',
    type: 'select',
    fullWidth: false,
    options: Object.values(InterviewStepStatus).map((type) => ({
      value: type,
    })),
  },
  {
    name: 'notes',
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
        basei18nkey='interview-step.form'
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        schema={interviewStepFormSchema}
        fields={fields}
        onCancel={onCancel}
        btnSize='sm'
      />
    );
  },
);

InterviewStepForm.displayName = 'InterviewStepForm';

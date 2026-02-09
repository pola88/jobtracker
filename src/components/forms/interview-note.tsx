'use client';

import { forwardRef } from 'react';

import { InterviewNote } from '@prisma/client';

import type { ActionResponse } from '@/actions/interview-notes';
import Form, { type FormRef } from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import {
  InterviewNoteType,
  interviewNoteSchema,
} from '@/lib/validators/interview-note';

const DEFAULT_VALUES: InterviewNoteType = {
  interviewId: '',
  content: '',
};

const fields: FieldType<typeof interviewNoteSchema>[] = [
  {
    name: 'content',
    label: '',
    placeholder: 'Add a general note about this application...',
    type: 'textarea',
    fullWidth: true,
  },
];

type InterviewNoteFormProps = {
  action: (formData: FormData) => Promise<ActionResponse>;
  defaultValues?: InterviewNoteType;
  onCancel: () => void;
  onSuccess?: (note: InterviewNote) => void;
};

export const InterviewNoteForm = forwardRef<FormRef, InterviewNoteFormProps>(
  ({ action, defaultValues = DEFAULT_VALUES, onCancel, onSuccess }, ref) => {
    const onSubmit = async (data: FormData) => {
      const result = await action(data);
      if (result.success && result.note) {
        onSuccess?.(result.note);
      }
      return result;
    };

    return (
      <Form
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        schema={interviewNoteSchema}
        fields={fields}
        submitLabel='Save'
        onCancel={onCancel}
        btnSize='sm'
      />
    );
  },
);

InterviewNoteForm.displayName = 'InterviewNoteForm';

'use client';

import { forwardRef } from 'react';

import type { ActionResponse } from '@/actions/interview-notes';
import Form, { type FormRef } from '@/components/form';
import { Field } from '@/components/form/types';
import {
  InterviewNoteDTO,
  InterviewNoteFormDTO,
  interviewNoteFormSchema,
} from '@/lib/validators/interview-note';

const DEFAULT_VALUES: InterviewNoteFormDTO = {
  content: '',
};

const fields: Field<InterviewNoteFormDTO>[] = [
  {
    name: 'content',
    label: '',
    placeholder: 'Add a general note about this application...',
    type: 'textarea',
    fullWidth: true,
  },
];

type InterviewNoteFormProps = {
  action: (formData: InterviewNoteFormDTO) => Promise<ActionResponse>;
  defaultValues?: InterviewNoteFormDTO;
  onCancel: () => void;
  onSuccess?: (note: InterviewNoteDTO) => void;
};

export const InterviewNoteForm = forwardRef<FormRef, InterviewNoteFormProps>(
  ({ action, defaultValues = DEFAULT_VALUES, onCancel, onSuccess }, ref) => {
    const onSubmit = async (data: InterviewNoteFormDTO) => {
      const result = await action(data);
      if (result.success && result.note) {
        onSuccess?.(result.note);
      }
      return result;
    };

    return (
      <Form<InterviewNoteFormDTO>
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        schema={interviewNoteFormSchema}
        fields={fields}
        submitLabel='Save'
        onCancel={onCancel}
        btnSize='sm'
      />
    );
  },
);

InterviewNoteForm.displayName = 'InterviewNoteForm';

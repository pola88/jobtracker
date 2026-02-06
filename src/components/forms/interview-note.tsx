'use client';

import { forwardRef, useEffect } from 'react';
import { useFormState } from 'react-dom';

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
  action: (
    state: ActionResponse,
    formData: FormData,
  ) => Promise<ActionResponse>;
  defaultValues?: InterviewNoteType;
  onCancel: () => void;
  onSuccess?: (note: InterviewNote) => void;
};

const initialState: ActionResponse = {
  success: false,
};

export const InterviewNoteForm = forwardRef<FormRef, InterviewNoteFormProps>(
  ({ action, defaultValues = DEFAULT_VALUES, onCancel, onSuccess }, ref) => {
    const [state, formAction, isPending] = useFormState(action, initialState);
    useEffect(() => {
      if (state.success && state.note) {
        onSuccess?.(state.note);
      }
    }, [state, onSuccess]);

    return (
      <Form
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={(data) => formAction(data as unknown as FormData)}
        schema={interviewNoteSchema}
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

InterviewNoteForm.displayName = 'InterviewNoteForm';

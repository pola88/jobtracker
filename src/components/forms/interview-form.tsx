'use client';

import { forwardRef } from 'react';
import { useFormState } from 'react-dom';

import { CompensationType } from '@prisma/client';
import { z } from 'zod';

import { ActionResponse } from '@/actions/interviews';
import Form, { type FormRef } from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import { interviewSchema } from '@/lib/validators/interview';
import { CURRENCIES } from '@/lib/validators/interview';

type InterviewTypes = z.infer<typeof interviewSchema>;

const DEFAULT_VALUES: InterviewTypes = {
  company: '',
  position: '',
  recruiter: '',
  date: new Date(),
  status: 'applied',
  compensationType: 'fixed',
  compensationLower: 0,
  compensationUpper: 0,
  compensationNotes: '',
  currency: 'USD',
  experienceRating: 'neutral',
  initialNote: '',
};

const fields: FieldType<typeof interviewSchema>[] = [
  {
    name: 'company',
    label: 'Empresa',
    placeholder: 'Empresa',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'position',
    label: 'Puesto',
    placeholder: 'Puesto',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'date',
    label: 'Fecha',
    placeholder: 'Fecha',
    type: 'date',
    fullWidth: true,
  },
  {
    name: 'compensationType',
    label: 'Tipo de compensación',
    placeholder: 'Tipo de compensación',
    type: 'select',
    options: Object.values(CompensationType).map((type) => ({
      label: type,
      value: type,
    })),
    fullWidth: true,
  },
  {
    name: 'compensation-row',
    type: 'group',
    columns: 3,
    fields: [
      {
        name: 'compensationLower',
        label: 'Valor mínimo',
        placeholder: 'Valor mínimo de compensación',
        type: 'text',
      },
      {
        name: 'compensationUpper',
        label: 'Valor máximo',
        placeholder: 'Valor máximo de compensación',
        type: 'text',
      },
      {
        name: 'currency',
        label: 'Moneda',
        placeholder: 'Moneda',
        type: 'select',
        options: CURRENCIES.map((currency) => ({
          label: currency,
          value: currency,
        })),
      },
    ],
  },
];

type InterviewFormProps = {
  action: (
    state: ActionResponse,
    formData: FormData,
  ) => Promise<ActionResponse>;
  defaultValues?: InterviewTypes;
  submitLabel?: string;
  showInitialNoteField?: boolean;
};

const initialState: ActionResponse = {
  success: false,
};

export const InterviewForm = forwardRef<FormRef, InterviewFormProps>(
  (
    {
      action,
      defaultValues = DEFAULT_VALUES,
      submitLabel = 'Guardar',
      showInitialNoteField = false,
    },
    ref,
  ) => {
    const [_, formAction, isPending] = useFormState(action, initialState);
    const formFields: FieldType<typeof interviewSchema>[] = showInitialNoteField
      ? fields
      : fields.map((field) =>
          field.name !== 'initialNote'
            ? field
            : {
                name: 'spacer-initial-note',
                type: 'spacer',
              },
        );

    return (
      <Form
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={(data) => formAction(data as unknown as FormData)}
        schema={interviewSchema}
        fields={formFields}
        isLoading={isPending}
        submitLabel={submitLabel}
      />
    );
  },
);

InterviewForm.displayName = 'InterviewForm';

export default InterviewForm;

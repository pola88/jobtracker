'use client';

import { z } from 'zod';

import Form from '@/components/Form';
import { Field as FieldType } from '@/components/Form/types';

import { interviewSchema } from '@/lib/validators/interview';
import { useFormState } from 'react-dom';
import { ActionResponse } from '@/actions/interviews';
import { INTERVIEW_STATUSES } from '@/lib/data/interviews';
import { COMPENSATION_TYPES, CURRENCIES } from '@/lib/validators/interview';

const DEFAULT_VALUES: z.infer<typeof interviewSchema> = {
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
  tags: [],
};

const fields: FieldType<typeof interviewSchema>[] = [
  {
    name: 'company',
    label: 'Empresa',
    placeholder: 'Empresa',
    type: 'text',
  },
  {
    name: 'position',
    label: 'Puesto',
    placeholder: 'Puesto',
    type: 'text',
  },
  {
    name: 'recruiter',
    label: 'Recruiter',
    placeholder: 'Recruiter',
    type: 'text',
  },
  {
    name: 'date',
    label: 'Fecha',
    placeholder: 'Fecha',
    type: 'date',
  },
  {
    name: 'status',
    label: 'Estado',
    placeholder: 'Estado',
    type: 'select',
    options: INTERVIEW_STATUSES.map((status) => ({ label: status, value: status })),
  },
  {
    name: 'spacer-general',
    type: 'spacer',
  },
  {
    name: 'benefits',
    label: 'Beneficios',
    placeholder: 'Beneficios',
    type: 'textarea',
    fullWidth: false,
  },
  {
    name: 'initialNote',
    label: 'Nota inicial',
    placeholder: 'Seguimiento semanal, feedback pendiente...',
    type: 'textarea',
    fullWidth: false,
  },
  {
    name: 'compensation-row',
    type: 'group',
    columns: 3,
    fields: [
      {
        name: 'compensationType',
        label: 'Tipo de compensación',
        placeholder: 'Tipo de compensación',
        type: 'select',
        options: COMPENSATION_TYPES.map((type) => ({ label: type, value: type })),
      },
      {
        name: 'compensationLower',
        label: 'Valor mínimo de compensación',
        placeholder: 'Valor mínimo de compensación',
        type: 'text',
      },
      {
        name: 'currency',
        label: 'Moneda',
        placeholder: 'Moneda',
        type: 'select',
        options: CURRENCIES.map((currency) => ({ label: currency, value: currency })),
      },
    ],
  },
  {
    name: 'compensationUpper',
    label: 'Valor máximo de compensación',
    placeholder: 'Valor máximo de compensación',
    type: 'text',
    fullWidth: true,
    shouldHide: (values) => 
      values.compensationType === 'range' ? false : true
  },
  {
    name: 'compensationNotes',
    label: 'Notas de compensación',
    placeholder: 'Notas de compensación',
    type: 'text',
    fullWidth: true,
  }
];

type InterviewFormProps = {
  action: (
    state: ActionResponse,
    formData: FormData
  ) => Promise<ActionResponse>;
  defaultValues?: z.infer<typeof interviewSchema>;
  submitLabel?: string;
  showInitialNoteField?: boolean;
};

const initialState: ActionResponse = {
  success: false,
};

export const InterviewForm = ({ action, defaultValues = DEFAULT_VALUES, submitLabel = "Guardar", showInitialNoteField = false }: InterviewFormProps) => {
  const [, formAction, isPending] = useFormState(action, initialState);
  const formFields: FieldType<typeof interviewSchema>[] = showInitialNoteField
    ? fields
    : fields.map((field) => field.name !== 'initialNote' ? field : {
      name: 'spacer-initial-note',
      type: 'spacer',
    });

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(data) => formAction(data as unknown as FormData)}
      schema={interviewSchema}
      fields={formFields}
      isLoading={isPending}
      submitLabel={submitLabel}
    />
  );
};

export default InterviewForm;

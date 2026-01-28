'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import {
  CompensationType,
  ExperienceRating,
  InterviewStatus,
} from '@prisma/client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { ActionResponse } from '@/actions/interviews';
import Form from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import { interviewSchema } from '@/lib/validators/interview';
import { CURRENCIES } from '@/lib/validators/interview';

const EXPERIENCE_RATINGS = [
  { label: 'Muy negativa', value: ExperienceRating.very_negative },
  { label: 'Negativa', value: ExperienceRating.negative },
  { label: 'Neutral', value: ExperienceRating.neutral },
  { label: 'Positiva', value: ExperienceRating.positive },
  { label: 'Muy positiva', value: ExperienceRating.very_positive },
];

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
    options: Object.values(InterviewStatus).map((status) => ({
      label: status,
      value: status,
    })),
  },
  {
    name: 'experienceRating',
    label: 'Evaluación',
    placeholder: 'Evaluación',
    type: 'select',
    options: EXPERIENCE_RATINGS,
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
    columns: 4,
    fields: [
      {
        name: 'compensationType',
        label: 'Tipo de compensación',
        placeholder: 'Tipo de compensación',
        type: 'select',
        options: Object.values(CompensationType).map((type) => ({
          label: type,
          value: type,
        })),
      },
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
  {
    name: 'compensationNotes',
    label: 'Notas de compensación',
    placeholder: 'Notas de compensación',
    type: 'textarea',
    fullWidth: true,
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

export const InterviewForm = ({
  action,
  defaultValues = DEFAULT_VALUES,
  submitLabel = 'Guardar',
  showInitialNoteField = false,
}: InterviewFormProps) => {
  const [state, formAction, isPending] = useFormState(action, initialState);
  const router = useRouter();
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

  useEffect(() => {
    if (state.success && state.interviewId) {
      router.push(`/interviews/${state.interviewId}/edit`);
    }
  }, [state.success, state.interviewId, router]);

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

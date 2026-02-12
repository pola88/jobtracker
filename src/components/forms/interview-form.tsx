'use client';

import { forwardRef } from 'react';

import { CompensationType } from '@prisma/client';

import { ActionResponse } from '@/actions/interviews';
import Form, { type FormRef } from '@/components/form';
import { Field as FieldType } from '@/components/form/types';
import {
  InterviewFormDTO,
  interviewFormSchema,
} from '@/lib/validators/interview';
import { CURRENCIES } from '@/lib/validators/interview';

const DEFAULT_VALUES: InterviewFormDTO = {
  company: '',
  position: '',
  recruiter: '',
  date: new Date(),
  status: 'applied',
  compensationType: 'fixed',
  compensationLower: 0,
  compensationUpper: 0,
  currency: 'USD',
};

const fields: FieldType<InterviewFormDTO>[] = [
  {
    name: 'company',
    label: 'Company name*',
    placeholder: 'Company name',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'position',
    label: 'Position',
    placeholder: 'Position',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'link',
    label: 'URL Application',
    placeholder: 'Puesto',
    type: 'text',
    fullWidth: true,
  },
  {
    name: 'date',
    label: 'Date*',
    placeholder: 'Date',
    type: 'date',
    fullWidth: true,
  },
  {
    name: 'compensationType',
    label: 'Compensation type',
    placeholder: 'Compensation type',
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
        label: 'Min',
        placeholder: 'Min',
        type: 'text',
      },
      {
        name: 'compensationUpper',
        label: 'Max',
        placeholder: 'Max',
        type: 'text',
      },
      {
        name: 'currency',
        label: 'Currency',
        placeholder: 'Currency',
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
  action: (formData: InterviewFormDTO) => Promise<ActionResponse>;
  defaultValues?: InterviewFormDTO;
  submitLabel?: string;
  afterSubmit: (success: boolean) => void;
};

export const InterviewForm = forwardRef<FormRef, InterviewFormProps>(
  (
    {
      action,
      defaultValues = DEFAULT_VALUES,
      submitLabel = 'Guardar',
      afterSubmit,
    },
    ref,
  ) => {
    return (
      <Form<InterviewFormDTO>
        ref={ref}
        defaultValues={defaultValues}
        onSubmit={action}
        schema={interviewFormSchema}
        fields={fields}
        submitLabel={submitLabel}
        afterSubmit={afterSubmit}
      />
    );
  },
);

InterviewForm.displayName = 'InterviewForm';

export default InterviewForm;

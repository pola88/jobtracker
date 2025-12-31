'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import type { ActionResponse } from '@/actions/interviews';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type StepFormProps = {
  action: (
    state: ActionResponse,
    formData: FormData,
  ) => Promise<ActionResponse>;
  interviewId: string;
  defaultValues?: {
    stepId?: string;
    title?: string;
    type?: string;
    scheduledAt?: string;
    completedAt?: string;
    outcome?: string | null;
    notes?: string | null;
  };
  submitLabel: string;
  onSuccess?: () => void;
};

const initialState: ActionResponse = {
  success: false,
};

export function StepForm({
  action,
  interviewId,
  defaultValues,
  submitLabel,
  onSuccess,
}: StepFormProps) {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className='space-y-3'>
      <input type='hidden' name='interviewId' value={interviewId} />
      {defaultValues?.stepId && (
        <input type='hidden' name='stepId' value={defaultValues.stepId} />
      )}
      <div className='grid gap-3 md:grid-cols-2'>
        <Field
          label='Título'
          name='title'
          defaultValue={defaultValues?.title ?? ''}
          placeholder='Challenge técnico, entrevista con cliente...'
          required
        />
        <Field
          label='Tipo'
          name='type'
          defaultValue={defaultValues?.type ?? ''}
          placeholder='Técnica, cultural, cliente...'
          required
        />
      </div>
      <div className='grid gap-3 md:grid-cols-2'>
        <Field
          label='Fecha agendada'
          name='scheduledAt'
          type='datetime-local'
          defaultValue={defaultValues?.scheduledAt ?? ''}
        />
        <Field
          label='Fecha completada'
          name='completedAt'
          type='datetime-local'
          defaultValue={defaultValues?.completedAt ?? ''}
        />
      </div>
      <Field
        label='Resultado'
        name='outcome'
        placeholder='Feedback, decision, próximos pasos...'
        defaultValue={defaultValues?.outcome ?? ''}
      />
      <div className='space-y-2'>
        <label className='text-sm font-medium text-muted-foreground'>
          Notas
        </label>
        <Textarea
          name='notes'
          placeholder='Observaciones adicionales'
          defaultValue={defaultValues?.notes ?? ''}
        />
      </div>
      {state.message && (
        <p
          className={`text-sm ${
            state.success ? 'text-emerald-600' : 'text-destructive'
          }`}
        >
          {state.message}
        </p>
      )}
      <Button type='submit'>{submitLabel}</Button>
    </form>
  );
}

type FieldProps = React.ComponentProps<typeof Input> & {
  label: string;
};

function Field({ label, ...props }: FieldProps) {
  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-muted-foreground'>
        {label}
      </label>
      <Input {...props} />
    </div>
  );
}

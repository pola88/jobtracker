'use client';

import { useState, useTransition } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { loginAction } from '@/actions/login';
import Form from '@/components/form';
import { loginSchema } from '@/lib/validators/auth';

import { Field } from '../form/types';

type LoginSchema = z.infer<typeof loginSchema>;

const DEFAULT_VALUES: LoginSchema = {
  email: '',
  password: '',
};

const fields: Field<typeof loginSchema>[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    fullWidth: true,
  },
  {
    name: 'password',
    label: 'Contraseña',
    placeholder: 'Contraseña',
    type: 'password',
    fullWidth: true,
  },
];

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const submit = async (values: LoginSchema) => {
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);

      if (!response.success) {
        setError(response.message);
        return;
      }

      router.replace(redirectTo);
      router.refresh();
    });
  };

  return (
    <Form
      defaultValues={DEFAULT_VALUES}
      onSubmit={(data) => submit(data as unknown as LoginSchema)}
      schema={loginSchema}
      fields={fields}
      isLoading={isPending}
      error={error}
      submitLabel='Ingresar'
    />
  );
}

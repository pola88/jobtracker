'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { loginAction } from '@/actions/login';
import Form from '@/components/form';
import { LoginSchemaDTO, loginSchema } from '@/lib/validators/auth';

import { Field } from '../form/types';

const DEFAULT_VALUES: LoginSchemaDTO = {
  email: '',
  password: '',
};

const fields: Field<LoginSchemaDTO>[] = [
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
  const redirectTo = searchParams.get('redirectTo') ?? '/interviews';

  const onSubmit = async (data: LoginSchemaDTO) => {
    const result = await loginAction(data);
    if (result.success) {
      router.replace(redirectTo);
      router.refresh();
    }
    return result;
  };

  return (
    <Form<LoginSchemaDTO>
      defaultValues={DEFAULT_VALUES}
      onSubmit={onSubmit}
      schema={loginSchema}
      fields={fields}
      submitLabel='Login'
      skipToast
    />
  );
}

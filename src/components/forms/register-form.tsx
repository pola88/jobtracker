'use client';

import { useRouter } from 'next/navigation';

import { registerAction } from '@/actions/register';
import Form from '@/components/form';
import { RegisterSchemaDTO, registerSchema } from '@/lib/validators/auth';

import { Field } from '../form/types';

const DEFAULT_VALUES: RegisterSchemaDTO = {
  email: '',
  password: '',
};

const fields: Field<RegisterSchemaDTO>[] = [
  {
    name: 'email',
    type: 'email',
    fullWidth: true,
  },
  {
    name: 'password',
    type: 'password',
    fullWidth: true,
  },
];

export function RegisterForm() {
  const router = useRouter();

  const onSubmit = async (data: RegisterSchemaDTO) => {
    const result = await registerAction(data);
    if (result.success) {
      router.replace('/interviews');
      router.refresh();
    }
    return result;
  };

  return (
    <Form<RegisterSchemaDTO>
      basei18nkey='register.form'
      defaultValues={DEFAULT_VALUES}
      onSubmit={onSubmit}
      schema={registerSchema}
      fields={fields}
      skipToast
    />
  );
}

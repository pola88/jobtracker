'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerSchema } from '@/lib/validators/auth';

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = async (values: RegisterSchema) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      credentials: 'include',
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.message ?? 'No se pudo crear la cuenta');
      return;
    }

    router.replace('/dashboard');
    router.refresh();
  };

  const handleSubmit = (values: RegisterSchema) => {
    setError(null);
    startTransition(() => {
      void submit(values);
    });
  };

  return (
    <form
      className='space-y-6'
      onSubmit={form.handleSubmit(handleSubmit)}
      noValidate
    >
      <div className='space-y-2'>
        <label className='text-sm font-medium text-muted-foreground'>
          Email
        </label>
        <Input
          type='email'
          placeholder='talento@empresa.com'
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className='text-sm text-destructive'>
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-muted-foreground'>
          Contraseña
        </label>
        <Input type='password' {...form.register('password')} />
        {form.formState.errors.password && (
          <p className='text-sm text-destructive'>
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      <Button
        type='submit'
        className='w-full'
        disabled={isPending || form.formState.isSubmitting}
      >
        {isPending ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>
    </form>
  );
}

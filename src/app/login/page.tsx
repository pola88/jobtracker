import { Suspense } from 'react';

import Link from 'next/link';

import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <section className='flex flex-col justify-between bg-primary p-10 text-primary-foreground'>
        <div>
          <p className='text-sm uppercase tracking-[0.3em] text-primary-foreground/70'>
            JobTrack
          </p>
          <h1 className='mt-4 text-4xl font-semibold leading-tight'>
            Convierte tu búsqueda laboral en un proceso medible.
          </h1>
        </div>
        <p className='text-sm text-primary-foreground/80'>
          El panel inteligente para entender y acelerar tus entrevistas.
        </p>
      </section>
      <section className='flex flex-col justify-center px-8 py-16 sm:px-16'>
        <div className='mx-auto w-full max-w-md space-y-8'>
          <div>
            <h2 className='text-3xl font-semibold'>Ingresa a JobTrack</h2>
            <p className='text-muted-foreground'>
              ¿Aún no tienes cuenta?{' '}
              <Link
                href='/register'
                className='text-primary underline-offset-4 hover:underline'
              >
                Crear cuenta
              </Link>
            </p>
          </div>
          <Suspense
            fallback={
              <div className='text-sm text-muted-foreground'>
                Cargando formulario...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

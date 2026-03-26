import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/components/forms/login-form';
import { Link } from '@/i18n/navigation';

export default async function LoginPage() {
  const t = await getTranslations('login');
  return (
    <div className='mx-auto w-full max-w-md space-y-8'>
      <div>
        <h2 className='text-3xl font-semibold'>{t('form.title')}</h2>
        <p className='text-muted-foreground'>
          {t('no_account')}{' '}
          <Link
            href='/register'
            className='text-primary underline-offset-4 hover:underline'
          >
            {t('create_account_link')}
          </Link>
        </p>
      </div>
      <Suspense
        fallback={
          <div className='text-sm text-muted-foreground'>
            {t('form.loading')}
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

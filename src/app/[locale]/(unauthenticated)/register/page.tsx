import { getTranslations } from 'next-intl/server';

import { RegisterForm } from '@/components/forms/register-form';
import { Link } from '@/i18n/navigation';

export default async function RegisterPage() {
  const t = await getTranslations('register');
  return (
    <div className='mx-auto w-full max-w-md space-y-8'>
      <div>
        <h2 className='text-3xl font-semibold'>{t('form.title')}</h2>
        <p className='text-muted-foreground'>
          {t('with_account')}{' '}
          <Link
            href='/login'
            className='text-primary underline-offset-4 hover:underline'
          >
            {t('login_link')}
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}

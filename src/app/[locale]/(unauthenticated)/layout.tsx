import { getTranslations } from 'next-intl/server';

const UnauthenticatedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = await getTranslations('home.page');
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <section className='flex flex-col justify-between bg-primary p-10 text-primary-foreground'>
        <div>
          <p className='text-sm uppercase tracking-[0.3em] text-primary-foreground/70'>
            JobTrack
          </p>
          <h1 className='mt-4 text-4xl font-semibold leading-tight'>
            {t('title')}
          </h1>
        </div>
        <p className='text-sm text-primary-foreground/80'>{t('description')}</p>
      </section>
      <section className='flex flex-col justify-center px-8 py-16 sm:px-16'>
        {children}
      </section>
    </div>
  );
};
export default UnauthenticatedLayout;

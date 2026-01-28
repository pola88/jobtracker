import { Skeleton } from '@/components/ui/skeleton';

const InvoiceFormSkeleton = () => {
  return (
    <div className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-3'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-4 rounded-lg border bg-muted/50 p-4'>
          <Skeleton className='h-6 w-12' />
          <div className='space-y-3'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-20 w-full' />
            </div>
          </div>
        </div>

        <div className='space-y-4 rounded-lg border bg-muted/50 p-4'>
          <Skeleton className='h-6 w-16' />
          <div className='space-y-3'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-20 w-full' />
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-9 w-28' />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='w-24'>
            <Skeleton className='h-4 w-16' />
          </div>
          <div className='w-24'>
            <Skeleton className='h-4 w-12' />
          </div>
          <div className='w-24'>
            <Skeleton className='h-4 w-16' />
          </div>
          <div className='w-10'></div>
        </div>

        <div className='flex gap-4'>
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='w-24 space-y-2'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='w-24 space-y-2'>
            <Skeleton className='h-4 w-12' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='w-24 space-y-2'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='w-10'></div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormSkeleton;

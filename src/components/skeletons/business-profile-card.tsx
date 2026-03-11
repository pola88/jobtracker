import { Skeleton } from '@/components/ui/skeleton';

import { Card } from '../card';

export const BusinessProfileCard = () => (
  <Card className='flex flex-col gap-1 relative group/business-profile hover:bg-gray-100 cursor-pointer h-37 w-82'>
    <div className='flex gap-4'>
      <Skeleton className='h-6 w-6' />
      <div className='flex flex-col gap-1 w-full'>
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-6 w-full' />
      </div>
    </div>
  </Card>
);

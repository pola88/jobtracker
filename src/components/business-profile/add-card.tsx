'use client';

import { Plus } from 'lucide-react';

import { MODAL_NAME } from '@/components/business-profile/business-modal';
import { Card } from '@/components/card';
import { useModal } from '@/hooks/use-modal';
import { cn } from '@/lib/utils';

export type AddBusinessProfileProps = {
  isClient?: boolean;
  isLoading?: boolean;
};

export const AddBusinessProfileCard = ({
  isClient = false,
  isLoading = false,
}: AddBusinessProfileProps) => {
  const { toggleModal } = useModal({ modalName: MODAL_NAME });
  const handleOnClick = () => {
    if (isLoading) {
      return;
    }
    toggleModal({ isClient });
  };

  return (
    <Card
      className={cn(
        'flex flex-col gap-1 relative items-center justify-center min-h-37',
        !isLoading && 'cursor-pointer hover:bg-gray-100',
      )}
      onClick={handleOnClick}
    >
      <Plus className='h-4 w-4' />
    </Card>
  );
};

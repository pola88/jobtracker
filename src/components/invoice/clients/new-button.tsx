'use client';

import { MODAL_NAME } from '@/components/business-profile/business-modal';
import { AddButton } from '@/components/button/add-button';
import { useModal } from '@/hooks/use-modal';

export const NewButton = () => {
  const { toggleModal } = useModal({ modalName: MODAL_NAME });
  const handleOnClick = () => {
    toggleModal({ isClient: true });
  };
  return <AddButton onClick={handleOnClick} label='Add' />;
};

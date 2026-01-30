'use client';

import { Button } from '@/components/button';
import { useModal } from '@/hooks/use-modal';

const MODAL_NAME = 'NewInterviewModal';

export const AddApplicationBtn = () => {
  const { toggleModal } = useModal({
    modalName: MODAL_NAME,
  });

  return <Button onClick={() => toggleModal()}>Add Application</Button>;
};

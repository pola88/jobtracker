'use client';

import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useModalStore } from '@/stores/modal-store';

interface UseModalProps {
  modalName: string;
}

export const useModal = ({ modalName }: UseModalProps) => {
  const modalStatus = useModalStore(
    useShallow((state) => state.modalStatus[modalName] ?? false),
  );
  const openModal = useModalStore(useShallow((state) => state.openModal));
  const closeModal = useModalStore(useShallow((state) => state.closeModal));

  const toggleModal = useCallback(
    (objectId?: string) => {
      if (modalStatus) {
        closeModal(modalName);
      } else {
        openModal(modalName, objectId);
      }
    },
    [modalStatus, openModal, closeModal, modalName],
  );

  return { modalStatus, toggleModal };
};

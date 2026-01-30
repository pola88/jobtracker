import { create } from 'zustand';

type ObjectStatus = {
  id: string | undefined;
  isOpen: boolean;
};

type ModalStore = {
  modalStatus: Record<string, ObjectStatus>;
  openModal: (modalName: string, objectId?: string) => void;
  closeModal: (modalName: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalStatus: {},
  objectId: null,
  openModal: (modalName: string, objectId?: string) =>
    set((state) => ({
      modalStatus: {
        ...state.modalStatus,
        [modalName]: { id: objectId, isOpen: true },
      },
      objectId,
    })),
  closeModal: (modalName: string) =>
    set((state) => {
      const { [modalName]: _, ...rest } = state.modalStatus;
      return {
        modalStatus: {
          ...rest,
        },
      };
    }),
}));

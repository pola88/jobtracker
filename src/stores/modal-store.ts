import { create } from 'zustand';

export type Payload = {
  [id: string]: string | boolean;
};

type ObjectStatus = {
  id?: string;
  isOpen: boolean;
  payload?: Payload;
};

type ModalStore = {
  modalStatus: Record<string, ObjectStatus>;
  openModal: (modalName: string, payload?: Payload) => void;
  closeModal: (modalName: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalStatus: {},
  openModal: (modalName: string, payload?: Payload) =>
    set((state) => ({
      modalStatus: {
        ...state.modalStatus,
        [modalName]: {
          isOpen: true,
          payload,
          ...(payload?.id && { id: payload?.id.toString() }),
        },
      },
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

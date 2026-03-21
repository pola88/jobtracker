import { create } from 'zustand';

type TouchStoreState = {
  updatedAt: number;
  touch: () => void;
};

export const createTouchStore = () =>
  create<TouchStoreState>((set) => ({
    updatedAt: 0,
    touch: () => {
      set({ updatedAt: Date.now() });
    },
  }));

import { create } from 'zustand';

type InterviewStoreState = {
  updatedAt: number;
  touch: () => void;
};

export const useInterviewStore = create<InterviewStoreState>((set) => ({
  updatedAt: 0,
  touch: () => {
    set({ updatedAt: Date.now() });
  },
}));

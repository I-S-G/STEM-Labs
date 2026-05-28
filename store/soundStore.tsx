import { create } from "zustand";

export type SoundEntry = {
  location: string;
  dbLevel: number;
};

type SoundStore = {
  entries: SoundEntry[];
  addEntry: (entry: SoundEntry) => void;
  reset: () => void;
};

export const useSoundStore = create<SoundStore>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => ({
      entries: [...state.entries, entry],
    })),
  reset: () => set({ entries: [] }),
}));
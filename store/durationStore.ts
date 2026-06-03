import { create } from "zustand";

type DurationStore = {
  // final stored values
  durationWithParachute: number | null;
  durationWithoutParachute: number | null;

  // temporary working value
  tempDuration: number | null;

  // setters
  setDurationWithParachute: (value: number) => void;
  setDurationWithoutParachute: (value: number) => void;

  setTempDuration: (value: number | null) => void;

  // helpers
  commitTempToWithParachute: () => void;
  commitTempToWithoutParachute: () => void;

  resetTemp: () => void;
  resetAll: () => void;
};

export const useDurationStore = create<DurationStore>((set, get) => ({
  // ---------------- INITIAL STATE ----------------
  durationWithParachute: null,
  durationWithoutParachute: null,
  tempDuration: null,

  // ---------------- SETTERS ----------------
  setDurationWithParachute: (value) =>
    set({ durationWithParachute: value }),

  setDurationWithoutParachute: (value) =>
    set({ durationWithoutParachute: value }),

  setTempDuration: (value) =>
    set({ tempDuration: value }),

  // ---------------- COMMIT TEMP ----------------
  commitTempToWithParachute: () => {
    const temp = get().tempDuration;
    if (temp != null) {
      set({
        durationWithParachute: temp,
        tempDuration: null,
      });
    }
  },

  commitTempToWithoutParachute: () => {
    const temp = get().tempDuration;
    if (temp != null) {
      set({
        durationWithoutParachute: temp,
        tempDuration: null,
      });
    }
  },

  // ---------------- RESET ----------------
  resetTemp: () => set({ tempDuration: null }),

  resetAll: () =>
    set({
      durationWithParachute: null,
      durationWithoutParachute: null,
      tempDuration: null,
    }),
}));
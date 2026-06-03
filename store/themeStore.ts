import { create } from "zustand";

export type ThemeMode = "light" | "dark";

type ThemeState = {
  themeMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  themeMode: "dark",

  setTheme: (mode) => set({ themeMode: mode }),

  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),
}));

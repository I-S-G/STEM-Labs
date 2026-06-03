import { useThemeStore } from "@/store/themeStore";
import { lightTheme, darkTheme } from "@/constants/colors";

export const useTheme = () => {
  const themeMode = useThemeStore((s) => s.themeMode);

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return {
    theme,
    themeMode,
    isDark: themeMode === "dark",
  };
};

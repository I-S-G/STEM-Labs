import DefaultButton from "@/components/buttons/defaultButton";
import { createGlobalStyles } from "@/styles/globalStyles";
import { View, Text } from "react-native";
import { AppSettingStyles } from "@/styles/settingsStyles";
import { useTheme } from "@/hooks/useTheme";
import { useThemeStore } from "@/store/themeStore";

export default function Theme() {
  const { theme } = useTheme();
  const setTheme = useThemeStore((state) => state.setTheme);

  const globalStyles = createGlobalStyles(theme);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}>Choose Theme</Text>

      <View style={AppSettingStyles.form}>
        <DefaultButton title="Dark" onPress={() => setTheme("dark")} />

        <DefaultButton title="Light" onPress={() => setTheme("light")} />
      </View>
    </View>
  );
}

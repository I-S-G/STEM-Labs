import { View, Text } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import SettingSection from "@/components/settingSection";
import DefaultButton from "@/components/defaultButton";
import { router } from "expo-router";
import { logOut } from "@/utils/firebase/auth";

export default function Settings() {
  const onLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}> Settings </Text>
      <SettingSection />
      <DefaultButton title="Logout" onPress={onLogout} />
    </View>
  );
}

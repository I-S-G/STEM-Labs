import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/globalStyles";
import SettingSection from "@/components/settings/settingSection";
import DefaultButton from "@/components/buttons/defaultButton";
import { router } from "expo-router";
import { logOut } from "@/utils/firebase/auth";

export default function Settings() {
  const onLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={globalStyles.screen}>
        <Text style={globalStyles.title}> Settings </Text>
        <SettingSection />
        <DefaultButton title="Logout" onPress={onLogout} />
      </View>
    </SafeAreaView>
  );
}

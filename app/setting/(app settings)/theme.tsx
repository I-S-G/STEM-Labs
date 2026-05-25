import DefaultButton from "@/components/defaultButton";
import { globalStyles } from "@/styles/globalStyles";
import { View, Text, StyleSheet } from "react-native";
import { AppSettingStyles } from "@/styles/settingsStyles";

export default function Theme() {
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}> Choose Theme </Text>
      <View style={AppSettingStyles.form}>
        <DefaultButton title="Dark" onPress={() => alert("button pressed")} />
        <DefaultButton title="Light" onPress={() => alert("button pressed")} />
      </View>
    </View>
  );
}


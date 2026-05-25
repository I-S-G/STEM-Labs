import DefaultButton from "@/components/defaultButton";
import Input from "@/components/input";
import { globalStyles } from "@/styles/globalStyles";
import { View, Text } from "react-native";
import { TeamSettingStyles } from "@/styles/settingsStyles";

export default function Team() {
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}> Change Team</Text>
      <View style={TeamSettingStyles.form}>
        <Input label="Team Discriminator" />
        <DefaultButton title="Change" onPress={() => alert("button pressed")} />
      </View>
    </View>
  );
}
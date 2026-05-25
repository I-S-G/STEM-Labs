import DefaultButton from "@/components/defaultButton";
import Input from "@/components/input";
import { View, Text } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import { TeamSettingStyles } from "@/styles/settingsStyles";

export default function TeamName() {
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}> Change Team Name </Text>
      <View style={TeamSettingStyles.form}>
        <Input label="Team Name" />
        <DefaultButton title="Change" onPress={() => alert("button pressed")} />
      </View>
    </View>
  );
}


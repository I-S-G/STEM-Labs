import { View, Text, StyleSheet } from "react-native";
import Settings from "./settings";
import { settingsMap } from "@/data/settings";

export default function SettingSection() {
  return (
    <View style={styles.container}>
      {settingsMap.map((settingSection) => (
        <View style={styles.settingSection} key={settingSection.name}>
          <Text style={styles.subheading}> {settingSection.name} </Text>
          <Settings settings={settingSection.column} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  settingSection: {
    marginBottom: 15,
  },
  subheading: {
    color: "white",
    fontSize: 18,
  },
});

import { View, Text, StyleSheet } from "react-native";
import { Href, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type TSetting = {
  name: string;
  route: string; //change to href when routes created
};

type SettingsProp = {
  settings: TSetting[];
};

export default function Settings({ settings }: SettingsProp) {
  return (
    <View>
      {settings.map((settings) => (
        <Link href={settings.route as Href} key={settings.name}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}> {settings.name} </Text>
            <Ionicons name="chevron-forward" size={20} color={"white"} />
          </View>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 15,
  },
  settingText: {
    fontWeight: "bold",
    color: "white",
  },
});

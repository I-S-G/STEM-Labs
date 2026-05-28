import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import BackButton from "@/components/buttons/backButton";
import { Colors } from "@/constants/colors";

export default function SettingLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${Colors.header}`,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginTop: 60,
    paddingBottom: 15,
  },
  content: {
    flex: 1,
  },
});

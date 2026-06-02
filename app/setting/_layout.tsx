import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import BackButton from "@/components/buttons/backButton";
import { Colors } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    </SafeAreaView>
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
    paddingBottom: 15,
    paddingTop: 15,
  },
  content: {
    flex: 1,
  },
});

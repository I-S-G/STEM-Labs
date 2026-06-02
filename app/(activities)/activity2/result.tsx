import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useSoundStore } from "@/store/soundStore";
import { globalStyles } from "@/styles/globalStyles";
import DefaultButton from "@/components/buttons/defaultButton";
import { router } from "expo-router";
import { increaseActivity } from "@/utils/firebase/users";
import { useUserStore } from "@/store/userStore";

export default function ResultsScreen() {
  const { currentUser } = useUserStore();
  const entries = useSoundStore((s) => s.entries);
  const reset = useSoundStore((s) => s.reset);

  const sorted = [...entries].sort((a, b) => b.dbLevel - a.dbLevel);

  const loudest = sorted[0];
  const quietest = sorted[sorted.length - 1];

  const onSubmit = () => {
    reset();
    router.replace("/(tabs)");
    Alert.alert("Completed", "Congratulations! Activity Completed");
    if (currentUser) increaseActivity(currentUser.uid);
  };

  return (
    <ScrollView style={globalStyles.screen}>
      <Text style={globalStyles.title}>Sound Level Results</Text>

      <View style={styles.zones}>
        {sorted.map((item, i) => (
          <Text key={i} style={styles.text}>
            📍 {item.location}: {item.dbLevel.toFixed(1)} dBFS
          </Text>
        ))}
      </View>

      <View style={[globalStyles.card, { width: "80%", alignSelf: "center" }]}>
        <Text style={globalStyles.text}>
          🔊 Loudest Zone: {loudest?.location} ({loudest?.dbLevel.toFixed(1)})
        </Text>

        <Text style={globalStyles.text}>
          🤫 Quietest Zone: {quietest?.location} ({quietest?.dbLevel.toFixed(1)}
          )
        </Text>
      </View>

      <DefaultButton title="Finish" onPress={onSubmit} />
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  zones: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
});

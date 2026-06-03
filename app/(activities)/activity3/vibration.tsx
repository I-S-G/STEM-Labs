import DefaultButton from "@/components/buttons/defaultButton";
import { useTheme } from "@/hooks/useTheme";
import { useUserStore } from "@/store/userStore";
import { createGlobalStyles } from "@/styles/globalStyles";
import { increaseActivity } from "@/utils/firebase/users";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, Vibration, StyleSheet, Alert } from "react-native";

export default function VibrationToggleButton() {
  const { currentUser } = useUserStore();

  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  const [isVibrating, setIsVibrating] = useState(false);

  useEffect(() => {
    if (isVibrating) {
      // Repeat vibration pattern
      Vibration.vibrate([0, 500, 300], true);
    } else {
      Vibration.cancel();
    }

    // Stop vibration when component unmounts
    return () => Vibration.cancel();
  }, [isVibrating]);

  const onSubmit = () => {
    router.replace("/(tabs)");
    Alert.alert("Completed", "Congratulations! Activity Completed");
    if (currentUser) increaseActivity(currentUser.uid);
  };

  return (
    <View style={[globalStyles.screen, { alignItems: "center" }]}>
      <View style={styles.centerBtn}>
        <DefaultButton
          onPress={() => setIsVibrating(!isVibrating)}
          title={isVibrating ? "Stop Vibration" : "Start Vibration"}
        />
      </View>
      <View style={styles.bottomBtn}>
        <DefaultButton title="Finish" onPress={onSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerBtn: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBtn: {
    width: "100%",
    paddingBottom: 100,
    alignItems: "center",
  },
});

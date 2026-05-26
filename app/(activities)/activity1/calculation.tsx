import { Text, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Input from "@/components/input";

import { useDurationStore } from "@/store/durationStore";
import { useUserStore } from "@/store/userStore";

import { globalStyles } from "@/styles/globalStyles";
import { router } from "expo-router";
import DefaultButton from "@/components/defaultButton";
import { increaseActivity } from "@/utils/firebase/users";

export default function Calculation() {
  const { setDurationWithParachute, tempDuration, durationWithoutParachute } =
    useDurationStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (tempDuration) {
      setDurationWithParachute(tempDuration);
    }
  }, [tempDuration]);

  // shared inputs
  const [distance, setDistance] = useState("");
  const [mass, setMass] = useState("");

  // WITHOUT PARACHUTE answers
  const [wV, setWV] = useState("");
  const [wA, setWA] = useState("");
  const [wF, setWF] = useState("");

  // WITH PARACHUTE answers
  const [pV, setPV] = useState("");
  const [pA, setPA] = useState("");
  const [pF, setPF] = useState("");

  const [feedback, setFeedback] = useState<any>(null);

  const checkAnswers = () => {
    const d = parseFloat(distance);
    const m = parseFloat(mass);

    if (!d || !m || !durationWithoutParachute || !tempDuration) return;

    // WITHOUT parachute
    const wVelocity = d / durationWithoutParachute;
    const wAccel = wVelocity / durationWithoutParachute;
    const wForce = m * wAccel;

    // WITH parachute
    const pVelocity = d / tempDuration;
    const pAccel = pVelocity / tempDuration;
    const pForce = m * pAccel;

    const isClose = (a: number, b: number) => Math.abs(a - b) <= a * 0.1;

    const allCorrect =
      isClose(wVelocity, parseFloat(wV)) &&
      isClose(wAccel, parseFloat(wA)) &&
      isClose(wForce, parseFloat(wF)) &&
      isClose(pVelocity, parseFloat(pV)) &&
      isClose(pAccel, parseFloat(pA)) &&
      isClose(pForce, parseFloat(pF));

    if (allCorrect) {
      router.replace("/"); // or router.push("/")
      alert("Congratulations! Activity Completed");
      if (currentUser) increaseActivity(currentUser.uid);
      return;
    }

    // otherwise show feedback
    setFeedback({
      wV: isClose(wVelocity, parseFloat(wV))
        ? "✅ Correct"
        : `❌ ${wVelocity.toFixed(2)} m/s`,

      wA: isClose(wAccel, parseFloat(wA))
        ? "✅ Correct"
        : `❌ ${wAccel.toFixed(2)} m/s²`,

      wF: isClose(wForce, parseFloat(wF))
        ? "✅ Correct"
        : `❌ ${wForce.toFixed(2)} N`,

      pV: isClose(pVelocity, parseFloat(pV))
        ? "✅ Correct"
        : `❌ ${pVelocity.toFixed(2)} m/s`,

      pA: isClose(pAccel, parseFloat(pA))
        ? "✅ Correct"
        : `❌ ${pAccel.toFixed(2)} m/s²`,

      pF: isClose(pForce, parseFloat(pF))
        ? "✅ Correct"
        : `❌ ${pForce.toFixed(2)} N`,
    });
  };

  return (
    <ScrollView style={globalStyles.screen}>
      <Text style={globalStyles.title}>Calculation</Text>

      <Text style={styles.subtitle}> Known Values </Text>

      <Text style={styles.value}>
        Without Parachute Time: {durationWithoutParachute}s
      </Text>
      <Text style={styles.value}>With Parachute Time: {tempDuration}s</Text>

      <Input
        label="Drop Distance (m)"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
      />

      <Input
        label="Mass of Toy (kg)"
        value={mass}
        onChangeText={setMass}
        keyboardType="numeric"
      />

      {/* WITHOUT PARACHUTE */}
      <Text style={styles.subtitle}>Without Parachute</Text>

      <Input label="Final Velocity" value={wV} onChangeText={setWV} />
      {feedback && <Text>{feedback.wV}</Text>}

      <Input label="Acceleration" value={wA} onChangeText={setWA} />
      {feedback && <Text>{feedback.wA}</Text>}

      <Input label="Net Force" value={wF} onChangeText={setWF} />
      {feedback && <Text>{feedback.wF}</Text>}

      {/* WITH PARACHUTE */}
      <Text style={styles.subtitle}>With Parachute</Text>

      <Input label="Final Velocity" value={pV} onChangeText={setPV} />
      {feedback && <Text>{feedback.pV}</Text>}

      <Input label="Acceleration" value={pA} onChangeText={setPA} />
      {feedback && <Text>{feedback.pA}</Text>}

      <Input label="Net Force" value={pF} onChangeText={setPF} />
      {feedback && <Text>{feedback.pF}</Text>}

      {/* CHECK BUTTON */}
      <DefaultButton
        title="Check"
        onPress={checkAnswers}
        style={{
          marginBottom: 100,
        }}
      />
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  subtitle: {
    textAlign: "center",
    fontSize: 28,
    color: "white",
    marginTop: 15,
  },
  value: {
    textAlign: "center",
    color: "white",
  },
});

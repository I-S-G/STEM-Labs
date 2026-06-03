import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDurationStore } from "@/store/durationStore";
import DefaultButton from "../buttons/defaultButton";
import { createGlobalStyles } from "@/styles/globalStyles";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  marks: {
    start: number;
    end: number;
  };
  onReset: () => void;
};

export default function DropResult({ marks, onReset }: Props) {
  const setTempDuration = useDurationStore((state) => state.setTempDuration);

  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  const duration = Math.max(0, marks.end - marks.start);

  //store duration in temp on render
  useEffect(() => {
    const rounded = Number(duration.toFixed(2));
    setTempDuration(rounded);
  }, [duration]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>

      <Text style={globalStyles.text}>Start: {marks.start.toFixed(2)}s</Text>
      <Text style={globalStyles.text}>End: {marks.end.toFixed(2)}s</Text>

      <Text style={styles.duration}>Duration: {duration.toFixed(2)}s</Text>

      <DefaultButton
        onPress={onReset}
        style={{ width: "auto", marginTop: 100 }}
        title="Next"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  duration: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    color: "white",
  },
});

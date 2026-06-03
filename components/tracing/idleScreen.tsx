import { useTheme } from "@/hooks/useTheme";
import { createGlobalStyles } from "@/styles/globalStyles";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onStart: () => void;
};

export function IdleScreen({ onStart }: Props) {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  return (
    <View style={[globalStyles.screen, s.root]}>
      <Text style={globalStyles.title}>Circle Trace</Text>
      <View style={s.circle} />
      <Text style={globalStyles.text}>
        Hold and drag your finger to follow{"\n"}
        the moving circle. Stay on it.
      </Text>
      <TouchableOpacity style={s.btn} onPress={onStart} activeOpacity={0.75}>
        <Text style={s.btnText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 40,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#6366f1",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
  },
  btn: {
    marginTop: 12,
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    paddingHorizontal: 52,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

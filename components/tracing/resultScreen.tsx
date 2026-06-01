import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GAME_DURATION } from "@/constants/traceGame";
import { Colors } from "@/constants/colors";

type Props = {
  score: number; // 0-100 percentage
  trackedSec: number;
  onPlayAgain: () => void;
  onMenu: () => void;
};

function label(score: number): { text: string; color: string } {
  if (score >= 85) return { text: "Locked In", color: "#22c55e" };
  if (score >= 65) return { text: "Sharp", color: "#6366f1" };
  if (score >= 40) return { text: "Getting There", color: "#f59e0b" };
  return { text: "Keep Trying", color: "#ef4444" };
}

export function ResultScreen({
  score,
  trackedSec,
  onPlayAgain,
  onMenu,
}: Props) {
  const { text, color } = label(score);
  const offSec = GAME_DURATION - trackedSec;

  return (
    <View style={s.root}>
      <View style={[s.scoreRing, { borderColor: color }]}>
        <Text style={[s.scoreNum, { color }]}>
          {score}
          <Text style={s.pct}>%</Text>
        </Text>
      </View>

      <Text style={[s.label, { color }]}>{text}</Text>

      <View style={s.stats}>
        <View style={s.statCell}>
          <Text style={s.statNum}>{trackedSec}s</Text>
          <Text style={s.statLbl}>On circle</Text>
        </View>
        <View style={s.divider} />
        <View style={s.statCell}>
          <Text style={s.statNum}>{offSec}s</Text>
          <Text style={s.statLbl}>Off circle</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[s.btn, { backgroundColor: color }]}
        onPress={onPlayAgain}
        activeOpacity={0.75}
      >
        <Text style={s.btnText}>Play Again</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.btn, { backgroundColor: "rgb(0,0,0)" }]}
        onPress={onMenu}
        activeOpacity={0.75}
      >
        <Text style={s.btnText}> Menu </Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 40,
  },
  scoreRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNum: {
    fontSize: 44,
    fontWeight: "700",
    letterSpacing: -1,
  },
  pct: {
    fontSize: 20,
    fontWeight: "400",
  },
  label: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  stats: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 32,
    alignItems: "center",
  },
  statCell: {
    alignItems: "center",
    gap: 4,
  },
  statNum: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  statLbl: {
    fontSize: 12,
    color: "#555",
    letterSpacing: 0.3,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#222",
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 52,
    borderRadius: 12,
    marginTop: 4,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  menuLink: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: -4,
  },
});

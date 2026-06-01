import React, { useState, useCallback } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { IdleScreen } from "@/components/tracing/idleScreen";
import { GameScreen } from "@/components/tracing/gameScreen";
import { ResultScreen } from "@/components/tracing/resultScreen";
import { router } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { increaseActivity } from "@/utils/firebase/users";

type Phase = "idle" | "playing" | "result";

export default function App() {
  const { currentUser } = useUserStore();

  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [trackedSec, setTrackedSec] = useState(0);

  const handleStart = useCallback(() => setPhase("playing"), []);

  const handleEnd = useCallback((pct: number, secs: number) => {
    setScore(pct);
    setTrackedSec(secs);
    setPhase("result");
  }, []);

  const handlePlayAgain = useCallback(() => setPhase("playing"), []);
  const handleMenu = () => {
    router.replace("/(tabs)");
    alert("Congratulations! Activity Completed");
    if (currentUser) increaseActivity(currentUser.uid);
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {phase === "idle" && <IdleScreen onStart={handleStart} />}

      {phase === "playing" && <GameScreen onEnd={handleEnd} />}

      {phase === "result" && (
        <ResultScreen
          score={score}
          trackedSec={trackedSec}
          onPlayAgain={handlePlayAgain}
          onMenu={handleMenu}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
});

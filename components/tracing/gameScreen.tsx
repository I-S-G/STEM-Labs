import React, { useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
} from "react-native";
import { GameCanvas, GameCanvasHandle } from "./gameCanvas";
import { useGameLoop, Vec2 } from "@/hooks/useGameLoop";
import { useTimer } from "@/hooks/useTimer";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  GAME_DURATION,
  TICK_MS,
} from "@/constants/traceGame";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  onEnd: (score: number, trackedSec: number) => void;
};

export function GameScreen({ onEnd }: Props) {
  const { theme } = useTheme();

  const canvasRef = useRef<GameCanvasHandle>(null);

  // Game state refs (no re-render during loop)
  const circlePos = useRef<Vec2>({
    x: SCREEN_WIDTH / 2,
    y: SCREEN_HEIGHT * 0.45,
  });
  const velocity = useRef<Vec2>({ x: 1.2, y: 0.9 });
  const fingerPos = useRef<Vec2 | null>(null);
  const isTracking = useRef(false);
  const totalTicks = useRef(0);
  const trackedTicks = useRef(0);
  const circleTrail = useRef<Vec2[]>([]);
  const fingerTrail = useRef<Vec2[]>([]);

  // React state (only for HUD text)
  const [timeLeft, setTimeLeft] = React.useState(GAME_DURATION);

  const handleEnd = useCallback(() => {
    gameLoop.stop();
    const pct =
      totalTicks.current > 0
        ? Math.round((trackedTicks.current / totalTicks.current) * 100)
        : 0;
    const secs = Math.round((trackedTicks.current * TICK_MS) / 1000);
    onEnd(pct, secs);
  }, [onEnd]);

  const gameLoop = useGameLoop(
    {
      circlePos,
      velocity,
      fingerPos,
      isTracking,
      totalTicks,
      trackedTicks,
      circleTrail,
      fingerTrail,
    },
    () => {
      canvasRef.current?.update(
        circlePos.current,
        circleTrail.current,
        fingerPos.current,
        fingerTrail.current,
        isTracking.current,
      );
    },
  );

  const timer = useTimer((sLeft) => {
    setTimeLeft(sLeft);
    gameLoop.setSpeed(1 - sLeft / GAME_DURATION);
  }, handleEnd);

  useEffect(() => {
    gameLoop.start();
    timer.start();
    return () => {
      gameLoop.stop();
      timer.stop();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent) => {
        fingerPos.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
      },
      onPanResponderMove: (e: GestureResponderEvent) => {
        fingerPos.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
      },
      onPanResponderRelease: () => {
        fingerPos.current = null;
        fingerTrail.current = [];
      },
      onPanResponderTerminate: () => {
        fingerPos.current = null;
        fingerTrail.current = [];
      },
    }),
  ).current;

  return (
    <View style={[s.root, {backgroundColor: theme.background}]} {...panResponder.panHandlers}>
      <GameCanvas ref={canvasRef} />

      {/* HUD — minimal, top of screen */}
      <View style={s.hud} pointerEvents="none">
        <Text style={s.time}>{timeLeft}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
  hud: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  time: {
    fontSize: 48,
    fontWeight: "300",
    color: "#fff",
    letterSpacing: -1,
    opacity: 0.9,
  },
});

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  CIRCLE_RADIUS,
} from "@/constants/traceGame";
import type { Vec2 } from "@/hooks/useGameLoop";

export type GameCanvasHandle = {
  update: (
    circlePos: Vec2,
    circleTrail: Vec2[],
    fingerPos: Vec2 | null,
    fingerTrail: Vec2[],
    tracking: boolean,
  ) => void;
};

function trailPath(pts: Vec2[]): string {
  if (pts.length < 2) return "";
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
}

export const GameCanvas = forwardRef<GameCanvasHandle>((_, ref) => {
  const circleRef = useRef<any>(null);
  const circleTrailRef = useRef<any>(null);
  const fingerTrailRef = useRef<any>(null);
  const cursorRef = useRef<any>(null);
  const ringRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    update(circlePos, circleTrail, fingerPos, fingerTrail, tracking) {
      circleRef.current?.setNativeProps({ cx: circlePos.x, cy: circlePos.y });
      ringRef.current?.setNativeProps({
        cx: circlePos.x,
        cy: circlePos.y,
        stroke: tracking ? "#22c55e" : "#6366f1",
        strokeOpacity: tracking ? 0.6 : 0.25,
      });
      circleTrailRef.current?.setNativeProps({ d: trailPath(circleTrail) });
      if (fingerPos) {
        cursorRef.current?.setNativeProps({
          cx: fingerPos.x,
          cy: fingerPos.y,
          opacity: 1,
        });
        fingerTrailRef.current?.setNativeProps({ d: trailPath(fingerTrail) });
      } else {
        cursorRef.current?.setNativeProps({ opacity: 0 });
        fingerTrailRef.current?.setNativeProps({ d: "" });
      }
    },
  }));

  return (
    <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Circle ghost trail */}
      <Path
        ref={circleTrailRef}
        d=""
        stroke="#6366f1"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.15}
      />

      {/* Finger trail */}
      <Path
        ref={fingerTrailRef}
        d=""
        stroke="#22c55e"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.45}
      />

      {/* Ring (locked indicator) */}
      <Circle
        ref={ringRef}
        cx={SCREEN_WIDTH / 2}
        cy={SCREEN_HEIGHT / 2}
        r={CIRCLE_RADIUS + 14}
        stroke="#6366f1"
        strokeWidth={1.5}
        strokeOpacity={0.25}
        fill="none"
      />

      {/* The circle */}
      <Circle
        ref={circleRef}
        cx={SCREEN_WIDTH / 2}
        cy={SCREEN_HEIGHT / 2}
        r={CIRCLE_RADIUS}
        fill="#6366f1"
      />

      {/* Finger cursor */}
      <Circle
        ref={cursorRef}
        cx={-100}
        cy={-100}
        r={8}
        fill="#22c55e"
        opacity={0}
      />
    </Svg>
  );
});

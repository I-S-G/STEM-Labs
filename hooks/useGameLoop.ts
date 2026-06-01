import { useRef, useCallback } from "react";
import {
  SCREEN_WIDTH,
  TICK_MS,
  SPEED_START,
  SPEED_END,
  BOUNCE_PADDING,
  TOP_BOUND,
  BOTTOM_BOUND,
  HIT_RADIUS,
  TRAIL_LENGTH,
} from "@/constants/traceGame";

export type Vec2 = { x: number; y: number };

export type GameRefs = {
  circlePos: React.RefObject<Vec2>;
  velocity: React.RefObject<Vec2>;
  fingerPos: React.RefObject<Vec2 | null>;
  isTracking: React.RefObject<boolean>;
  totalTicks: React.RefObject<number>;
  trackedTicks: React.RefObject<number>;
  circleTrail: React.RefObject<Vec2[]>;
  fingerTrail: React.RefObject<Vec2[]>;
};

function randomVelocity(speed: number): Vec2 {
  const angle = Math.random() * Math.PI * 2;
  return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function useGameLoop(refs: GameRefs, onTick: () => void) {
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speedRef = useRef(SPEED_START);

  const start = useCallback(() => {
    speedRef.current = SPEED_START;
    refs.velocity.current = randomVelocity(SPEED_START);

    loopRef.current = setInterval(() => {
      const vel = refs.velocity.current;
      let { x, y } = refs.circlePos.current;

      x += vel.x;
      y += vel.y;

      // Bounce
      if (x < BOUNCE_PADDING || x > SCREEN_WIDTH - BOUNCE_PADDING) {
        refs.velocity.current.x *= -1;
        refs.velocity.current.y += (Math.random() - 0.5) * 0.3;
        x = clamp(x, BOUNCE_PADDING, SCREEN_WIDTH - BOUNCE_PADDING);
      }
      if (y < TOP_BOUND || y > BOTTOM_BOUND) {
        refs.velocity.current.y *= -1;
        refs.velocity.current.x += (Math.random() - 0.5) * 0.3;
        y = clamp(y, TOP_BOUND, BOTTOM_BOUND);
      }

      // Normalise to current speed
      const mag = Math.hypot(refs.velocity.current.x, refs.velocity.current.y);
      if (mag > 0) {
        refs.velocity.current.x =
          (refs.velocity.current.x / mag) * speedRef.current;
        refs.velocity.current.y =
          (refs.velocity.current.y / mag) * speedRef.current;
      }

      refs.circlePos.current = { x, y };

      // Trails
      refs.circleTrail.current = [
        ...refs.circleTrail.current.slice(-(TRAIL_LENGTH - 1)),
        { x, y },
      ];
      const fp = refs.fingerPos.current;
      if (fp) {
        refs.fingerTrail.current = [
          ...refs.fingerTrail.current.slice(-(TRAIL_LENGTH - 1)),
          fp,
        ];
      }

      // Tracking detection
      const tracking = fp
        ? Math.hypot(fp.x - x, fp.y - y) <= HIT_RADIUS
        : false;
      refs.isTracking.current = tracking;

      // Score
      refs.totalTicks.current++;
      if (tracking) refs.trackedTicks.current++;

      onTick();
    }, TICK_MS);
  }, [refs, onTick]);

  const stop = useCallback(() => {
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }
  }, []);

  const setSpeed = useCallback((t: number) => {
    // t = elapsed fraction 0→1
    speedRef.current = SPEED_START + t * (SPEED_END - SPEED_START);
  }, []);

  return { start, stop, setSpeed };
}

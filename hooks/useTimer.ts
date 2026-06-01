import { useRef, useCallback } from "react";
import { GAME_DURATION } from "@/constants/traceGame";

export function useTimer(
  onTick: (secondsLeft: number) => void,
  onEnd: () => void,
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const remaining = useRef(GAME_DURATION);

  const start = useCallback(() => {
    remaining.current = GAME_DURATION;
    intervalRef.current = setInterval(() => {
      remaining.current -= 1;
      onTick(remaining.current);
      if (remaining.current <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        onEnd();
      }
    }, 1000);
  }, [onTick, onEnd]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return { start, stop };
}

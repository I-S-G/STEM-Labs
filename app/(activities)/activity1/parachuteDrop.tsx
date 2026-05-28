import { useEffect } from "react";
import { useDurationStore } from "@/store/durationStore";
import RecordDropFlow from "@/components/drop recording/recordDropFlow";

export default function ToyDrop() {
  const { tempDuration, setDurationWithoutParachute } = useDurationStore();

  useEffect(() => {
    if (tempDuration != null) {
      setDurationWithoutParachute(tempDuration);
    }
  }, []);

  return (
    <RecordDropFlow
      redirectRoute="/(activities)/activity1/calculation"
      message="Record Drop With Parachute"
    />
  );
}

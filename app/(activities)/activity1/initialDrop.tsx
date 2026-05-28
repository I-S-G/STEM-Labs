import RecordDropFlow from "@/components/drop recording/recordDropFlow";

export default function InitialDrop() {
  return (
    <RecordDropFlow
      redirectRoute="/(activities)/activity1/parachuteDrop"
      message="Record Drop Without Parachute"
    />
  );
}

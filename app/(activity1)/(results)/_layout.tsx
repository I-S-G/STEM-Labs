import { Stack } from "expo-router";

export default function ResultsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="results"
        options={{
          title: "Results",
        }}
      />
      <Stack.Screen
        name="commmentSection"
        options={{
          title: "Comment Section",
        }}
      />
    </Stack>
  );
}

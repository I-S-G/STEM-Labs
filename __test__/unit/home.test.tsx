import Home from "@/app/(tabs)";
import { render, screen } from "@testing-library/react-native";

// Mock dependencies
jest.mock("@/data/activities", () => ({
  Activities: {
    Activity1: { title: "Activity 1", description: "Parachute Drop Challenge" },
    Activity2: { title: "Activity 2", description: "Sound Pollution Hunter" },
  },
}));

jest.mock("@/styles/globalStyles", () => ({
  createGlobalStyles: () => ({
    screen: {},
    title: {},
  }),
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    theme: {
      background: "#000",
      text: "#fff",
    },
  }),
}));

jest.mock("@/components/activityCard", () => {
  const { Text } = require("react-native");
  return ({ activity }: { activity: { title: string } }) => (
    <Text testID="activity-card">{activity.title}</Text>
  );
});

jest.mock(
  "react-native-safe-area-context",
  () => require("react-native-safe-area-context/jest/mock").default,
);

describe("Home", () => {
  it("renders the title", () => {
    render(<Home />);
    expect(screen.getByText("Choose Activity")).toBeTruthy();
  });

  it("renders an ActivityCard for each activity", () => {
    render(<Home />);
    const cards = screen.getAllByTestId("activity-card");
    expect(cards).toHaveLength(2);
  });

  it("renders activity titles in the cards", () => {
    render(<Home />);
    expect(screen.getByText("Activity 1")).toBeTruthy();
    expect(screen.getByText("Activity 2")).toBeTruthy();
  });
});

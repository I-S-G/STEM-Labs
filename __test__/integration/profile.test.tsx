import { render, screen, waitFor } from "@testing-library/react-native";
import Profile from "@/app/(tabs)/profile";
import { useUserStore } from "@/store/userStore";


jest.mock("@/styles/globalStyles", () => ({
  globalStyles: { screen: {}, title: {} },
}));

jest.mock(
  "react-native-safe-area-context",
  () => require("react-native-safe-area-context/jest/mock").default,
);

// Firebase mocks
// We let the real Zustand store and loadUser logic run

jest.mock("@/utils/firebase/firebase", () => ({
  auth: { currentUser: { uid: "user-123", email: "test@example.com" } },
}));

jest.mock("@/utils/firebase/users", () => ({
  getUserData: jest.fn(),
}));

jest.mock("@/utils/firebase/auth", () => ({
  logOut: jest.fn(),
}));


import { getUserData } from "@/utils/firebase/users";
const mockedGetUserData = getUserData as jest.Mock;

const mockUserData = {
  firstName: "John",
  teamName: "Shadow Blade",
  teamDiscriminator: "001",
  activityCompleted: 3,
  membership: "Free",
};

// Reset Zustand store state between tests
beforeEach(() => {
  useUserStore.setState({ currentUser: null });
  jest.clearAllMocks();
});

//Tests 

describe("Profile (integration)", () => {
  it("renders the title and section heading", () => {
    render(<Profile />);

    expect(screen.getByText("Profile")).toBeTruthy();
    expect(screen.getByText("User Details")).toBeTruthy();
  });

  it("renders nothing when there is no logged-in user", async () => {
    // auth.currentUser is set, but getUserData returns null (e.g. doc missing)
    mockedGetUserData.mockResolvedValueOnce(null);

    render(<Profile />);

    await waitFor(() => {
      expect(mockedGetUserData).toHaveBeenCalledWith("user-123");
    });

    // No user fields should be rendered
    expect(screen.queryByText(/firstName/i)).toBeNull();
  });

  it("loads and displays user fields after mount", async () => {
    mockedGetUserData.mockResolvedValueOnce(mockUserData);

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText(/first Name: John/i)).toBeTruthy();
      expect(screen.getByText(/team Name: Shadow Blade/i)).toBeTruthy();
      expect(screen.getByText(/team Discriminator: 001/i)).toBeTruthy();
      expect(screen.getByText(/activity Completed: 3/i)).toBeTruthy();
      expect(screen.getByText(/membership: Free/i)).toBeTruthy();
    });
  });

  it("calls getUserData with the current user uid", async () => {
    mockedGetUserData.mockResolvedValueOnce(mockUserData);

    render(<Profile />);

    await waitFor(() => {
      expect(mockedGetUserData).toHaveBeenCalledTimes(1);
      expect(mockedGetUserData).toHaveBeenCalledWith("user-123");
    });
  });

  it("renders fields in the correct order", async () => {
    mockedGetUserData.mockResolvedValueOnce(mockUserData);

    render(<Profile />);

    await waitFor(() => {
      const fields = screen.getAllByText(/:/);
      const labels = fields.map((f) => f.props.children[0].trim());
      expect(labels).toEqual([
        "first Name",
        "team Name",
        "team Discriminator",
        "activity Completed",
        "membership",
      ]);
    });
  });
});

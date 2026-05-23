import { create } from "zustand";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type TeamData = {
  teamName?: string;
  teamDiscriminator?: string;
};

type Store = {
  signupData: Partial<SignupData>;
  teamData: Partial<TeamData>;

  setSignupData: (data: SignupData) => void;
  setTeamData: (data: TeamData) => void;

  clear: () => void;
};

export const useSignupStore = create<Store>((set) => ({
  signupData: {},
  teamData: {},

  setSignupData: (data) => set({ signupData: data }),
  setTeamData: (data) => set({ teamData: data }),

  clear: () => set({ signupData: {}, teamData: {} }),
}));
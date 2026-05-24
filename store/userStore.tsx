import { create } from "zustand";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase/firebase";

type AppUser = {
  uid: string;
  email: string | null;
  firstName: string;
  teamName: string;
  teamDiscriminator: string;
};

type UserStore = {
  currentUser: AppUser | null;

  setCurrentUser: (user: AppUser | null) => void;
  signOutUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  signOutUser: async () => {
    try {
      await signOut(auth);
      set({ currentUser: null });
    } catch (err) {
      console.error("signOut failed:", err);
    }
  },
}));

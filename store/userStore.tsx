import { create } from "zustand";
import { logOut } from "@/utils/firebase/auth";
import { getUserData } from "@/utils/firebase/users";
import { auth } from "@/utils/firebase/firebase";

export type AppUser = {
  uid: string;
  email: string | null;
  firstName: string;
  teamName: string;
  teamDiscriminator: string;
  activityCompleted: number;
  membership: string;
};

type UserStore = {
  currentUser: AppUser | null;

  setCurrentUser: (user: AppUser | null) => void;
  loadUser: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  loadUser: async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const data = await getUserData(currentUser.uid);

      if (!data) return;

      set({
        currentUser: {
          uid: currentUser.uid,
          email: currentUser.email,
          firstName: data.firstName,
          teamName: data.teamName,
          teamDiscriminator: data.teamDiscriminator,
          activityCompleted: data.activityCompleted ?? 0,
          membership: data.membership,
        },
      });
    } catch (err) {
      console.error("loadUser failed:", err);
    }
  },

  signOutUser: async () => {
    try {
      await logOut();
      set({ currentUser: null });
    } catch (err) {
      console.error("signOut failed:", err);
    }
  },
}));

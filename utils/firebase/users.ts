import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { deleteUser, User, updatePassword } from "firebase/auth";
import { db, auth } from "./firebase";

import { SignupData, TeamData } from "@/store/signupStore";
import { createTeam, joinTeam } from "./teams";

const createUserDocument = async (
  uid: string,
  data: {
    email: string | null;
    firstName: string;
    teamName: string;
    teamDiscriminator: string;
  },
) => {
  const userRef = doc(db, "users", uid);

  const { email, firstName, teamName, teamDiscriminator } = data;

  await setDoc(userRef, {
    createdAt: new Date(),
    email,
    firstName,
    teamName,
    teamDiscriminator,
    activityCompleted: 0,
    membership: "Free",
  });
};

export const getUserData = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data();
};

export const createUser = async (
  userAuth: User,
  formData: SignupData & TeamData,
) => {
  try {
    const userRef = doc(db, "users", userAuth.uid);
    const existingUser = await getDoc(userRef);

    if (existingUser.exists()) return;

    const firstName = formData.name;

    let teamInfo = {
      teamName: "",
      teamDiscriminator: "",
    };

    if (formData.teamName) {
      teamInfo = await createTeam(formData.teamName, firstName);
    } else if (formData.teamDiscriminator) {
      teamInfo = await joinTeam(formData.teamDiscriminator, firstName);
    }

    await createUserDocument(userAuth.uid, {
      email: userAuth.email,
      firstName,
      ...teamInfo,
    });

  } catch (err) {
    await deleteUser(userAuth);
    throw new Error("Failed");
  }
};

export const updateName = async (uid: string, firstName: string) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    firstName,
  });
};

export const changePassword = async (newPassword: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user");
  }

  await updatePassword(user, newPassword);
};
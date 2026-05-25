import { doc, getDoc, setDoc } from "firebase/firestore";
import { deleteUser, User } from "firebase/auth";
import { db } from "./firebase";

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

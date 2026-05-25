import {
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

const generateTeamDiscriminator = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const getTeamByDiscriminator = async (discriminator: string) => {
  const teamsRef = collection(db, "teams");

  const q = query(teamsRef, where("teamDiscriminator", "==", discriminator));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Team not found");
  }

  const docSnap = snapshot.docs[0];

  return {
    id: docSnap.id,
    data: docSnap.data(),
  };
};

export const createTeam = async (teamName: string, uid: string) => {
  const createdAt = new Date();
  const teamDiscriminator = generateTeamDiscriminator();
  const teamRef = doc(db, "teams", teamDiscriminator);

  await setDoc(teamRef, {
    teamName,
    teamDiscriminator,
    createdAt,
    members: [uid],
  });

  return {
    teamName,
    teamDiscriminator,
  };
};

export const joinTeam = async (discriminator: string, uid: string) => {
  const team = await getTeamByDiscriminator(discriminator);

  await updateDoc(doc(db, "teams", team.id), {
    members: arrayUnion(uid),
  });

  return {
    teamName: team.data.teamName,
    teamDiscriminator: team.data.teamDiscriminator,
  };
};

export const changeTeamName = async (
  discriminator: string,
  newTeamName: string,
) => {
  const team = await getTeamByDiscriminator(discriminator);

  // 1. update team document
  await updateDoc(doc(db, "teams", team.id), {
    teamName: newTeamName,
  });

  // 2. update all users in team using stored member uids
  const members: string[] = team.data.members || [];

  const updates = members.map((uid) =>
    updateDoc(doc(db, "users", uid), {
      teamName: newTeamName,
    }),
  );

  await Promise.all(updates);

  return {
    teamName: newTeamName,
    teamDiscriminator: discriminator,
  };
};

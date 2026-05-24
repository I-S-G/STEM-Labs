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

const generateTeamDiscriminator = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createTeam = async (teamName: string, firstName: string) => {
  const createdAt = new Date();
  const teamDiscriminator = generateTeamDiscriminator();
  const teamRef = doc(db, "teams", teamDiscriminator);

  await setDoc(teamRef, {
    teamName,
    teamDiscriminator,
    createdAt,
    members: [firstName],
  });

  return {
    teamName,
    teamDiscriminator,
  };
};

export const joinTeam = async (discriminator: string, firstName: string) => {
  const teamsRef = collection(db, "teams");
  const q = query(teamsRef, where("teamDiscriminator", "==", discriminator));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Team not found");
  }

  const teamDoc = querySnapshot.docs[0];
  const teamData = teamDoc.data();

  await updateDoc(doc(db, "teams", teamDoc.id), {
    members: arrayUnion(firstName),
  });

  return {
    teamName: teamData.teamName,
    teamDiscriminator: teamData.teamDiscriminator,
  };
};

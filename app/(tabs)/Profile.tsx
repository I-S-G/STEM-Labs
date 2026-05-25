import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import { AppUser, useUserStore } from "@/store/userStore";
import { useEffect } from "react";

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
};

const fieldOrder: (keyof AppUser)[] = [
  "firstName",
  "teamName",
  "teamDiscriminator",
  "activityCompleted",
  "membership",
];

export default function Profile() {
  const user = useUserStore((s) => s.currentUser);
   const loadUser = useUserStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>Profile</Text>
      <Text style={styles.subHeading}>User Details</Text>

      <View style={styles.details}>
        {user &&
          fieldOrder.map((key) => (
            <Text key={key} style={styles.text}>
              {formatLabel(key)}: {String(user[key])}
            </Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subHeading: {
    color: "white",
    fontSize: 25,
    marginTop: 50,
    marginLeft: 5,
    marginBottom: 10,
  },
  details: {
    backgroundColor: "white",
    marginHorizontal: 10,
    padding: 20,
  },
  text: {
    fontSize: 20,
    textTransform: "capitalize"
  },
});
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/globalStyles";

const user = {
  id: "uid1745",
  Name: "John",
  Team: "Shadow Walker",
  "Team Discriminator": "SW192",
  "Total Activity Completed": 14,
  Membership: "Free",
};

export default function Profile() {
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}> Profile </Text>
      <Text style={styles.subHeading}> User Details </Text>
      <View style={styles.details}>
        {Object.entries(user)
          .filter(([key]) => key !== "id")
          .map(([key, value]) => (
            <Text key={key} style={styles.text}>
              {key}: {value}
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
  },
});

import { Href, Link } from "expo-router";
import { ActivityProps } from "@/types/types";
import { View, Text, StyleSheet } from "react-native";

export default function ActivityCard({ activity }: { activity: ActivityProps }) {
  const { title, url, description } = activity;
  return (
    <Link href={url as Href} style={styles.activity}>
      <View style={{ width: "100%" }}>
        <Text style={styles.activityTitle}> {title} </Text>
        <Text> {description} </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  activity: {
    backgroundColor: "#99b9e2",
    marginHorizontal: 50,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  activityTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

import { useTheme } from "@/hooks/useTheme";
import { AppUser, useUserStore } from "@/store/userStore";
import { createGlobalStyles } from "@/styles/globalStyles";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//inserts space before every capital letter eg: firstName -> first name
const formatLabel = (key: string) => {
  return key.replace(/([A-Z])/g, " $1");
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

  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <SafeAreaView style={globalStyles.screen}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subHeading: {
    color: "white",
    fontSize: 25,
    marginTop: 50,
    marginLeft: 15,
    marginBottom: 10,
  },
  details: {
    backgroundColor: "white",
    marginHorizontal: 10,
    padding: 20,
  },
  text: {
    fontSize: 20,
    textTransform: "capitalize",
  },
});

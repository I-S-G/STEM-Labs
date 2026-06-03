import { Text, View, FlatList } from "react-native";
import { Activities } from "@/data/activities";
import { createGlobalStyles } from "@/styles/globalStyles";
import ActivityCard from "@/components/activityCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={globalStyles.screen}>
        <Text style={globalStyles.title}>Choose Activity</Text>
        <FlatList
          data={Object.values(Activities)}
          renderItem={({ item }) => <ActivityCard activity={item} />}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ marginTop: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

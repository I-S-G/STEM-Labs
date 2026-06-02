import { Text, View, FlatList } from "react-native";
import { Activities } from "@/data/activities";
import { globalStyles } from "@/styles/globalStyles";
import ActivityCard from "@/components/activityCard";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  return (
    <SafeAreaView style= {globalStyles.screen}>
      <View style={globalStyles.screen}>
        <Text style={globalStyles.title}>Choose Activity</Text>
        <FlatList
          data={Object.values(Activities)}
          renderItem={({ item }) => <ActivityCard activity={item} />}
          keyExtractor={(item) => item.title}
          contentContainerStyle= {{marginTop: 50}}
        />
      </View>
    </SafeAreaView>
  );
}

import { Text, View, FlatList, StyleSheet } from "react-native";
import Activity from "@/components/activity";
import { Activities } from "@/data/activities";
import { globalStyles } from "@/styles/globalStyles";
export default function Home() {
  return (
    <View style= {globalStyles.screen}>
      <Text style={globalStyles.title}> Choose Activity </Text>
      <FlatList
        data={Activities}
        renderItem={({item}) => <Activity activity= {item} />}
        keyExtractor={item => item.title}
        contentContainerStyle= {{
          paddingBottom: 150,
        }}
       />
    </View>
  );
}


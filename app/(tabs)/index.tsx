import { Text, View, FlatList, StyleSheet } from "react-native";
import Activity from "@/components/activity";
import { Activities } from "@/data/activities";
export default function Home() {
  return (
    <View style= {styles.container}>
      <Text style={styles.title}> Choose Activity </Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404A52',
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
    marginTop: 70,
  },
})


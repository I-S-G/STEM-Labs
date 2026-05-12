import { Href, Link } from "expo-router";
import { Text, View, FlatList, StyleSheet } from "react-native";

const Activities = [
  {
    title: "Activity 1",
    url: "/activity1",
    description: "Description about this activity",
  },
  {
    title: "Activity 2",
    url: "/activity2",
    description: "Description about this activity",
  },
  {
    title: "Activity 3",
    url: "/activity3",
    description: "Description about this activity",
  },
  {
    title: "Activity 4",
    url: "/activity4",
    description: "Description about this activity",
  },
  {
    title: "Activity 5",
    url: "/activity5",
    description: "Description about this activity",
  },
  {
    title: "Activity 6",
    url: "/activity6",
    description: "Description about this activity",
  },
  {
    title: "Activity 7",
    url: "/activity7",
    description: "Description about this activity",
  },
]

type ActivityProps = {title: string, url: Href, description: string}

const Activity = (activity: ActivityProps) => {
  const {title, url, description } = activity;
  return (
    <Link href={url} style= {styles.activity}>
      <View style= {{width: "100%"}}>
        <Text style={styles.activityTitle}> {title} </Text>
        <Text> {description} </Text>
      </View>
    </Link>

  )
}

export default function Home() {
  return (
    <View style= {styles.container}>
      <Text style={styles.title}> Choose Activity </Text>
      <FlatList
        data={Activities}
        renderItem={({item}) => <Activity title= {item.title} url= {item.url as Href} description={item.description} />}
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
  activity: {
    backgroundColor: "#99b9e2",
    marginHorizontal: 50,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 5

  },
  activityTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
})


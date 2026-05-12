import { Drawer } from "expo-router/drawer"

export default function ActivityLayout() {
  return (
    <Drawer>
        <Drawer.Screen name='activity1'options={{
            title: "Activity 1"
        }}  /> 
        <Drawer.Screen name='(results)' options={{
            title: "Results"
        }} /> 
        <Drawer.Screen name='leaderboards' options= {{
            title: "Leaderboards"
        }} /> 
    </Drawer>
  );
}

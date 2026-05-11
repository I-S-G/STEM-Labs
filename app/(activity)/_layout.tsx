import { Drawer } from "expo-router/drawer"

export default function ActivityLayout() {
  return (
    <Drawer>
        <Drawer.Screen name='activity'options={{
            title: "Activity"
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

import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require("@/assets/images/homeIcon.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require("@/assets/images/profileIcon.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require("@/assets/images/settingsIcon.png")}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}

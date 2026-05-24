import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

import { authListener } from "@/utils/firebase/auth";
import { getUserData } from "@/utils/firebase/users";
import { useUserStore } from "@/store/userStore";

export default function RootLayout() {
  const setCurrentUser = useUserStore((s) => s.setCurrentUser);

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = authListener(async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);

        setCurrentUser({
          uid: user.uid,
          ...(userData as any),
        });
      } else {
        setCurrentUser(null);
      }

      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </GestureHandlerRootView>
  );
}

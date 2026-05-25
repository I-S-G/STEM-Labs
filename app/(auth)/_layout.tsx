import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function AuthLayout() {
  const router = useRouter();
  const currentUser = useUserStore((s) => s.currentUser);

  useEffect(() => {
    // If user is logged in → block ALL auth routes
    if (currentUser) {
      router.replace("/(tabs)");
    }
  }, [currentUser]);

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

import DefaultButton from "@/components/buttons/defaultButton";
import { useTheme } from "@/hooks/useTheme";
import { createGlobalStyles } from "@/styles/globalStyles";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";

type TestState = "idle" | "waiting" | "ready" | "finished" | "tooEarly";

export default function ReactionTest() {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  const [state, setState] = useState<TestState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSubmit = () => {
    router.push("/(activities)/activity4/trace");
  };

  const startTest = (): void => {
    setReactionTime(null);
    setState("waiting");

    const delay = Math.random() * 2500 + 1000;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setState("ready");
    }, delay);
  };

  const handlePress = (): void => {
    switch (state) {
      case "idle":
      case "finished":
      case "tooEarly":
        startTest();
        break;

      case "waiting":
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        setState("tooEarly");
        break;

      case "ready":
        const reaction = Date.now() - startTimeRef.current;

        setReactionTime(reaction);
        setState("finished");
        break;
    }
  };

  const getBackgroundColor = (): string => {
    switch (state) {
      case "idle":
      case "finished":
        return "#007AFF";

      case "waiting":
        return "#FF3B30";

      case "ready":
        return "#34C759";

      case "tooEarly":
        return "#FF9500";
    }
  };

  const getText = (): string => {
    switch (state) {
      case "idle":
        return "When the red box turns green, tap as quickly as you can.\nTap Anywhere To Start";

      case "waiting":
        return "Wait For Green...";

      case "ready":
        return "TAP NOW!";

      case "finished":
        return `Reaction Time\n${reactionTime} ms\n\nTap To Try Again`;

      case "tooEarly":
        return "Too Early!\n\nTap To Try Again";
    }
  };

  return (
    <View
      style={[
        globalStyles.screen,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Pressable
        onPress={handlePress}
        style={{
          width: "90%",
          height: 300,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: getBackgroundColor(),
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          {getText()}
        </Text>
      </Pressable>
      <DefaultButton
        style={{ position: "absolute", bottom: 100 }}
        onPress={onSubmit}
        title="Next Challenge"
      />
    </View>
  );
}

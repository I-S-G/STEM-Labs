import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";

type InputProps = TextInputProps & {
  label: string;
  style?: ViewStyle;
};

export default function Input({ label, style, ...props }: InputProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, {color: theme.text}]}>{label}</Text>

      <TextInput
        {...props}
        style={[styles.input, {borderColor: theme.text}]}
        placeholderTextColor="#999"
        placeholder={`Enter ${label}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    padding: 10,
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
    color: "white",
  },
});

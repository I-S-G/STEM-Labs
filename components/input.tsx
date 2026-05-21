import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  label: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#999"
        placeholder={`Enter ${label}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10
  },
  label: {
    marginBottom: 6,
    color: "#ffffff",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
    color: "white"
  },
});
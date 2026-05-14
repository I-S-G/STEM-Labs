import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const globalStyles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    title: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
    marginTop: 70,
  },
})
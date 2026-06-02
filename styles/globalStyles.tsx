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
    marginBottom: 20,
    marginTop: 40,
  },
  titleWithHeader: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 20,
  },
  diagramImage: {
    width: "100%",
    height: 200,
    marginTop: 15,
    borderRadius: 10,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 15,
  },
  subheading: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 5,
  },
});

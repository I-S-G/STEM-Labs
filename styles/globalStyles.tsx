import { StyleSheet } from "react-native";

export const createGlobalStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.background,
      flex: 1,
    },

    title: {
      fontSize: 38,
      textAlign: "center",
      color: theme.text,
      marginBottom: 20,
      marginTop: 40,
    },

    titleWithHeader: {
      fontSize: 40,
      textAlign: "center",
      color: theme.text,
      marginBottom: 20,
      marginTop: 20,
    },

    subtitle: {
      fontSize: 14,
      color: "#94a3b8",
      marginBottom: 20,
    },

    card: {
      backgroundColor: theme.cardColor,
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 10,
    },

    text: {
      fontSize: 14,
      color: theme.text,
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
      color: theme.text,
      textAlign: "center",
      fontSize: 18,
      marginBottom: 5,
    },
  });

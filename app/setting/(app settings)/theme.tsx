import DefaultButton from "@/components/defaultButton";
import { globalStyles } from "@/styles/globalStyles";
import { View, Text, StyleSheet } from "react-native";

export default function Theme() {
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}> Choose Theme </Text>
      <View style={styles.form}>
        <DefaultButton title="Dark" onPress={() => alert("button pressed")} />
        <DefaultButton title="Light" onPress={() => alert("button pressed")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
    marginTop: 20,
    gap: 20,
  },
});

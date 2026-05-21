import DefaultButton from "@/components/defaultButton";
import Input from "@/components/input";
import { globalStyles } from "@/styles/globalStyles";
import { View, Text, StyleSheet } from "react-native";

export default function Password() {

  return (
    <View style={globalStyles.screen}>
        <Text style= {globalStyles.titleWithHeader}> Change Password </Text>
        <View style={styles.form}>
            <Input label="Password"/>
            <DefaultButton title="Change" onPress={() => alert("button pressed")} />
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    form: {
        padding: 10,
        marginTop: 20
    }
})

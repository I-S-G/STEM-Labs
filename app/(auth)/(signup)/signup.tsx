import { globalStyles } from "@/styles/globalStyles"
import { router, Link } from "expo-router"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import Input from "@/components/input"
import DefaultButton from "@/components/defaultButton"

export default function Signup() {
    return (
        <ScrollView style= {globalStyles.screen}>
            <Text style= {globalStyles.title}> STEMM LABS </Text>
            <View style= {styles.form}>
                <Text style= {styles.subheading}> Personal Details </Text>
                <Input label="Name" />
                <Input label= "Email" />
                <Input label="Password" />
                <Input label="Retype Password" />
                <DefaultButton title="Sign Up" style={{marginTop: 20}} onPress={() => router.push("/teamSignup")} />
            </View>
            <Link href= '/login'>
                <Text style= {styles.signupLink}> Login Instead </Text>
            </Link>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20,
        marginBottom: 40,
    },
    signupLink: {
        textAlign: "center",
        color: "#ea00ff",
        textDecorationLine: "underline"

    },
    subheading: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        marginBottom: 5
    }
})
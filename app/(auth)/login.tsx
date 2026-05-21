import { globalStyles } from "@/styles/globalStyles"
import { router, Link } from "expo-router"
import { View, Text, StyleSheet } from "react-native"
import Input from "@/components/input"
import DefaultButton from "@/components/defaultButton"

export default function Login() {
    return (
        <View style= {globalStyles.screen}>
            <Text style= {globalStyles.title}> STEMM LABS </Text>
            <View style= {styles.form}>
                <Input label="Email" />
                <Input label="Password" />
                <DefaultButton title="Login" onPress={() => router.push("/")} />
            </View>
            <Link href= '/signup'>
                <Text style= {styles.signupLink}> Signup Instead </Text>
            </Link>
        </View>
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

    }
})
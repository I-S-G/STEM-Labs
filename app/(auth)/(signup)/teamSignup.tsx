import { globalStyles } from "@/styles/globalStyles"
import { router, Link } from "expo-router"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import Input from "@/components/input"
import DefaultButton from "@/components/defaultButton"

export default function TeamSignup() {
    return (
        <ScrollView style= {globalStyles.screen}>
            <Text style= {globalStyles.title}> STEMM LABS </Text>
            <View style= {styles.form}>
                <Text style= {styles.subheading}> Create New Team </Text>
                <Input label="Team Name" />
                <Text style= {styles.subheading}> OR </Text>
                <Text style= {styles.subheading}> Join An Existing Team </Text>
                <Input label="Team Discriminator" style={{marginTop: 10}} />
                <DefaultButton title="Sign Up" style={{marginTop: 20}} onPress={() => router.push("/")} />
            </View>
            <Link href= '/login'>
                <Text style= {styles.signupLink}> Logout </Text>
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
        marginTop: 5,
        marginBottom: 5
    }
})
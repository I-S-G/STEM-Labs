import { View, Text, StyleSheet} from "react-native"
import { globalStyles } from "@/styles/globalStyles"
import SettingSection from "@/components/settingSection"


export default function Settings() {
    return (
        <View style= {globalStyles.screen}>
            <Text style= {globalStyles.title}> Settings </Text>
            <SettingSection />
        </View>
    )
}

const styles = StyleSheet.create({

})
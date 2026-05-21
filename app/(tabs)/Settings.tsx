import { View, Text} from "react-native"
import { globalStyles } from "@/styles/globalStyles"
import SettingSection from "@/components/settingSection"
import DefaultButton from "@/components/defaultButton"


export default function Settings() {
    return (
        <View style= {globalStyles.screen}>
            <Text style= {globalStyles.title}> Settings </Text>
            <SettingSection />
            <DefaultButton title="Logout" onPress={() => alert ("Logout")} />
        </View>
    )
}

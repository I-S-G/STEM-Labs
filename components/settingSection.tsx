import { View, Text, StyleSheet} from "react-native"
import Settings from "./settings"
import { settingsMap } from "@/data/settings"

export default function SettingSection() {
    return (
        <View>
            {
                settingsMap.map((settingSection) => (
                    <View key={settingSection.name}>
                        <Text> {settingSection.name} </Text>
                        <Settings settings = {settingSection.column} />
                    </View>
                ))
            }
        </View>
    )
}
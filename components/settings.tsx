import { View, Text, StyleSheet} from "react-native"
import { Href, Link } from "expo-router"

type TSetting = {
    name: string,
    route: string, //change to href when routes created
}

type SettingsProp = {
    settings: TSetting[]
}


export default function Settings({settings}: SettingsProp) {
    return (
        <View>
            {
                settings.map((settings) => (
                    <Link href={settings.route as Href} key={settings.name} >
                        <Text> {settings.name} </Text>
                    </Link>
                ))
            }
        </View>
    )
}
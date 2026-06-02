import { View, Text, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import DefaultButton from "@/components/buttons/defaultButton";
import { globalStyles } from "@/styles/globalStyles";
import ActivitySection from "./activitySection";
import { ActivityProps } from "@/types/types";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  activity: ActivityProps;
};

export default function ActivityTemplate({ activity }: Props) {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={globalStyles.screen}>
        <ScrollView contentContainerStyle={globalStyles.scroll}>
          <Text style={globalStyles.title}>{activity.description}</Text>

          <ActivitySection title="Overview" content={activity.overview} />

          <ActivitySection title="Equipment" content={activity.equipment} />

          <ActivitySection
            title="Instructions"
            content={activity.instructions}
          />

          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>Diagram</Text>

            <Text style={globalStyles.text}>{activity.diagramDescription}</Text>

            <Image
              source={activity.image}
              style={globalStyles.diagramImage}
              resizeMode="contain"
            />
          </View>

          <DefaultButton
            title="Start Activity"
            onPress={() => router.push(activity.startRoute as any)}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

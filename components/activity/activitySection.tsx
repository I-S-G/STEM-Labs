import { View, Text } from "react-native";
import { globalStyles } from "@/styles/globalStyles";

type Props = {
  title: string;
  content: string;
};

export default function ActivitySection({ title, content }: Props) {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardTitle}>{title}</Text>
      <Text style={globalStyles.text}>{content}</Text>
    </View>
  );
}

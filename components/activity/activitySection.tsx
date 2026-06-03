import { View, Text } from "react-native";
import { createGlobalStyles } from "@/styles/globalStyles";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  title: string;
  content: string;
};

export default function ActivitySection({ title, content }: Props) {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);
  
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardTitle}>{title}</Text>
      <Text style={globalStyles.text}>{content}</Text>
    </View>
  );
}

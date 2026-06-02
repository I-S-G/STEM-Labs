import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import DefaultButton from "../buttons/defaultButton";

type Props = {
  uri: string;
  onDone: (start: number, end: number) => void;
};

export default function MarkTimestamp({ uri, onDone }: Props) {
  const player = useVideoPlayer("", (p) => {
    p.loop = false;
  });

  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);

  useEffect(() => {
    if (uri) player.replaceAsync(uri);
  }, [uri]);

  const markStart = () => {
    player.pause();
    setStart(player.currentTime);
  };

  const markEnd = () => {
    player.pause();
    setEnd(player.currentTime);
  };

  const finish = () => {
    if (start != null && end != null) {
      onDone(start, end);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <VideoView style={styles.video} player={player} />

      <View style={styles.info}>
        <Text>Start: {start?.toFixed(2) ?? "--"}</Text>
        <Text>End: {end?.toFixed(2) ?? "--"}</Text>
      </View>

      <View style={styles.column}>
        <DefaultButton
          title="Mark Start"
          style={{ width: "auto" }}
          onPress={markStart}
        />

        <DefaultButton
          title="Mark End"
          style={{ width: "auto" }}
          onPress={markEnd}
        />

        <DefaultButton
          title="Done"
          style={{ width: "auto" }}
          onPress={finish}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 300,
  },
  column: {
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  },
  info: {
    padding: 10,
  },
});

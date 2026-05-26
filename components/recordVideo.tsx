import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultButton from "./defaultButton";

type Props = {
  onRecorded: (uri: string) => void;
  message: string;
};

export default function RecordVideo({ onRecorded, message }: Props) {
  const cameraRef = useRef<CameraView | null>(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  const [recording, setRecording] = useState(false);

  if (!cameraPermission || !micPermission) return <View />;

  if (!cameraPermission.granted || !micPermission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera + Mic required</Text>
        {!cameraPermission.granted && (
          <DefaultButton
            title="Grant Camera"
            onPress={requestCameraPermission}
          />
        )}
        {!micPermission.granted && (
          <DefaultButton title="Grant Mic" onPress={requestMicPermission} />
        )}
      </View>
    );
  }

  const startRecording = async () => {
    if (!cameraRef.current) return;

    setRecording(true);

    const video = await cameraRef.current.recordAsync({
      maxDuration: 60,
    });

    setRecording(false);

    if (video?.uri) {
      onRecorded(video.uri);
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} mode="video" />
      <Text style={styles.message}> {message} </Text>

      <View style={styles.controls}>
        {!recording ? (
          <DefaultButton onPress={startRecording} title="Record" />
        ) : (
          <DefaultButton onPress={stopRecording} title="Stop" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    position: "absolute",
    top: 100,
    width: "100%",

    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "bold",

    zIndex: 10,
  },
});

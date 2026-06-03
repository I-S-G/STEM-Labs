import { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Audio } from "expo-av";
import ResultsScreen from "./result";

import Input from "@/components/input";
import { useSoundStore } from "@/store/soundStore";
import DefaultButton from "@/components/buttons/defaultButton";
import { createGlobalStyles } from "@/styles/globalStyles";
import { useTheme } from "@/hooks/useTheme";

type FormValues = {
  location: string;
};

export default function TestAudio() {
  const addEntry = useSoundStore((s) => s.addEntry);

  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      location: "",
    },
  });

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [dbLevel, setDbLevel] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    (async () => {
      const perm = await Audio.requestPermissionsAsync();

      if (!perm.granted) {
        Alert.alert("Microphone permission required");
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  const startRecording = async (location: string) => {
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
      (status) => {
        if (status.isRecording && status.metering !== undefined) {
          setDbLevel(status.metering);
        }
      },
    );

    setRecording(recording);
  };

  const stopRecording = async (location: string) => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();

    const finalDb = dbLevel ?? -100;

    addEntry({
      location,
      dbLevel: finalDb,
    });

    setRecording(null);
    setDbLevel(null);

    Alert.alert("Saved", "Record another location?", [
      {
        text: "Finish",
        onPress: () => setFinished(true),
      },
      {
        text: "Record Another",
        onPress: () => reset(),
      },
    ]);
  };

  const onSubmit = (data: FormValues) => {
    if (!recording) {
      startRecording(data.location);
    } else {
      stopRecording(data.location);
    }
  };

  if (finished) {
    return <ResultsScreen />;
  }

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}> Measure Sound Level </Text>
      <Controller
        control={control}
        name="location"
        rules={{ required: "Location is required" }}
        render={({ field: { onChange, value } }) => (
          <Input label="Location" value={value} onChangeText={onChange} />
        )}
      />

      <DefaultButton
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={handleSubmit(onSubmit)}
      />

      {dbLevel !== null && (
        <Text>Current level: {dbLevel.toFixed(1)} dBFS</Text>
      )}
    </View>
  );
}

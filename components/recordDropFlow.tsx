import { useState } from "react";
import RecordVideo from "@/components/recordVideo";
import MarkTimestamp from "@/components/markTimestamp";
import DropResult from "@/components/dropResult";
import { Href, router } from "expo-router";

type Step = "record" | "mark" | "result";

type Marks = {
  start: number;
  end: number;
};

type Props = {
  redirectRoute: Href;
  message: string;
};

export default function RecordDropFlow({ redirectRoute, message }: Props) {
  const [step, setStep] = useState<Step>("record");
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [marks, setMarks] = useState<Marks | null>(null);

  const onReset = () => {
    setVideoUri(null);
    setMarks(null);

    router.push(redirectRoute);
  };

  // 🎥 RECORD → MARK
  if (step === "record") {
    return (
      <RecordVideo
        message={message}
        onRecorded={(uri) => {
          setVideoUri(uri);
          setStep("mark");
        }}
      />
    );
  }

  // 🎬 MARK → RESULT
  if (step === "mark" && videoUri) {
    return (
      <MarkTimestamp
        uri={videoUri}
        onDone={(start, end) => {
          setMarks({ start, end });
          setStep("result");
        }}
      />
    );
  }

  // 📊 RESULT
  if (step === "result" && marks) {
    return <DropResult marks={marks} onReset={onReset} />;
  }

  return null;
}

import { ImageSourcePropType } from "react-native";

export type ActivityProps = {
  title: string;
  url: string;
  description: string;
  overview: string;
  equipment: string;
  instructions: string;
  diagramDescription: string;
  image: ImageSourcePropType;
  startRoute: string;
};

export type OnNextProps = {
  onNext: () => void;
};

import { ActivityProps } from "@/types/types";

type ActivitiesType = {
  activity1: ActivityProps;
  activity2: ActivityProps;
  activity3: ActivityProps;
  activity4: ActivityProps;
  activity5: ActivityProps;
  activity6: ActivityProps;
  activity7: ActivityProps;
};

export const Activities: ActivitiesType = {
  activity1: {
    title: "Activity 1",

    url: "/activity1",

    description: "Parachute Drop Challenge",

    overview:
      "Students design, build, and test a parachute for a small toy to reduce its landing speed and impact force. Teams iterate their designs under time and material constraints, aiming to achieve the slowest and safest landing within a target area.",

    equipment:
      "• Mobile phone with STEMM Lab app\n• Small toy (e.g. army toy soldier)\n• Table or elevated surface\n• Paper or plastic\n• String\n• Scissors\n• Tape",

    instructions:
      "1. Drop the toy without a parachute and record the fall (baseline test).\n\n2. Build a parachute using provided materials.\n\n3. Drop the toy from the same height and record the fall.\n\n4. Review speed and landing accuracy results in the app.\n\n5. Redesign and test up to three prototypes within 20 minutes.\n\n6. Upload videos, results, and team reflections.",

    diagramDescription:
      "• Toy attached to parachute\n• Drop height marked\n• Target landing zone shown on floor\n\n(Simple labelled sketch)",

    image: require("@/assets/images/parachutedrop.png"),

    startRoute: "/activity1/initialDrop",
  },

  activity2: {
    title: "Activity 2",

    url: "/activity2",

    description: "Sound Pollution Hunter",

    overview:
      "Students measure and compare sound levels in different classroom activities to understand environmental noise and identify loud and quiet zones.",

    equipment: "• Mobile phone with STEMM Lab app",

    instructions:
      "1. Measure noise from different actions such as dropping objects (pens, books), talking, walking, and stamping your feet.\n\n2. Record sound levels and locations.\n\n3. Map loud and quiet zones in the classroom.",

    diagramDescription:
      "• Classroom map showing sound hotspots\n• Students performing different noise activities\n• Marked loud vs quiet areas",

    image: require("@/assets/images/soundpollution.png"),

    startRoute: "/activity2/test",
  },

  activity3: {
    title: "Activity 3",
    url: "/activity3",
    description: "",
    overview: "",
    equipment: "",
    instructions: "",
    diagramDescription: "",
    image: require("@/assets/images/parachutedrop.png"),
    startRoute: "",
  },

  activity4: {
    title: "Activity 4",
    url: "/activity4",
    description: "",
    overview: "",
    equipment: "",
    instructions: "",
    diagramDescription: "",
    image: require("@/assets/images/parachutedrop.png"),
    startRoute: "",
  },

  activity5: {
    title: "Activity 5",
    url: "/activity5",
    description: "",
    overview: "",
    equipment: "",
    instructions: "",
    diagramDescription: "",
    image: require("@/assets/images/parachutedrop.png"),
    startRoute: "",
  },

  activity6: {
    title: "Activity 6",
    url: "/activity6",
    description: "",
    overview: "",
    equipment: "",
    instructions: "",
    diagramDescription: "",
    image: require("@/assets/images/parachutedrop.png"),
    startRoute: "",
  },

  activity7: {
    title: "Activity 7",
    url: "/activity7",
    description: "",
    overview: "",
    equipment: "",
    instructions: "",
    diagramDescription: "",
    image: require("@/assets/images/parachutedrop.png"),
    startRoute: "",
  },
};

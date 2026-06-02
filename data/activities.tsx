import { ActivityProps } from "@/types/types";

type ActivitiesType = {
  activity1: ActivityProps;
  activity2: ActivityProps;
  activity3: ActivityProps;
  activity4: ActivityProps;
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

    description: "Earthquake Resistant Structure",

    overview:
      "Students design structures that withstand vibration, simulating earthquakes. Teams experiment with anti-vibration designs to reduce movement and improve structural stability.",

    equipment:
      "• Cardboard\n• Paper\n• Scissors\n• Sticky tape\n• Plastic/paper cups\n• Mobile phone with vibration sensor",

    instructions:
      "1. Build an anti-vibration layer by folding paper/cardboard.\n\n2. Place a flat cardboard platform on top.\n\n3. Place the phone in the centre and activate vibration mode on the STEMM App.\n\n4. Modify the structure to reduce movement (e.g. more pillars, more folds, etc).",

    diagramDescription:
      "• Folded anti-vibration base\n• Flat platform above support structure\n• Phone placed at centre\n• Structural supports and pillars labelled",

    image: require("@/assets/images/earthquake.png"),

    startRoute: "/activity3/vibration",
  },

activity4: {
  title: "Activity 4",

  url: "/activity4",

  description:
    "Reaction Board Challenge",

  overview:
    "Students measure reaction time, coordination, and improvement through repeated digital and physical challenges. Results are compared across team members to explore how reaction speed and motor control vary.",

  equipment:
    "• Mobile phone with STEMM Lab app\n• Clear working space",

  instructions:
    "Phase 1 – Tap Reaction\n\n1. Tap the screen as soon as the hidden button appears.\n\n2. Record reaction time.\n\nPhase 2 – Swap Hands\n\n3. Repeat using the non-dominant hand.\n\n4. Compare results.\n\nPhase 3 – Tracing Challenge\n\n5. Trace a moving shape on the screen.\n\n6. Review accuracy and delay.\n\nRotate through each team member.",

  diagramDescription:
    "• Phone screen displaying a reaction button\n• Tracing path illustration\n• Reaction time and accuracy results displayed",

  image: require("@/assets/images/reaction.png"),

  startRoute: "/activity4/reaction",
},


};

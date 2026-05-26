import DefaultButton from "@/components/defaultButton";
import { globalStyles } from "@/styles/globalStyles";
import { router } from "expo-router";
import React from "react";
import { View, Text, ScrollView, Image } from "react-native";

export default function ParachuteDropChallengeScreen() {
  return (
    <View style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.scroll}>
        {/* Header */}
        <Text style={globalStyles.title}>Parachute Drop Challenge </Text>

        {/* Overview */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Overview</Text>
          <Text style={globalStyles.text}>
            Students design, build, and test a parachute for a small toy to
            reduce its landing speed and impact force. Teams iterate their
            designs under time and material constraints, aiming to achieve the
            slowest and safest landing within a target area.
          </Text>
        </View>

        {/* Equipment */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Equipment</Text>
          <Text style={globalStyles.text}>
            • Mobile phone with STEMM Lab app{"\n"}• Small toy (e.g. army toy
            soldier){"\n"}• Table or elevated surface{"\n"}• Paper or plastic
            {"\n"}• String{"\n"}• Scissors{"\n"}• Tape
          </Text>
        </View>

        {/* Instructions */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Instructions</Text>
          <Text style={globalStyles.text}>
            1. Drop the toy without a parachute and record the fall (baseline
            test).{"\n\n"}
            2. Build a parachute using provided materials.{"\n\n"}
            3. Drop the toy from the same height and record the fall.{"\n\n"}
            4. Review speed and landing accuracy results in the app.{"\n\n"}
            5. Redesign and test up to three prototypes within 20 minutes.
            {"\n\n"}
            6. Upload videos, results, and team reflections.
          </Text>
        </View>

        {/* Diagram placeholder */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Diagram</Text>
          <Text style={globalStyles.text}>
            • Toy attached to parachute{"\n"}• Drop height marked{"\n"}• Target
            landing zone shown on floor{"\n\n"}
            (Simple labelled sketch)
          </Text>
          <Image
            source={require("@/assets/images/parachutedrop.png")}
            style={globalStyles.diagramImage}
            resizeMode="contain"
          />
        </View>

        {/* Action button */}
        <DefaultButton
          title="Start Activity"
          onPress={() => router.push("/activity1/initialDrop")}
        />
      </ScrollView>
    </View>
  );
}

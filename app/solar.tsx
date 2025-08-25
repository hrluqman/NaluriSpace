import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../src/theme/colors";
import SolarInfoSection from "../src/components/SolarInfoSection";

type PlanetBody = {
  name: string;
  radiusKm: number;
  color: string;
};

type Units = "kilometres" | "miles";

type ScaleType = "logarithmic" | "linear";

const PLANET_BODIES: PlanetBody[] = [
  { name: "Sun", radiusKm: 696340, color: "#FFD700" },
  { name: "Earth", radiusKm: 6371, color: "#4A90E2" },
  { name: "Mars", radiusKm: 3389.5, color: "#E85D4A" },
];

const Solar = () => {
  const [units, setUnits] = useState<Units>("kilometres");
  const [showPiModal, setShowPiModal] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SolarInfoSection
          planetBodies={PLANET_BODIES}
          units={units}
          onShowPiModal={() => setShowPiModal(true)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background"],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});

export default Solar;

import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { usePi } from "../src/hooks/usePi";
import colors from "../src/theme/colors";
import PiModal from "../src/components/PiModal";
import ScaleModal from "../src/components/ScaleModal";
import SolarInfoSection from "../src/components/SolarInfoSection";
import SolarControlSection from "../src/components/SolarControlSection";
import SolarVisualSection from "../src/components/SolarVisualSection";

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
  const { state } = usePi();
  const [units, setUnits] = useState<Units>("kilometres");
  const [scaleType, setScaleType] = useState<ScaleType>("logarithmic");
  const [showPiModal, setShowPiModal] = useState(false);
  const [showScaleModal, setShowScaleModal] = useState(false);
  
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SolarInfoSection
          piValue={state.pi}
          planetBodies={PLANET_BODIES}
          units={units}
          onShowPiModal={() => setShowPiModal(true)}
        />

        <SolarVisualSection
          piValue={state.pi}
          planetBodies={PLANET_BODIES}
          units={units}
          scaleType={scaleType}
          onShowScaleModal={() => setShowScaleModal(true)}
        />

        <SolarControlSection
          units={units}
          scaleType={scaleType}
          onUnitsChange={setUnits}
          onScaleChange={setScaleType}
        />
      </ScrollView>
      <PiModal
        visible={showPiModal}
        onClose={() => setShowPiModal(false)}
      />
      <ScaleModal
        visible={showScaleModal}
        onClose={() => setShowScaleModal(false)}
      />
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

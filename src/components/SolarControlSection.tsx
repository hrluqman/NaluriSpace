import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import colors from "../theme/colors";

type Units = "kilometres" | "miles";

type ScaleType = "logarithmic" | "linear";

interface Props {
  units: Units;
  scaleType: ScaleType;
  onUnitsChange: (units: Units) => void;
  onScaleChange: (scale: ScaleType) => void;
}

export default function SolarControlSection({
  units,
  scaleType,
  onUnitsChange,
  onScaleChange,
}: Props) {

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Control:</Text>

      <View style={styles.card}>
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Units</Text>
          <SegmentedControl
            values={["kilometres", "miles"]}
            selectedIndex={units === "kilometres" ? 0 : 1}
            fontStyle={{ color: colors["muted"] }}
            activeFontStyle={{ color: colors["background"] }}
            onChange={(event) =>
              onUnitsChange(
                event.nativeEvent.selectedSegmentIndex === 0
                  ? "kilometres"
                  : "miles"
              )
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    fontSize: 12,
    color: colors["muted"],
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors["card"],
    borderRadius: 12,
    padding: 16,
    shadowColor: colors["backgroundSecondary"],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  controlGroup: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 14,
    color: colors["text"],
    marginBottom: 12,
  }
});

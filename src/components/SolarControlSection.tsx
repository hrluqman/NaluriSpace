import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import colors from "../theme/colors";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

type Units = "kilometres" | "miles";

type ScaleType = "logarithmic" | "linear";

interface SolarControlSectionProps {
  units: Units;
  scaleType: ScaleType;
  onUnitsChange: (units: Units) => void;
  onScaleChange: (scale: ScaleType) => void;
}

const SolarControlSection = ({
  units,
  scaleType,
  onUnitsChange,
  onScaleChange,
}: SolarControlSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Control:</Text>

      <View style={styles.card}>
        <View style={styles.controlGroup}>
          <View style={styles.switchContainer}>
            <Text style={[styles.controlLabel, { marginBottom: 0 }]}>
              View True Scale
            </Text>
            <Switch
              value={scaleType === "linear"}
              onValueChange={(value) =>
                onScaleChange(value ? "linear" : "logarithmic")
              }
              trackColor={{
                false: "#2C2C2E",
                true: "#4A90E2",
              }}
              thumbColor={scaleType === "linear" ? "#FFFFFF" : "#A0A0A0"}
              ios_backgroundColor="#2C2C2E"
              style={styles.switch}
              accessibilityLabel="Toggle between logarithmic and linear scale"
              accessibilityRole="switch"
              accessibilityState={{ checked: scaleType === "linear" }}
            />
          </View>
        </View>

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
};

export default SolarControlSection;

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
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

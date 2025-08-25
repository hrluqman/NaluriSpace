import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type PlanetBody = {
  name: string;
  radiusKm: number;
  color: string;
};

type Units = "kilometres" | "miles";

interface SolarInfoSectionProps {
  planetBodies: PlanetBody[];
  units: Units;
  onShowPiModal: () => void;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
};

const kmToMiles = (km: number): number => {
  return km * 0.621371;
};

const calculateCircumference = (radius: number): number => {
  return 2 * Math.PI * radius;
};

const SolarCard = ({ body, units }: { body: PlanetBody; units: Units }) => {
  const radius =
    units === "kilometres" ? body.radiusKm : kmToMiles(body.radiusKm);
  const circumference = calculateCircumference(radius);
  const unitLabel = units;

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.bodyName}>{body.name}</Text>
        <Text style={styles.circumferenceValue}>
          {formatNumber(circumference)}
        </Text>
        <Text style={styles.unitLabel}>{unitLabel}</Text>
      </View>
    </View>
  );
};

const SolarInfoSection = ({
  planetBodies,
  units,
  onShowPiModal,
}: SolarInfoSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Solar Information:</Text>

      <View style={styles.cardsContainer}>
        {planetBodies.map((body) => (
          <SolarCard key={body.name} body={body} units={units} />
        ))}
      </View>

      <TouchableOpacity
        style={styles.disclaimerContainer}
        onPress={onShowPiModal}
        accessibilityRole="button"
        accessibilityLabel="Learn more about π calculation"
      >
        <Ionicons
          name="information-circle-outline"
          size={16}
          color={colors["muted"]}
        />
        <Text style={styles.disclaimerText}>
          Calculated using π ≈ 3.14159265...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SolarInfoSection;

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
  cardsContainer: {
    gap: 12,
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
  cardContent: {
    alignItems: "flex-start",
  },
  bodyName: {
    fontSize: 14,
    color: colors["text"],
    marginBottom: 8,
  },
  circumferenceValue: {
    fontSize: 28,
    color: colors["text"],
    fontVariant: ["tabular-nums"],
    marginBottom: 4,
  },
  unitLabel: {
    fontSize: 14,
    color: colors["muted"],
  },
  disclaimerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors["muted"],
    marginLeft: 6,
  },
  fallbackText: {
    fontSize: 11,
    color: colors["muted"],
  },
});

import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
} from "react-native-reanimated";
import colors from "../theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type PlanetBody = {
  name: string;
  radiusKm: number;
  color: string;
};

type Units = "kilometres" | "miles";

type ScaleType = "logarithmic" | "linear";

interface SolarBarChartProp {
  body: PlanetBody;
  units: Units;
  scaleType: ScaleType;
  maxValue: number;
  index: number;
}

interface SolarVisualSectionProps {
  planetBodies: PlanetBody[];
  units: Units;
  scaleType: ScaleType;
  onShowScaleModal: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

const chartWidth = screenWidth - 32 - 32;

const kmToMiles = (km: number): number => {
  return km * 0.621371;
};

const calculateCircumference = (radius: number): number => {
  return 2 * Math.PI * radius;
};

const SolarBarChart = ({
  body,
  units,
  scaleType,
  maxValue,
  index,
}: SolarBarChartProp) => {
  const barWidthAnim = useSharedValue(0);
  const slideAnim = useSharedValue(-20);
  const opacityAnim = useSharedValue(0);

  const radius =
    units === "kilometres" ? body.radiusKm : kmToMiles(body.radiusKm);
  const circumference = calculateCircumference(radius);

  useEffect(() => {
    const delay = index * 100;

    slideAnim.value = withTiming(0, {
      duration: 300,
      //   delay,
      easing: Easing.out(Easing.cubic),
    });

    opacityAnim.value = withTiming(1, {
      duration: 300,
      //   delay,
      easing: Easing.out(Easing.cubic),
    });
  }, [slideAnim, opacityAnim, index]);

  useEffect(() => {
    let normalizedValue;

    if (scaleType === "logarithmic") {
      const logValue = Math.log10(circumference);
      const logMax = Math.log10(maxValue);
      normalizedValue = logValue / logMax;
    } else {
      normalizedValue = circumference / maxValue;
    }

    barWidthAnim.value = withTiming(normalizedValue, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [circumference, maxValue, scaleType, barWidthAnim]);

  const animatedBarStyle = useAnimatedStyle(() => {
    const width = interpolate(
      barWidthAnim.value,
      [0, 1],
      [0, chartWidth * 0.7]
    );

    return {
      width: Math.max(width, 2), // Minimum width for visibility
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value }],
      opacity: opacityAnim.value,
    };
  });

  return (
    <Animated.View style={[styles.barContainer, animatedContainerStyle]}>
      <Text style={styles.bodyNameChart}>{body.name}</Text>
      <View style={styles.barWrapper}>
        <Animated.View
          style={[
            styles.bar,
            { backgroundColor: body.color },
            animatedBarStyle,
          ]}
        />
      </View>
    </Animated.View>
  );
};

const SolarVisualSection = ({
  planetBodies,
  units,
  scaleType,
  onShowScaleModal
}: SolarVisualSectionProps) => {
  const sectionOpacity = useSharedValue(0);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, {
      duration: 400,
      //   delay: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [sectionOpacity]);

  const animatedSectionStyle = useAnimatedStyle(() => {
    return {
      opacity: sectionOpacity.value,
    };
  });

  // Calculate max value for scaling
  const maxCircumference = Math.max(
    ...planetBodies.map((body) => {
      const radius =
        units === "kilometres" ? body.radiusKm : kmToMiles(body.radiusKm);
      return calculateCircumference(radius);
    })
  );

  return (
    <Animated.View style={[styles.section, animatedSectionStyle]}>
      <Text style={styles.sectionHeader}>Visual:</Text>

      <View style={styles.card}>
        <View style={styles.chartHeader}>
          <Text style={styles.scaleLabel}>{scaleType} scale</Text>
        </View>

        <View style={styles.chartContainer}>
          {planetBodies.map((body, index) => (
            <SolarBarChart
              key={body.name}
              body={body}
              units={units}
              scaleType={scaleType}
              maxValue={maxCircumference}
              index={index}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.disclaimerContainer}
        onPress={onShowScaleModal}
        accessibilityRole="button"
        accessibilityLabel="Learn more about logarithmic and linear scales"
      >
        <Ionicons
          name="information-circle-outline"
          size={16}
          color={colors["muted"]}
        />
        <Text style={styles.disclaimerText}>
          Visualized in logarithmic and linear scale
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SolarVisualSection;

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
  chartHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  scaleLabel: {
    fontSize: 12,
    color: colors["muted"],
  },
  chartContainer: {
    gap: 16,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyNameChart: {
    fontSize: 14,
    color: colors["text"],
    width: 60,
  },
  barWrapper: {
    flex: 1,
    height: 12,
    backgroundColor: colors["backgroundSecondary"],
    borderRadius: 6,
    marginLeft: 16,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 6,
    opacity: 0.8,
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
});

import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { usePi } from "../src/hooks/usePi";
import { usePolling } from "../src/hooks/usePolling";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import colors from "../src/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonInfo from "../src/components/ButtonInfo";
import LeibnizModal from "../src/components/LeibnizModal";
import * as Progress from "react-native-progress";

interface ControlButtonProps {
  onPress: () => void;
  icon: "play" | "pause" | "stop" | "refresh";
  text: string;
  colorType: "positive" | "danger" | "backgroundSecondary";
}

const TARGET_DECIMALS = 5;

const Dashboard = () => {
  const { state, start, pause, stop, reset, loading, refreshStatus } = usePi();
  const [showLeibnizModal, setShowLeibnizModal] = useState(false);

  // Calculate guaranteed decimals using Leibniz error bound
  const N = Math.max(0, Math.floor(state.iteration));
  const errBound = 4 / (2 * N + 1);
  const guaranteedDecimals =
    errBound > 0 && Number.isFinite(errBound)
      ? Math.max(0, Math.floor(-Math.log10(2 * errBound)))
      : 0;

  const decimalsToShow = Math.min(guaranteedDecimals, TARGET_DECIMALS);

  const parsedPi = Number(state.pi);
  const piNum = Number.isFinite(parsedPi) ? parsedPi : Math.PI;
  const formattedPi = piNum.toFixed(decimalsToShow);

  const progress = Math.min(guaranteedDecimals / TARGET_DECIMALS, 1);

  const statusColor =
    state.status === "running"
      ? colors["success"]
      : state.status === "stopped"
      ? colors["danger"]
      : colors["muted"];

  usePolling(refreshStatus, 2000);

  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        // Fade out
        withTiming(0.2, { duration: 1000, easing: Easing.ease }),
        // Fade in
        withTiming(1, { duration: 1000, easing: Easing.ease })
      ),
      -1, // Loop infinitely
      true // Reverse the animation on each loop
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const activeAction = useRef("");
  useEffect(() => {
    if (!loading) activeAction.current = "";
  }, [loading, state]);

  const ControlButton = ({
    onPress,
    icon,
    text,
    colorType,
  }: ControlButtonProps) => {
    const isBusy = activeAction.current === text;

    return (
      <TouchableOpacity
        style={[styles.buttonPress, { backgroundColor: colors[colorType] }]}
        onPress={onPress}
        disabled={loading}
      >
        {isBusy && loading ? (
          <ActivityIndicator color="white" style={{ marginRight: 6 }} />
        ) : (
          <Ionicons
            name={icon}
            size={16}
            color="white"
            style={styles.buttonPressIcon}
          />
        )}
        <Text style={styles.buttonPressText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const ProgressBar = () => (
    <View style={{ marginVertical: 16, alignItems: "center" }}>
      <Text style={{ color: colors["text"], marginBottom: 8 }}>
        Progress to {TARGET_DECIMALS} correct decimals
      </Text>
      <Progress.Bar
        progress={progress}
        width={250}
        color={colors.positive}
        unfilledColor={colors.primary}
        borderWidth={0}
        height={12}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.heading}>{formattedPi}</Text>
        <Text style={styles.subHeading}>Decimals: {decimalsToShow}</Text>
        <Text style={styles.subHeading}>Iteration: {state.iteration}</Text>

        <ProgressBar />

        <View
          style={[
            { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 16 },
          ]}
        >
          <ControlButton
            onPress={() => {
              activeAction.current = "Start";
              start();
            }}
            icon="play"
            text="Start"
            colorType="positive"
          />
          <ControlButton
            onPress={() => {
              activeAction.current = "Pause";
              pause();
            }}
            icon="pause"
            text="Pause"
            colorType="backgroundSecondary"
          />
          <ControlButton
            onPress={() => {
              activeAction.current = "Stop";
              stop();
            }}
            icon="stop"
            text="Stop"
            colorType="danger"
          />
          <ControlButton
            onPress={() => {
              activeAction.current = "Reset";
              reset();
            }}
            icon="refresh"
            text="Reset"
            colorType="backgroundSecondary"
          />
        </View>
        <View style={styles.statusInfoContainer}>
          <Text style={styles.statusInfo}>Status:</Text>
          <Animated.View
            style={state.status === "running" ? animatedIconStyle : ""}
          >
            <Ionicons
              name="radio-button-on"
              size={12}
              color={statusColor}
              style={{ marginHorizontal: 4 }}
            />
          </Animated.View>
          <Text style={[styles.statusInfo, { color: statusColor }]}>
            {state.status}
          </Text>
        </View>
      </View>
      <ButtonInfo
        onShowModal={() => setShowLeibnizModal(true)}
        disclamerInfo={"About Leibniz Series"}
      />
      <Link href="/solar" style={styles.buttonLink}>
        View Solar's Calculation
      </Link>

      <LeibnizModal
        visible={showLeibnizModal}
        onClose={() => setShowLeibnizModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background"],
    alignItems: "center",
    paddingTop: 64,
  },
  title: {
    color: colors["text"],
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 16,
  },
  cardContainer: {
    width: "80%",
    backgroundColor: colors["card"],
    padding: 32,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 0.5,
    borderColor: colors["muted"],
  },
  heading: {
    color: colors["text"],
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    color: colors["muted"],
    fontSize: 14,
    marginBottom: 10,
  },
  statusInfoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 16,
  },
  statusInfo: {
    color: colors["muted"],
    fontSize: 14,
  },
  buttonPress: {
    width: "48%",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressText: {
    color: colors["text"],
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonPressIcon: {
    marginRight: 2,
  },
  buttonLink: {
    width: "80%",
    color: colors["text"],
    backgroundColor: colors["primary"],
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 6,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Dashboard;

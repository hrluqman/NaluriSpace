import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { Image } from "expo-image";
import colors from "../theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function LeibnizModal({ visible, onClose }: Props) {
  const backdropOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0.8);
  const modalOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });

      modalScale.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.back(1.5)),
      });

      modalOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      backdropOpacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.in(Easing.cubic),
      });

      modalScale.value = withTiming(0.8, {
        duration: 200,
        easing: Easing.in(Easing.cubic),
      });

      modalOpacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [visible, backdropOpacity, modalScale, modalOpacity]);

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  });

  const animatedModalStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
      transform: [
        {
          scale: modalScale.value,
        },
        {
          translateY: interpolate(modalScale.value, [0.8, 1], [50, 0]),
        },
      ],
    };
  });

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, animatedBackdropStyle]}>
          <Pressable style={styles.backdropPress} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.modal, animatedModalStyle]}>
          <View style={styles.header}>
            <Text style={styles.title}>Leibniz Series for π</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close modal"
            >
              <Ionicons
                name="close-circle-outline"
                size={24}
                color={colors["muted"]}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.description}>
              The Leibniz series is a simple but famous way to approximate π
              using an infinite alternating sum:
            </Text>

            <View style={styles.formula}>
              <Image
                style={styles.image}
                source={require("../../assets/images/leibniz_series.png")}
                placeholder={"leibniz_series"}
                contentFit="cover"
                transition={300}
              />
            </View>

            <Text style={styles.description}>
              After summing n iterations, the error is no larger than:
            </Text>

            <View style={styles.formula}>
              <Image
                style={styles.image}
                source={require("../../assets/images/error_bound.png")}
                placeholder={"leibniz_series"}
                contentFit="cover"
                transition={300}
              />
            </View>

            <Text style={[styles.description, { marginBottom: 8 }]}>
              Here's how many iterations you need for correct decimal places:
            </Text>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.subDescription}>
                • 1 decimal place: ~40 iterations
              </Text>
              <Text style={styles.subDescription}>
                • 2 decimals: ~400 iterations
              </Text>
              <Text style={styles.subDescription}>
                • 3 decimals: ~4,000 iterations
              </Text>
              <Text style={styles.subDescription}>
                • 4 decimals: ~40,000 iterations
              </Text>
              <Text style={styles.subDescription}>
                • 5 decimals: ~400,000 iterations
              </Text>
            </View>

            <View style={styles.factBox}>
              <Text style={styles.factTitle}>Did you know?</Text>
              <Text style={styles.factText}>
                Did you know that if you used the Leibniz series to compute π to
                the same precision NASA uses for calculating spacecraft
                trajectories across the solar system (about 15 decimal places),
                you'd need over 10 trillion iterations? That's more than the
                number of stars you can see in the night sky!
              </Text>
            </View>

            <Text style={styles.description}>
              While the Leibniz series is simple and beautiful, its inefficiency
              shows why modern algorithms are essential for today's complex
              calculations. Still, it's a fantastic way to explore the elegance
              of mathematics and infinite series!
            </Text>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  backdropPress: {
    flex: 1,
  },
  modal: {
    backgroundColor: colors["card"],
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    shadowColor: colors["backgroundSecondary"],
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${colors["muted"]}40`,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: colors["text"],
  },
  closeButton: {
    padding: 4,
    borderRadius: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 15,
    color: colors["text"],
    lineHeight: 22,
    marginBottom: 16,
  },
  subDescription: {
    fontSize: 15,
    color: colors["text"],
    lineHeight: 22,
    fontStyle: "italic",
  },
  formula: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["backgroundSecondary"],
    paddingVertical: 8,
    paddingLeft: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontVariant: ["tabular-nums"],
  },
  factBox: {
    backgroundColor: colors["backgroundSecondary"],
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors["accent"],
  },
  factTitle: {
    fontSize: 14,
    color: colors["accent"],
    marginBottom: 8,
  },
  factText: {
    fontSize: 14,
    color: colors["muted"],
    lineHeight: 20,
  },
  image: {
    flex: 1,
    width: "70%",
    height: 70,
    transform: [{ translateX: -8 }],
  },
});

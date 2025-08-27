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
import colors from "../theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function PiModal({ visible, onClose }: Props) {
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
            <Text style={styles.title}>About π (Pi)</Text>
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
              Pi (π) is a mathematical constant representing the ratio of a
              circle's circumference to its diameter.
            </Text>

            <Text style={styles.formula}>Circumference = 2πr</Text>

            <Text style={styles.description}>
              Where r is the radius of the circle. For our calculations, we use
              π ≈ 3.14159265358979..., which provides high precision for
              astronomical measurements.
            </Text>

            <View style={styles.factBox}>
              <Text style={styles.factTitle}>Did you know?</Text>
              <Text style={styles.factText}>
                π is an irrational number, meaning its decimal representation
                never ends or repeats. It has been calculated to over 100
                trillion decimal places!
              </Text>
            </View>

            <Text style={styles.description}>
              The circumferences calculated in this app represent the distances
              you would travel if you could walk around the equator of each
              celestial body.
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
  formula: {
    fontSize: 18,
    color: colors["text"],
    textAlign: "center",
    backgroundColor: colors["backgroundSecondary"],
    padding: 16,
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
});

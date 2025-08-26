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
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ScaleModal({ visible, onClose }: Props) {
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
            <Text style={styles.title}>Scale Types</Text>
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
            <View style={styles.scaleSection}>
              <View style={styles.scaleHeader}>
                <Ionicons
                  name="stats-chart"
                  size={24}
                  color={colors["positive"]}
                />
                <Text style={styles.scaleTitle}>Logarithmic Scale</Text>
              </View>
              <Text style={styles.scaleDescription}>
                Compresses large differences to show relative proportions. Each
                step represents a multiplication (10x, 100x, 1000x). Perfect for
                comparing vastly different sizes like celestial bodies where the
                Sun is 109 times larger than Earth.
              </Text>
              <Text style={styles.scaleUse}>
                <Text style={styles.boldText}>Best for:</Text> Comparing objects
                with extreme size differences
              </Text>
            </View>

            <View style={styles.scaleSection}>
              <View style={styles.scaleHeader}>
                <Ionicons
                  name="trending-up"
                  size={24}
                  color={colors["danger"]}
                />
                <Text style={styles.scaleTitle}>Linear Scale</Text>
              </View>
              <Text style={styles.scaleDescription}>
                Shows true proportional relationships with equal spacing between
                values. Each step represents addition (1, 2, 3, 4). Reveals the
                actual magnitude differences between objects.
              </Text>
              <Text style={styles.scaleUse}>
                <Text style={styles.boldText}>Best for:</Text> Understanding
                true size relationships
              </Text>
            </View>

            <View style={styles.factBox}>
              <Text style={styles.factTitle}>Did you know?</Text>
              <Text style={styles.factText}>
                The Richter scale for earthquakes uses logarithmic scaling! An
                earthquake measuring 7.0 is actually 10 times more powerful than
                a 6.0 earthquake, not just one unit stronger. This same
                principle helps us visualize how the Sun dwarfs planets in our
                solar system.
              </Text>
            </View>

            <Text style={styles.description}>
              Toggle between scales in the Control section to see how the same
              data can tell different stories depending on how it's visualized.
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
  scaleSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: colors["backgroundSecondary"],
    borderRadius: 12,
  },
  scaleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  scaleTitle: {
    fontSize: 16,
    color: colors["text"],

    marginLeft: 8,
  },
  scaleDescription: {
    fontSize: 14,
    color: colors["text"],
    lineHeight: 20,
    marginBottom: 8,
  },
  scaleUse: {
    fontSize: 13,
    color: colors["muted"],
    lineHeight: 18,
  },
  boldText: {
    color: colors["text"],
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
  description: {
    fontSize: 14,
    color: colors["text"],
    lineHeight: 20,
    textAlign: "center",
    paddingBottom: 24,
  },
});

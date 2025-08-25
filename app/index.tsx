import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import colors from "../src/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pi Dashboard</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.heading}>3.141565</Text>
        <Text style={styles.subHeading}>Decimals: 4</Text>
        <Text style={styles.subHeading}>Iteration: 44</Text>

        <View
          style={[
            { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 16 },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.buttonPress,
              { backgroundColor: colors["positive"] },
            ]}
          >
            <Ionicons
              name="play"
              size={16}
              color="white"
              style={styles.buttonPressIcon}
            />
            <Text style={styles.buttonPressText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonPress,
              { backgroundColor: colors["backgroundSecondary"] },
            ]}
          >
            <Ionicons
              name="pause"
              size={16}
              color="white"
              style={styles.buttonPressIcon}
            />
            <Text style={styles.buttonPressText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonPress, { backgroundColor: colors["danger"] }]}
          >
            <Ionicons
              name="stop"
              size={16}
              color="white"
              style={styles.buttonPressIcon}
            />
            <Text style={styles.buttonPressText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonPress,
              { backgroundColor: colors["backgroundSecondary"] },
            ]}
          >
            <Ionicons
              name="refresh"
              size={16}
              color="white"
              style={styles.buttonPressIcon}
            />
            <Text style={styles.buttonPressText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusInfoContainer}>
          <Text style={styles.statusInfo}>Status:</Text>
          <Ionicons name="radio-button-on" size={12} color={colors["success"]} style={{ marginHorizontal: 4 }} />
          <Text style={[styles.statusInfo, { color: colors["success"] }]}>running</Text>
        </View>
      </View>
      <Link href="/solar" style={styles.buttonLink}>
        View Solar's Calculation
      </Link>
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
    marginVertical: 16,
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
    fontSize: 16,
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
    fontSize: 16,
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

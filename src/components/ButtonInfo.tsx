import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type ButtonInfoProps = {
  onShowModal: () => void;
  disclamerInfo: string;
};

const ButtonInfo = ({ onShowModal, disclamerInfo }: ButtonInfoProps) => {
  return (
    <TouchableOpacity
      style={styles.disclaimerContainer}
      onPress={onShowModal}
      accessibilityRole="button"
      accessibilityLabel="Learn more about π calculation"
    >
      <Ionicons
        name="information-circle-outline"
        size={16}
        color={colors["muted"]}
      />
      <Text style={styles.disclaimerText}>{disclamerInfo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disclaimerContainer: {
    width: "80%",
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

export default ButtonInfo;

import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const Solar = () => {
  return (
    <View style={styles.container}>
      <Text>Solar</Text>
      <Link href="/">Dashboard</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Solar;

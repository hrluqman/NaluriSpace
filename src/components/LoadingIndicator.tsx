import { ActivityIndicator, StyleSheet, View } from "react-native";
import colors from "../theme/colors";

const LoadingIndicator = () => {
    return (  
        <View style={styles.container}>
            <View>
                <ActivityIndicator size="large" color={colors["primary"]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
 
export default LoadingIndicator;
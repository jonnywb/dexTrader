import { StyleSheet, Text, View } from "react-native";

export default function Wishlist() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wishlist Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
});

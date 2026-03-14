import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Search() {
  const { tabName } = useLocalSearchParams<{ tabName: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackTitle: tabName }} />
      <Text style={styles.text}>Search Screen</Text>
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

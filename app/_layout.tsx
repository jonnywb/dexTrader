import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ title: "Scan" }} />
      <Stack.Screen name="search" options={{ title: "Search" }} />
    </Stack>
  );
}

import "@/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    "JetBrains Mono": require("../assets/fonts/JetBrainsMono-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View className="flex-1 items-center justify-center bg-dexBg">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: "Search" }} />
      </Stack>
    </>
  );
}

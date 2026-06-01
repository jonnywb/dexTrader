import { Screen } from "@/components/ui/Screen";
import { DexTheme } from "@/theme/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Search() {
  const { tabName } = useLocalSearchParams<{ tabName: string }>();

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerBackTitle: tabName,
          headerTitleStyle: {
            color: DexTheme.colors.dexText,
          },
          headerStyle: {
            backgroundColor: DexTheme.colors.dexSurface,
          },
        }}
      />
      <Text>Search Screen</Text>
    </Screen>
  );
}

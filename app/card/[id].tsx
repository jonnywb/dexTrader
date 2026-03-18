import { Screen } from "@/components/ui/Screen";
import { Body } from "@/components/ui/Typography";
import { DexTheme } from "@/theme/theme";
import { Stack, useLocalSearchParams } from "expo-router";

// FOR DEV PURPOSES, DELETE LATER
const cards = [
  { id: "swsh3-136", name: "Charizard VMAX" },
  { id: "sv2-234", name: "Some Other Card" },
];

export default function CardScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();

  const card = cards.find((c) => c.id === id);
  const cardName = name ?? `Card ${id}`;

  if (!card) {
    return (
      <Screen>
        <Body>Card not found...</Body>
      </Screen>
    );
  }

  return (
    <Screen style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1E1E1E",
          },
          title: cardName,
          headerBackTitle: "Collection",
          headerBackTitleStyle: {
            fontFamily: DexTheme.fonts.body,
          },
        }}
      />
      <Body>{card.name}</Body>
    </Screen>
  );
}

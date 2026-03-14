import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

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
      <View>
        <Text>Card not found...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: cardName, headerBackTitle: "Collection" }} />
      <Text>{card.name}</Text>
    </View>
  );
}

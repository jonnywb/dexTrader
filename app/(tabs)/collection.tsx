import { router } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Card = {
  id: string;
  name: string;
};

const cards: Card[] = [
  { id: "swsh3-136", name: "Charizard VMAX" },
  { id: "sv2-234", name: "Some other Card" },
];

export default function Collection() {
  const onPressCard = (card: Card) => {
    router.push({
      pathname: `/card/[id]`,
      params: {
        id: card.id,
        name: card.name,
      },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressCard(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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

import { Card } from "@/components/ui/Card";
import { CardRow, CardRowProps } from "@/components/ui/CardRow";
import { Screen } from "@/components/ui/Screen";
import { HeadingSM, HeadingXL } from "@/components/ui/Typography";
import { router } from "expo-router";
import { FlatList, Pressable } from "react-native";

const cards: CardRowProps[] = [
  { id: "swsh3-136", cardName: "Charizard ex", setName: "151", price: "450", delta: "320", deltaPositive: true },
  { id: "sv2-234", cardName: "Some other Card", setName: "151", price: "39.21", delta: "3.23", deltaPositive: false },
];

const totalValue = String(Object.values(cards).reduce((sum, item) => sum + Number(item.price), 0));

export default function Collection() {
  const onPressCard = (card: CardRowProps) => {
    router.push({
      pathname: `/card/[id]`,
      params: {
        id: card.id,
        name: card.cardName,
      },
    });
  };

  return (
    <Screen>
      <HeadingXL>My Collection</HeadingXL>
      <HeadingSM>
        {cards.length} Cards · Total: £{totalValue}
      </HeadingSM>
      <FlatList
        data={cards}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <Card className="flex-1 mb-10">
            <Pressable onPress={() => onPressCard(item)}>
              <CardRow
                id={item.id}
                cardName={item.cardName}
                setName={item.setName}
                delta={item.delta}
                deltaPositive={item.deltaPositive}
                price={item.price}
              />
            </Pressable>
          </Card>
        )}
      />
    </Screen>
  );
}

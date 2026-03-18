import { Body, HeadingSM, Mono } from "@/components/ui/Typography";
import { View } from "react-native";

export type CardRowProps = {
  id: string;
  cardName: string;
  setName: string;
  price: string;
  delta?: string;
  deltaPositive?: boolean;
};

export function CardRow({ cardName, setName, price, delta, deltaPositive }: CardRowProps) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <View>
        <Body className="font-body text-base">{cardName}</Body>
        <HeadingSM className="mt-0.5">{setName}</HeadingSM>
      </View>

      <View className="items-end">
        <Mono>{"£" + price}</Mono>
        {delta && (
          <Mono className={"text-xs " + (deltaPositive ? "text-dexGain" : "text-dexLoss")}>
            {deltaPositive ? "+ " + delta : "- " + delta}
          </Mono>
        )}
      </View>
    </View>
  );
}

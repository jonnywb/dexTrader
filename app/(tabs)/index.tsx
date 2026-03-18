import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { HeadingSM, HeadingXL, Mono } from "@/components/ui/Typography";

export default function Home() {
  return (
    <Screen>
      <HeadingXL>Good Morning, Jonnywb</HeadingXL>
      <HeadingSM className="text-dexTextMuted">Wednesday, 18 March</HeadingSM>
      <Card className="mt-4 gap-4">
        <HeadingSM>Portfolio Value</HeadingSM>
        <Mono className="text-4xl mt-1">£4,821.50</Mono>
        <Mono className="text-dexGain mt-1">+£142.30 today (+3.04%)</Mono>
      </Card>
    </Screen>
  );
}

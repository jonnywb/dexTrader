import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { HeadingSM, HeadingXL, Mono } from "@/components/ui/Typography";
import { useUser } from "@/contexts/UserContext";
import supabase from "@/lib/supabase";
import { Profile } from "@/lib/types";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

type ProfilePreview = Pick<Profile, "username">;

const getTimeOfDay = (date: Date): "Morning" | "Afternoon" | "Evening" => {
  const hour = date.getHours();

  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};

const greetingPrefixes = [
  "Good",
  "Lovely",
  "Happy",
  "Pleasant",
  "Beautiful",
  "Bright",
  "Warm",
  "Cheery",
  "Peaceful",
  "Wonderful",
];

const getRandomGreeting = () => {
  return greetingPrefixes[Math.floor(Math.random() * 10)];
};

const formatCurrentDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
};

export default function Home() {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [username, setUsername] = useState("");

  const { user } = useUser();
  const userId = user?.id;

  const now = new Date();
  const formattedDate = formatCurrentDate(now);
  const timeOfDay = getTimeOfDay(now);

  useEffect(() => {
    if (userId) {
      getUsername();
    }
  }, [userId]);

  const getUsername = async () => {
    if (!userId) return;

    try {
      setInitialLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", userId)
        .single<ProfilePreview>();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username ?? "");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setInitialLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Screen>
        <HeadingXL>Good Morning...</HeadingXL>
        <HeadingSM className="text-dexTextMuted">Wednesday, 18 March</HeadingSM>
        <Card className="mt-4 gap-4">
          <HeadingSM>Portfolio Value</HeadingSM>
          <Mono className="text-4xl mt-1">£0.00</Mono>
          <Mono className="text-dexGain mt-1"></Mono>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <HeadingXL>
        {getRandomGreeting()} {getTimeOfDay(now)}, {username}
      </HeadingXL>
      <HeadingSM className="text-dexTextMuted">{formattedDate}</HeadingSM>
      <Card className="mt-4 gap-4">
        <HeadingSM>Portfolio Value</HeadingSM>
        <Mono className="text-4xl mt-1">£4,821.50</Mono>
        <Mono className="text-dexGain mt-1">+£142.30 today (+3.04%)</Mono>
      </Card>
    </Screen>
  );
}

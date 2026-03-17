import supabase from "@/lib/supabase";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();

      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth");
      }

      setInitialised(true);

      supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          router.replace("/(tabs)");
        } else {
          router.replace("/auth");
        }
      });
    };

    getSession();
  }, []);

  if (!initialised) return null;
  //ADD LOADING

  return null;
}

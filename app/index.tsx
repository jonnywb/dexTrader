import { JwtPayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import "react-native-url-polyfill/auto";
import Auth from "./components/Auth";
import { supabase } from "./lib/supabase";

export default function App() {
  const [claims, setClaims] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      const { data } = await supabase.auth.getClaims();
      setClaims(data?.claims ?? null);
    };
    fetchClaims();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchClaims();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View>
      <Auth />
      {claims && <Text>{claims.sub}</Text>}
    </View>
  );
}

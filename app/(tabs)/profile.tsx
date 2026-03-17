import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUser(data.user);
    };

    loadUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error Signing Out", error);
    }
  };

  return (
    <View style={styles.container}>
      {user && <Text style={styles.headerText}>{user.email}</Text>}
      <Pressable onPress={handleSignOut} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { fontSize: 30 },
  logoutButton: {
    width: 250,
    backgroundColor: "#a82028",
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
  },
  logoutText: { color: "white", fontSize: 17 },
});

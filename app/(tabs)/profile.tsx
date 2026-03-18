import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { HeadingXL } from "@/components/ui/Typography";
import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

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
    <Screen>
      {user && <HeadingXL>{user.email}</HeadingXL>}
      <Button onPress={handleSignOut} label="Log Out" />
    </Screen>
  );
}

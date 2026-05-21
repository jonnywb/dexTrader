import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { HeadingXL } from "@/components/ui/Typography";
import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadUserAndProfile = async () => {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      const authUser = data.user;

      if (!authUser) return;

      setUser(authUser);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return;
      }

      setProfile(profileData);
    };

    loadUserAndProfile();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error Signing Out", error);
    }
  };

  return (
    <Screen>
      {user && <HeadingXL>{profile?.username}</HeadingXL>}
      <Button onPress={handleSignOut} label="Log Out" />
    </Screen>
  );
}

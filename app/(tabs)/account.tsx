import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { HeadingSM, HeadingXL } from "@/components/ui/Typography";
import { useUser } from "@/contexts/UserContext";
import supabase from "@/lib/supabase";
import { Profile, ProfileUpdate } from "@/lib/types";
import { useEffect, useState } from "react";
import { Alert, TextInput, View } from "react-native";

type ProfilePreview = Pick<Profile, "username" | "avatar_url">;
type ProfileUsernameAvatar = Pick<ProfileUpdate, "username" | "avatar_url">;

export default function Account() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { user } = useUser();

  const userId = user?.id;
  const email = user?.email;

  useEffect(() => {
    if (userId) {
      getProfile();
    }
  }, [userId]);

  async function getProfile() {
    if (!userId) return;

    try {
      setInitialLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single<ProfilePreview>();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username ?? "");
        setAvatarUrl(data.avatar_url ?? "");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setInitialLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }: ProfileUsernameAvatar) {
    if (!userId) return;

    try {
      setSaving(true);

      const updates: ProfileUpdate = {
        id: userId,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").update(updates).eq("id", userId);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setSaving(false);
    }
  }

  function AccountSkeleton() {
    return (
      <Screen className="items-center">
        <View className="w-5/6 items-center gap-6">
          <View className="h-10 w-40 rounded bg-dexSurfaceElevated opacity-60" />
          <View className="h-28 w-28 rounded-full bg-dexSurfaceElevated opacity-60" />

          <View className="w-full bg-dexSurfaceElevated p-5 border border-dexBorder rounded gap-4">
            <View className="gap-2">
              <View className="h-4 w-20 rounded bg-dexBg opacity-60" />
              <View className="h-14 w-full rounded bg-dexBg opacity-60" />
            </View>

            <View className="gap-2">
              <View className="h-4 w-24 rounded bg-dexBg opacity-60" />
              <View className="h-14 w-full rounded bg-dexBg opacity-60" />
            </View>

            <View className="h-12 w-32 self-center rounded bg-dexAccentDim opacity-60" />
          </View>
        </View>
      </Screen>
    );
  }

  if (initialLoading) return <AccountSkeleton />;

  return (
    <Screen className="items-center">
      <View>
        <HeadingXL>Hello, {username || "User"}</HeadingXL>
      </View>

      <View className="justify-center items-center w-5/6">
        <Avatar
          size={120}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url });
          }}
        />
      </View>

      <View className="w-5/6 bg-dexSurfaceElevated p-5 border border-dexBorder rounded items-center gap-4">
        <View className="w-full flex-2">
          <HeadingSM>Email</HeadingSM>

          <TextInput
            className="bg-dexAccentDim h-14 w-full px-3 rounded shadow-sm text-dexBg"
            value={email ?? ""}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

        <View className="w-full flex-2">
          <HeadingSM>Username</HeadingSM>

          <TextInput
            value={username}
            onChangeText={setUsername}
            className="bg-white h-14 w-full px-3 rounded shadow-sm"
          />
        </View>

        <View className="flex-0.5">
          <Button
            label={saving ? "Loading..." : "Update"}
            onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
            disabled={saving}
          />
        </View>
      </View>

      <View className="w-5/6 bg-dexSurfaceElevated p-5 border border-dexBorder rounded items-center gap-2">
        <Button label="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </Screen>
  );
}

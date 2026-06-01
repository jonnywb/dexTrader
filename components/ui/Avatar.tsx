import supabase from "@/lib/supabase";
import { DexTheme } from "@/theme/theme";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button } from "./Button";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from("avatars").download(path);

      if (error) throw Error;

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image url!");
      }

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage.from("avatars").upload(path, arraybuffer, {
        contentType: image.mimeType ?? "image/jpeg",
      });

      if (uploadError) throw uploadError;

      onUpload(data.path);
    } catch (error: any) {
      if (error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Image
        source={avatarUrl ? { uri: avatarUrl } : require("@/assets/images/blank-profile-picture.png")}
        accessibilityLabel="Avatar"
        style={[avatarSize, { borderRadius: 90, borderWidth: 4, borderColor: DexTheme.colors.dexAccent }]}
      />
      <View className="p-2">
        <Button label={uploading ? "Uploading..." : "Upload"} disabled={uploading} onPress={uploadAvatar} />
      </View>
    </>
  );
}

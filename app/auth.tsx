import { HeaderLogo } from "@/components/Logo";
import { createSessionFromUrl } from "@/lib/authSession";
import supabase from "@/lib/supabase";
import { makeRedirectUri } from "expo-auth-session";
import { useLinkingURL } from "expo-linking";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";

const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Auth() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "verifying" | "ok" | "error">("idle");
  const [otpError, setOtpError] = useState("");
  const url = useLinkingURL();
  const showInput = status === "idle" || status === "error";

  useEffect(() => {
    const handleUrl = async () => {
      if (!url) return;

      try {
        const session = await createSessionFromUrl(url);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    handleUrl();
  }, [url]);

  const handleSignIn = async () => {
    const redirectTo = makeRedirectUri({ scheme: "dextrader", path: "auth" });

    setStatus("sending");
    setErrorMessage("");

    if (!regex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }
    try {
      await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong sending the magic link");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpStatus("verifying");
    setOtpError("");

    if (!regex.test(email)) {
      setOtpStatus("error");
      setOtpError("Please enter a valid email address first");
      return;
    }

    if (!otp || otp.length < 4) {
      setOtpStatus("error");
      setOtpError("Please enter the code from your email");
      return;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        setOtpStatus("error");
        setOtpError("Invalid or expired code");
        console.error(error);
        return;
      }

      setOtpStatus("ok");
    } catch (error) {
      console.error(error);
      setOtpStatus("error");
      setOtpError("Something went wrong verifying the code");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-dexBg justify-top items-center gap-5"
    >
      <View className="flex-1" />

      <View className="flex-1 left-5 mt-24">
        <HeaderLogo />
      </View>

      <View className="flex-0.5 w-4/5 bg-dexSurfaceElevated p-5 border border-dexBorder rounded items-center gap-2">
        {showInput && (
          <TextInput
            className="bg-white h-14 w-full px-3 rounded shadow-sm"
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
          />
        )}
        {status === "sent" && (
          <TextInput
            className="bg-white h-14 w-full px-3 rounded shadow-sm"
            onChangeText={setOtp}
            value={otp}
            placeholder="Enter 8-digit code"
            keyboardType="number-pad"
          />
        )}

        <View className="flex-row w-full gap-2">
          <Pressable onPress={handleSignIn} className="bg-dexAccent p-4 rounded flex-1">
            <Text>Login / Sign Up</Text>
          </Pressable>
          <Pressable onPress={handleVerifyOtp} className="bg-dexAccent p-4 rounded flex-1">
            <Text>Login With Code</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-1">
        {status === "sending" && <Text className="text-dexAccentDim">Sending Magic Link...</Text>}
        {status === "sent" && <Text className="text-dexAccent">Check your email for a magic link!</Text>}
        {status === "error" && <Text className="text-dexAccentDim">{errorMessage}</Text>}
        {otpStatus === "verifying" && <Text className="text-dexAccentDim">Verifying code…</Text>}
        {otpStatus === "ok" && <Text className="text-dexAccentDim">Logged in!</Text>}
        {otpStatus === "error" && <Text className="text-dexAccentDim">{otpError}</Text>}
      </View>

      <View className="flex-0.5" />
    </KeyboardAvoidingView>
  );
}

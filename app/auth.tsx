import { HeaderLogo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import supabase from "@/lib/supabase";
import { DexTheme } from "@/theme/theme";
import { makeRedirectUri } from "expo-auth-session";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Switch, Text, TextInput, View } from "react-native";

type Step = "email" | "code";
type AsyncStatus = "idle" | "loading" | "error";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]{1,18}[a-zA-Z0-9])?$/;

export default function Auth() {
  //INPUT
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  //Layout
  const [showSignup, setShowSignup] = useState<boolean>(false);

  //STATUS
  const [step, setStep] = useState<Step>("email");
  const [status, setStatus] = useState<AsyncStatus>("idle");

  //ERROR
  const [errorMessage, setErrorMessage] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSendCode = async () => {
    const redirectTo = makeRedirectUri({ scheme: "dextrader", path: "auth" });

    setStatus("loading");
    setErrorMessage("");

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    if (showSignup) {
      if (!usernameRegex.test(username)) {
        setErrorMessage("Please enter a valid username");
        setStatus("error");
        return;
      }
    }

    if (!showSignup) {
      try {
        await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectTo,
            shouldCreateUser: false,
          },
        });
        setStatus("idle");
        setStep("code");
      } catch (error) {
        setStatus("error");
        setErrorMessage("Something went wrong sending the magic link");
        console.error(error);
      }
    } else {
      try {
        await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: redirectTo,
            data: {
              username,
            },
          },
        });

        setStatus("idle");
        setStep("code");
      } catch (error) {
        setStatus("error");
        setErrorMessage("Something went wrong sending the magic link, please try again");
        console.error(error);
      }
    }
  };

  const handleVerifyOtp = async () => {
    setStatus("loading");
    setOtpError("");

    if (!emailRegex.test(email)) {
      setStatus("error");
      setOtpError("Please enter a valid email address first");
      return;
    }

    if (!otp || otp.length < 4) {
      setStatus("error");
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
        setStatus("error");
        setOtpError("Invalid or expired code");
        console.error(error);
        return;
      }

      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setOtpError("Something went wrong verifying the code");
    }
  };

  const toggleSwitch = () => setShowSignup((showSignup) => !showSignup);

  const handleReset = () => {
    setStatus("idle");
    setStep("email");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-dexBg justify-top items-center gap-5"
    >
      <View className="flex-1" />

      <View className="flex-1 justify-center items-center">
        <HeaderLogo width={360} containerClassName={"pl-20"} />
      </View>

      <View className="w-4/5 bg-dexSurfaceElevated p-5 border border-dexBorder rounded items-center gap-2">
        {step === "email" && (
          <TextInput
            className="bg-white h-14 w-full px-3 rounded shadow-sm"
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
          />
        )}

        {showSignup && step === "email" && (
          <TextInput
            className="bg-white h-14 w-full px-3 rounded shadow-sm"
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
          />
        )}

        {step === "code" && (
          <>
            <Text className="mb-2 text-dexAccent">Please check your email for a login code.</Text>
            <TextInput
              className="bg-white h-14 w-full px-3 rounded shadow-sm"
              onChangeText={setOtp}
              value={otp}
              placeholder="Enter 8-digit code"
              keyboardType="number-pad"
            />
          </>
        )}

        <View className="flex-row w-full gap-2">
          {step === "email" && (
            <Button onPress={handleSendCode} label={showSignup ? "Sign Up" : "Sign In"} className="flex-1" />
          )}

          {step === "code" && <Button onPress={handleVerifyOtp} label="Login With Code" className="flex-1" />}
        </View>

        {step === "email" && (
          <View className="flex-row w-full justify-end items-center">
            <Text className="text-dexTextSecondary mr-2">Sign Up?</Text>
            <Switch
              trackColor={{ false: DexTheme.colors.dexBg, true: DexTheme.colors.dexAccentDim }}
              thumbColor={showSignup ? DexTheme.colors.dexAccent : DexTheme.colors.dexTextMuted}
              ios_backgroundColor={"#3e3d3e"}
              onValueChange={toggleSwitch}
              value={showSignup}
            />
          </View>
        )}
      </View>

      <View className="flex-1">
        {status === "error" && <Text className="text-dexAccentDim">{errorMessage}</Text>}
        {step === "code" && <Button onPress={handleReset} label="Go Back" className="bg-dexAccentDim" />}
      </View>

      <View className="flex-0.5" />
    </KeyboardAvoidingView>
  );
}

import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="login" options={{ title: "Login" }} />
      <Tabs.Screen name="register" options={{ title: "Register" }} />
    </Tabs>
  );
}

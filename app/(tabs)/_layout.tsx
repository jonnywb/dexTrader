import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C85047",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={focused ? "#C85047" : "#777"} />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "book-sharp" : "book-outline"} size={24} color={focused ? "#C85047" : "#777"} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 85,
                height: 85,
                borderRadius: 50,
                backgroundColor: "#C85047",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
                shadowColor: "black~",
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <Ionicons name={focused ? "scan-sharp" : "scan-outline"} size={44} color={focused ? "#A8B8C8" : "#fff"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart-sharp" : "heart-outline"} size={24} color={focused ? "#C85047" : "#777"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={24}
              color={focused ? "#C85047" : "#777"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

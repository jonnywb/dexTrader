import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname, useRouter } from "expo-router";
import { Image, Pressable, useColorScheme, View } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  const pathName = usePathname();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C85047",
        headerLeft: () => (
          <Image
            source={require(`@/assets/images/logo-header.png`)}
            style={{ width: 40, height: 40, marginLeft: 16, tintColor: colorScheme === "dark" ? "#fff" : "#000" }}
            resizeMode="contain"
          />
        ),
        headerTitle: "DexTrader",
        headerShadowVisible: false,
        headerRight: () => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/search`,
                params: {
                  tabName: pathName === "/" ? "Home" : pathName.charAt(1).toUpperCase() + pathName.slice(2),
                },
              })
            }
            style={{ paddingHorizontal: 12 }}
          >
            <Ionicons name="search-sharp" size={22} />
          </Pressable>
        ),
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
          headerRight: () => null,
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

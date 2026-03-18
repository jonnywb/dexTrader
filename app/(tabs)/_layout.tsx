import Logo from "@/assets/logo.svg";
import { DexTheme } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname, useRouter } from "expo-router";
import { Pressable, useColorScheme, View } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  const pathName = usePathname();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1.5,
          borderColor: DexTheme.colors.dexBorder,
          backgroundColor: DexTheme.colors.dexSurface,
        },
        headerTitleStyle: {
          color: DexTheme.colors.dexText,
        },
        headerStyle: {
          borderBottomWidth: 1.5,
          borderBottomColor: DexTheme.colors.dexBorder,
          backgroundColor: DexTheme.colors.dexSurface,
        },
        tabBarActiveTintColor: DexTheme.colors.dexAccent,
        headerLeft: () => <Logo width={100} height={20} />,
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
            className="px-4"
          >
            <Ionicons name="search-sharp" size={22} color={DexTheme.colors.dexText} />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? DexTheme.colors.dexAccent : DexTheme.colors.dexTextMuted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="book-outline"
              size={24}
              color={focused ? DexTheme.colors.dexAccent : DexTheme.colors.dexTextMuted}
            />
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
              <Ionicons
                name="scan-outline"
                size={44}
                color={focused ? DexTheme.colors.dexAccent : DexTheme.colors.dexText}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="heart-outline" size={24} color={focused ? "#F4D03F" : "#777"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerRight: () => null,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-outline" size={24} color={focused ? "#F4D03F" : "#777"} />
          ),
        }}
      />
    </Tabs>
  );
}

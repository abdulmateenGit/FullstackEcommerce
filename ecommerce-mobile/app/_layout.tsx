import "@/global.css";
import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable, Animated, View } from "react-native"; // Import Animated and View
import { useEffect, useRef } from "react"; // Import useEffect and useRef
import { useCart } from "@/store/cartStore"; // Import your cart store
import { Text } from "@/components/ui/text";

const queryClient = new QueryClient();

export default function RootLayout() {
  const hasItems = useCart((state) => state.hasItems); // Get the hasItems state

  const cartItemsNum = useCart((state) => state.items.length); // Get the number of items in the cart
  // Animation logic
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: hasItems ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [hasItems]);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack screenOptions={{
          headerTitleAlign: "center",
          // Cart Screen
          headerRight: () => cartItemsNum > 0 && (
            <Link href={"/cart"} asChild>
              <Pressable className="flex-row mr-1 p-3 gap-2">
                {/* Cart Icon */}
                <Icon as={ShoppingCart} />
                <Text>{cartItemsNum}</Text>
                {/* Animated Red Dot */}
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 22,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'red',
                    transform: [{ scale: scaleValue }], // Apply animation
                  }}
                />
              </Pressable>
            </Link>
          ),
          // Login Screen
          headerLeft: () => (
            <Link href={"/login"} asChild>
              <Pressable className="flex-row gap-2 ml-1 p-3">
                {/* User Icon */}
                <Icon as={User} size="xl" />
              </Pressable>
            </Link>
          ),
        }}>
          <Stack.Screen name="index" options={{ title: "Shop", headerTitleAlign: "center" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product", headerTitleAlign: "center" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
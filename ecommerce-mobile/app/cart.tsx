import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { Redirect, Stack } from "expo-router";
import { Minus, Plus } from "lucide-react-native";
import { FlatList } from "react-native";

export default function Cart() {
  const items = useCart((state) => state.items);
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);
  const restCart = useCart((state) => state.restCart);

  if (items.length === 0) {
    return <Redirect href={"/"} />;
  }

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <Stack.Screen options={{ title: "Cart" }} />
      <FlatList
        data={items}
        contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
        renderItem={({ item }) => {
          const total = (item.product.price * item.quantity).toFixed(2); // Calculate total price for item
          return (
            <HStack className="bg-white p-3">
              {/* Product Image */}
              <Image
                source={item.product.image}
                alt="Product Image"
                size="sm"
                resizeMode="contain"
              />
              {/* Product Details */}
              <VStack className="pl-3 ml-3 flex-1">
                {/* Product Name */}
                <Text numberOfLines={2} bold>{item.product.name}</Text>
                {/* Product Price */}
                <Text>Rs. {item.product.price} x {item.quantity}</Text>
                {/* Total Cost for Item */}
                <Text bold className="text-green-600">Total: Rs. {total}</Text>
              </VStack>
              <HStack className="ml-auto">
                {/* Product Quantity */}
                <Button onPress={() => decreaseQuantity(item.product.id)} size="sm" className="p-3">
                  <ButtonIcon as={Minus} />
                </Button>
                <Text className="mr-3 ml-3">{item.quantity}</Text>
                <Button onPress={() => increaseQuantity(item.product.id)} size="sm" className="p-3">
                  <ButtonIcon as={Plus} />
                </Button>
              </HStack>
            </HStack>
          );
        }}
        ListFooterComponent={() => (
          <VStack className="mt-4 p-3 bg-gray-100">
            <Text className="text-lg font-bold">Subtotal: Rs. {subtotal}</Text>
            <Button onPress={restCart} className="mt-2">
              <ButtonText>Checkout</ButtonText>
            </Button>
          </VStack>
        )}
      />
    </>
  );
}

import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
// import products from '@/assets/products.json' //this is local data now we are facthing from server


import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { getProductById } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { useCart } from '@/store/cartStore';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const addProduct = useCart((state) => state.addProduct)

  //For debugging purpose is shwoing the cart items or not in console
  // const cartItems = useCart(state => state.items)
  // console.log(JSON.stringify(cartItems, null, 2))

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(Number(id))
  })

  const addToCart = () => {
    addProduct(product)
  }
  // const product = products.find((p) => p.id === Number(id))

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <Box className="flex-1 p-5 items-center">
      <Stack.Screen options={{ title: product.name }} />
      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{
            uri: product.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            Rs.{product.price}
          </Heading>
          <Text size="sm">
            {product.description}
          </Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button onPress={addToCart} className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
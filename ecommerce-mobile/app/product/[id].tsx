import products from "@/assets/products.json"
import { Stack, useLocalSearchParams } from 'expo-router'

import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const product = products.find((p) => p.id === Number(id))

    if (!product) {
        return <Text>Product not found</Text>
    }

    return (
        <Box className="flex-1 items-center p-3">
            <Stack.Screen options={{ title: product.name }} />

            <Card className="w-full max-w-[960px] flex-1 rounded-lg p-5">
                <Image
                    source={{
                        uri: product.image,
                    }}
                    className="mb-6 h-[240px] w-full rounded-md"
                    alt={`${product.name} image`}
                    resizeMode="contain"
                />
                <Text className="mb-2 text-sm font-normal text-typography-700">
                    {product.name}
                </Text>

                <VStack className="mb-6">
                    <Heading size="md" className="mb-4">Rs. {product.price}</Heading>
                    <Text size="sm">{product.description}</Text>
                </VStack>
                <Box className="flex-col sm:flex-row">
                    <Button className="mb-3 mr-0 px-4 py-2 sm:mb-0 sm:mr-3 sm:flex-1">
                        <ButtonText size="sm">Add to cart</ButtonText>
                    </Button>
                    <Button
                        variant="outline"
                        className="border-outline-300 px-4 py-2 sm:flex-1"
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
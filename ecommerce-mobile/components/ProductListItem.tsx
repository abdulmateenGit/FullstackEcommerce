import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function ProductListItem({ product }) {
    return (
        <Link href={`product/${product.id}`} asChild>
            <Pressable className="flex-1">
                <Card className="max-w-[360px] flex-1 rounded-lg p-5">
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
                    <Heading size="md" className="mb-4">Rs. {product.price}</Heading>
                </Card>
            </Pressable>
        </Link>
    )
}
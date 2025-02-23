import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import React from "react";
import { Box } from "@/components/ui/box";
import { Stack } from "expo-router";
import { HStack } from "@/components/ui/hstack";

export default function App() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };
    return (
        <Box className="justify-center bg-gray-100 m-2 p-2">
            <Stack.Screen options={{ title: "Login" }} />
            <Box className="w-full max-w-[960px] mx-auto">
                <FormControl className="p-4 border rounded-lg border-outline-300 bg-white">
                    <VStack space="xl">
                        <VStack space="xs">
                            <Text className="text-typography-500">Email</Text>
                            <Input className="min-w-[250px]">
                                <InputField type="text" />
                            </Input>
                        </VStack>
                        <VStack space="xs">
                            <Text className="text-typography-500">Password</Text>
                            <Input className="text-center">
                                <InputField type={showPassword ? "text" : "password"} />
                                <InputSlot className="pr-3" onPress={handleState}>
                                    <InputIcon
                                        as={showPassword ? EyeIcon : EyeOffIcon}
                                    />
                                </InputSlot>
                            </Input>
                        </VStack>
                        <HStack space="sm">
                            <Button
                                className="flex-1" variant="outline" onPress={() => { }}>
                                <ButtonText>Sign Up</ButtonText>
                            </Button>
                            <Button
                                className="flex-1" onPress={() => { }}>
                                <ButtonText>Sign In</ButtonText>
                            </Button>
                        </HStack>
                    </VStack>
                </FormControl>
            </Box>
        </Box>
    );
}
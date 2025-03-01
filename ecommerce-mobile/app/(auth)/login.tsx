import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Redirect, Stack } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "@/api/auth";
import { useAuth } from "@/store/authStore";

export default function App() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setUser = useAuth((s) => s.setUser);
    const setToken = useAuth((s) => s.setToken);
    const isLoggedIn = useAuth((s) => !!s.token);

    const loginMutation = useMutation(
        {
            mutationFn: () => login(email, password), onSuccess: (data) => {
                console.log("Successfully logged in: ", data)
                if (data.user && data.token) {
                    setUser(data.user);
                    setToken(data.token);
                }
            },
            onError: (error) => {
                console.log("Error: ", error)
            }
        });

    const signupMutation = useMutation(
        {
            mutationFn: () => signup(email, password), onSuccess: (data) => {
                console.log("Successfully sign up: ", data)
                if (data.user && data.token) {
                    setUser(data.user);
                    setToken(data.token);
                }
            },
            onError: (error) => {
                console.log("Error", error)
            }
        });

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };

    if (isLoggedIn) {
        return <Redirect href={"/"} />
    }


    return (
        <Box className="justify-center bg-gray-100 m-2 p-2">
            <Stack.Screen options={{ title: "Login" }} />
            <Box className="w-full max-w-[960px] mx-auto">
                <FormControl isInvalid={loginMutation.error || signupMutation.error} className="p-4 border rounded-lg border-outline-300 bg-white">
                    <VStack space="xl">
                        <VStack space="xs">
                            <Text className="text-typography-500">Email</Text>
                            <Input className="min-w-[250px]">
                                <InputField value={email} onChangeText={setEmail} type="text" />
                            </Input>
                        </VStack>
                        <VStack space="xs">
                            <Text className="text-typography-500">Password</Text>
                            <Input className="text-center">
                                <InputField value={password} onChangeText={setPassword} type={showPassword ? "text" : "password"} />
                                <InputSlot className="pr-3" onPress={handleState}>
                                    <InputIcon
                                        as={showPassword ? EyeIcon : EyeOffIcon}
                                    />
                                </InputSlot>
                            </Input>
                        </VStack>
                        <HStack space="sm">
                            <Button
                                className="flex-1"
                                variant="outline"
                                onPress={() => signupMutation.mutate()} >
                                <ButtonText>Sign Up</ButtonText>
                            </Button>
                            <Button
                                className="flex-1"
                                onPress={() => loginMutation.mutate()}>
                                <ButtonText>Sign In</ButtonText>
                            </Button>
                        </HStack>
                    </VStack>
                </FormControl>
            </Box>
        </Box>
    );
}
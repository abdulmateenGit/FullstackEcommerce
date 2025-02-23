import { Button, ButtonText } from "@/components/ui/button"
import { FormControl } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { EyeIcon, EyeOffIcon } from "lucide-react-native"
import { useState } from "react"

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  return (
    <FormControl className="p-4 border rounded-lg border-outline-300">
      <VStack space="xl">
        <Heading className="text-typography-900">Login</Heading>
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
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <Button
          className="ml-auto"
          onPress={() => {
            setShowModal(false)
          }}
        >
          <ButtonText className="text-typography-0">Save</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  )
}
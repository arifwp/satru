import { Text, VStack } from "@chakra-ui/react";
import { FillDataForm } from "../components/forms/FillDataForm";
import { useBgComponentBaseColor } from "../constant/colors";

export const FillData = () => {
  const bgComponent = useBgComponentBaseColor();

  return (
    <VStack
      className="container"
      w={"100%"}
      maxW={"720px"}
      mx={"auto"}
      h={"100vh"}
    >
      <VStack w={"100%"} h={"100%"} p={10} bg={bgComponent} justify={"center"}>
        <VStack w={"100%"} align={"stretch"} mt={4}>
          <Text as={"b"} fontSize={"lg"}>
            Informasi Bisnis
          </Text>
          <Text fontSize={"xs"} variant={"secondary"}>
            Sebelum menggunakan aplikasi anda wajib mengisi data di bawah ini
          </Text>
        </VStack>

        <FillDataForm mt={10} />
      </VStack>
    </VStack>
  );
};

import { Text, VStack } from "@chakra-ui/react";
import { FillDataForm } from "../components/forms/FillDataForm";
import { useBgComponentBaseColor } from "../constant/colors";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export const FillData = () => {
  const bgComponent = useBgComponentBaseColor();

  return (
    <VStack
      className="container"
      w={"100%"}
      mx={"auto"}
      h={"100%"}
      bg={bgComponent}
    >
      <VStack w={"100%"} maxW={"720px"} h={"100%"} p={10} justify={"center"}>
        <VStack w={"100%"} align={"stretch"} mt={4}>
          <Text as={"b"} fontSize={"lg"}>
            Buat outlet pertama anda!
          </Text>
          <Text fontSize={"xs"} variant={"secondary"}>
            Sebelum menggunakan aplikasi anda wajib mengisi data outlet
          </Text>
        </VStack>

        <FillDataForm mt={10} />
      </VStack>

      <ColorModeSwitcher
        position={"absolute"}
        top={0}
        right={0}
        mt={30}
        mr={30}
        fontSize={"24px"}
      />
    </VStack>
  );
};

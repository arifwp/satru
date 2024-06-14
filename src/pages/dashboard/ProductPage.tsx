import { Heading, VStack, useColorModeValue } from "@chakra-ui/react";

export const ProductPage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <VStack bgColor={bg} w={"100%"} h={"100%"}>
      <Heading>Ini adalah heading dari product page</Heading>
    </VStack>
  );
};

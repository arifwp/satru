import { Text, VStack } from "@chakra-ui/react";
import { useBgComponentBaseColor } from "../../constant/colors";

export const DiscountCard = () => {
  const bgComp = useBgComponentBaseColor();

  return (
    <VStack
      className="discount-card"
      bg={bgComp}
      borderWidth={"1px"}
      borderRadius={"md"}
      textAlign={"center"}
      fontSize={[12, null, 14]}
      cursor={"pointer"}
    >
      <VStack p={4}>
        <Text fontSize={[14, null, 16]} fontWeight={"semibold"}>
          Promo Kemerdekaan
        </Text>
        <Text>10.000 - 50.000</Text>
      </VStack>

      <VStack w={"100%"} borderTopWidth={"1px"} borderRadius={"none"} p={2}>
        <Text fontSize={[10, null, 12]}>Berlaku sampai 22 juni 2001</Text>
      </VStack>
    </VStack>
  );
};

import { Text, VStack } from "@chakra-ui/react";

export const DiscountCard = () => {
  return (
    <VStack
      className="discount-card"
      //   p={4}
      borderWidth={"2px"}
      borderRadius={"md"}
      textAlign={"center"}
      fontSize={[12, null, 14]}
    >
      <VStack p={4}>
        <Text fontSize={[14, null, 16]} fontWeight={"semibold"}>
          Promo Kemerdekaan
        </Text>
        <Text>10.000 - 50.000</Text>
      </VStack>

      <VStack w={"100%"} borderTopWidth={"2px"} borderRadius={"none"} p={2}>
        <Text fontSize={[10, null, 12]}>Berlaku sampai 22 juni 2001</Text>
      </VStack>
    </VStack>
  );
};

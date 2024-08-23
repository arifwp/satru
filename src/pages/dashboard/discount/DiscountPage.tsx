import { SimpleGrid, VStack } from "@chakra-ui/react";
import { DiscountCard } from "../../../components/card/DiscountCard";

export const DiscountPage = () => {
  return (
    <VStack className="discount-page" w={"100%"} p={4}>
      <SimpleGrid columns={[1, 2, 4, 5, 7]} spacing={4}>
        <DiscountCard />
        <DiscountCard />
        <DiscountCard />
        <DiscountCard />
      </SimpleGrid>
    </VStack>
  );
};

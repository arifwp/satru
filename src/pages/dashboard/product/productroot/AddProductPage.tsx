import { VStack } from "@chakra-ui/react";
import { AddProductForm } from "../../../../components/forms/AddProductForm";

export const AddProductPage = () => {
  return (
    <VStack className="add-product-container" w={"100%"} p={4}>
      <AddProductForm />
    </VStack>
  );
};

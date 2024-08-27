import { VStack } from "@chakra-ui/react";
import { AddDiscountForm } from "../../../components/forms/AddDiscountForm";

export const AddDiscountPage = () => {
  return (
    <VStack className="add-discount" w={"100%"} p={4}>
      <AddDiscountForm />
    </VStack>
  );
};

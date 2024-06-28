import { VStack } from "@chakra-ui/react";
import { AddProductForm } from "../../../components/forms/AddProductForm";

const initialValues = {
  img: undefined,
  code: undefined,
  name: undefined,
  description: undefined,
  price: undefined,
  discount: undefined,
  category: undefined,
  brand: undefined,
  stock: undefined,
  minimumStock: undefined,
  isHaveVariant: false,
  variant: [
    {
      variantName: undefined,
      variantPrice: undefined,
      variantStock: undefined,
      variantMinimumStock: undefined,
    },
  ],
};

export const AddProductPage = () => {
  return (
    <VStack className="add-product-container" w={"100%"} p={4}>
      <AddProductForm />
    </VStack>
  );
};

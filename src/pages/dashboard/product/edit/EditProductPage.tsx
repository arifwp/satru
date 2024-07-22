import { VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { EditProductForm } from "../../../../components/forms/EditProductForm";

export const EditProductPage = () => {
  const { productId } = useParams();

  return (
    <VStack className="edit-product-container" w={"100%"} p={4}>
      <EditProductForm paramsId={productId} />
    </VStack>
  );
};

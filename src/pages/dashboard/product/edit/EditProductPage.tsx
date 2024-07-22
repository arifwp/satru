import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const EditProductPage = () => {
  const { productId } = useParams();

  return <Heading color={"purple.400"}>{productId}</Heading>;
};

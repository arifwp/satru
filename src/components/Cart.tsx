import { VStack } from "@chakra-ui/react";
import { useTransactionStore } from "../store/useTransactionStore";
import { ItemCart } from "./card/ItemCart";

export const Cart = ({ ...rest }) => {
  const { products } = useTransactionStore();

  return (
    <VStack w={"100%"} {...rest}>
      {products && <ItemCart data={products} />}
    </VStack>
  );
};

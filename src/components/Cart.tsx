import { VStack } from "@chakra-ui/react";
import { useTransactionStore } from "../store/useTransactionStore";
import { ItemCart } from "./card/ItemCart";

export const Cart = ({ ...rest }) => {
  const { products } = useTransactionStore();

  return products && <ItemCart data={products} />;
};

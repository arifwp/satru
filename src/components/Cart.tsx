import { VStack } from "@chakra-ui/react";
import { ItemCart } from "./card/ItemCart";

export const Cart = ({ ...rest }) => {
  return (
    <VStack {...rest}>
      <ItemCart />
      <ItemCart />
      <ItemCart />
      <ItemCart />
      <ItemCart />
    </VStack>
  );
};

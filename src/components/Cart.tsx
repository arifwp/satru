import { VStack } from "@chakra-ui/react";
import { ItemCart } from "./card/ItemCart";
import { useEffect } from "react";
import { useTransactionStore } from "../store/useTransactionStore";

export const Cart = ({ ...rest }) => {
  const { transactions, addTransaction, updateTransaction, clearTransaction } =
    useTransactionStore();

  return (
    <VStack w={"100%"} {...rest}>
      {transactions && <ItemCart data={transactions} />}
      {/* <ItemCart />
      <ItemCart />
      <ItemCart />
      <ItemCart />
      <ItemCart /> */}
    </VStack>
  );
};

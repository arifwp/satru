import { StackProps, Text, VStack } from "@chakra-ui/react";
import { ItemCart } from "../../../components/card/ItemCart";
import { useTransactionStore } from "../../../store/useTransactionStore";

interface Props extends StackProps {
  children?: any;
}

export const CartPage = ({ children, ...rest }: Props) => {
  const { products, transaction } = useTransactionStore();

  return (
    <VStack
      className="transaction-container scrollY"
      w={"100%"}
      h={"100vh"}
      {...rest}
    >
      <Text fontWeight={700} fontSize={[18, null, 20]} mt={4}>
        {`Keranjang (${products.length})`}
      </Text>

      <ItemCart mt={4} data={products} transaction={transaction} />
    </VStack>
  );
};

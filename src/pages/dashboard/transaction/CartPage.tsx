import { StackProps, Text, VStack } from "@chakra-ui/react";
import { Cart } from "../../../components/Cart";
import { useTransactionStore } from "../../../store/useTransactionStore";

interface Props extends StackProps {
  children?: any;
}

export const CartPage = ({ children, ...rest }: Props) => {
  const { products } = useTransactionStore();

  return (
    <VStack
      className="transaction-container scrollY"
      w={"100%"}
      h={"100vh"}
      overflowY={"scroll"}
      {...rest}
    >
      <Text fontWeight={700} fontSize={[18, null, 20]} mt={4}>
        {`Keranjang (${products.length})`}
      </Text>

      <Cart mt={4} />
    </VStack>
  );
};

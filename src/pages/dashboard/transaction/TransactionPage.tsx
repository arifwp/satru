import { StackProps, Text, VStack } from "@chakra-ui/react";
import { Cart } from "../../../components/Cart";

interface Props extends StackProps {
  children?: any;
}

export const TransactionPage = ({ children, ...rest }: Props) => {
  return (
    <VStack className="transaction-container" w={"100%"} mt={4} {...rest}>
      <Text fontWeight={700} fontSize={[18, null, 20]}>
        Keranjang
      </Text>

      <Cart />
    </VStack>
  );
};

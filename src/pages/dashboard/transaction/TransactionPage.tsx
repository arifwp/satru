import { StackProps, Text, VStack } from "@chakra-ui/react";
import { Cart } from "../../../components/Cart";

interface Props extends StackProps {
  children?: any;
}

export const TransactionPage = ({ children, ...rest }: Props) => {
  return (
    <VStack
      className="transaction-container scrollY"
      w={"100%"}
      h={"100vh"}
      overflowY={"scroll"}
      {...rest}
    >
      <Text fontWeight={700} fontSize={[18, null, 20]} mt={4}>
        Keranjang
      </Text>

      <Cart mt={4} />
    </VStack>
  );
};

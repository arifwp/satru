import { HStack, Image, StackProps, Text, VStack } from "@chakra-ui/react";
import { useBorderColorInput } from "../../constant/colors";
import { TransactionInterface } from "../../constant/Transaction";

interface Props extends StackProps {
  data: TransactionInterface;
}

export const ItemCart = ({ data, ...rest }: Props) => {
  const borderColor = useBorderColorInput();

  return (
    <VStack w={"100%"}>
      {data.product.map((item, i) => (
        <VStack
          key={item._id}
          w={"100%"}
          p={2}
          borderBottomWidth={"1px"}
          borderBottomColor={borderColor}
        >
          <Text
            w={"100%"}
            fontSize={[12, null, 14]}
            noOfLines={1}
            textOverflow={"ellipsis"}
            fontWeight={600}
          >
            {item.name}
          </Text>
        </VStack>
      ))}
    </VStack>
  );
};

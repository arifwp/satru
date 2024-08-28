import { StackProps, Text, VStack } from "@chakra-ui/react";
import formatNumber from "../../lib/formatNumber";
import { formatDateToId } from "../../utils/helperFunction";

interface Props extends StackProps {
  name: string;
  discountType: number;
  discount: number;
  expiredDate: any;
}

export const DiscountCard = ({
  name,
  discountType,
  discount,
  expiredDate,
  ...rest
}: Props) => {
  return (
    <VStack
      className="discount-card"
      borderWidth={"1px"}
      borderRadius={"md"}
      textAlign={"center"}
      fontSize={[12, null, 14]}
      cursor={"pointer"}
      color={"black"}
      {...rest}
    >
      <VStack p={4}>
        <Text fontSize={[14, null, 16]} fontWeight={"semibold"}>
          {name}
        </Text>
        <Text>
          {discountType === 1
            ? `Rp ${formatNumber(discount)}`
            : `${formatNumber(discount)}%`}
        </Text>
      </VStack>

      <VStack w={"100%"} borderTopWidth={"1px"} borderRadius={"none"} p={2}>
        <Text fontSize={[10, null, 12]}>{`Berlaku sampai ${formatDateToId(
          expiredDate
        )}`}</Text>
      </VStack>
    </VStack>
  );
};

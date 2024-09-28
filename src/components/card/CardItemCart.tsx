import {
  HStack,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBorderColorInput } from "../../constant/colors";
import { ProductCartInterface } from "../../constant/Transaction";
import formatNumber from "../../lib/formatNumber";
import { showPrice } from "../../utils/helperFunction";
import { CartDrawer } from "../drawer/dedicated/CartDrawer";

interface Props extends StackProps {
  item: ProductCartInterface;
}

export const CardItemCart = ({ item, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState<
    ProductCartInterface | undefined
  >(undefined);

  return (
    <>
      <VStack
        w={"100%"}
        p={2}
        borderRadius={"md"}
        borderWidth={"2px"}
        borderColor={borderColor}
        fontSize={[10, null, 12]}
        align={"stretch"}
        cursor={"pointer"}
        onClick={() => {
          setSelectedData(item);
          onOpen();
        }}
        {...rest}
      >
        <Text
          fontSize={[12, null, 14]}
          noOfLines={1}
          textOverflow={"ellipsis"}
          fontWeight={"semibold"}
        >
          {item.name}
        </Text>

        {(item.variants as any)?.length > 0 && (
          <HStack justify={"space-between"}>
            <Text variant={"secondary"}>Varian</Text>
            {item.variants?.map((variant) => (
              <Text
                key={variant._id}
                w={"100%"}
                align={"end"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                {variant.variantName}
              </Text>
            ))}
          </HStack>
        )}

        <HStack justify={"space-between"}>
          <Text variant={"secondary"}>Qty</Text>
          <Text>{item.qty}</Text>
        </HStack>

        {item.discountType && (
          <HStack justify={"space-between"}>
            <Text variant={"secondary"}>Diskon</Text>
            <Text>
              {item.discountType.id === 1
                ? `Rp ${formatNumber(item.discount)}`
                : `${item.discount}%`}
            </Text>
          </HStack>
        )}

        <HStack justify={"space-between"}>
          <Text variant={"secondary"}>Total</Text>
          <Text>{showPrice(item)}</Text>
        </HStack>
      </VStack>

      <CartDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={selectedData}
        children={undefined}
      />
    </>
  );
};

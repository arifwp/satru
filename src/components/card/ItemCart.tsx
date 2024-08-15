import { Button, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import {
  useBorderColorInput,
  useTextPrimaryColor,
} from "../../constant/colors";
import { ProductCartInterface } from "../../constant/Transaction";
import formatNumber from "../../lib/formatNumber";
import { useTransactionStore } from "../../store/useTransactionStore";

interface Props extends StackProps {
  data: ProductCartInterface[];
}

export const ItemCart = ({ data, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const txtColor = useTextPrimaryColor();
  const { updateProduct, removeProduct } = useTransactionStore();

  const increment = (item: ProductCartInterface) => {
    if (item.qty < item.stock) {
      updateProduct(item.indexProduct, { qty: (item?.qty ?? 0) + 1 });
    }
  };

  const decrement = (item: ProductCartInterface) => {
    if (item.qty > 1) {
      updateProduct(item.indexProduct, { qty: (item?.qty ?? 0) - 1 });
    }
  };

  const showPrice = (item: ProductCartInterface) => {
    let total = 0;
    // data.map((item, i) => {
    //   total += item.price * item.qty;
    //   if (item.variants && item.variants.length > 0) {
    //     item.variants.map((variant) => {
    //       total += variant.variantPrice;
    //     });
    //   }
    // });

    total += item.price * item.qty;
    if (item.variants && item.variants.length > 0) {
      item.variants.map((variant) => {
        total = variant.variantPrice * item.qty;
      });
    }

    return `Rp ${formatNumber(total)}`;
  };

  return (
    <VStack w={"100%"}>
      {data.map((item, i) => (
        <VStack
          // key={item._id}
          key={i}
          w={"100%"}
          pb={2}
          align={"stretch"}
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

          <HStack justify={"space-between"} px={2} fontSize={[10, null, 12]}>
            <Text variant={"secondary"}>Qty</Text>
            <HStack
              borderWidth={"1px"}
              borderColor={borderColor}
              w={"fit-content"}
            >
              <HStack
                borderRightWidth={"1px"}
                borderColor={borderColor}
                cursor={"pointer"}
                onClick={() => decrement(item)}
              >
                <Button
                  py={0.5}
                  px={2}
                  borderRadius={"none"}
                  size={"xs"}
                  variant={"ghost"}
                  colorScheme="teal"
                  fontSize={[10, null, 12]}
                  fontWeight={"bold"}
                >
                  -
                </Button>
              </HStack>
              <HStack p={2}>
                <Text fontSize={[10, null, 12]}>{item.qty}</Text>
              </HStack>
              <HStack
                borderLeftWidth={"1px"}
                borderColor={borderColor}
                cursor={"pointer"}
                onClick={() => increment(item)}
              >
                <Button
                  py={0.5}
                  px={2}
                  borderRadius={"none"}
                  size={"xs"}
                  variant={"ghost"}
                  colorScheme="teal"
                  fontSize={[10, null, 12]}
                  fontWeight={"bold"}
                >
                  +
                </Button>
              </HStack>
            </HStack>
          </HStack>

          {(item.variants as any)?.length > 0 && (
            <HStack
              justify={"space-between"}
              mt={2}
              px={2}
              fontSize={[10, null, 12]}
            >
              <Text variant={"secondary"}>Varian</Text>

              {item.variants?.map((variant) => (
                <Text
                  key={variant._id}
                  w={"100%"}
                  align={"end"}
                  fontSize={[12, null, 14]}
                  noOfLines={1}
                  textOverflow={"ellipsis"}
                >
                  {variant.variantName}
                </Text>
              ))}
            </HStack>
          )}

          <HStack
            justify={"space-between"}
            mt={2}
            px={2}
            fontSize={[10, null, 12]}
          >
            <Text variant={"secondary"}>Harga</Text>

            <Text
              w={"100%"}
              align={"end"}
              fontSize={[12, null, 14]}
              noOfLines={1}
              textOverflow={"ellipsis"}
            >
              {showPrice(item)}
            </Text>
          </HStack>

          <Button
            w={"fit-content"}
            size={"xs"}
            variant={"ghost"}
            color={txtColor}
            colorScheme="teal"
            fontSize={[10, null, 12]}
            fontWeight={"normal"}
            onClick={() => removeProduct(item.indexProduct)}
          >
            Hapus
          </Button>
        </VStack>
      ))}
    </VStack>
  );
};

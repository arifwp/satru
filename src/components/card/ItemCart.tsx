import { Button, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  useBgBaseColor,
  useBgComponentBaseColor,
  useBorderColorInput,
  useTextPrimaryColor,
} from "../../constant/colors";
import {
  ProductCartInterface,
  TransactionInterface,
} from "../../constant/Transaction";
import formatNumber from "../../lib/formatNumber";
import { useTransactionStore } from "../../store/useTransactionStore";

interface Props extends StackProps {
  data: ProductCartInterface[];
  transaction?: TransactionInterface;
}

const containerAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const ItemCart = ({ data, transaction, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const bgBase = useBgBaseColor();
  const bgComp = useBgComponentBaseColor();
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

    total += item.price * item.qty;
    if (item.variants && item.variants.length > 0) {
      item.variants.map((variant) => {
        const variantPrice = variant.variantPrice * item.qty;
        if (item.discountType && item.discountType.id === 1) {
          console.log("ada discount", item.discountType);
          total = variantPrice - item.discount;
          return `Rp ${formatNumber(total)}`;
        }

        total = variantPrice;
      });
    }

    return `Rp ${formatNumber(total)}`;
  };

  const handleChangeQty = (
    item: ProductCartInterface,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newQty = parseInt(event.target.value, 10) || 0;

    if (!isNaN(newQty)) {
      updateProduct(item.indexProduct, { qty: newQty });
    }
  };

  const handleBlurQty = (item: ProductCartInterface) => {
    if (item.qty < 1) {
      updateProduct(item.indexProduct, { qty: 1 });
    }
  };

  return (
    <VStack
      className="item-container"
      w={"100%"}
      // px={2}
      overflowY={"auto"}
      spacing={0}
      {...rest}
    >
      <VStack
        className="cart scrollY"
        w={"100%"}
        h={"100vh"}
        overflowY={"auto"}
      >
        <VStack
          className="cart-body scrollY"
          w={"100%"}
          px={2}
          h={"calc(100vh - 270px)"}
          overflowY={"auto"}
        >
          {data.map((item, i) => (
            <VStack
              key={item.indexProduct}
              w={"100%"}
              p={2}
              borderRadius={"md"}
              borderWidth={"2px"}
              borderColor={borderColor}
              fontSize={[10, null, 12]}
              align={"stretch"}
            >
              <Text
                fontSize={[12, null, 14]}
                noOfLines={2}
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
          ))}
        </VStack>
      </VStack>

      <VStack className="footer-container" w={"100%"} position={"relative"}>
        <VStack
          className="footer-item-cart"
          w={"100%"}
          p={2}
          align={"stretch"}
          bottom={0}
          position={"absolute"}
        >
          <VStack
            p={2}
            borderRadius={"md"}
            mb={2}
            bg={bgBase}
            align={"stretch"}
          >
            <HStack justify={"space-between"} fontSize={[10, null, 12]}>
              <Text variant={"secondary"}>Sub Total</Text>

              <Text>{transaction?.totalPrice}</Text>
            </HStack>

            <HStack justify={"space-between"} fontSize={[10, null, 12]}>
              <Text variant={"secondary"}>Total Diskon</Text>

              <Text>Rp 12.000</Text>
            </HStack>

            <HStack justify={"space-between"} fontSize={[10, null, 12]}>
              <Text variant={"secondary"}>Pajak</Text>

              <Text>5%</Text>
            </HStack>

            <HStack
              w={"100%"}
              borderBottomColor={borderColor}
              borderBottomWidth={"1px"}
            ></HStack>

            <HStack
              justify={"space-between"}
              fontWeight={"semibold"}
              fontSize={[12, null, 14]}
            >
              <Text>Total Harga</Text>

              <Text>{transaction?.totalPrice}</Text>
            </HStack>
          </VStack>

          <Button
            w={"100%"}
            size={["sm", "md"]}
            colorScheme="teal"
            variant={"solid"}
          >
            Bayar
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

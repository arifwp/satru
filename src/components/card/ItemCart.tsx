import {
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiDeleteBin4Line } from "@remixicon/react";
import { motion } from "framer-motion";
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
    <VStack w={"100%"} px={2} overflowY={"auto"} {...rest}>
      <VStack
        className="item-cart scrollY"
        w={"100%"}
        mb={"160px"}
        overflowY={"auto"}
      >
        {data.map((item, i) => (
          <VStack
            key={i}
            as={motion.div}
            variants={itemAnimation}
            w={"100%"}
            pb={2}
            align={"stretch"}
            borderBottomWidth={"1px"}
            borderBottomColor={borderColor}
          >
            <HStack w={"100%"} justify={"space-between"}>
              <Text
                fontSize={[12, null, 14]}
                noOfLines={1}
                textOverflow={"ellipsis"}
                fontWeight={600}
              >
                {item.name}
              </Text>

              <IconButton
                aria-label="Delete product"
                size={"md"}
                variant={"ghost"}
                color={txtColor}
                colorScheme="teal"
                fontWeight={"normal"}
                onClick={() => removeProduct(item.indexProduct)}
                icon={<Icon as={RiDeleteBin4Line} />}
              />
            </HStack>

            <HStack justify={"space-between"} fontSize={[10, null, 12]}>
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
                <HStack py={2}>
                  <Input
                    name="itemQty"
                    type="text"
                    size={"xs"}
                    w={"40px"}
                    autoComplete="off"
                    value={item.qty}
                    border={"none"}
                    onChange={(event) => handleChangeQty(item, event)}
                    onBlur={() => handleBlurQty(item)}
                    p={0}
                    m={0}
                    textAlign={"center"}
                  />
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
              <HStack justify={"space-between"} fontSize={[10, null, 12]}>
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

            {item.discountType && (
              <HStack justify={"space-between"} fontSize={[10, null, 12]}>
                <Text variant={"secondary"}>Diskon</Text>

                {item.variants?.map((variant) => (
                  <Text
                    key={variant._id}
                    w={"100%"}
                    align={"end"}
                    fontSize={[12, null, 14]}
                    noOfLines={1}
                    textOverflow={"ellipsis"}
                  >
                    {item.discountType.id === 1
                      ? `Rp ${formatNumber(item.discount)}`
                      : `${item.discount}%`}
                  </Text>
                ))}
              </HStack>
            )}

            <HStack justify={"space-between"} fontSize={[10, null, 12]}>
              <Text variant={"secondary"}>Total</Text>

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
          </VStack>
        ))}
      </VStack>

      <VStack
        className="footer-container"
        w={"100%"}
        mb={4}
        position={"relative"}
      >
        <VStack
          className="footer-item-cart"
          w={"100%"}
          align={"stretch"}
          bottom={0}
          position={"absolute"}
        >
          <VStack
            p={2}
            borderRadius={"md"}
            mb={4}
            bg={bgBase}
            align={"stretch"}
          >
            <HStack justify={"space-between"} fontSize={[10, null, 12]}>
              <Text variant={"secondary"}>Sub Total</Text>

              <Text>{transaction?.totalPrice}</Text>
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

          <Button w={"100%"} size={"md"} colorScheme="teal" variant={"solid"}>
            Bayar
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

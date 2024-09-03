import {
  Button,
  HStack,
  Icon,
  IconButton,
  StackProps,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiBookmark2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import {
  useBgBaseColor,
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../constant/colors";
import {
  ProductCartInterface,
  TransactionInterface,
} from "../../constant/Transaction";
import formatNumber from "../../lib/formatNumber";
import { useTransactionStore } from "../../store/useTransactionStore";
import { getDataUser, getUserOrAdminId } from "../../utils/helperFunction";
import { CartDrawer } from "../drawer/dedicated/CartDrawer";
import { Empty } from "../Empty";

interface Props extends StackProps {
  data: ProductCartInterface[];
  paramsTransaction?: TransactionInterface;
}

export const ItemCart = ({ data, paramsTransaction, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const bgBase = useBgBaseColor();
  const bgComp = useBgComponentBaseColor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState<
    ProductCartInterface | undefined
  >(undefined);
  const {
    transaction,
    products,
    updateProduct,
    removeProduct,
    addTransaction,
  } = useTransactionStore();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [tax, setTax] = useState<number | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    const userId = getUserOrAdminId();
    const token = getCookie("token");

    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/outlet/getTax/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse) => {
        setTax(JSON.parse(res.request.response).data.tax);
      })
      .catch((err: AxiosError) => {
        toast({
          title: JSON.parse(err.request.response).data.tax,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    let total = 0;
    // products.map((item, i) => {
    //   total += item.price;
    // });

    products.map((item) => {
      total += item.price * item.qty;
      if (item.variants && item.variants.length > 0) {
        item.variants.map((variant) => {
          const variantPrice = variant.variantPrice * item.qty;
          if (item.discountType && item.discountType.id === 1) {
            total = variantPrice - item.discount;
            return `Rp ${formatNumber(total)}`;
          }

          total = variantPrice;
        });
      }
    });

    const val = {
      _id: "",
      userId: getDataUser()._id,
      ownerId: getDataUser().ownerId
        ? getDataUser().ownerId
        : getDataUser()._id,
      totalPrice: total,
      product: products,
      createdAt: new Date(Date.now()),
    };

    addTransaction(val);
  }, [products]);

  // useEffect(() => {
  //   console.log(transaction);
  // }, [transaction]);

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

  // const showPrice = (item: ProductCartInterface) => {
  //   let total = 0;

  //   total += item.price * item.qty;
  //   if (item.variants && item.variants.length > 0) {
  //     item.variants.map((variant) => {
  //       const variantPrice = variant.variantPrice * item.qty;
  //       if (item.discountType && item.discountType.id === 1) {
  //         total = variantPrice - item.discount;
  //         return `Rp ${formatNumber(total)}`;
  //       }

  //       total = variantPrice;
  //     });
  //   }

  //   return `Rp ${formatNumber(total)}`;
  // };

  const showPrice = (item: ProductCartInterface) => {
    let total = 0;

    total += item.price * item.qty;
    if (item && item.variants && item.variants.length > 0) {
      item.variants.map((variant) => {
        const variantPrice = variant.variantPrice * item.qty;
        if (item.discountType && item.discountType.id === 1) {
          total = variantPrice - item.discount || 0;
          return `Rp ${formatNumber(total)}`;
        } else if (item.discount) {
          total = variantPrice - item.discount || 0;
          return `Rp ${formatNumber(total)}`;
        }

        total = variantPrice;
      });
    } else if (item.discountType && item.discountType.id === 1) {
      total = item.price - item.discount || 0;
      return `Rp ${formatNumber(total)}`;
    } else if (item.discount) {
      total = item.price * item.qty - item.discount || 0;

      return `Rp ${formatNumber(total)}`;
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
    <>
      <VStack
        className="item-container"
        w={"100%"}
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
            px={4}
            py={6}
            h={"calc(100vh - 270px)"}
            overflowY={"auto"}
          >
            {data && data.length < 1 ? (
              <Empty
                title="Buat tranksasi anda sekarang!"
                h={"100%"}
                justify={"center"}
              />
            ) : (
              data.map((item, i) => (
                <VStack
                  key={item.indexProduct}
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
              ))
            )}
          </VStack>
        </VStack>

        <VStack className="footer-container" w={"100%"} position={"relative"}>
          <VStack
            className="footer-item-cart"
            w={"100%"}
            p={4}
            fontSize={[10, null, 12]}
            bg={bgComp}
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
              <HStack justify={"space-between"}>
                <Text variant={"secondary"}>Sub Total</Text>

                <Text>
                  {paramsTransaction &&
                    formatNumber(paramsTransaction.totalPrice)}
                </Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text variant={"secondary"}>Total Diskon</Text>

                <Text>Rp 12.000</Text>
              </HStack>

              <HStack
                justify={"space-between"}
                borderBottomColor={borderColor}
                borderBottomWidth={"1px"}
              >
                <Text variant={"secondary"}>Pajak</Text>

                <Text>{`${tax}%`}</Text>
              </HStack>

              {/* <HStack
                w={"100%"}
                borderBottomColor={borderColor}
                borderBottomWidth={"1px"}
              ></HStack> */}

              <HStack
                justify={"space-between"}
                fontWeight={"semibold"}
                fontSize={[12, null, 14]}
              >
                <Text>Total Harga</Text>

                <Text>
                  {paramsTransaction?.totalPrice &&
                    formatNumber(paramsTransaction.totalPrice)}
                </Text>
              </HStack>
            </VStack>

            <HStack>
              <IconButton
                size="md"
                variant="outline"
                // onClick={toggleColorMode}
                icon={<Icon as={RiBookmark2Line} />}
                aria-label={`Save Transaction`}
              />

              <Button
                w={"100%"}
                size={["sm", "md"]}
                colorScheme="teal"
                variant={"solid"}
              >
                Bayar
              </Button>
            </HStack>
          </VStack>
        </VStack>
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

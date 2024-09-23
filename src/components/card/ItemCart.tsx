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
import { RiArrowRightSLine, RiBookmark2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import {
  useBgBaseColor,
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../constant/colors";
import { DiscountInterface } from "../../constant/Discount";
import { SelectOption } from "../../constant/SelectOption";
import { ProductCartInterface } from "../../constant/Transaction";
import formatNumber from "../../lib/formatNumber";
import { useTransactionStore } from "../../store/useTransactionStore";
import { getDataUser, getUserOrAdminId } from "../../utils/helperFunction";
import { CartDrawer } from "../drawer/dedicated/CartDrawer";
import { SelectApplyDiscount } from "../drawer/dedicated/SelectApplyDiscount";
import { Empty } from "../Empty";
import { SelectManualTransaction } from "../drawer/dedicated/SelectManualTransaction";

interface Props extends StackProps {
  data: ProductCartInterface[];
}

export const ItemCart = ({ data, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const bgBase = useBgBaseColor();
  const bgComp = useBgComponentBaseColor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [applyDiscount, setApplyDiscount] = useState<SelectOption | undefined>(
    undefined
  );
  const [selectedData, setSelectedData] = useState<
    ProductCartInterface | undefined
  >(undefined);
  const {
    transaction,
    products,
    manualTransaction,
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
      assignedBy: getDataUser()._id,
      ownerId: getUserOrAdminId(),
      totalPrice: total,
      product: products,
      createdAt: new Date(Date.now()),
    };

    // addTransaction(val);
  }, [products]);

  const showPrice = (item: ProductCartInterface) => {
    let total = 0;

    total += item.price * item.qty;

    // cek apakah ada variant
    if (item && item.variants && item.variants.length > 0) {
      item.variants.map((variant) => {
        const variantPrice = variant.variantPrice;
        total = variantPrice * item.qty;

        if (item.discount && item.discountType.id === 1) {
          total = variantPrice * item.qty - item.discount || 0;
        } else if (item.discount && item.discountType.id === 2) {
          // total = variantPrice - item.discount || 0;
          let countDiscountVariant = (variantPrice * item.discount) / 100;
          let checkQtyVariant = countDiscountVariant * item.qty;
          total = variantPrice * item.qty - checkQtyVariant;
        }
      });

      //jika tidak ada variant
    } else if (item.discount && item.discountType.id === 1) {
      total = item.price * item.qty - item.discount || 0;

      // return `Rp ${formatNumber(total)}`;
    } else if (item.discount && item.discountType.id === 2) {
      // total = item.price * item.qty - item.discount || 0;
      let countDiscount = (item.price * item.discount) / 100;
      let checkQty = countDiscount * item.qty;
      total = item.price * item.qty - checkQty;
    }

    return `Rp ${formatNumber(total)}`;
  };

  const showSubTotal = () => {
    let total: number = 0;

    if (products.length > 0) {
      products.map((item) => {
        if (item.finalPrice) {
          total += item.finalPrice;
        }
      });
    }

    return `Rp ${products.length > 0 ? formatNumber(total) : 0}`;
  };

  const showTotalDiscount = () => {
    let totalPercent = 0;
    let totalRp = 0;

    products.map((item, i) => {
      if (!!item.discountType) {
        if (item.discountType.id === 2) {
          totalPercent += parseInt(item.discount.toString());
        }

        if (item.discountType.id === 1) {
          totalRp += parseInt(item.discount.toString());
        }
      }
    });

    if (!!applyDiscount) {
      if ((applyDiscount as DiscountInterface).discountType === 2) {
        totalPercent += (applyDiscount as DiscountInterface).discount;
      } else if ((applyDiscount as DiscountInterface).discountType === 1) {
        totalRp += (applyDiscount as DiscountInterface).discount;
      }
    }

    return `${!!totalRp ? formatNumber(totalRp) : ""} ${
      !!totalRp && !!totalPercent ? `+` : " "
    } ${!!totalPercent ? `${totalPercent}%` : ""}`;
  };

  const showTotalPrice = () => {
    let endPrice: number = 0;
    let priceAfterTax: number = 0;

    // count sub total
    let subTotal: number = 0;

    if (products.length > 0) {
      products.map((item) => {
        if (item.finalPrice) {
          subTotal += item.finalPrice;
        }
      });
    }

    // count subTotal - tax
    if (!!tax) {
      const countTax = (subTotal * tax) / 100;
      priceAfterTax = subTotal + countTax;
    }

    //count total discount
    let totalPercent = 0;
    let totalRp = 0;

    products.map((item, i) => {
      if (!!item.discountType) {
        if (item.discountType.id === 2) {
          totalPercent += parseInt(item.discount.toString());
        }

        if (item.discountType.id === 1) {
          totalRp += parseInt(item.discount.toString());
        }
      }
    });

    if (!!applyDiscount) {
      if ((applyDiscount as DiscountInterface).discountType === 2) {
        totalPercent += (applyDiscount as DiscountInterface).discount;
      } else if ((applyDiscount as DiscountInterface).discountType === 1) {
        totalRp += (applyDiscount as DiscountInterface).discount;
      }
    }

    // count final price
    if (!!applyDiscount) {
      if ((applyDiscount as DiscountInterface).discountType === 2) {
        const countDiscount =
          (priceAfterTax *
            parseInt(
              (applyDiscount as DiscountInterface).discount.toString()
            )) /
          100;
        // const checkQty = countDiscount * products.length;
        // endPrice = priceAfterTax * products.length - checkQty;
        endPrice = priceAfterTax - countDiscount;
      } else if ((applyDiscount as DiscountInterface).discountType === 1) {
        endPrice = priceAfterTax - totalRp;
      }
    }

    return `Rp ${formatNumber(endPrice)}`;
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
            h={"calc(100vh - 307px)"}
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
                  key={i}
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
            {manualTransaction.length > 0 && <SelectManualTransaction />}

            <SelectApplyDiscount
              name="Pilihan Diskon"
              placeholder="Terapkan Diskon"
              withSearch={true}
              icon={RiArrowRightSLine}
              color={applyDiscount ? undefined : "gray.100"}
              onConfirm={(inputValue) => {
                setApplyDiscount(inputValue);
              }}
            />
            <VStack
              p={2}
              borderRadius={"md"}
              mb={2}
              bg={bgBase}
              align={"stretch"}
            >
              <HStack justify={"space-between"}>
                <Text variant={"secondary"} whiteSpace={"nowrap"}>
                  Sub Total
                </Text>

                <Text textAlign={"end"}>{showSubTotal()}</Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text variant={"secondary"} whiteSpace={"nowrap"}>
                  Total Diskon
                </Text>

                <Text textAlign={"end"}>{showTotalDiscount()}</Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text variant={"secondary"}>Pajak</Text>

                <Text>{`${tax}%`}</Text>
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

                <Text>{showTotalPrice()}</Text>
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

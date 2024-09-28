import {
  Button,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  StackProps,
  Text,
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
import { SelectOption } from "../../constant/SelectOption";
import { ProductCartInterface } from "../../constant/Transaction";
import { useTransactionStore } from "../../store/useTransactionStore";
import {
  getUserOrAdminId,
  showSubTotal,
  showTotalDiscount,
  showTotalPrice,
} from "../../utils/helperFunction";
import { SelectApplyDiscount } from "../drawer/dedicated/SelectApplyDiscount";
import { Empty } from "../Empty";
import { CardItemCart } from "./CardItemCart";
import { CardManualTransaction } from "./CardManualTransaction";

interface Props extends StackProps {
  data: ProductCartInterface[];
}

export const ItemCart = ({ data, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const bgBase = useBgBaseColor();
  const bgComp = useBgComponentBaseColor();
  const [applyDiscount, setApplyDiscount] = useState<SelectOption | undefined>(
    undefined
  );
  const { products, manualTransaction } = useTransactionStore();
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
  }, [toast]);

  // useEffect(() => {
  //   let total = 0;

  //   products.map((item) => {
  //     total += item.price * item.qty;
  //     if (item.variants && item.variants.length > 0) {
  //       item.variants.map((variant) => {
  //         const variantPrice = variant.variantPrice * item.qty;
  //         if (item.discountType && item.discountType.id === 1) {
  //           total = variantPrice - item.discount;
  //           return `Rp ${formatNumber(total)}`;
  //         }

  //         total = variantPrice;
  //       });
  //     }
  //   });
  // }, [products]);

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
            h={"calc(100vh - 320px)"}
            overflowY={"auto"}
          >
            {(data && data.length > 0) ||
            (manualTransaction && manualTransaction.length > 0) ? (
              <>
                {data &&
                  data.length > 0 &&
                  // Menampilkan data jika ada
                  data.map((item, i) => <CardItemCart key={i} item={item} />)}

                {manualTransaction &&
                  manualTransaction.length > 0 &&
                  // Menampilkan manualTransaction jika ada
                  manualTransaction.map((itemManual, i) => (
                    <CardManualTransaction
                      key={itemManual._id}
                      item={itemManual}
                    />
                  ))}
              </>
            ) : (
              // Jika keduanya kosong, tampilkan komponen Empty
              <Empty
                title="Buat transaksi anda sekarang!"
                h={"100%"}
                justify={"center"}
              />
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

                <Text textAlign={"end"}>
                  {showSubTotal(products, manualTransaction, applyDiscount)}
                </Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text variant={"secondary"} whiteSpace={"nowrap"}>
                  Total Diskon
                </Text>

                <Text textAlign={"end"}>
                  {showTotalDiscount(products, applyDiscount)}
                </Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text variant={"secondary"}>Pajak</Text>

                <Skeleton isLoaded={loaded}>
                  <Text>{`${tax}%`}</Text>
                </Skeleton>
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

                <Text>
                  {showTotalPrice(
                    products,
                    manualTransaction,
                    applyDiscount,
                    tax
                  )}
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
    </>
  );
};

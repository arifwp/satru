import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import {
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../../constant/colors";
import { ProductCartInterface } from "../../../constant/Transaction";
import formatNumber from "../../../lib/formatNumber";
import { useTransactionStore } from "../../../store/useTransactionStore";
import { getUserOrAdminId } from "../../../utils/helperFunction";
import { TransactionOutlineCard } from "../../card/TransactionOutlineCard";
import { NumberInput } from "../../input/NumberInput";
import { DiscountTypeInterface } from "./DetailItemDrawer";

interface Props extends DrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ProductCartInterface | undefined;
}

const discountType = [
  { id: 1, name: "Rp" },
  { id: 2, name: "%" },
];

export const CartDrawer = ({
  isOpen,
  onOpen,
  onClose,
  data,
  ...rest
}: Props) => {
  const [totalItem, setTotalItem] = useState<number>(1);
  const [discountOrNot, setDiscountOrNot] = useState<string>("2");
  const [inputDiscount, setInputDiscount] = useState<string>(
    data?.discount ? `${data.discount}` : ""
  );
  const [discountRpPercentage, setDiscountRpPercentage] = useState<
    DiscountTypeInterface | undefined
  >(undefined);
  const borderColor = useBorderColorInput();
  const bgComp = useBgComponentBaseColor();
  const { products, addProduct, updateProduct, removeProduct } =
    useTransactionStore();

  useEffect(() => {
    if (isOpen) {
      data && setTotalItem(data.qty);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (!!data?.discountType) {
        setDiscountOrNot("1");
      }
    } else {
      setDiscountOrNot("2");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (data?.discountType) {
        setDiscountRpPercentage(data?.discountType);
      } else {
        setDiscountRpPercentage(discountType[0]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      data && data.discount && setInputDiscount(data?.discount.toString());
    } else {
      setInputDiscount("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (data?.discount) {
      setInputDiscount(`${data.discount}`);
    } else {
      setInputDiscount("");
    }
  }, [data?.discount]);

  const defaultRadioValue = () => {
    return data?.discount ? "1" : "2";
  };

  const showHeader = () => {
    if (data && data.variants && data.variants.length > 0) {
      return `${data.name}, ${data.variants && data.variants[0].variantName}`;
    }

    return data?.name;
  };

  const showStock = () => {
    let stock: number = 0;
    if (data) {
      if (data.variants && data.variants.length > 0) {
        stock = data.variants[0].variantStock - totalItem;
        return `${stock}`;
      }

      stock = (data as any).stock - totalItem;
    }

    return `${stock}`;
  };

  const showPrice = () => {
    let total = 0;

    if (data) {
      total += data.price;
      if (data && data.variants && data.variants.length > 0) {
        data.variants.map((variant) => {
          const variantPrice = variant.variantPrice;

          total = variantPrice;
        });
      }
    }

    return `Rp ${formatNumber(total)}`;
  };

  const showTotal = () => {
    let total = 0;

    if (data) {
      total += data.price * totalItem;
      if (data && data.variants && data.variants.length > 0) {
        data.variants.map((variant) => {
          const variantPrice = variant.variantPrice * totalItem;
          if (data.discountType && data.discountType.id === 1) {
            total = variantPrice - parseInt(inputDiscount, 10) || 0;
            return `Rp ${formatNumber(total)}`;
          } else if (inputDiscount) {
            total = variantPrice - parseInt(inputDiscount, 10) || 0;
            return `Rp ${formatNumber(total)}`;
          }

          total = variantPrice;
        });
      } else if (data.discountType && data.discountType.id === 1) {
        total = data.price - parseInt(inputDiscount, 10) || 0;
        return `Rp ${formatNumber(total)}`;
      } else if (inputDiscount) {
        total = data.price * totalItem - parseInt(inputDiscount, 10) || 0;

        return `Rp ${formatNumber(total)}`;
      }
    }

    return `Rp ${formatNumber(total)}`;
  };

  const increment = () => {
    if (data && data.qty < data.stock) {
      setTotalItem(totalItem + 1);
    }
  };

  const decrement = () => {
    if (data && data.qty > 1) {
      setTotalItem(totalItem - 1);
    }
  };

  const selectdiscountRpPercentage = (val: DiscountTypeInterface) => {
    setDiscountRpPercentage(val);
  };

  const handleInputDiscount = (event: any, discCategory: number) => {
    let newDiscount = discCategory === 1 ? event : event.replace(/[^0-9]/g, "");
    setInputDiscount(newDiscount);
  };

  const handleChangeQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQty = parseInt(event.target.value, 10) || 0;

    let stock = 0;

    if (data) {
      stock = data && (data as any).stock - totalItem;
      if (data.variants && data.variants.length > 0) {
        stock = data.variants[0].variantStock;
      }

      console.log(stock);
      if (!isNaN(newQty) && newQty <= stock) {
        setTotalItem(newQty);
      } else if (newQty > stock) {
        setTotalItem(stock);
      }
    }
  };

  const handleBlurQty = () => {
    if (totalItem < 1) {
      setTotalItem(1);
    }
  };

  const handleSubmit = () => {
    const productInStore = products.find(
      (product) => product._id === (data as ProductCartInterface)._id
    );

    let update: Partial<ProductCartInterface> = {
      qty: totalItem,
    };

    console.log(discountOrNot);
    if (discountOrNot === "1") {
      Object.assign(update, { discountType: discountRpPercentage });
    } else {
      if (productInStore && "discountType" in productInStore) {
        delete (productInStore as any).discountType;
      }
    }

    if (discountOrNot === "1") {
      Object.assign(update, { discount: inputDiscount });
    } else {
      if (productInStore && "discount" in productInStore) {
        delete (productInStore as any).discount;
      }
    }

    console.log(update);
    if (data && data.variants && data?.variants.length > 0) {
      updateProduct(data.indexProduct, update);
    } else {
      if (data) {
        updateProduct(data.indexProduct, update);
      }
    }

    onClose();
  };

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
      size={"full"}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent bg={bgComp}>
        <DrawerCloseButton />
        <DrawerHeader>{showHeader()}</DrawerHeader>
        <DrawerBody>
          <VStack w={"100%"} spacing={2} align={"stretch"}>
            <TransactionOutlineCard title={showPrice()} subTitle="Harga" />
            <TransactionOutlineCard title={showStock()} subTitle="Stok" />
            <TransactionOutlineCard title={showTotal()} subTitle="Total" />

            <Text
              mt={6}
              mb={2}
              fontSize={[12, null, 14]}
              fontWeight={"semibold"}
            >
              Jumlah Item
            </Text>

            <HStack
              borderWidth={"1px"}
              borderColor={borderColor}
              w={"fit-content"}
            >
              <HStack
                py={0.5}
                px={4}
                borderRightWidth={"1px"}
                borderColor={borderColor}
                cursor={"pointer"}
                onClick={decrement}
              >
                <Text fontSize={[16, null, 18]} fontWeight={"bold"}>
                  -
                </Text>
              </HStack>
              <HStack p={2}>
                <Input
                  name="itemQty"
                  type="text"
                  size={"xs"}
                  w={"40px"}
                  autoComplete="off"
                  value={totalItem}
                  border={"none"}
                  onChange={(event) => handleChangeQty(event)}
                  onBlur={() => handleBlurQty()}
                  p={0}
                  m={0}
                  fontSize={[12, null, 14]}
                  textAlign={"center"}
                />
              </HStack>

              <HStack
                py={0.5}
                px={4}
                borderLeftWidth={"1px"}
                borderColor={borderColor}
                cursor={"pointer"}
                onClick={increment}
              >
                <Text fontSize={[16, null, 18]} fontWeight={"bold"}>
                  +
                </Text>
              </HStack>
            </HStack>

            <Text
              mt={6}
              mb={2}
              fontSize={[12, null, 14]}
              fontWeight={"semibold"}
            >
              Diskon
            </Text>

            <RadioGroup
              name="discountOrNot"
              defaultValue={defaultRadioValue()}
              colorScheme="teal"
              onChange={setDiscountOrNot}
            >
              <VStack align={"stretch"} spacing={4}>
                <Radio value="1">Tambah diskon manual </Radio>
                {discountOrNot === "1" && (
                  <VStack ml={6} align={"stretch"}>
                    <HStack>
                      {discountType.map((item, i) => (
                        <Box
                          key={item.id}
                          py={2}
                          px={3}
                          mb={2}
                          borderRadius={"md"}
                          borderWidth={"1px"}
                          borderColor={
                            discountRpPercentage &&
                            discountRpPercentage.id === item.id
                              ? "teal.400"
                              : undefined
                          }
                          cursor={"pointer"}
                          onClick={() => selectdiscountRpPercentage(item)}
                        >
                          <Text>{item.name}</Text>
                        </Box>
                      ))}
                    </HStack>

                    {discountRpPercentage?.id === 1 ? (
                      <NumberInput
                        name="addDiscount"
                        inputValue={inputDiscount}
                        placeholder="Diskon dengan rupiah"
                        onChange={(inputValue) => {
                          handleInputDiscount(inputValue, 1);
                        }}
                        isCurrency={true}
                      />
                    ) : (
                      <InputGroup>
                        <InputLeftElement pointerEvents="none" fontSize={"sm"}>
                          %
                        </InputLeftElement>
                        <Input
                          name="addDiscount"
                          type="text"
                          value={inputDiscount || ""}
                          placeholder="Diskon dengan persen"
                          autoComplete="off"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleInputDiscount(event.target.value, 2);
                          }}
                        />
                      </InputGroup>
                    )}
                  </VStack>
                )}
                <Radio value="2">Tanpa diskon</Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </DrawerBody>

        <DrawerFooter w={"100%"}>
          <Button
            variant={"outline"}
            colorScheme="red"
            size={"sm"}
            borderRadius={"md"}
            mr={2}
            onClick={() => {
              removeProduct(data?.indexProduct);
              onClose();
            }}
            flex={1}
          >
            Hapus dari keranjang
          </Button>
          <Button
            variant={"solid"}
            colorScheme="teal"
            borderRadius={"md"}
            size={"sm"}
            flex={1}
            onClick={handleSubmit}
          >
            Simpan
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

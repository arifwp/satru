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
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useBgComponentBaseColor,
  useBgHover,
  useBorderColorInput,
} from "../../../constant/colors";
import {
  ProductInterface,
  ProductVariantInterface,
} from "../../../constant/Product";
import { ProductCartInterface } from "../../../constant/Transaction";
import formatNumber from "../../../lib/formatNumber";
import { useTransactionStore } from "../../../store/useTransactionStore";
import { NumberInput } from "../../input/NumberInput";

interface Props extends DrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ProductInterface | ProductCartInterface | undefined;
}

interface DiscountTypeInterface {
  id: any;
  name: string;
}

const discountType = [
  { id: 1, name: "Rp" },
  { id: 2, name: "%" },
];

export const TransactionDrawer = ({
  isOpen,
  onOpen,
  onClose,
  data,
  ...rest
}: Props) => {
  const [finalData, setFinalData] = useState<ProductVariantInterface[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariantInterface | undefined
  >(undefined);
  const [totalItem, setTotalItem] = useState<number>(1);
  const [discountOrNot, setDiscountOrNot] = useState<string>("2");
  const [inputDiscount, setInputDiscount] = useState<string>("");
  const [discountRpPercentage, setDiscountRpPercentage] = useState<
    DiscountTypeInterface | undefined
  >(undefined);
  const borderColor = useBorderColorInput();
  const bgHover = useBgHover();
  const bgComp = useBgComponentBaseColor();
  const { products, addProduct, updateProduct } = useTransactionStore();

  useEffect(() => {
    if (isOpen) {
      const initialData = [
        {
          _id: data?._id,
          variantId: data?._id,
          variantName: "Reguler",
          variantPrice: data!.price,
          variantStock: data!.stock,
        },
        ...(data?.variants ?? []),
      ];

      setFinalData(initialData);

      if (initialData.length > 0) {
        setSelectedVariant(initialData[0]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTotalItem(1);
    }
  }, [selectedVariant, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setInputDiscount("");
    }
  }, [discountRpPercentage, isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (discountOrNot === "2") {
        setDiscountRpPercentage(undefined);
      }
    } else {
      setDiscountOrNot("2");
    }
  }, [discountOrNot, isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (discountOrNot === "1") {
        setDiscountRpPercentage(discountType[0]);
      }
    }
  }, [isOpen, discountOrNot]);

  const handleSelect = (val: any) => {
    val._id === selectedVariant?._id
      ? setSelectedVariant(undefined)
      : setSelectedVariant(val);
  };

  const selectdiscountRpPercentage = (val: DiscountTypeInterface) => {
    // val.id === discountRpPercentage?.id
    //   ? setDiscountRpPercentage(undefined)
    //   : setDiscountRpPercentage(val);

    setDiscountRpPercentage(val);
  };

  const increment = () => {
    selectedVariant &&
      totalItem < selectedVariant.variantStock &&
      setTotalItem(totalItem + 1);
  };

  const decrement = () => {
    if (totalItem > 1) {
      setTotalItem(totalItem - 1);
    }
  };

  const handleInputDiscount = (event: any, discCategory: number) => {
    if (discCategory === 1) {
      setInputDiscount(event);
    } else {
      setInputDiscount(event.replace(/[^0-9]/g, ""));
    }
  };

  const handleSubmit = () => {
    const productInStore = products.find(
      (product) => product._id === (data as ProductCartInterface)._id
    );

    console.log("data awal", finalData);

    console.log("product in store", productInStore);

    if (productInStore) {
      const variantInStore = productInStore.variants?.find(
        (variant) => variant._id === selectedVariant?._id
      );

      console.log("variant in store", variantInStore);

      if (variantInStore) {
        // Jika varian ada, update kuantitasnya
        updateProduct(productInStore.indexProduct, {
          qty: (productInStore.qty ?? 0) + 1,
        });
      } else if (!productInStore.variants?.length) {
        // Jika produk ada tetapi tidak memiliki varian, tambah kuantitasnya
        updateProduct(productInStore.indexProduct, {
          qty: (productInStore.qty ?? 0) + 1,
        });
      } else {
        console.log("tambah varian");
        // Jika produk ada, tetapi varian baru, tambahkan produk baru dengan varian ini
        const newProduct = {
          indexProduct: products.length + 1,
          ...data,
          variants: [selectedVariant],
        };
        addProduct(newProduct as ProductCartInterface);
      }
    } else {
      console.log("produk baru gan");
      // Jika produk tidak ada, tambahkan produk baru
      const newProduct = {
        indexProduct: products.length + 1,
        ...data,
        variants: selectedVariant ? [selectedVariant] : [],
      };
      addProduct(newProduct as ProductCartInterface);
    }

    onClose();
  };

  // const handleSubmit = () => {
  //   const existingProductIndex = finalData.findIndex(
  //     (product) => product._id === (selectedVariant as any)._id
  //   );

  //   if (existingProductIndex === 0) {
  //     const existingProduct = products.filter(
  //       (product) => product._id === (data as ProductCartInterface)._id
  //     );

  //     const findVariant = products.find((item) =>
  //       item.variants?.some((itemVar) => itemVar._id === selectedVariant?._id)
  //     );

  //     console.log("existingproduct", existingProduct);
  //     console.log("findvariant", findVariant);

  //     const itemProduct = products.find(
  //       (p) => p._id === (data as ProductCartInterface)._id
  //     );
  //     // console.log("ini pertama", data);

  //     if (existingProduct.length > 0 && !!findVariant) {
  //       console.log("cuman nambah qty");
  //       updateProduct((itemProduct as ProductCartInterface).indexProduct, {
  //         qty: (itemProduct?.qty ?? 0) + 1,
  //       });
  //     } else if (
  //       existingProduct.length > 0 &&
  //       (existingProduct[0].variants as any)?.length > 0
  //     ) {
  //       const findSelected = products.filter(
  //         (product) =>
  //           product._id === (data as ProductCartInterface)._id &&
  //           product.variants?.length === 0
  //       );
  //       console.log("findselected", findSelected.length > 0);

  //       if (existingProduct.length > 0 && findSelected.length > 0) {
  //         console.log("ini nih satu");
  //         updateProduct((findSelected as any)[0].indexProduct, {
  //           qty: (findSelected[0].qty ?? 0) + 1,
  //         });
  //       } else {
  //         console.log("ini nih dua");
  //         const dataProduct = {
  //           indexProduct: products.length + 1,
  //           ...data,
  //         };
  //         (dataProduct as ProductCartInterface).variants = [];

  //         addProduct(dataProduct as ProductCartInterface);
  //       }
  //     } else {
  //       // addProduct(data as ProductCartInterface);
  //       console.log("add product baru dong");
  //       const originalVariants = [...(data as any).variants];

  //       const dataProduct = {
  //         indexProduct: products.length + 1,
  //         ...data,
  //       };

  //       (dataProduct as ProductCartInterface).variants = [];

  //       addProduct(dataProduct as ProductCartInterface);
  //       // (data as ProductCartInterface).variants = originalVariants;
  //     }
  //   } else {
  //     const existingVariant = products.find((item) =>
  //       item.variants?.some((itemVar) => itemVar._id === selectedVariant?._id)
  //     );

  //     const itemProduct =
  //       existingVariant?.variants &&
  //       existingVariant?.variants.find(
  //         (item) => item._id === selectedVariant?._id
  //       );

  //     if (!!itemProduct) {
  //       const findItem = products.find(
  //         (p) => p._id === (data as ProductCartInterface)._id
  //       );

  //       console.log("finditem", findItem);
  //       updateProduct((findItem as ProductCartInterface).indexProduct, {
  //         qty: ((findItem as ProductCartInterface).qty ?? 0) + 1,
  //       });
  //     } else {
  //       const selectItem = {
  //         indexProduct: products.length + 1,
  //         ...data,
  //         variants: data?.variants?.filter(
  //           (variant) => variant._id === selectedVariant?._id
  //         ),
  //       };
  //       console.log("selain index 0", selectItem);

  //       addProduct(selectItem as ProductCartInterface);
  //     }
  //   }

  //   onClose();
  // };

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
        <DrawerHeader>{`${data?.name}, ${selectedVariant?.variantName}`}</DrawerHeader>
        <DrawerBody>
          <VStack w={"100%"} spacing={2} align={"stretch"}>
            <Text mb={2} fontSize={[12, null, 14]} fontWeight={"semibold"}>
              Varian
            </Text>
            {data &&
              data.variants &&
              finalData.map((item, i) => (
                <HStack
                  key={item._id}
                  w={"100%"}
                  as="button"
                  px={4}
                  py={2}
                  textAlign={"start"}
                  borderWidth={"1px"}
                  borderRadius={"md"}
                  fontSize={[12, null, 14]}
                  align={"stretch"}
                  _hover={{ bg: bgHover }}
                  borderColor={
                    selectedVariant && selectedVariant._id === item?._id
                      ? "teal.400"
                      : undefined
                  }
                  onClick={() => handleSelect(item)}
                  justify={"space-between"}
                >
                  <VStack align={"stretch"}>
                    <Text fontSize={[14, null, 16]} fontWeight={"semibold"}>
                      {item?.variantName}
                    </Text>
                    <Text variant={"secondary"} fontSize={[12, null, 14]}>
                      {formatNumber(item?.variantPrice)}
                    </Text>
                  </VStack>

                  <Text alignSelf={"center"} fontSize={[14, null, 16]}>
                    {`${item?.variantStock} Stok`}
                  </Text>
                </HStack>
              ))}

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
                <Text fontSize={[16, null, 18]}>{totalItem}</Text>
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
              defaultValue="2"
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
                          p={2}
                          borderRadius={"md"}
                          bg={
                            discountRpPercentage &&
                            discountRpPercentage.id === item.id
                              ? "teal.400"
                              : undefined
                          }
                          borderWidth={"1px"}
                          borderColor={"teal.400"}
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
            colorScheme="teal"
            size={"sm"}
            borderRadius={"md"}
            mr={2}
            onClick={onClose}
            flex={1}
          >
            Batal
          </Button>
          <Button
            variant={"solid"}
            colorScheme="teal"
            borderRadius={"md"}
            size={"sm"}
            flex={1}
            onClick={handleSubmit}
          >
            Tambahkan ke tagihan
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

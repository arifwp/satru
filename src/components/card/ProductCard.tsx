import {
  Image,
  StackProps,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { useBgComponentBaseColor } from "../../constant/colors";
import { ProductInterface } from "../../constant/Product";
import { SelectOption } from "../../constant/SelectOption";
import {
  ProductCartInterface,
  TransactionInterface,
} from "../../constant/Transaction";
import formatNumber from "../../lib/formatNumber";
import { useTransactionStore } from "../../store/useTransactionStore";
import { getDataUser } from "../../utils/helperFunction";
import { TransactionDrawer } from "../drawer/dedicated/TransactionDrawer";

interface Props extends StackProps {
  filterOutlet: SelectOption[] | undefined;
  filterCategory: SelectOption[] | undefined;
  filterSearch: string;
}

export const ProductCard = ({
  filterOutlet,
  filterSearch,
  filterCategory,
  ...rest
}: Props) => {
  const bgComp = useBgComponentBaseColor();
  const [data, setData] = useState<ProductInterface[]>([]);
  const [selectedData, setSelectedData] = useState<ProductInterface>();
  const [listProduct, setListProduct] = useState<ProductCartInterface[]>([]);
  const [cart, setCart] = useState<TransactionInterface>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const toast = useToast();
  // const [filterCategory, setFilterCategory] = useState<
  //   SelectOption[] | undefined
  // >(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    transactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    clearTransaction,
  } = useTransactionStore();

  useEffect(() => {
    const token = getCookie("token");
    const ownerId = getDataUser().ownerId
      ? getDataUser().ownerId
      : getDataUser()._id;
    let url;

    if (
      filterOutlet &&
      filterOutlet.length !== 0 &&
      filterCategory &&
      filterCategory.length !== 0
    ) {
      const otltIds = filterOutlet.map((item) => item._id);
      const outletIds = otltIds.join(",");

      const ctgIds = filterCategory.map((item) => item._id);
      const categoryIds = ctgIds.join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByOutletCategory/${ownerId}/${outletIds}/${categoryIds}`;
    } else if (filterCategory && filterCategory.length > 0) {
      const ctgIds = filterCategory.map((item) => item._id);
      const categoryIds = ctgIds.join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByCategory/${ownerId}/${categoryIds}`;
    } else if (filterOutlet && filterOutlet.length > 0) {
      const otltIds =
        filterOutlet && (filterOutlet as any[]).map((item) => item._id);
      const outletIds = otltIds && (otltIds as string[]).join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByOutlet/${ownerId}/${outletIds}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProduct/${ownerId}`;
    }

    url &&
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          setData(JSON.parse(response.request.response).data);
        })
        .catch((error: AxiosError) => {
          toast({
            title: JSON.parse(error.request.response).message,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoaded(true);
        });
  }, [filterOutlet, filterSearch, filterCategory, toast]);

  useEffect(() => {
    let total = 0;
    listProduct.map((item, i) => {
      total += item.price;
    });

    const val = {
      userId: getDataUser()._id,
      ownerId: getDataUser().ownerId
        ? getDataUser().ownerId
        : getDataUser()._id,
      totalPrice: total,
      product: listProduct,
      createdAt: new Date(Date.now()),
    };

    addTransaction(val);
  }, [listProduct]);

  const selectItem = (item: any) => {
    setListProduct([...listProduct, item]);
    // if (item.variants && item.variants?.length > 0) {
    //   setSelectedData(item);

    //   onOpen();
    // }
  };

  return (
    <>
      <VStack w={"100%"} mt={2} overflowY={"auto"} {...rest}>
        <Wrap
          className="scrollY"
          overflowY={"auto"}
          align={"center"}
          justify={"center"}
        >
          {data?.map((item, i) => (
            <WrapItem key={item._id} onClick={() => selectItem(item)}>
              <VStack
                className="product-card"
                w={"140px"}
                borderRadius={"md"}
                bg={bgComp}
                textAlign={"center"}
                p={2}
                cursor={"pointer"}
                overflow={"hidden"}
              >
                <Image
                  src={`http://localhost:3000/uploads/products/${item?.imageProduct}`}
                  fallbackSrc="https://placehold.co/600x400"
                  borderRadius={"md"}
                  overflow={"clip"}
                  objectFit={"cover"}
                  w={"120px"}
                  h={"120px"}
                />

                <Text
                  fontSize={[12, null, 14]}
                  fontWeight={700}
                  mt={2}
                  maxW={"200px"}
                  noOfLines={1}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {item?.name}
                </Text>
                <Text fontSize={[12, null, 14]} mb={1}>
                  Rp {item && formatNumber(item?.price)}
                </Text>
              </VStack>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>

      <TransactionDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        children={undefined}
        data={selectedData}
      />
    </>
  );
};

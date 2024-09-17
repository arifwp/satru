import {
  Button,
  HStack,
  Image,
  Select,
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
import { ProductCartInterface } from "../../constant/Transaction";
import formatNumber from "../../lib/formatNumber";
import { useTransactionStore } from "../../store/useTransactionStore";
import { getDataUser } from "../../utils/helperFunction";
import { DetailItemDrawer } from "../drawer/dedicated/DetailItemDrawer";
import { Empty } from "../Empty";
import { TableSkeleton } from "../TableSkeleton";

interface Props extends StackProps {
  filterOutlet: SelectOption[] | undefined;
  filterCategory: SelectOption[] | undefined;
  filterSearch: string;
}

const rowOptions = [
  { id: 1, name: 20 },
  { id: 2, name: 30 },
  { id: 3, name: 60 },
  { id: 4, name: 100 },
];

export const ProductCard = ({
  filterOutlet,
  filterSearch,
  filterCategory,
  ...rest
}: Props) => {
  const bgComp = useBgComponentBaseColor();
  const [data, setData] = useState<ProductInterface[]>([]);
  const [selectedData, setSelectedData] = useState<ProductCartInterface>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transaction, products, addTransaction, addProduct, updateProduct } =
    useTransactionStore();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
  const [limitPagination, setLimitPagination] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagesArr = Array.from({ length: totalPages as any }, (_, i) => i + 1);

  useEffect(() => {
    const token = getCookie("token");
    const ownerId = getDataUser().ownerId
      ? getDataUser().ownerId
      : getDataUser()._id;

    let url;
    let outletIds;
    let categoryIds;

    if (
      filterOutlet &&
      filterOutlet.length !== 0 &&
      filterCategory &&
      filterCategory.length !== 0
    ) {
      const otltIds = filterOutlet.map((item) => item._id);
      outletIds = otltIds.join(",");

      const ctgIds = filterCategory.map((item) => item._id);
      categoryIds = ctgIds.join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByOutletCategory`;
    } else if (filterCategory && filterCategory.length > 0) {
      const ctgIds = filterCategory.map((item) => item._id);
      categoryIds = ctgIds.join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByCategory`;
    } else if (filterOutlet && filterOutlet.length > 0) {
      const otltIds =
        filterOutlet && (filterOutlet as any[]).map((item) => item._id);
      outletIds = otltIds && (otltIds as string[]).join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByOutlet`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProduct`;
    }

    const request = {
      ownerId: ownerId,
      page: currentPage,
      limit: limitPagination,
      outletIds: outletIds,
      categoryIds: categoryIds,
      search: filterSearch,
    };

    url &&
      axios
        .post(url, request, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          setTotalItems(
            JSON.parse(response.request.response).pagination.totalItems
          );
          setTotalPages(
            JSON.parse(response.request.response).pagination.totalPages
          );
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
  }, [
    filterOutlet,
    filterSearch,
    filterCategory,
    toast,
    currentPage,
    limitPagination,
  ]);

  const finalData =
    data &&
    data.filter((item) => {
      const searchTerm = filterSearch.toLowerCase();
      const nameTerm = item.name.toLowerCase();

      return nameTerm.includes(searchTerm);
    });

  const selectItem = (item: any) => {
    const existingProduct = products.filter(
      (product) => product._id === item._id
    );

    const itemProduct = products.find((p) => p._id === item._id);

    if (item.variants && item.variants?.length > 0) {
      setSelectedData(item);
      onOpen();
    } else {
      if (existingProduct.length > 0) {
        updateProduct(itemProduct && itemProduct.indexProduct, {
          qty: (itemProduct?.qty ?? 0) + 1,
          finalPrice:
            itemProduct && itemProduct?.price * ((itemProduct?.qty ?? 0) + 1),
        });
      } else {
        const dataProduct: ProductCartInterface = {
          indexProduct: products.length + 1,
          qty: 1,
          finalPrice: item.price,
          ...item,
        };

        addProduct(dataProduct);
      }
    }
  };

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLimitPagination(parseInt(value));
  };

  if (!loaded) {
    return <TableSkeleton row={5} column={10} px={4} />;
  } else if (loaded && data && data.length < 1) {
    return <Empty title="Produk tidak ditemukan" mt={6} />;
  }

  return (
    <>
      <VStack
        className="product-card"
        w={"100%"}
        h={"100vh"}
        mt={2}
        overflowY={"auto"}
        {...rest}
      >
        <Wrap
          h={"calc(100vh - 16px)"}
          className="scrollY"
          overflowY={"auto"}
          align={"center"}
          justify={"center"}
          mb={10}
        >
          {finalData?.map((item) => (
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
                  fontWeight={"semibold"}
                  mt={2}
                  maxW={"200px"}
                  noOfLines={1}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {item?.name}
                </Text>
                <Text fontSize={[10, null, 12]} mb={1}>
                  Rp {item && formatNumber(item?.price)}
                </Text>
              </VStack>
            </WrapItem>
          ))}
        </Wrap>

        <HStack
          className="footer"
          w={"100%"}
          position={"relative"}
          justify={"center"}
        >
          <HStack
            w={"100%"}
            px={4}
            py={1}
            // bg="rgba(0, 0 ,0 ,0.5)"
            backdropFilter="auto"
            backdropBlur={"2px"}
            position={"absolute"}
            bottom={0}
            justify={"space-between"}
          >
            {totalItems && (
              <HStack>
                <Select
                  w={"fit-content"}
                  onChange={handleSelect}
                  isDisabled={
                    (totalItems as any) > rowOptions[0].name ? false : true
                  }
                >
                  {rowOptions[0].name < (totalItems as any) ? (
                    rowOptions.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option value={totalItems}>{totalItems}</option>
                  )}
                </Select>

                <Text fontSize={[12, null, 14]}>{`dari ${totalItems}`}</Text>
              </HStack>
            )}

            {totalPages && (
              <HStack>
                {pagesArr.map((page: any, i: any) => (
                  <Button
                    key={i}
                    size={"sm"}
                    colorScheme="teal"
                    borderRadius={"md"}
                    variant={"outline"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </HStack>
            )}
          </HStack>
        </HStack>
      </VStack>

      <DetailItemDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        children={undefined}
        data={selectedData}
      />
    </>
  );
};

import {
  Image,
  StackProps,
  Text,
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
import formatNumber from "../../lib/formatNumber";
import { getDataUser } from "../../utils/helperFunction";

interface Props extends StackProps {
  filterOutlet: SelectOption[] | undefined;
  filterCategory: SelectOption[] | undefined;
  filterSearch: string;
}

export const ProductCard = ({
  filterOutlet,
  filterCategory,
  filterSearch,
  ...rest
}: Props) => {
  const bgComp = useBgComponentBaseColor();
  const [data, setData] = useState<ProductInterface[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const toast = useToast();

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

  return (
    // <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={4} {...rest}>
    //   {data?.map((item, i) => (
    //     <VStack
    //       className="product-card"
    //       w={"140px"}
    //       borderRadius={"md"}
    //       bg={bgComp}
    //       textAlign={"center"}
    //       p={2}
    //       cursor={"pointer"}
    //       overflow={"hidden"}
    //     >
    //       <Image
    //         src={`http://localhost:3000/uploads/products/${item?.imageProduct}`}
    //         fallbackSrc="https://placehold.co/600x400"
    //         borderRadius={"md"}
    //         overflow={"clip"}
    //         objectFit={"cover"}
    //         w={"120px"}
    //         h={"120px"}
    //       />

    //       <Text
    //         fontSize={[14, null, 16]}
    //         fontWeight={700}
    //         mt={2}
    //         maxW={"200px"}
    //         noOfLines={1}
    //         overflow={"hidden"}
    //         textOverflow={"ellipsis"}
    //       >
    //         {item?.name}
    //       </Text>
    //       <Text fontSize={[14, null, 16]} color={"teal.400"} mb={1}>
    //         Rp {item && formatNumber(item?.price)}
    //       </Text>
    //     </VStack>
    //   ))}
    // </SimpleGrid>
    <Wrap align={"center"} justify={"center"} {...rest}>
      {data?.map((item, i) => (
        <WrapItem>
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
            <Text fontSize={[12, null, 14]} color={"teal.400"} mb={1}>
              Rp {item && formatNumber(item?.price)}
            </Text>
          </VStack>
        </WrapItem>
      ))}
    </Wrap>
  );

  // return (
  // <VStack
  //   className="product-card"
  //   w={"140px"}
  //   borderRadius={"md"}
  //   bg={bgComp}
  //   textAlign={"center"}
  //   p={2}
  //   cursor={"pointer"}
  //   overflow={"hidden"}
  //   {...rest}
  // >
  //   <Image
  //     src={`http://localhost:3000/uploads/products/${data?.imageProduct}`}
  //     fallbackSrc="https://placehold.co/600x400"
  //     borderRadius={"md"}
  //     overflow={"clip"}
  //     objectFit={"cover"}
  //     w={"120px"}
  //     h={"120px"}
  //   />

  //   <Text
  //     fontSize={[14, null, 16]}
  //     fontWeight={700}
  //     mt={2}
  //     maxW={"200px"}
  //     noOfLines={1}
  //     overflow={"hidden"}
  //     textOverflow={"ellipsis"}
  //   >
  //     {data?.name}
  //   </Text>
  //   <Text fontSize={[14, null, 16]} color={"teal.400"} mb={1}>
  //     Rp {data && formatNumber(data?.price)}
  //   </Text>
  // </VStack>
  // );
};

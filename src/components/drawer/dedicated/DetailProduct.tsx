import {
  ButtonProps,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiArrowLeftDoubleLine, RiEdit2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { ProductInterface } from "../../../constant/Product";
import { useBgComponentBaseColor } from "../../../constant/colors";
import formatNumber from "../../../lib/formatNumber";
import { formatDateToId } from "../../../utils/helperFunction";
import { CButton } from "../../CButton";

interface Props extends ButtonProps {
  _id: string;
}

export const DetailProduct = ({ _id }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<ProductInterface | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgComponent = useBgComponentBaseColor();

  useEffect(() => {
    if (isOpen) {
      const token = getCookie("token");

      axios
        .get(
          `${process.env.REACT_APP_API_URL}/v1/product/detailProduct/${_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response: AxiosResponse) => {
          setData(JSON.parse(response.request.response).data);
          console.log(JSON.parse(response.request.response).data);
        })
        .catch((error: AxiosError) => {
          toast({
            title: JSON.parse(error.request.response).message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoaded(true);
        });
    }
  }, [_id, isOpen, toast]);

  return (
    <>
      <CButton
        icon={RiArrowLeftDoubleLine}
        colorScheme="teal"
        variant={"ghost"}
        onClick={onOpen}
      >
        Detail
      </CButton>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <DrawerContent bg={bgComponent}>
          <DrawerHeader>
            {/* <Skeleton isLoaded={loaded}>
              <Image
                minW={"75px"}
                src={`http://localhost:3000/uploads/products/${
                  data && data.imageProduct
                }`}
                objectFit={"contain"}
              />
            </Skeleton> */}
            <Text as={"b"} fontSize={"xs"} variant={"secondary"}>
              DETAIL PRODUK
            </Text>
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className="box-table scrollY">
            <VStack align={"stretch"}>
              <Skeleton width={!loaded ? "full" : ""} isLoaded={loaded}>
                <Image
                  minW={"75px"}
                  maxW={"150px"}
                  src={`http://localhost:3000/uploads/products/${
                    data && data.imageProduct
                  }`}
                  objectFit={"contain"}
                  mx={"auto"}
                />
              </Skeleton>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={6}>
                  <Text variant={"secondary"}>Nama</Text>

                  <Text fontSize={"sm"}>{data?.name}</Text>
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Deskripsi</Text>

                  <Text fontSize={"sm"}>{data?.description}</Text>
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Outlet</Text>

                  {data &&
                    data.outlet.map((item, i) => (
                      <Text key={item._id} fontSize={"sm"}>
                        {item.name}
                      </Text>
                    ))}
                  {/* <Text fontSize={"sm"}>{data?.outlet.map}</Text> */}
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Harga</Text>

                  <Text fontSize={"sm"}>
                    {data && formatNumber(data.price)}
                  </Text>
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Kategori</Text>

                  <Text fontSize={"sm"}>{data && data.category.name}</Text>
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Merk</Text>

                  <Text fontSize={"sm"}>
                    {data && data.brand ? data.brand.name : "-"}
                  </Text>
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Stok</Text>

                  <Text fontSize={"sm"}>{data && data.stock}</Text>
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Minimum Stok</Text>

                  <Text fontSize={"sm"}>
                    {data && data.minimumStock ? data.minimumStock : "-"}
                  </Text>
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Varian Produk</Text>

                  {data &&
                    data.variants?.map((item, i) => (
                      <VStack key={i} align={"stretch"}>
                        <HStack
                          className="wrap-horizontal"
                          align={"start"}
                          fontSize={"xs"}
                        >
                          <VStack p={"1.5px"}>
                            <Text variant={"secondary"}>{`${i + 1}.`}</Text>
                          </VStack>
                          <VStack align={"stretch"} p={0} m={0}>
                            <HStack>
                              <Text variant={"secondary"}>Nama :</Text>
                              <Text>{item.variantName}</Text>
                            </HStack>
                            <HStack>
                              <Text variant={"secondary"}>Harga :</Text>
                              <Text>{formatNumber(item.variantPrice)}</Text>
                            </HStack>

                            <HStack>
                              <Text variant={"secondary"}>Stok :</Text>
                              <Text>{formatNumber(item.variantStock)}</Text>
                            </HStack>
                          </VStack>
                        </HStack>
                      </VStack>
                    ))}
                </VStack>
              </SkeletonText>

              <SkeletonText
                noOfLines={2}
                spacing={2}
                skeletonHeight={4}
                isLoaded={loaded}
              >
                <VStack fontSize={"xs"} align={"stretch"} spacing={1} mt={4}>
                  <Text variant={"secondary"}>Tanggal Ditambahkan</Text>

                  <Text fontSize={"sm"}>
                    {data &&
                      formatDateToId({ dateString: data.createdAt.toString() })}
                  </Text>
                </VStack>
              </SkeletonText>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <CButton variant="ghost" mr={3} onClick={onClose}>
              Tutup
            </CButton>
            <ChakraLink
              as={ReactRouterLink}
              to={`edit-product/${data && data._id}`}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <CButton
                variant={"solid"}
                colorScheme={"yellow"}
                icon={RiEdit2Line}
              >
                Edit
              </CButton>
            </ChakraLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

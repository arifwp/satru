import {
  HStack,
  SimpleGrid,
  Stack,
  VStack,
  Link as ChakraLink,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { DiscountCard } from "../../../components/card/DiscountCard";
import { SearchInput } from "../../../components/input/SearchInput";
import { useCallback, useEffect, useState } from "react";
import { debounce, getDataUser } from "../../../utils/helperFunction";
import { CButton } from "../../../components/CButton";
import { RiAddCircleLine } from "@remixicon/react";
import { Link as ReactRouterLink } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DiscountInterface } from "../../../constant/Discount";
import { getCookie } from "typescript-cookie";
import { SelectOption } from "../../../constant/SelectOption";

export const DiscountPage = () => {
  const [filterSearch, setfilterSearch] = useState<string>("");
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DiscountInterface | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    const token = getCookie("token");
    const userId = getDataUser().ownerId
      ? getDataUser().ownerId
      : getDataUser()._id;

    const request = {
      ownerId: userId,
      page: 1,
      limit: 10,
      search: filterSearch,
      outletIds: filterOutlet,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/discount/getAllDiscount`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        setData(JSON.parse(response.request.response).data);
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
  }, [toast]);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => setfilterSearch(searchQuery), 500),
    []
  );

  const handleSearch = (inputValue: string) => {
    debouncedSearch(inputValue);
  };

  return (
    <VStack className="discount-page" w={"100%"} p={4}>
      <HStack w={"100%"} flexWrap={"wrap"}>
        <SearchInput
          w={"fit-content"}
          placeholder="Cari diskon..."
          onConfirm={(inputValue) => {
            handleSearch(inputValue);
          }}
        />

        {getDataUser().owner && (
          <ChakraLink
            as={ReactRouterLink}
            to={"/discount/add-discount"}
            textDecoration={"none"}
            _hover={{ textDecoration: "none" }}
          >
            <CButton
              w={"100%"}
              variant={"outline"}
              colorScheme="teal"
              icon={RiAddCircleLine}
            >
              Tambah Diskon
            </CButton>
          </ChakraLink>
        )}
      </HStack>

      <Wrap w={"100%"}></Wrap>

      {/* <SimpleGrid columns={[1, 2, 4, 5, 7]} spacing={4} mt={4}>
        <DiscountCard />
        <DiscountCard />
        <DiscountCard />
        <DiscountCard />
      </SimpleGrid> */}
    </VStack>
  );
};

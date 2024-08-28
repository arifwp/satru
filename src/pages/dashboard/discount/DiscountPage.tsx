import { Link as ChakraLink, HStack, VStack } from "@chakra-ui/react";
import { RiAddCircleLine, RiShoppingBag2Line } from "@remixicon/react";
import { useCallback, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../../../components/CButton";
import { SearchInput } from "../../../components/input/SearchInput";
import { SelectButtonOutlet } from "../../../components/modal/dedicated/SelectButtonOutlet";
import { TableDiscount } from "../../../components/table/dedicated/TableDiscount";
import { SelectOption } from "../../../constant/SelectOption";
import { debounce, getDataUser } from "../../../utils/helperFunction";

export const DiscountPage = () => {
  const [filterSearch, setfilterSearch] = useState<string>("");
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );

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

        <SelectButtonOutlet
          name="outlet"
          placeholder="Filter Outlet"
          withSearch={true}
          icon={RiShoppingBag2Line}
          onConfirm={(inputValue) => {
            setFilterOutlet(inputValue);
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

      <TableDiscount
        filterSearch={filterSearch}
        filterOutlet={filterOutlet}
        mt={4}
      />
    </VStack>
  );
};

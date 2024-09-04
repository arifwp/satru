import { Link as ChakraLink, Stack, VStack } from "@chakra-ui/react";
import { RiAddCircleLine, RiShoppingBag2Line } from "@remixicon/react";
import { useCallback, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../../../components/CButton";
import { SearchInput } from "../../../components/input/SearchInput";
import { SelectButtonOutlet } from "../../../components/modal/dedicated/SelectButtonOutlet";
import { TableMember } from "../../../components/table/dedicated/TableMember";
import { SelectOption } from "../../../constant/SelectOption";
import { debounce, getDataUser } from "../../../utils/helperFunction";

export const MemberPage = () => {
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );
  const [filterSearch, setfilterSearch] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => setfilterSearch(searchQuery), 500),
    []
  );

  const handleSearch = (inputValue: string) => {
    debouncedSearch(inputValue);
  };

  return (
    <VStack className="member-container" w={"100%"} p={4}>
      <Stack
        w={"100%"}
        direction={{
          base: "column",
          sm: "row",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        align={{ base: "stretch", md: "start" }}
        flexWrap={"wrap"}
      >
        <SearchInput
          w={"fit-content"}
          placeholder="Cari nama..."
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

        <ChakraLink
          as={ReactRouterLink}
          to={"/member/add-member"}
          textDecoration={"none"}
          _hover={{ textDecoration: "none" }}
        >
          <CButton
            w={"100%"}
            variant={"outline"}
            colorScheme="teal"
            icon={RiAddCircleLine}
          >
            Tambah Member
          </CButton>
        </ChakraLink>
      </Stack>

      <TableMember
        filterOutlet={filterOutlet}
        filterSearch={filterSearch}
        mt={4}
      />
    </VStack>
  );
};

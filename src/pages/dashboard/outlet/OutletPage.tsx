import {
  Button,
  Link as ChakraLink,
  Icon,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { RiAddCircleLine } from "@remixicon/react";
import { useCallback, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { SearchInput } from "../../../components/input/SearchInput";
import { TableOutlet } from "../../../components/table/dedicated/TableOutlet";
import { debounce, getDataUser } from "../../../utils/helperFunction";

export const OutletPage = () => {
  const [filterSearch, setfilterSearch] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => setfilterSearch(searchQuery), 500),
    []
  );

  const handleSearch = (inputValue: string) => {
    debouncedSearch(inputValue);
  };

  return (
    <VStack className="outlet-container" w={"100%"} p={4}>
      <Stack w={"100%"} direction={["column", "row", "row", "row", "row"]}>
        <SearchInput
          w={"fit-content"}
          placeholder="Cari outlet..."
          onConfirm={(inputValue) => {
            handleSearch(inputValue);
          }}
        />

        {getDataUser().owner === true && (
          <ChakraLink
            as={ReactRouterLink}
            to={"/outlet/add-outlet"}
            textDecoration={"none"}
            _hover={{ textDecoration: "none" }}
          >
            <Button
              w={"100%"}
              size={"sm"}
              borderRadius={"md"}
              variant={"outline"}
              colorScheme="teal"
              leftIcon={<Icon as={RiAddCircleLine} />}
              fontSize={[12, null, 14]}
            >
              Tambah Outlet
            </Button>
          </ChakraLink>
        )}
      </Stack>

      <TableOutlet filterSearch={filterSearch} mt={4} />
    </VStack>
  );
};

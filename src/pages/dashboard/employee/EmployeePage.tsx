import {
  Button,
  Link as ChakraLink,
  Icon,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { RiAddCircleLine, RiShoppingBag2Line } from "@remixicon/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { SearchInput } from "../../../components/input/SearchInput";
import { SelectButtonOutlet } from "../../../components/modal/dedicated/SelectButtonOutlet";
import { TableEmployee } from "../../../components/table/dedicated/TableEmployee";
import { SelectOption } from "../../../constant/SelectOption";
import { getDataUser } from "../../../utils/helperFunction";

export const EmployeePage = () => {
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );

  const [filterSearch, setfilterSearch] = useState<string>("");

  return (
    <VStack className="employee-container" w={"100%"} p={4}>
      <Stack w={"100%"} direction={["column", "row", "row", "row", "row"]}>
        <SearchInput
          w={"fit-content"}
          placeholder="Cari karyawan..."
          onConfirm={(inputValue) => {
            setfilterSearch(inputValue);
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
            to={"/employee/add-employee"}
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
              Tambah Karyawan
            </Button>
          </ChakraLink>
        )}
      </Stack>

      <TableEmployee filterOutlet={filterOutlet} filterSearch={filterSearch} />
    </VStack>
  );
};

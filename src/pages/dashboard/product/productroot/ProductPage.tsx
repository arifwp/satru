import { Link as ChakraLink, HStack, Stack, VStack } from "@chakra-ui/react";
import {
  RiAddCircleLine,
  RiBox3Line,
  RiShoppingBag2Line,
} from "@remixicon/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../../../../components/CButton";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { SearchInput } from "../../../../components/input/SearchInput";
import { SelectButtonCategory } from "../../../../components/modal/dedicated/SelectButtonCategory";
import { SelectButtonOutlet } from "../../../../components/modal/dedicated/SelectButtonOutlet";
import { TableProduct } from "../../../../components/table/dedicated/TableProduct";
import { pageNavsProduct } from "../../../../constant/pageNavs";
import { SelectOption } from "../../../../constant/SelectOption";

export const ProductPage = () => {
  const [filterCategory, setFilterCategory] = useState<
    SelectOption[] | undefined
  >(undefined);
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );
  const [filterSearch, setfilterSearch] = useState<string>("");
  const [statusData, setStatusData] = useState<boolean>(false);

  return (
    <PageContainer navs={pageNavsProduct}>
      <VStack className="product-container" w={"100%"} p={4}>
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
          <HStack>
            <SearchInput
              placeholder="Cari nama..."
              onConfirm={(inputValue) => {
                // ADD TODO
                // console.log(inputValue);
                setfilterSearch(inputValue);
              }}
            />
          </HStack>

          <SelectButtonOutlet
            name="outlet"
            placeholder="Filter Outlet"
            withSearch={true}
            icon={RiShoppingBag2Line}
            onConfirm={(inputValue) => {
              // console.log(inputValue);
              setFilterOutlet(inputValue);
            }}
          />

          <SelectButtonCategory
            name="category"
            placeholder="Filter Kategori"
            withSearch={true}
            icon={RiBox3Line}
            onConfirm={(inputValue) => {
              // console.log(inputValue);
              setFilterCategory(inputValue);
            }}
          />

          <ChakraLink
            as={ReactRouterLink}
            to={"/product/add-product"}
            textDecoration={"none"}
            _hover={{ textDecoration: "none" }}
          >
            <CButton
              variant={"outline"}
              colorScheme="teal"
              icon={RiAddCircleLine}
            >
              Tambah Produk
            </CButton>
          </ChakraLink>
        </Stack>

        <TableProduct
          filterOutlet={filterOutlet}
          filterCategory={filterCategory}
          filterSearch={filterSearch}
          statusData={statusData}
          setStatusData={setStatusData}
          mt={4}
        />
      </VStack>
    </PageContainer>
  );
};

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
import { getDataUser } from "../../../../utils/helperFunction";

export const ProductPage = () => {
  const [filterCategory, setFilterCategory] = useState<
    SelectOption[] | undefined
  >(undefined);
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );
  const [filterSearch, setfilterSearch] = useState<string>("");

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
              setFilterOutlet(inputValue);
            }}
          />

          <SelectButtonCategory
            name="category"
            placeholder="Filter Kategori"
            withSearch={true}
            icon={RiBox3Line}
            onConfirm={(inputValue) => {
              setFilterCategory(inputValue);
            }}
          />

          {getDataUser().owner && (
            <ChakraLink
              as={ReactRouterLink}
              to={"/product/add-product"}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <CButton
                w={"100%"}
                variant={"outline"}
                colorScheme="teal"
                icon={RiAddCircleLine}
              >
                Tambah Produk
              </CButton>
            </ChakraLink>
          )}
        </Stack>

        <TableProduct
          filterOutlet={filterOutlet}
          filterCategory={filterCategory}
          filterSearch={filterSearch}
          mt={4}
        />
      </VStack>
    </PageContainer>
  );
};

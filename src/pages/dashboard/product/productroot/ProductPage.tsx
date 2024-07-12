import { Link as ChakraLink, HStack, Stack, VStack } from "@chakra-ui/react";
import { RiAddCircleLine, RiBox3Line } from "@remixicon/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../../../../components/CButton";
import { SearchInput } from "../../../../components/input/SearchInput";
import { SelectButtonCategory } from "../../../../components/modal/dedicated/SelectButtonCategory";
import { SelectButtonSort } from "../../../../components/modal/dedicated/SelectButtonSort";
import { TableProduct } from "../../../../components/table/dedicated/TableProduct";
import { SelectOption } from "../../../../constant/SelectOption";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { pageNavsProduct } from "../../../../constant/pageNavs";

const sort = [
  { _id: "name", name: "Nama" },
  { _id: "smallestStock", name: "Stok Terkecil" },
  { _id: "biggestStock", name: "Stok Terbesar" },
  { _id: "newest", name: "Terbaru" },
  { _id: "oldest", name: "Terlama" },
];

export const ProductPage = () => {
  const [filterCategory, setFilterCategory] = useState<
    SelectOption | undefined
  >(undefined);
  const [filterSort, setfilterSort] = useState<SelectOption | undefined>(
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
                // ADD TODO
                // console.log(inputValue);
                setfilterSearch(inputValue);
              }}
            />
          </HStack>

          <SelectButtonCategory
            name="outlet"
            placeholder="Filter Kategori"
            withSearch={true}
            icon={RiBox3Line}
            onConfirm={(inputValue) => {
              setFilterCategory(inputValue);
            }}
          />

          <SelectButtonSort
            name="outlet"
            placeholder="Urutkan"
            withSearch={false}
            icon={RiBox3Line}
            onConfirm={(inputValue) => {
              // ADD TODO
              // console.log(inputValue);
              setfilterSort(inputValue);
            }}
            options={sort}
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
          filterSort={filterSort}
          filterCategory={filterCategory}
          filterSearch={filterSearch}
          mt={4}
        />
      </VStack>
    </PageContainer>
  );
};

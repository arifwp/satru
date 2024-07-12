import { Link as ChakraLink, HStack, Stack, VStack } from "@chakra-ui/react";
import { RiAddCircleLine, RiBox3Line } from "@remixicon/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../../../../components/CButton";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { SearchInput } from "../../../../components/input/SearchInput";
import { SelectButtonSort } from "../../../../components/modal/dedicated/SelectButtonSort";
import { pageNavsProduct } from "../../../../constant/pageNavs";
import { SelectOption } from "../../../../constant/SelectOption";
import { ModalSingleForm } from "../../../../components/modal/dedicated/ModalSingleForm";

const sort = [
  { _id: "name", name: "Nama" },
  { _id: "newest", name: "Terbaru" },
  { _id: "oldest", name: "Terlama" },
];

export const CategoryPage = () => {
  const [filterSearch, setfilterSearch] = useState<string>("");
  const [filterSort, setfilterSort] = useState<SelectOption | undefined>(
    undefined
  );

  return (
    <PageContainer navs={pageNavsProduct}>
      <VStack className="category-page-container" w={"100%"} p={4}>
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
              placeholder="Cari kategori..."
              onConfirm={(inputValue) => {
                // ADD TODO
                // console.log(inputValue);
                setfilterSearch(inputValue);
              }}
            />
          </HStack>

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

          <ModalSingleForm
            btnText="Tambah Kategori"
            placeholder="Tambah kategori"
            formValue="category"
            url="/v1/product/createCategory"
          />
        </Stack>
      </VStack>
    </PageContainer>
  );
};

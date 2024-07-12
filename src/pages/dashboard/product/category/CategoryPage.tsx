import { HStack, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { SearchInput } from "../../../../components/input/SearchInput";
import { ModalSingleForm } from "../../../../components/modal/dedicated/ModalSingleForm";
import { TableCategory } from "../../../../components/table/dedicated/TableCategory";
import { pageNavsProduct } from "../../../../constant/pageNavs";
import { SelectOption } from "../../../../constant/SelectOption";

export const CategoryPage = () => {
  const [filterSearch, setfilterSearch] = useState<string>("");
  const [filterSort, setfilterSort] = useState<SelectOption | undefined>(
    undefined
  );
  const [statusData, setStatusData] = useState<boolean>(false);

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

          <ModalSingleForm
            btnText="Tambah Kategori"
            placeholder="Tambah kategori"
            formValue="category"
            url="/v1/product/createCategory"
            onConfirm={(inputValue) => {
              setStatusData(inputValue);
            }}
          />
        </Stack>

        <TableCategory filterSearch={filterSearch} mt={4} />
      </VStack>
    </PageContainer>
  );
};

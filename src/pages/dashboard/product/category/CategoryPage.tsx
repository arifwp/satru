import { HStack, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { SearchInput } from "../../../../components/input/SearchInput";
import { ModalSingleForm } from "../../../../components/modal/dedicated/ModalSingleForm";
import { TableCategory } from "../../../../components/table/dedicated/TableCategory";
import { pageNavsProduct } from "../../../../constant/pageNavs";
import { useTriggerRenderStore } from "../../../../store/useTriggerRenderStore";
import { getDataUser } from "../../../../utils/helperFunction";

export const CategoryPage = () => {
  const [filterSearch, setfilterSearch] = useState<string>("");
  const { setStatusData } = useTriggerRenderStore();

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
                setfilterSearch(inputValue);
              }}
            />
          </HStack>

          {getDataUser().owner && (
            <ModalSingleForm
              btnText="Tambah Kategori"
              placeholder="Tambah kategori"
              formValue="category"
              url="/v1/category/createCategory"
              onConfirm={(inputValue) => {
                setStatusData();
              }}
            />
          )}
        </Stack>

        <TableCategory filterSearch={filterSearch} mt={4} />
      </VStack>
    </PageContainer>
  );
};

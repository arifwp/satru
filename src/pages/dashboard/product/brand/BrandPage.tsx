import { HStack, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { SearchInput } from "../../../../components/input/SearchInput";
import { ModalSingleForm } from "../../../../components/modal/dedicated/ModalSingleForm";
import { TableBrand } from "../../../../components/table/dedicated/TableBrand";
import { pageNavsProduct } from "../../../../constant/pageNavs";
import { useTriggerRenderStore } from "../../../../store/useTriggerRenderStore";
import { getDataUser } from "../../../../utils/helperFunction";

export const BrandPage = () => {
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
              placeholder="Cari nama..."
              onConfirm={(inputValue) => {
                setfilterSearch(inputValue);
              }}
            />
          </HStack>

          {getDataUser().owner && (
            <ModalSingleForm
              btnText="Tambah Merk"
              placeholder="Tambah merk"
              formValue="brand"
              url="/v1/brand/createBrand"
              onConfirm={(inputValue) => {
                setStatusData();
              }}
            />
          )}
        </Stack>

        <TableBrand filterSearch={filterSearch} mt={4} />
      </VStack>
    </PageContainer>
  );
};

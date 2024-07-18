import { HStack, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { SearchInput } from "../../../../components/input/SearchInput";
import { ModalSingleForm } from "../../../../components/modal/dedicated/ModalSingleForm";
import { TableBrand } from "../../../../components/table/dedicated/TableBrand";
import { pageNavsProduct } from "../../../../constant/pageNavs";

export const BrandPage = () => {
  const [filterSearch, setfilterSearch] = useState<string>("");

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
              placeholder="Cari nama..."
              onConfirm={(inputValue) => {
                setfilterSearch(inputValue);
              }}
            />
          </HStack>

          <ModalSingleForm
            btnText="Tambah Merk"
            placeholder="Tambah merk"
            formValue="brand"
            url="/v1/brand/createBrand"
            onConfirm={(inputValue) => {
              setStatusData(inputValue);
            }}
          />
        </Stack>

        <TableBrand
          filterSearch={filterSearch}
          statusData={statusData}
          actionStatusData={setStatusData}
          mt={4}
        />
      </VStack>
    </PageContainer>
  );
};

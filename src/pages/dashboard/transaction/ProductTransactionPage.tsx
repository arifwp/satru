import { HStack, VStack } from "@chakra-ui/react";
import { RiBox3Line } from "@remixicon/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../../../components/card/ProductCard";
import { PageContainer } from "../../../components/containers/PageContainer";
import { SearchInput } from "../../../components/input/SearchInput";
import { SelectButtonCategory } from "../../../components/modal/dedicated/SelectButtonCategory";
import { pageNavsTransaction } from "../../../constant/pageNavs";
import { ProductInterface } from "../../../constant/Product";
import { SelectOption } from "../../../constant/SelectOption";

export const ProductTransactionPage = () => {
  const [data, setData] = useState<ProductInterface[] | undefined>(undefined);
  const [filterCategory, setFilterCategory] = useState<
    SelectOption[] | undefined
  >(undefined);
  const [filterSearch, setfilterSearch] = useState<string>("");

  useEffect(() => {
    // axios.get("");
  }, []);

  return (
    <PageContainer navs={pageNavsTransaction}>
      <VStack className="product-container" w={"100%"} p={4}>
        <HStack w={"100%"}>
          <SearchInput
            placeholder="Cari nama..."
            onConfirm={(inputValue) => {
              setfilterSearch(inputValue);
            }}
            w={"fit-content"}
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
        </HStack>

        <ProductCard />
      </VStack>
    </PageContainer>
  );
};

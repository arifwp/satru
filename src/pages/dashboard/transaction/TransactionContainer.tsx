import { Stack, VStack } from "@chakra-ui/react";
import { RiBox3Line, RiShoppingBag2Line } from "@remixicon/react";
import { useState } from "react";
import { ProductCard } from "../../../components/card/ProductCard";
import { SearchInput } from "../../../components/input/SearchInput";
import { SelectButtonCategory } from "../../../components/modal/dedicated/SelectButtonCategory";
import { SelectButtonOutlet } from "../../../components/modal/dedicated/SelectButtonOutlet";
import { ProductInterface } from "../../../constant/Product";
import { SelectOption } from "../../../constant/SelectOption";

export const TransactionContainer = ({ ...rest }) => {
  const [data, setData] = useState<ProductInterface[] | undefined>(undefined);
  const [filterCategory, setFilterCategory] = useState<
    SelectOption[] | undefined
  >(undefined);
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );
  const [filterSearch, setfilterSearch] = useState<string>("");

  return (
    <VStack
      className="product-container scrollY"
      w={"100%"}
      align={"stretch"}
      overflowY={"auto"}
      {...rest}
    >
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
        <SearchInput
          placeholder="Cari produk..."
          onConfirm={(inputValue) => {
            setfilterSearch(inputValue);
          }}
          w={"fit-content"}
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

        <SelectButtonCategory
          name="category"
          placeholder="Filter Kategori"
          withSearch={true}
          icon={RiBox3Line}
          onConfirm={(inputValue) => {
            setFilterCategory(inputValue);
          }}
        />
      </Stack>
      <ProductCard
        filterOutlet={filterOutlet}
        filterSearch={filterSearch}
        filterCategory={filterCategory}
      />
    </VStack>
  );
};

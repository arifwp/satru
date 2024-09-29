import { Stack, VStack } from "@chakra-ui/react";
import { RiBox3Line, RiShoppingBag2Line } from "@remixicon/react";
import { useCallback, useState } from "react";
import { ProductCard } from "../../../components/card/ProductCard";
import { ManualTransactionButton } from "../../../components/ManualTransactionButton";
import { SearchInput } from "../../../components/input/SearchInput";
import { SelectButtonCategory } from "../../../components/modal/dedicated/SelectButtonCategory";
import { SelectButtonOutlet } from "../../../components/modal/dedicated/SelectButtonOutlet";
import { SelectOption } from "../../../constant/SelectOption";
import { debounce } from "../../../utils/helperFunction";

export const TransactionPage = ({ ...rest }) => {
  const [filterCategory, setFilterCategory] = useState<
    SelectOption[] | undefined
  >(undefined);
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );
  const [filterSearch, setfilterSearch] = useState<string>("");
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => setfilterSearch(searchQuery), 500),
    []
  );

  const handleSearch = (inputValue: string) => {
    debouncedSearch(inputValue);
  };

  return (
    <VStack
      className="product-container scrollY"
      w={"100%"}
      h={"100vh"}
      align={"stretch"}
      overflowY={"auto"}
      {...rest}
    >
      <Stack
        w={"100%"}
        p={4}
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
            handleSearch(inputValue);
          }}
          w={[
            "100%",
            "fit-content",
            "fit-content",
            "fit-content",
            "fit-content",
          ]}
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

        <ManualTransactionButton />
      </Stack>
      <ProductCard
        filterOutlet={filterOutlet}
        filterSearch={filterSearch}
        filterCategory={filterCategory}
      />
    </VStack>
  );
};

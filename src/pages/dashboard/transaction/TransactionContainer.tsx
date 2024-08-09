import {
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ProductCard } from "../../../components/card/ProductCard";
import { useTextPrimaryColor } from "../../../constant/colors";
import { ProductInterface } from "../../../constant/Product";
import { SelectOption } from "../../../constant/SelectOption";
import { SearchInput } from "../../../components/input/SearchInput";
import { SelectButtonOutlet } from "../../../components/modal/dedicated/SelectButtonOutlet";
import { RiBox3Line, RiShoppingBag2Line } from "@remixicon/react";
import { SelectButtonCategory } from "../../../components/modal/dedicated/SelectButtonCategory";

export const TransactionContainer = ({ ...rest }) => {
  const [data, setData] = useState<ProductInterface[] | undefined>(undefined);
  const [filterCategory, setFilterCategory] = useState<
    SelectOption[] | undefined
  >(undefined);
  const [filterOutlet, setFilterOutlet] = useState<SelectOption[] | undefined>(
    undefined
  );
  const [filterSearch, setfilterSearch] = useState<string>("");
  const txtColor = useTextPrimaryColor();

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
      {/* <Tabs
        overflowY={"auto"}
        className="tabs"
        variant="unstyled"
        colorScheme="green"
        size={"sm"}
        display={"flex"}
        flexDir={"column"}
      >
        <TabList px={4} pb={2}>
          {tabList.map((item, i) => (
            <Tab
              key={item.key}
              // color={txtColor}
              _selected={{
                color: txtColor,
                bg: "#38B2AC40",
                borderRadius: "md",
                opacity: 1,
              }}
            >
              <Text fontSize={[12, null, 14]} variant={"secondary"}>
                {item.name}
              </Text>
            </Tab>
          ))}
        </TabList>

        <TabPanels className="scrollY" overflowY={"auto"}>
          <TabPanel overflowY={"auto"}>
            <Text>manual transaction</Text>
          </TabPanel>
          <TabPanel overflowY={"auto"}>
            <ProductCard
              filterOutlet={filterOutlet}
              filterSearch={filterSearch}
            />
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </VStack>
  );
};

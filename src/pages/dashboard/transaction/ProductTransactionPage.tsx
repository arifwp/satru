import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ProductCard } from "../../../components/card/ProductCard";
import { useTextPrimaryColor } from "../../../constant/colors";
import { ProductInterface } from "../../../constant/Product";
import { SelectOption } from "../../../constant/SelectOption";

const tabList = [
  { _id: 1, name: "Manual", key: "manual" },
  { _id: 2, name: "Product", key: "product" },
];

export const ProductTransactionPage = () => {
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
      className="product-container"
      // w={"100%"}
      // h={"100vh"}
      align={"stretch"}
    >
      <Tabs variant="unstyled" colorScheme="green" size={"sm"}>
        <TabList px={4}>
          {tabList.map((item, i) => (
            <Tab
              key={item.key}
              color={"#ffffff60"}
              _selected={{
                color: txtColor,
                bg: "#38B2AC40",
                borderRadius: "md",
              }}
            >
              {item.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductCard
              filterCategory={filterCategory}
              filterOutlet={filterOutlet}
              filterSearch={filterSearch}
            />
          </TabPanel>
          <TabPanel>
            <Box w={"100%"}>
              <p>two!</p>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

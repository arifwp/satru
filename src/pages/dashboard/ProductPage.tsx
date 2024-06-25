import {
  Link as ChakraLink,
  HStack,
  Heading,
  Image,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { RiAddCircleLine } from "@remixicon/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../../components/CButton";
import { SearchInput } from "../../components/input/SearchInput";
import { CategoryPickerModal } from "../../components/modal/CategoryPickerModal";
import { SortPickerModal } from "../../components/modal/SortPickerModal";
import { TableProduct } from "../../components/table/TableProduct";
import { product } from "../../data/product";

export const ProductPage = () => {
  return (
    <VStack className="product-container" w={"100%"} p={4}>
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
          <SearchInput placeholder="Cari nama..." />
        </HStack>

        <CategoryPickerModal />

        <SortPickerModal />

        <ChakraLink as={ReactRouterLink} to={"/product/add-product"}>
          <CButton
            variant={"outline"}
            colorScheme="teal"
            icon={RiAddCircleLine}
          >
            Tambah Produk
          </CButton>
        </ChakraLink>
      </Stack>

      {product.length === 0 ? (
        <VStack>
          <Image
            src="/assets/svg/illustration_empty.svg"
            mt={8}
            w={"100%"}
            maxW={"200px"}
          />

          <Heading as={"h6"}>Tidak ada Produk</Heading>
        </VStack>
      ) : (
        <TableProduct mt={4} />
      )}
    </VStack>
  );
};

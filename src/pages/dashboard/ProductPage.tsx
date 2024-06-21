import {
  Button,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { RiAddCircleFill, RiSearch2Line } from "@remixicon/react";
import { TableProduct } from "../../components/table/TableProduct";
import { product } from "../../data/product";

export const ProductPage = () => {
  return (
    <VStack className="product-container" w={"100%"} p={4}>
      <Stack
        direction={["column", "row"]}
        alignSelf={{ sm: "stretch", md: "start" }}
      >
        <InputGroup
          size={{ base: "sm", sm: "sm", md: "md" }}
          borderRadius={"md"}
        >
          <InputLeftElement pointerEvents="none">
            <Icon as={RiSearch2Line} />
          </InputLeftElement>
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>

        <Select
          size={{ base: "sm", sm: "sm", md: "md" }}
          borderRadius={"md"}
          placeholder="Kategori"
          fontSize={{
            base: "12px",
            sm: "14px",
            md: "14px",
            lg: "14px",
            xl: "16px",
          }}
        >
          <option value="name">Nama</option>
          <option value="smallestStock">Stok Terkecil</option>
          <option value="biggestStock">Stok Terbesar</option>
        </Select>

        <Select
          size={{ base: "sm", sm: "sm", md: "md" }}
          borderRadius={"md"}
          placeholder="Urutkan berdasarkan"
          fontSize={{
            base: "12px",
            sm: "14px",
            md: "14px",
            lg: "14px",
            xl: "16px",
          }}
        >
          <option value="name">Nama</option>
          <option value="smallestStock">Stok Terkecil</option>
          <option value="biggestStock">Stok Terbesar</option>
          <option value="Terbaru">Terbaru</option>
          <option value="Terlama">Terlama</option>
        </Select>

        <Button
          w={"100%"}
          p={4}
          borderRadius={"md"}
          size={{ base: "sm", sm: "sm", md: "md" }}
          variant={"solid"}
          colorScheme="teal"
          leftIcon={<Icon as={RiAddCircleFill} />}
        >
          Tambah Produk
        </Button>
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

import {
  AspectRatio,
  Box,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TableSkeleton } from "../TableSkeleton";
import { ProductInterface } from "../../../constant/Product";

const product: Array<ProductInterface> = [
  {
    id: 1,
    productCode: "STR-001",
    img: "https://placehold.co/600x400",
    name: "Macbook jaya selamanya",
    price: 12000000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "1",
      name: "Apple",
    },
    stock: 12,
    haveVariant: false,
    variantItem: undefined,
  },
  {
    id: 2,
    productCode: "STR-002",
    img: "https://placehold.co/600x400",
    name: "Lenovo Gila",
    price: 9000000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "2",
      name: "Lenovo",
    },
    stock: 8,
    haveVariant: true,
    variantItem: [
      {
        variantId: 1,
        variantName: "Lenovo LOQ",
        variantPrice: 18000000,
        variantStock: 12,
      },
      {
        variantId: 2,
        variantName: "Lenovo Dell",
        variantPrice: 12000000,
        variantStock: 9,
      },
    ],
  },
  {
    id: 3,
    productCode: "STR-003",
    img: "https://placehold.co/600x400",
    name: "Asus Pro Art Jelek",
    price: 12000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "3",
      name: "Asus",
    },
    stock: 3,
    haveVariant: true,
    variantItem: [
      {
        variantId: 4,
        variantName: "Asus ROG Strix G16",
        variantPrice: 5000000,
        variantStock: 4,
      },
      {
        variantId: 1,
        variantName: "Asus Zephyrus G14",
        variantPrice: 3000000,
        variantStock: 19,
      },
    ],
  },
  {
    id: 4,
    productCode: "STR-004",
    img: "https://placehold.co/600x400",
    name: "MSI Gaming",
    price: 14500000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "4",
      name: "MSI",
    },
    stock: 5,
    haveVariant: true,
    variantItem: [
      {
        variantId: 10,
        variantName: "MSI Stealth",
        variantPrice: 12000500,
        variantStock: 12,
      },
      {
        variantId: 20,
        variantName: "MSI Modern 14",
        variantPrice: 7000000,
        variantStock: 9,
      },
    ],
  },
];

export const TableProduct = ({ ...rest }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<ProductInterface[] | undefined>(undefined);

  const columnHeader = [
    { id: "foto", name: "Foto" },
    { id: "name", name: "Nama Produk" },
    { id: "category", name: "Kategori" },
    { id: "brand", name: "Merk" },
    { id: "stock", name: "Stock" },
  ];

  useEffect(() => {
    setData(product);
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  if (!loaded) {
    return <TableSkeleton row={5} column={10} />;
  }

  return (
    <TableContainer
      className="table-container"
      w={"100%"}
      fontSize={{
        base: "10px",
        sm: "12px",
        md: "12px",
        lg: "12px",
        xl: "14px",
      }}
      {...rest}
    >
      <Box borderWidth={"1px"} borderRadius={"md"} overflow={"hidden"}>
        <Table variant={"primary"}>
          <TableCaption fontSize={"xs"}>Tabel Produk</TableCaption>
          <Thead borderWidth={"1px"}>
            <Tr>
              {columnHeader.map((item, i) => (
                <Th key={item.id}>{item.name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((item, i) => (
                <Tr key={item.id}>
                  <Td whiteSpace={"wrap"} w={"150px"}>
                    <AspectRatio maxW={"150px"} minW={"75px"} ratio={4 / 3}>
                      <Image src={item.img} objectFit={"contain"} />
                    </AspectRatio>
                  </Td>
                  <Td whiteSpace={"wrap"} w={"250px"}>
                    {item.name}
                  </Td>
                  <Td whiteSpace={"wrap"} w={"200px"}>
                    {item.category.name}
                  </Td>
                  <Td whiteSpace={"wrap"} w={"200px"}>
                    {item.brand.name}
                  </Td>
                  <Td whiteSpace={"wrap"} w={"50px"}>
                    {item.stock}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

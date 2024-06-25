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
import { product } from "../../data/product";
import { useEffect, useState } from "react";
import { TableSkeleton } from "./TableSkeleton";

export const TableProduct = ({ ...rest }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const columnHeader = [
    { key: "foto", label: "Foto" },
    { key: "name", label: "Nama Produk" },
    { key: "category", label: "Kategori" },
    { key: "brand", label: "Merk" },
    { key: "stock", label: "Stock" },
  ];

  useEffect(() => {
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
          <TableCaption>Tabel Produk</TableCaption>
          <Thead borderWidth={"1px"}>
            <Tr>
              {columnHeader.map((item, i) => (
                <Th key={i}>{item.label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {product.map((item, i) => (
              <Tr key={i}>
                <Td>
                  <AspectRatio maxW={"100px"} ratio={4 / 3}>
                    <Image src={item.img} objectFit={"cover"} />
                  </AspectRatio>
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.category.name}</Td>
                <Td>{item.brand.name}</Td>
                <Td>{item.stock}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

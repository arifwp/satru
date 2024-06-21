import {
  AspectRatio,
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

export const TableProduct = ({ ...rest }) => {
  return (
    <TableContainer className="table-container" w={"100%"} {...rest}>
      <Table variant={"unstyled"} borderWidth={"1px"}>
        <TableCaption>Tabel Produk</TableCaption>
        <Thead borderWidth={"1px"}>
          <Tr>
            <Th borderWidth={"1px"}>Foto</Th>
            <Th borderWidth={"1px"}>Nama Produk</Th>
            <Th borderWidth={"1px"}>Kategori</Th>
            <Th borderWidth={"1px"}>Merk</Th>
            <Th borderWidth={"1px"}>Stok</Th>
          </Tr>
        </Thead>
        <Tbody>
          {product.map((item, i) => (
            <Tr borderWidth={"1px"}>
              <Td borderWidth={"1px"}>
                <AspectRatio maxW={"180px"} ratio={4 / 3}>
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
    </TableContainer>
  );
};

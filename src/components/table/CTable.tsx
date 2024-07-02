import {
  Box,
  HStack,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";

export const CTable = ({
  columnHeader,
  data,
  sortedColumn,
  sortOrder,
  ...rest
}: any) => {
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
      overflowX={"auto"}
      overflowY={"hidden"}
      {...rest}
    >
      <Box
        className="box-table scrollX"
        borderWidth={"1px"}
        borderRadius={"md"}
        overflowX={"auto"}
        overflowY={"hidden"}
      >
        <Table variant={"primary"}>
          <Thead borderWidth={"1px"}>
            <Tr>
              {columnHeader.map((item: any, i: any) => (
                <Th
                  cursor={item.sortable ? "pointer" : "default"}
                  key={item.id}
                  onClick={item.onClick}
                >
                  <HStack w={"100%"}>
                    <Text>{item.name}</Text>
                    {item.sortable &&
                      (sortedColumn === item.id ? (
                        sortOrder === "asc" ? (
                          <Icon as={RiArrowUpLine} />
                        ) : (
                          <Icon as={RiArrowDownLine} />
                        )
                      ) : (
                        <Icon as={RiArrowDownLine} />
                      ))}
                  </HStack>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item: any, i: any) => (
              <Tr key={i}>
                {item.map((val: any, i: any) => (
                  <Td key={val.id} {...item.props}>
                    {val.name}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

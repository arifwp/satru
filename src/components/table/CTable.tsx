import {
  Box,
  Button,
  HStack,
  Icon,
  Select,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import React from "react";
import { useBgComponentBaseColor } from "../../constant/colors";

interface Props extends TableContainerProps {
  columnHeader: any;
  data: any;
  sortedColumn: any;
  sortOrder: any;
  totalItems?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

const rowOptions = [
  { id: 1, name: 10 },
  { id: 2, name: 20 },
  { id: 3, name: 50 },
  { id: 4, name: 100 },
];

export const CTable = ({
  columnHeader,
  data,
  sortedColumn,
  sortOrder,
  totalItems,
  totalPages,
  onPageChange,
  onLimitChange,
  ...rest
}: Props) => {
  const bgComp = useBgComponentBaseColor();
  const pagesArr = Array.from({ length: totalPages as any }, (_, i) => i + 1);

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    (onLimitChange as any)(parseInt(value));
  };

  return (
    <VStack w={"100%"} mb={4}>
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
        display={"flex"}
        overflowX={"auto"}
        overflowY={"hidden"}
        borderWidth={"1px"}
        borderRadius={"md"}
        {...rest}
      >
        <Box
          className="box-table scrollX"
          w={"100%"}
          display={"flex"}
          overflowX={"auto"}
          overflowY={"hidden"}
        >
          <Table variant={"primary"}>
            <Thead borderBottomWidth={"1px"} bg={bgComp}>
              <Tr>
                {columnHeader.map((item: any, i: any) => (
                  <Th
                    cursor={item.sortable ? "pointer" : "default"}
                    key={item.id}
                    onClick={item.onClick}
                  >
                    <HStack {...item.props}>
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
                    <Td key={val.id} {...val.props}>
                      {val.name}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>

      <HStack w={"100%"} mt={4} justify={"space-between"}>
        <HStack>
          <Select
            w={"fit-content"}
            onChange={handleSelect}
            isDisabled={(totalItems as any) > rowOptions[0].name ? false : true}
          >
            {rowOptions[0].name < (totalItems as any) ? (
              rowOptions.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value={totalItems}>{totalItems}</option>
            )}
          </Select>

          <Text>{`dari ${totalItems}`}</Text>
        </HStack>

        <HStack>
          {pagesArr.map((page: any, i: any) => (
            <Button
              key={i}
              size={"sm"}
              colorScheme="teal"
              borderRadius={"md"}
              variant={"outline"}
              onClick={() => (onPageChange as any)(page)}
            >
              {page}
            </Button>
          ))}
        </HStack>
      </HStack>
    </VStack>
  );
};

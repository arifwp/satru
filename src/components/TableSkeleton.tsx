import { HStack, Skeleton, StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  row: number;
  column: number;
}

export const TableSkeleton = ({ row, column, ...rest }: Props) => {
  const value = "x";
  const rowLength = row;
  const columnLength = column;
  const rowArr = Array(rowLength).fill(value);
  const columnArr = Array(columnLength).fill(value);

  return (
    <VStack w={"100%"} py={4} {...rest}>
      {columnArr.map((item, indexColumn) => (
        <HStack key={indexColumn} w={"100%"} h={"25px"}>
          {rowArr.map((item, indexRow) => (
            <Skeleton key={indexRow} w={"100%"} h={"25px"} />
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from "@chakra-ui/react";

interface Props {
  row: number;
  column: number;
}

export const TableSkeleton = ({ row, column }: Props) => {
  const value = "x";
  const rowLength = row;
  const columnLength = column;
  const rowArr = Array(rowLength).fill(value);
  const columnArr = Array(columnLength).fill(value);

  return (
    <VStack w={"100%"} py={4}>
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

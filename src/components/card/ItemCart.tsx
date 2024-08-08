import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useBorderColorInput } from "../../constant/colors";

export const ItemCart = () => {
  const borderColor = useBorderColorInput();

  return (
    <VStack
      w={"100%"}
      p={2}
      borderBottomWidth={"1px"}
      borderBottomColor={borderColor}
    >
      <Text
        fontSize={[12, null, 14]}
        noOfLines={1}
        textOverflow={"ellipsis"}
        fontWeight={600}
      >
        {/* Lorem Ipsum is */}
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries
      </Text>

      {/* <HStack justify={"space-between"}>
        <HStack borderWidth={"1px"} borderColor={borderColor}>
          <HStack
            py={0.5}
            px={2}
            borderRightWidth={"1px"}
            borderColor={borderColor}
          >
            <Text fontSize={[12, null, 14]} variant={"secondary"}>
              -
            </Text>
          </HStack>
          <HStack>
            <Text fontSize={[12, null, 14]} variant={"secondary"}>
              12
            </Text>
          </HStack>
          <HStack
            py={0.5}
            px={2}
            borderLeftWidth={"1px"}
            borderColor={borderColor}
          >
            <Text fontSize={[12, null, 14]} variant={"secondary"}>
              +
            </Text>
          </HStack>
        </HStack>

        <Text fontSize={[12, null, 14]} fontWeight={600} variant={"secondary"}>
          24.000
        </Text>
      </HStack> */}
    </VStack>
  );
};

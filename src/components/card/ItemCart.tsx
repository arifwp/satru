import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useBorderColorInput } from "../../constant/colors";

export const ItemCart = () => {
  const borderColor = useBorderColorInput();

  return (
    <HStack p={2} borderWidth={"1px"} borderColor={borderColor}>
      <Image
        src="https://placehold.co/600x400"
        objectFit={"cover"}
        w={"100%"}
        maxW={"72px"}
      />
      <VStack align={"stretch"}>
        <Text
          fontSize={[12, null, 14]}
          noOfLines={1}
          textOverflow={"ellipsis"}
          fontWeight={600}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>

        <HStack justify={"space-between"}>
          <HStack>
            <Text fontSize={[12, null, 14]} fontWeight={600} opacity={0.5}>
              12.000
            </Text>

            <Text fontSize={[12, null, 14]} fontWeight={600} opacity={0.5}>
              2x
            </Text>
          </HStack>

          <Text fontSize={[12, null, 14]} fontWeight={600} opacity={0.5}>
            24.000
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

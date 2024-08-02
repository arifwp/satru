import { Image, Text, VStack } from "@chakra-ui/react";
import { useBgComponentBaseColor } from "../../constant/colors";
import formatNumber from "../../lib/formatNumber";

export const ProductCard = () => {
  const bgComp = useBgComponentBaseColor();

  return (
    <VStack
      className="product-card"
      w={"140px"}
      borderRadius={"md"}
      bg={bgComp}
      textAlign={"center"}
      p={2}
      cursor={"pointer"}
      overflow={"hidden"}
    >
      <Image
        src="https://placehold.co/200x900"
        borderRadius={"md"}
        overflow={"clip"}
        objectFit={"cover"}
        w={"120px"}
        h={"120px"}
      />

      <Text fontSize={[14, null, 16]} fontWeight={700} mt={2}>
        Lorem ipsum dolor sit amet
      </Text>
      <Text fontSize={[14, null, 16]} color={"teal.400"} mb={1}>
        Rp {formatNumber("12340")}
      </Text>
    </VStack>
  );
};

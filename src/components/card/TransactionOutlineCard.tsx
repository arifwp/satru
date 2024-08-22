import { HStack, StackProps, Text, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  title: string;
  subTitle: string;
  rightText?: string;
}

export const TransactionOutlineCard = ({
  title,
  subTitle,
  rightText,
  ...rest
}: Props) => {
  return (
    <HStack
      w={"100%"}
      px={4}
      py={2}
      textAlign={"start"}
      borderWidth={"1px"}
      borderRadius={"md"}
      fontSize={[12, null, 14]}
      align={"stretch"}
      justify={"space-between"}
      {...rest}
    >
      <VStack align={"stretch"}>
        <Text fontSize={[14, null, 16]} fontWeight={"semibold"}>
          {title}
        </Text>
        <Text variant={"secondary"} fontSize={[12, null, 14]}>
          {subTitle}
        </Text>
      </VStack>

      {rightText && (
        <Text alignSelf={"center"} fontSize={[14, null, 16]}>
          {rightText}
        </Text>
      )}
    </HStack>
  );
};

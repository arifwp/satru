import { Image, StackProps, Text, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  title: string;
  subTitle?: string;
}

export const Empty = ({ title, subTitle, ...rest }: Props) => {
  return (
    <VStack className="empty-container" {...rest}>
      <Image src="/assets/svg/illustration_empty.svg" />
      <Text fontWeight={"semibold"}>{title}</Text>
      <Text variant={"secondary"}>{subTitle}</Text>
    </VStack>
  );
};

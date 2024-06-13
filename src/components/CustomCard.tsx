import { HStack, Icon, StackProps, Text, VStack } from "@chakra-ui/react";
import {
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleLine,
} from "@remixicon/react";

interface Props extends StackProps {
  label: string;
  cardValue: string;
}

export const CustomCard = ({ label, cardValue, ...rest }: Props) => {
  return (
    <HStack
      className="card"
      bgColor={"teal.400"}
      p={4}
      borderRadius={"md"}
      align={"stretch"}
      spacing={4}
      {...rest}
    >
      <Icon
        as={RiMoneyDollarCircleLine}
        bgColor={"white"}
        borderRadius={"sm"}
        fontSize={"36px"}
      />
      <VStack align={"start"}>
        <Text fontSize={"12px"}>{label}</Text>
        <Text fontWeight={"semibold"} fontSize={"20px"}>
          {`Rp ${cardValue}`}
        </Text>
      </VStack>
    </HStack>
  );
};

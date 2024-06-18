import {
  Icon,
  IconProps,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import useScreenWidth from "../lib/useScreenWidth";

interface Props extends StackProps {
  label: string;
  cardValue: string;
}
interface ICProps extends IconProps {
  bgIc: string;
  asIc: RemixiconComponentType;
}

export const CustomCard = ({
  label,
  cardValue,
  bgIc,
  asIc,
  ...rest
}: Props & ICProps) => {
  const sw = useScreenWidth();

  return (
    <Stack
      className="card"
      direction={sw >= 640 ? "row" : "column"}
      p={4}
      borderRadius={"md"}
      align={"stretch"}
      spacing={4}
      color={"black"}
      {...rest}
    >
      <Icon
        bgColor={bgIc}
        as={asIc}
        borderRadius={"lg"}
        fontSize={"36px"}
        p={2}
        alignSelf={sw >= 640 ? "" : "center"}
      />

      <VStack
        align={sw >= 640 ? "start" : "center"}
        justify={"space-between"}
        textAlign={sw >= 640 ? "start" : "center"}
      >
        <Text fontSize={["sm", "md", "lg", "xl"]}>{label}</Text>
        <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight={"bold"}>
          {cardValue}
        </Text>
      </VStack>
    </Stack>
  );
};

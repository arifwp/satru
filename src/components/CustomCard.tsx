import {
  Icon,
  IconProps,
  SkeletonText,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import useScreenWidth from "../lib/useScreenWidth";
import { useEffect, useState } from "react";

interface Props extends StackProps {
  label: string;
  value: string;
}
interface ICProps extends IconProps {
  bgIc: string;
  asIc: RemixiconComponentType;
}

export const CustomCard = ({
  label,
  value,
  bgIc,
  asIc,
  ...rest
}: Props & ICProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<string | undefined>(undefined);
  const sw = useScreenWidth();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

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
        textAlign={sw >= 640 ? "start" : "center"}
      >
        <Text
          fontSize={{
            base: "12px",
            sm: "14px",
            md: "14px",
            lg: "14px",
            xl: "16px",
          }}
        >
          {label}
        </Text>
        <SkeletonText
          isLoaded={loaded}
          noOfLines={1}
          height={!loaded ? "20px" : ""}
        >
          <Text
            fontSize={{
              base: "14px",
              sm: "16px",
              md: "16px",
              lg: "16px",
              xl: "18px",
            }}
            fontWeight={"bold"}
          >
            {value}
          </Text>
        </SkeletonText>
      </VStack>
    </Stack>
  );
};

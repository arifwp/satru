import { HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import { useBgBaseColor, useTextPrimaryColor } from "../../constant/colors";
import { PageNavsProps } from "../../constant/pageNavs";
import NavButton from "../navbar/NavButton";

interface Props extends StackProps {
  children: any;
  navs: PageNavsProps[];
}
export const PageContainer = ({ children, navs, ...rest }: Props) => {
  const bgBase = useBgBaseColor();
  const txtColor = useTextPrimaryColor();

  return (
    <VStack
      className="page-container"
      w={"100%"}
      align={"stretch"}
      bg={bgBase}
      {...rest}
    >
      <HStack px={4}>
        {navs.map((item, i) => (
          <NavButton
            end={true}
            key={item.id}
            w={"fit-content"}
            borderRadius={"md"}
            to={item.to}
            _activeLink={{
              bg: "#B2F5EA40",
              color: txtColor,
            }}
            py={1}
            px={2}
          >
            <Text
              className="label-navbar"
              fontSize={[12, null, 14]}
              variant={"secondary"}
            >
              {item.name}
            </Text>
          </NavButton>
        ))}
      </HStack>

      {children}
    </VStack>
  );
};

import { HStack, Text, VStack } from "@chakra-ui/react";
import { PageNavsProps } from "../../constant/pageNavs";
import NavButton from "../navbar/NavButton";

interface Props {
  children: any;
  navs: PageNavsProps[];
}
export const PageContainer = ({ children, navs, ...rest }: Props) => {
  return (
    <VStack className="page-container" w={"100%"} align={"stretch"}>
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
              color: "teal.300",
            }}
          >
            <Text
              className="label-navbar"
              fontSize={"sm"}
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

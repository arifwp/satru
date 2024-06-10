import {
  HStack,
  Icon,
  Image,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiHome3Fill } from "@remixicon/react";
import NavButton from "../../components/NavButton";
import { navs } from "../../data/nav";

interface Props extends StackProps {
  children?: any;
}

export const AdminContainer = ({ children, ...props }: Props) => {
  return (
    <HStack h={"100%"} minH={"100vh"} {...props} spacing={0}>
      <VStack
        className="drawer"
        h={"100vh"}
        p={4}
        align={"start"}
        bgColor={"#191919"}
        spacing={6}
        zIndex={99}
        position={"fixed"}
      >
        <HStack className="drawer-header" color={"white"} align={"center"}>
          <Image src="https://placehold.co/600x400" maxW={"40px"} />
          <Text className="heading-navbar">SATRU</Text>
        </HStack>

        {navs.map((item, i) => (
          <NavButton to="/home" key={i}>
            <Icon as={RiHome3Fill} fontSize={"24px"} />
            <Text className="label-navbar">{item.name}</Text>
          </NavButton>
        ))}
      </VStack>

      {children}
    </HStack>
  );
};

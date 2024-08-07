import {
  HStack,
  Icon,
  Image,
  StackProps,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { RiUser2Line } from "@remixicon/react";
import { useRef } from "react";
import { useBgComponentBaseColor } from "../../constant/colors";
import { navs } from "../../constant/navs";
import { getDataUser } from "../../utils/helperFunction";
import NavButton from "../navbar/NavButton";

interface Props extends StackProps {
  children?: any;
}

const fadeText = keyframes`  
  0% {
        opacity: 0;
    }

    1% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const AdminContainer = ({ children, ...props }: Props) => {
  const ref = useRef<any>(null);
  const bgComp = useBgComponentBaseColor();

  let navigations = [...navs];

  if (getDataUser().owner) {
    navigations.push({
      id: 9,
      icon: RiUser2Line,
      label: "Karyawan",
      to: "/employee",
    });
  }

  return (
    <HStack
      className="admin-container"
      w={"100%"}
      h={"100%"}
      minH={"100vh"}
      spacing={0}
      align={"start"}
      {...props}
    >
      <VStack
        className="navbar"
        bg={bgComp}
        ref={ref}
        h={"100vh"}
        p={4}
        w={"72px"}
        transition={"200ms"}
        _hover={{ width: "170px" }}
        spacing={6}
        zIndex={99}
        position={"fixed"}
        role="group"
      >
        <HStack className="navbar-header" alignSelf={"start"} w={"100%"}>
          <Image
            src="https://placehold.co/600x400"
            maxW={"40px"}
            borderRadius={"md"}
          />
          <Text
            as={"b"}
            className="heading-navbar"
            display={"none"}
            opacity={0}
            animation={`${fadeText} 200ms linear`}
            _groupHover={{ display: "block", opacity: 1 }}
          >
            SATRU
          </Text>
        </HStack>

        <VStack w={"100%"}>
          {navigations.map((item, index) => (
            <NavButton to={item.to} key={index}>
              <HStack whiteSpace={"nowrap"}>
                <Icon
                  as={item.icon}
                  w={"100%"}
                  maxW={"24px"}
                  fontSize={"18px"}
                />

                <Text
                  className="label-navbar"
                  fontSize={"10px"}
                  fontWeight={"semibold"}
                  display={"none"}
                  opacity={0}
                  animation={`${fadeText} 200ms linear`}
                  _groupHover={{ display: "block", opacity: 1 }}
                >
                  {item.label}
                </Text>
              </HStack>
            </NavButton>
          ))}
        </VStack>
      </VStack>

      {children}
    </HStack>
  );
};

import {
  HStack,
  Icon,
  Image,
  Stack,
  StackProps,
  Text,
  VStack,
  keyframes,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { NavbarList } from "../../components/NavbarList";
import useScreenWidth from "../../lib/useScreenWidth";
import { navs } from "../../data/navs";
import NavButton from "../NavButton";

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
  const bg = useColorModeValue("white", "black");
  const sw: any = useScreenWidth();

  return (
    // <HStack w={"100%"} h={"100%"} minH={"100vh"} {...props} spacing={0}>
    //   <VStack
    //     ref={ref}
    //     className="drawer"
    //     h={"100vh"}
    //     p={4}
    //     w={"72px"}
    //     transition={"200ms"}
    //     _hover={{ width: "170px" }}
    //     // bgColor={bg}
    //     bgColor={"purple.200"}
    //     spacing={6}
    //     zIndex={99}
    //     position={"fixed"}
    //     role="group"
    //   >
    //     <HStack className="drawer-header" alignSelf={"start"} w={"100%"}>
    //       <Image
    //         src="https://placehold.co/600x400"
    //         maxW={"40px"}
    //         borderRadius={"md"}
    //       />
    //       <Text
    //         as={"b"}
    //         className="heading-navbar"
    //         display={"none"}
    //         opacity={0}
    //         animation={`${fadeText} 200ms linear`}
    //         _groupHover={{ display: "block", opacity: 1 }}
    //       >
    //         SATRU
    //       </Text>
    //     </HStack>

    //     {/* <NavbarList /> */}
    //   </VStack>

    //   {children}
    // </HStack>

    <HStack
      className="root-container"
      w={"100%"}
      h={"100%"}
      minH={"100vh"}
      flexDirection={"column-reverse"}
      {...props}
      spacing={0}
      align={"start"}
    >
      <VStack
        className="navbar-container"
        // direction={"column-reverse"}
        ref={ref}
        h={sw >= 640 ? "100vh" : ""}
        p={4}
        w={sw >= 640 ? "72px" : "100%"}
        transition={"200ms"}
        _hover={{ width: sw >= 640 ? "170px" : "100%" }}
        bgColor={bg}
        // bgColor={"purple.200"}
        boxShadow={"dark-lg"}
        spacing={6}
        zIndex={99}
        position={"fixed"}
        role="group"
      >
        {sw >= 640 && (
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
        )}

        <Stack direction={sw >= 640 ? "column" : "row"} w={"100%"}>
          {navs
            .filter((item, i) => i < 5)
            .map((item, index) => (
              <NavButton to={item.to} key={index}>
                <HStack justify={sw >= 640 ? "start" : "center"}>
                  <Icon as={item.icon} maxW={"24px"} fontSize={"18px"} />

                  <Text
                    className="label-navbar"
                    fontSize={"10px"}
                    fontWeight={"semibold"}
                    display={"none"}
                    opacity={0}
                    animation={sw >= 640 ? `${fadeText} 200ms linear` : "none"}
                    _groupHover={{
                      display: sw >= 640 ? "block" : "none",
                      opacity: sw >= 640 ? 1 : 0,
                    }}
                  >
                    {item.label}
                  </Text>
                </HStack>
              </NavButton>
            ))}
          {/* {navs.map((item, i) => (
            
          ))} */}
        </Stack>

        {/* <NavbarList /> */}
      </VStack>

      {children}
    </HStack>
  );
};

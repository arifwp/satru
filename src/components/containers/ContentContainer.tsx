import {
  Avatar,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  StackProps,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiArrowDownSFill, RiFilter3Fill } from "@remixicon/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import useScreenWidth from "../../lib/useScreenWidth";
import { AdminContainer } from "./AdminContainer";
import { MenuHeader } from "../menu/MenuHeader";
import { MenuHeaderShrink } from "../menu/MenuHeaderShrink";

interface Props extends StackProps {
  children?: any;
  label: string;
}

export const ContentContainer = ({ children, label }: Props) => {
  const bgComponent = useColorModeValue("gray.100", "gray.800");
  const sw = useScreenWidth();

  return (
    <AdminContainer>
      <VStack
        className="content-container"
        ml={"auto"}
        w={"100%"}
        maxW={"calc(100% - 72px)"}
        h={"100vh"}
        spacing={0}
        justify={"start"}
      >
        {sw >= 500 ? (
          <MenuHeader label={label} />
        ) : (
          <MenuHeaderShrink label={label} />
        )}

        {/* <HStack
          className="header"
          p={3}
          align={"center"}
          w={"100%"}
          h={"72px"}
          justify={"space-between"}
        >
          <VStack>
            <Text as={"b"} fontSize={"18px"}>
              {label}
            </Text>
          </VStack>

          <HStack>
            {label === "Dashboard" && (
              <Button
                size={"xs"}
                py={5}
                px={7}
                bg={bgComponent}
                rightIcon={<Icon as={RiFilter3Fill} />}
              >
                Filter
              </Button>
            )}

            <ColorModeSwitcher bg={bgComponent} />

            <Menu>
              <MenuButton
                as={Button}
                bgColor={bgComponent}
                p={4}
                rightIcon={<Icon as={RiArrowDownSFill} />}
              >
                <Avatar size="xs" name="Arif Wahyu" src="" />
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem>Sign Out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </HStack>
        </HStack> */}

        {children}
      </VStack>
    </AdminContainer>
  );
};

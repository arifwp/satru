import {
  Avatar,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  StackProps,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  RiAccountCircleFill,
  RiArrowDownSFill,
  RiFilter3Fill,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

interface Props extends StackProps {
  children?: any;
  label: string;
}

export const MenuHeader = ({ children, label }: Props) => {
  const bgComponent = useColorModeValue("gray.100", "gray.800");

  return (
    <HStack
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
            <MenuItem icon={<Icon as={RiAccountCircleFill} />}>Profil</MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon as={RiLogoutBoxLine} color={"red.400"} />}>
              <Text color={"red.400"}>Sign Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

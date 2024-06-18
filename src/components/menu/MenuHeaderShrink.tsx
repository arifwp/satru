import {
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  StackProps,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  RiAccountCircleFill,
  RiFilter3Fill,
  RiLogoutBoxLine,
  RiMenuFill,
  RiMoonLine,
  RiStoreFill,
  RiSunLine,
} from "@remixicon/react";

interface Props extends StackProps {
  children?: any;
  label: string;
}

export const MenuHeaderShrink = ({ children, label }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      className="header"
      alignItems={"center"}
      justify={"space-between"}
      p={3}
      align={"end"}
      w={"100%"}
      h={"72px"}
    >
      <Text as={"b"} fontSize={"18px"}>
        {label}
      </Text>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon as={RiMenuFill} />}
          variant="outline"
        />
        <MenuList>
          {label === "Dashboard" && (
            <>
              <MenuItem icon={<Icon as={RiFilter3Fill} />}>Filter</MenuItem>
              <MenuItem icon={<Icon as={RiStoreFill} />}>Outlet</MenuItem>
            </>
          )}

          <MenuItem
            icon={<Icon as={colorMode === "light" ? RiMoonLine : RiSunLine} />}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </MenuItem>
          <MenuItem icon={<Icon as={RiAccountCircleFill} />}>Profil</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon as={RiLogoutBoxLine} color={"red.400"} />}>
            <Text color={"red.400"}>Sign Out</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

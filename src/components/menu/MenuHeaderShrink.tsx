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
  RiArrowLeftSLine,
  RiLogoutBoxLine,
  RiMenuFill,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";

interface Props extends StackProps {
  children?: any;
  label: string;
  isSubPage: boolean;
}

export const MenuHeaderShrink = ({ children, label, isSubPage }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <HStack
      className="header"
      alignItems={"center"}
      justify={"space-between"}
      p={3}
      align={"end"}
      w={"100%"}
      h={"72px"}
      fontSize={"sm"}
    >
      <HStack>
        {isSubPage && (
          <IconButton
            size="xs"
            variant="ghost"
            color="current"
            onClick={handleBack}
            icon={<Icon as={RiArrowLeftSLine} />}
            fontSize={"2xl"}
            aria-label={`Back to previous page`}
            mr={1}
          />
        )}

        <Text as={"b"} fontSize={"18px"}>
          {label}
        </Text>
      </HStack>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon as={RiMenuFill} />}
          variant="outline"
        />
        <MenuList>
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

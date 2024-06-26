import {
  Avatar,
  Button,
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
  useColorModeValue,
} from "@chakra-ui/react";
import {
  RiAccountCircleFill,
  RiArrowDownSFill,
  RiArrowLeftSLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { useState } from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

interface Props extends StackProps {
  children?: any;
  label: string;
  isSubPage: boolean;
}

export const MenuHeader = ({ children, label, isSubPage }: Props) => {
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const bgComponent = useColorModeValue("#F8F9FA", "#1C1C1E");

  const handleBack = () => {
    window.history.back();
  };

  return (
    <HStack
      className="header"
      p={3}
      align={"center"}
      w={"100%"}
      h={"72px"}
      justify={"space-between"}
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

      <HStack>
        <ColorModeSwitcher bg={bgComponent} />

        <Menu>
          <MenuButton
            as={Button}
            bg={bgComponent}
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

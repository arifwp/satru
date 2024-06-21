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
  RiLogoutBoxLine,
} from "@remixicon/react";
import { useState } from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { DashboardMenu } from "./DashboardMenu";

interface Props extends StackProps {
  children?: any;
  label: string;
}

export const MenuHeader = ({ children, label }: Props) => {
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const bgComponent = useColorModeValue("#F8F9FA", "#1C1C1E");

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
        {label === "Dashboard" && <DashboardMenu />}

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

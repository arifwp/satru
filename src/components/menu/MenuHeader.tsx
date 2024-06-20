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
  ModalProps,
  StackProps,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useRadioGroup,
  useToast,
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

// interface MProps extends ModalProps {
//   dateModalIsOpen: boolean;
//   dateModalOnOpen: () => void;
//   dateModalOnClose: () => void;
//   outletModalIsOpen: boolean;
//   outletModal
// }

export const MenuHeader = ({ children, label }: Props) => {
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const {
    isOpen: outletModalIsOpen,
    onOpen: outletModalOnOpen,
    onClose: outletModalOnClose,
  } = useDisclosure();

  const {
    isOpen: dateModalIsOpen,
    onOpen: dateModalOnOpen,
    onClose: dateModalOnClose,
  } = useDisclosure();

  const bgComponent = useColorModeValue("gray.100", "#161618");
  const toast = useToast();

  const avatars = [
    { id: "OUTLET-1", name: "Pusat" },
    { id: "OUTLET-2", name: "Cabang Margonda" },
    { id: "OUTLET-3", name: "Cabang Semarang" },
    { id: "OUTLET-4", name: "Cabang Solo" },
  ];

  const handleChange = (value: any) => {
    toast({
      id: value,
      title: `The value got changed to ${value}`,
      status: "success",
      duration: 2000,
    });
  };

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: "Pusat",
    onChange: handleChange,
  });

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

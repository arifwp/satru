import {
  Button,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  ModalBody,
  StackProps,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiAccountCircleFill,
  RiCalendar2Fill,
  RiLogoutBoxLine,
  RiMenuFill,
  RiMoonLine,
  RiShoppingBag4Line,
  RiSunLine,
} from "@remixicon/react";
import { OutletPicker } from "../OutletPicker";
import { RangeDatePicker } from "../RangeDatePicker";
import { CModal } from "../modal/CModal";

interface Props extends StackProps {
  children?: any;
  label: string;
}

export const MenuHeaderShrink = ({ children, label }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
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

  const openFilterModal = () => {
    dateModalOnOpen();
  };

  const openOutletModal = () => {
    outletModalOnOpen();
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
              <MenuItem
                icon={<Icon as={RiCalendar2Fill} />}
                onClick={openFilterModal}
              >
                Filter
              </MenuItem>
              <MenuItem
                icon={<Icon as={RiShoppingBag4Line} />}
                onClick={openOutletModal}
              >
                Outlet
              </MenuItem>
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

      {/* OUTLET MODAL */}
      <CModal
        size="xs"
        modalTitle="Outlet"
        isOpen={outletModalIsOpen}
        onOpen={outletModalOnOpen}
        onClose={outletModalOnClose}
      >
        <ModalBody>
          <OutletPicker
            isOpen={outletModalIsOpen}
            onOpen={outletModalOnOpen}
            onClose={outletModalOnClose}
          >
            <Button onClick={outletModalOnClose}>Close</Button>
          </OutletPicker>
        </ModalBody>
      </CModal>

      {/* FILTER MODAL */}
      <CModal
        size="sm"
        modalTitle="Outlet"
        isOpen={dateModalIsOpen}
        onOpen={dateModalOnOpen}
        onClose={dateModalOnClose}
      >
        <ModalBody>
          <RangeDatePicker
            onOpen={dateModalOnOpen}
            isOpen={dateModalIsOpen}
            onClose={dateModalOnClose}
          >
            <Button p={4} size={"xs"} onClick={dateModalOnClose}>
              Close
            </Button>
          </RangeDatePicker>
        </ModalBody>
      </CModal>
    </HStack>
  );
};

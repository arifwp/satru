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
  RiFilter3Fill,
  RiLogoutBoxLine,
  RiMenuFill,
  RiMoonLine,
  RiStoreFill,
  RiSunLine,
} from "@remixicon/react";
import { CModal } from "../modal/CModal";
import { RangeDatePicker } from "../RangeDatePicker";
import { OutletPicker } from "../OutletPicker";

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
    alert("filter modal");
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
                icon={<Icon as={RiFilter3Fill} />}
                onClick={openFilterModal}
              >
                Filter
              </MenuItem>
              <MenuItem
                icon={<Icon as={RiStoreFill} />}
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
        size="sm"
        modalTitle="Outlet"
        isOpen={outletModalIsOpen}
        onOpen={outletModalOnOpen}
        onClose={outletModalOnClose}
      >
        <OutletPicker
          isOpen={outletModalIsOpen}
          onOpen={outletModalOnOpen}
          onClose={outletModalOnClose}
        >
          <Button onClick={outletModalOnClose}>Close</Button>
        </OutletPicker>
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
          <RangeDatePicker />
        </ModalBody>
      </CModal>
    </HStack>
  );
};

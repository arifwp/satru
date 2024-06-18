import {
  Avatar,
  Button,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  ModalBody,
  ModalFooter,
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
  RiCalendarEventFill,
  RiLogoutBoxLine,
  RiStoreFill,
} from "@remixicon/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { CustomModal } from "../CustomModal";
import { RadioCard } from "./RadioCard";

interface Props extends StackProps {
  children?: any;
  label: string;
}

export const MenuHeader = ({ children, label }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgComponent = useColorModeValue("gray.100", "gray.800");
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
        {label === "Dashboard" && (
          <>
            <Button
              size={"xs"}
              py={5}
              px={7}
              bg={bgComponent}
              leftIcon={<Icon as={RiCalendarEventFill} />}
              onClick={onOpen}
            >
              Filter
            </Button>

            <Button
              size={"xs"}
              py={5}
              px={7}
              bg={bgComponent}
              leftIcon={<Icon as={RiStoreFill} />}
              onClick={onOpen}
            >
              Pusat
            </Button>

            <CustomModal
              title="Filter Tanggal"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalBody>
                <Input size={"md"} type="date" />
              </ModalBody>
              <ModalFooter>
                <Button size={"xs"} p={4} onClick={onClose}>
                  Close
                </Button>
                <Button
                  variant={"primaryButton"}
                  size={"xs"}
                  p={4}
                  ml={4}
                  onClick={onClose}
                >
                  Terapkan
                </Button>
              </ModalFooter>
            </CustomModal>

            <CustomModal title="Outlet" isOpen={isOpen} onClose={onClose}>
              <ModalBody>
                <VStack {...getRootProps()}>
                  {avatars.map((avatar, i) => (
                    <RadioCard
                      key={i}
                      isChecked={true}
                      outletName={avatar.name}
                      {...getRadioProps({ value: avatar.name })}
                    />
                  ))}
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button size={"xs"} p={4} onClick={onClose}>
                  Close
                </Button>
                <Button
                  variant={"primaryButton"}
                  size={"xs"}
                  p={4}
                  ml={4}
                  onClick={onClose}
                >
                  Terapkan
                </Button>
              </ModalFooter>
            </CustomModal>
          </>
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

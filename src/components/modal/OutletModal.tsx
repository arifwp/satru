import {
  Button,
  HStack,
  ModalBody,
  ModalFooter,
  ModalProps,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { RiOutletFill } from "@remixicon/react";
import { useState } from "react";
import { RadioCard } from "../menu/RadioCard";
import { ModalWithButton } from "./ModalWithButton";

interface Props extends ModalProps {
  children: any;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const OutletModal = ({ children, isOpen, onOpen, onClose }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmitOutlet = () => {
    console.log(value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();

      // TODO ADD API
    }, 1000);
  };

  return (
    // <ModalWithButton
    //   id="modal-outlet"
    //   size="md"
    //   modalTitle="Outlet"
    //   buttonTitle="Outlet"
    //   icon={RiOutletFill}
    //   bgColorMode={bgComponent}
    //   onOpen={onOpen}
    //   isOpen={isOpen}
    //   onClose={onClose}
    // >
    <>
      {/* <ModalBody mb={4}> */}
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
      {value === "" && (
        <Text mt={2} color={"red.400"} fontSize={"xs"}>
          Pilih Cabang terlebih dahulu!
        </Text>
      )}
      {/* </ModalBody> */}
      <ModalFooter>
        <HStack>
          <Button size={"sm"} p={4} onClick={onClose}>
            Close
          </Button>
          <Button
            size={"sm"}
            p={4}
            isLoading={loading}
            loadingText="Loading"
            spinnerPlacement="start"
            colorScheme="teal"
            onClick={handleSubmitOutlet}
          >
            Terapkan
          </Button>
        </HStack>
      </ModalFooter>
    </>
    // </ModalWithButton>
  );
};

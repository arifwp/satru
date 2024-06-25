import {
  Button,
  HStack,
  ModalProps,
  Text,
  VStack,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { RadioCard } from "./menu/RadioCard";

interface Props extends ModalProps {
  children: any;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const OutletPicker = ({ children, isOpen, onOpen, onClose }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
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
    <>
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

      <HStack justify={"end"} mt={4} mb={4}>
        {children}
        <Button
          size={"xs"}
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
    </>
  );
};
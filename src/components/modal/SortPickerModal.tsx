import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowDownDoubleLine } from "@remixicon/react";
import { useState } from "react";
import { sort } from "../../data/general";
import { CButton } from "../CButton";

export const SortPickerModal = ({ ...rest }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<
    { value: any; label: string } | undefined
  >();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();

      // TODO ADD API
    }, 2000);
  };

  return (
    <>
      <CButton
        variant={"outline"}
        colorScheme="teal"
        icon={RiArrowDownDoubleLine}
        onClick={onOpen}
        {...rest}
      >
        Urutkan
      </CButton>

      <Modal isCentered size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent>
          <ModalHeader>Urutkan berdasarkan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              {sort.map((item, i) => (
                <Button
                  key={i}
                  w={"100%"}
                  variant={"outline"}
                  justifyContent={"start"}
                  borderColor={
                    selected && selected.value === item.key
                      ? "teal.400"
                      : undefined
                  }
                  onClick={() => {
                    setSelected({ value: item.key, label: item.label });
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <CButton variant="solid" onClick={onClose}>
              Tutup
            </CButton>

            <CButton
              variant="solid"
              type="submit"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              ml={4}
              onClick={handleSubmit}
              colorScheme="teal"
            >
              Terapkan
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

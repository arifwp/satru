import {
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
    { id: any; name: string } | undefined
  >();

  const handleReset = () => {
    setSelected(undefined);
  };

  const handleSelect = (val: any) => {
    val.id === selected?.id
      ? setSelected(undefined)
      : setSelected({ id: val.id, name: val.name });
  };

  const handleSubmit = () => {
    console.log(selected);

    setLoading(true);

    if (selected === undefined) {
      localStorage.removeItem("sortProduct");
    } else {
      localStorage.setItem(
        "sortProduct",
        JSON.stringify({ id: selected?.id, name: selected?.name })
      );
    }
    setTimeout(() => {
      // TODO ADD API
      setLoading(false);

      onClose();
    }, 2000);
  };

  const sortLabel = () => {
    if (localStorage.hasOwnProperty("sortProduct")) {
      const getSort = localStorage.getItem("sortProduct") as string;
      const arr = JSON.parse(getSort);
      const label = arr.name;
      return label;
    } else {
      return "Urutkan";
    }
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
        {sortLabel()}
      </CButton>

      <Modal isCentered size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent>
          <ModalHeader>Urutkan berdasarkan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              {sort.map((item, i) => (
                <CButton
                  key={i}
                  w={"100%"}
                  variant={"outline"}
                  justifyContent={"start"}
                  fontSize={"xs"}
                  borderColor={
                    selected && selected.id === item.id ? "teal.400" : undefined
                  }
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </CButton>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <CButton variant="solid" onClick={onClose}>
              Tutup
            </CButton>

            <CButton
              ml={2}
              variant="solid"
              colorScheme="teal"
              onClick={handleReset}
            >
              Reset
            </CButton>

            <CButton
              variant="solid"
              type="submit"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              ml={2}
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

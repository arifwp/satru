import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { RiShoppingBag4Line } from "@remixicon/react";
import { useEffect, useState } from "react";
import { outlet } from "../../data/outlet";
import { CButton } from "../CButton";

export const OutletPickerModal = ({ ...rest }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loaded, setLoaded] = useState<boolean>(false);
  // const [selected, setSelected] = useState<
  //   { value: any; label: string } | undefined
  // >();
  const [selected, setSelected] = useState<{ value: any; label: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      console.log("Modal Opened, starting timer...");
      const timer = setTimeout(() => {
        console.log("Timer completed, setting loaded to true");
        setLoaded(true);
      }, 2000);

      return () => {
        console.log("Clearing timer...");
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();

      // TODO ADD API
    }, 2000);
  };

  const handleToggleSelect = (item: { value: any; label: string }) => {
    setSelected((prevSelected: any) => {
      const isSelected = prevSelected.find(
        (selectedItem: any) => selectedItem.value === item.value
      );
      if (isSelected) {
        return prevSelected.filter(
          (selectedItem: any) => selectedItem.value !== item.value
        );
      } else {
        return [...prevSelected, item];
      }
    });
  };

  return (
    <>
      <CButton
        variant={"outline"}
        colorScheme="teal"
        icon={RiShoppingBag4Line}
        onClick={onOpen}
        {...rest}
      >
        Outlet
      </CButton>

      <Modal isCentered size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent>
          <ModalHeader>Outlet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              {outlet.map((item, i) => (
                <Skeleton
                  height={"40px"}
                  w={"100%"}
                  isLoaded={loaded}
                  key={i}
                  fadeDuration={1}
                >
                  <Button
                    w={"100%"}
                    variant={"outline"}
                    justifyContent={"start"}
                    // borderColor={
                    //   selected && selected.value === item.id ? "red" : undefined
                    // }
                    // onClick={() => {
                    //   setSelected({ value: item.id, label: item.outletName });
                    // }}
                    // borderColor={
                    //   selected && selected[i].value === item.id
                    //     ? "red"
                    //     : undefined
                    // }
                    borderColor={
                      selected &&
                      selected.find(
                        (selectedItem) => selectedItem.value === item.id
                      )
                        ? "teal.400"
                        : undefined
                    }
                    onClick={() => {
                      handleToggleSelect({
                        value: item.id,
                        label: item.outletName,
                      });
                    }}
                  >
                    {item.outletName}
                  </Button>
                </Skeleton>
              ))}
              {/* {memoizedOutlet.map((item, i) => (
                <Skeleton
                  height={"40px"}
                  w={"100%"}
                  isLoaded={loaded}
                  key={i}
                  fadeDuration={1}
                >
                  <Button
                    w={"100%"}
                    variant={"outline"}
                    justifyContent={"start"}
                    borderColor={
                      selected.find(
                        (selectedItem) => selectedItem.value === item.id
                      )
                        ? "red"
                        : undefined
                    }
                    onClick={() => {
                      handleToggleSelect({
                        value: item.id,
                        label: item.outletName,
                      });
                    }}
                  >
                    {item.outletName}
                  </Button>
                </Skeleton>
              ))} */}
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
            >
              Terapkan
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

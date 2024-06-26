import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Wrap,
  WrapItem,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RiBox3Line } from "@remixicon/react";
import { useEffect, useState } from "react";
import { category } from "../../data/category";
import { CButton } from "../CButton";

export const CategoryPickerModal = ({ ...rest }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selected, setSelected] = useState<
    { id: any; name: string } | undefined
  >();

  const bgHover = useColorModeValue("#ebedf0", "#ebedf020");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

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
      localStorage.removeItem("categoryProduct");
    } else {
      localStorage.setItem(
        "categoryProduct",
        JSON.stringify({ id: selected?.id, name: selected?.name })
      );
    }
    setTimeout(() => {
      // TODO ADD API

      setLoading(false);

      onClose();
    }, 2000);
  };

  const categoryLabel = () => {
    if (localStorage.hasOwnProperty("categoryProduct")) {
      const getCategory = localStorage.getItem("categoryProduct") as string;
      const arr = JSON.parse(getCategory);
      const label = arr.name;

      return label;
    } else {
      return "Kategori";
    }
  };

  return (
    <>
      <CButton
        w={"100%"}
        maxW={"150px"}
        variant={"outline"}
        colorScheme="teal"
        icon={RiBox3Line}
        onClick={onOpen}
        noOfLines={0}
        {...rest}
      >
        {categoryLabel()}
      </CButton>

      <Modal isCentered size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent>
          <ModalHeader>Kategori</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap spacing={2}>
              {category.map((item, i) => (
                <WrapItem key={i}>
                  <Skeleton
                    height={!loaded ? "20px" : ""}
                    isLoaded={loaded}
                    fadeDuration={1}
                  >
                    <Box
                      as="button"
                      px={2}
                      py={1}
                      textAlign={"start"}
                      lineHeight="1.2"
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      borderWidth={"1px"}
                      borderRadius={"md"}
                      fontSize="xs"
                      _hover={{ bg: bgHover }}
                      borderColor={
                        selected && selected.id === item.id
                          ? "teal.400"
                          : undefined
                      }
                      onClick={() => handleSelect(item)}
                    >
                      {item.name}
                    </Box>
                  </Skeleton>
                </WrapItem>
              ))}
            </Wrap>
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

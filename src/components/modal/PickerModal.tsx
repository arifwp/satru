import {
  Box,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { SelectOption } from "../../constant/SelectOption";
import {
  useBgComponentBaseColor,
  useBgHover,
  useErrorColor,
} from "../../constant/colors";
import { CButton } from "../CButton";

interface Props {
  name: string;
  placeholder: string;

  withSearch: boolean;
  isError?: boolean;
  options: SelectOption[];
  inputValue: SelectOption | undefined;
  onConfirm: (inputValue: SelectOption | undefined) => void;
}

export const PickerModal = ({
  name,
  placeholder,

  withSearch,
  isError,
  options,
  inputValue,
  onConfirm,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectOption | undefined>(
    inputValue
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();

  const handleSelect = (val: any) => {
    val.id === selected?.id ? setSelected(undefined) : setSelected(val);
  };

  const handleSubmit = () => {
    console.log(selected);

    setLoading(true);

    if (selected) {
      onConfirm(selected);
    } else {
      onConfirm(undefined);
    }

    setTimeout(() => {
      // TODO ADD API

      setLoading(false);

      onClose();
    }, 1000);
  };

  const limitedTextDisplay =
    inputValue && inputValue.name.length > 20
      ? `${inputValue.name.slice(0, 20)}...`
      : inputValue && inputValue.name;

  return (
    <>
      <CButton
        w={"100%"}
        onClick={onOpen}
        justifyContent={"space-between"}
        {...rest}
      >
        <HStack fontSize={"xs"} fontWeight={"normal"} overflow={"hidden"}>
          <Text opacity={inputValue ? 1 : 0.3} isTruncated>
            {inputValue
              ? limitedTextDisplay?.toString()
              : placeholder || "Pilih Salah Satu"}
          </Text>

          <Text fontWeight={400} opacity={0.4}>
            {inputValue && inputValue.sub}
          </Text>
        </HStack>

        <Icon as={RiArrowDownSLine} fontSize={18} />
      </CButton>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent bg={bgComponent}>
          <ModalHeader>{placeholder}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/*add body */}
            <Wrap spacing={2}>
              {options.map((item, i) => (
                <WrapItem key={item.id}>
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
              Close
            </CButton>

            <CButton
              ml={4}
              variant="solid"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
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

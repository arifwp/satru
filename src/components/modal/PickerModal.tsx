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
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { SelectOption } from "../../constant/SelectOption";
import { useBgComponentBaseColor, useBgHover } from "../../constant/colors";
import { CButton } from "../CButton";
import { TableSkeleton } from "../TableSkeleton";
import { SearchInput } from "../input/SearchInput";

interface Props {
  name: string;
  placeholder: string;
  withSearch: boolean;
  isError?: boolean;
  options: SelectOption[] | undefined;
  inputValue: SelectOption | undefined;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  loaded: boolean;
}

export const PickerModal = ({
  name,
  placeholder,
  withSearch,
  isError,
  options,
  inputValue,
  onConfirm,
  isOpen,
  onOpen,
  onClose,
  loaded,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectOption | undefined>(
    inputValue
  );

  useEffect(() => {
    setSelected(inputValue);
  }, [inputValue]);

  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();

  const handleSelect = (val: any) => {
    val.id === selected?.id ? setSelected(undefined) : setSelected(val);
  };

  const handleSubmit = () => {
    setLoading(true);

    if (selected) {
      onConfirm(selected);
    } else {
      onConfirm(undefined);
    }

    setTimeout(() => {
      // TODO ADD API

      setLoading(false);
      setSelected(undefined);
      onClose();
    }, 500);
  };

  const limitedTextDisplay =
    inputValue && inputValue.name.length > 20
      ? `${inputValue.name.slice(0, 20)}...`
      : inputValue && inputValue.name;

  const skeleton = () => <TableSkeleton row={3} column={3} />;

  const component = () => (
    <Wrap spacing={2}>
      {options &&
        options.map((item, i) => (
          <WrapItem key={item.id}>
            <Box
              as="button"
              px={4}
              py={2}
              textAlign={"start"}
              lineHeight="1.2"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              borderWidth={"1px"}
              borderRadius={"md"}
              fontSize="xs"
              _hover={{ bg: bgHover }}
              borderColor={
                selected && selected.id === item.id ? "teal.400" : undefined
              }
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </Box>
          </WrapItem>
        ))}
    </Wrap>
  );

  return (
    <>
      <CButton
        variant="outline"
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
            {withSearch && (
              <SearchInput
                placeholder="Cari nama..."
                onConfirm={(inputValue) => {
                  // ADD TODO
                  console.log(inputValue);
                  // setfilterSearch(inputValue);
                }}
                mb={4}
              />
            )}
            {loaded ? component() : skeleton()}
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

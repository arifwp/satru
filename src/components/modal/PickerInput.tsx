import {
  Box,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
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

export const PickerInput = ({
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
  const [search, setSearch] = useState<string>("");
  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();

  useEffect(() => {
    setSelected(inputValue);
  }, [inputValue]);

  const finalData =
    options &&
    options.filter((item) => {
      const searchTerm = search.toLowerCase();
      const nameTerm = item.name.toLowerCase();

      return nameTerm.includes(searchTerm);
    });

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
      // setSelected(undefined);
      onClose();
    }, 500);
  };

  const skeleton = () => <TableSkeleton row={3} column={3} />;

  const component = () => (
    <Wrap spacing={2}>
      {finalData &&
        finalData.map((item, i) => (
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

  const empty = () => (
    <VStack>
      <Image
        src="/assets/svg/illustration_empty.svg"
        w={"100%"}
        maxW={"100px"}
      />
      <Text>Data tidak ada</Text>
    </VStack>
  );

  return (
    <>
      <CButton
        height={"40px"}
        variant="outline"
        borderColor={isError ? "red.300" : "RGBA(255, 255, 255, 0.24)"}
        borderWidth={isError ? "2px" : ""}
        onClick={onOpen}
        justifyContent={"space-between"}
        {...rest}
      >
        <HStack fontSize={"xs"} fontWeight={"normal"} overflow={"hidden"}>
          <Text
            opacity={inputValue ? 1 : 0.3}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            maxW={"200px"}
          >
            {inputValue ? inputValue.name : placeholder}
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
                  setSearch(inputValue);
                }}
                mb={4}
              />
            )}
            {loaded
              ? finalData?.length === 0
                ? empty()
                : component()
              : skeleton()}
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
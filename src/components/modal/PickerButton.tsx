import {
  Box,
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
import { RemixiconComponentType } from "@remixicon/react";
import { useState } from "react";
import { SelectOption } from "../../constant/SelectOption";
import { useBgComponentBaseColor, useBgHover } from "../../constant/colors";
import { CButton } from "../CButton";
import { TableSkeleton } from "../TableSkeleton";
import { SearchInput } from "../input/SearchInput";

interface Props {
  name: string;
  placeholder: string;
  withSearch: boolean;
  withSkeleton: boolean;
  icon: RemixiconComponentType;
  options: SelectOption[] | undefined;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  loaded: boolean;
}

export const PickerButton = ({
  name,
  placeholder,
  withSearch,
  withSkeleton,
  options,
  icon,
  onConfirm,
  isOpen,
  onOpen,
  onClose,
  loaded,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined);
  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();
  const [search, setSearch] = useState<string>("");

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
      setLoading(false);
      onClose();
    }, 1000);
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
        variant="outline"
        colorScheme="teal"
        icon={icon}
        onClick={onOpen}
        {...rest}
      >
        <Text overflow={"hidden"} textOverflow={"ellipsis"} maxW={"100px"}>
          {selected ? selected.name : placeholder}
        </Text>
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
                  // console.log(inputValue);
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
            <CButton variant="outline" onClick={onClose}>
              Tutup
            </CButton>

            <CButton
              ml={4}
              variant="solid"
              colorScheme="teal"
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

import {
  Box,
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
  const [displayText, setDisplayText] = useState<string>(placeholder);
  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();

  const handleSelect = (val: any) => {
    val.id === selected?.id ? setSelected(undefined) : setSelected(val);
  };

  const handleSubmit = () => {
    setLoading(true);

    if (selected) {
      onConfirm(selected);
      setDisplayText(selected.name);
    } else {
      onConfirm(undefined);
      setDisplayText(placeholder);
    }

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  const limitedTextDisplay =
    selected && displayText.length > 20
      ? `${displayText.slice(0, 20)}...`
      : selected && displayText;

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
        colorScheme="teal"
        icon={icon}
        onClick={onOpen}
        {...rest}
      >
        <Text>{selected ? limitedTextDisplay : placeholder}</Text>
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

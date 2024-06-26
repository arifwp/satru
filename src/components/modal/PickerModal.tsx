import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowDownDoubleLine, RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";
import { sort } from "../../data/general";
import { CButton } from "../CButton";
import { SelectOption } from "../../constant/SelectOption";
import { useBgComponentBaseColor } from "../../constant/colors";

interface Props {
  name: string;
  placeholder: string;
  required?: boolean;
  withSearch: boolean;
  isError?: boolean;
  options: SelectOption[];
  inputValue: SelectOption | undefined;
  onConfirm: (inputValue: SelectOption | undefined) => void;
}

export const PickerModal = ({
  name,
  placeholder,
  required,
  withSearch,
  isError,
  options,
  inputValue,
  onConfirm,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<SelectOption | undefined>(
    inputValue
  );

  const bgComponent = useBgComponentBaseColor();

  return (
    <>
      <Button
        className="btn-clear"
        border={"1px solid var(--divider3)"}
        // borderColor={isError ? errorColor : ""}
        borderRadius={8}
        gap={3}
        _focus={{
          border: "1px solid var(--p500)",
          boxShadow: "none !important",
        }}
        cursor={"pointer"}
        onClick={() => {
          onOpen();
          setSelected(inputValue);
        }}
        justifyContent={"space-between"}
        w={"100%"}
        role="group"
        px={"16px !important"}
        {...rest}
      >
        <HStack>
          <Text
            opacity={inputValue ? 1 : 0.3}
            fontWeight={400}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {inputValue ? inputValue.name : placeholder || "Pilih Salah Satu"}
          </Text>

          <Text fontWeight={400} opacity={0.4}>
            {inputValue && inputValue.sub}
          </Text>
        </HStack>

        <Icon as={RiArrowDownSLine} fontSize={18} />
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent bg={bgComponent}>
          <ModalHeader>{placeholder}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/*add body */}</ModalBody>
          <ModalFooter>
            <CButton variant="solid" onClick={onClose}>
              Close
            </CButton>

            <CButton
              variant="solid"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              //   onClick={btnOnClick}
            >
              Close
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

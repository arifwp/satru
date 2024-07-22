import { RiAddCircleLine, RiArrowDownSLine } from "@remixicon/react";
import { CButton } from "../CButton";
import {
  Button,
  ButtonProps,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../constant/colors";
import { useState } from "react";

interface Props extends ButtonProps {
  children?: any;
  btnText: string;
  headerText: string;
  onClick?: any;
}

export const ModalInputForm = ({
  children,
  btnText,
  headerText,
  onClick,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgComponent = useBgComponentBaseColor();
  const borderColorInput = useBorderColorInput();

  return (
    <>
      <Button
        height={"40px"}
        variant="outline"
        borderColor={borderColorInput}
        onClick={onOpen}
        justifyContent={"space-between"}
        {...rest}
      >
        <Text
          opacity={1}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          maxW={"200px"}
          fontSize={"13px"}
          fontWeight={"normal"}
        >
          {btnText}
        </Text>

        <Icon as={RiArrowDownSLine} fontSize={18} />
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg={"none"}
          backdropFilter={"auto"}
          backdropBlur={"5px"}
        />
        <ModalContent bg={bgComponent}>
          <ModalHeader>{headerText}</ModalHeader>
          {children}
          <ModalFooter>
            <CButton variant="outline" onClick={onClose}>
              Tutup
            </CButton>

            <CButton
              ml={4}
              variant="solid"
              colorScheme="teal"
              onClick={onClick}
            >
              Terapkan
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

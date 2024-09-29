import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { useBgComponentBaseColor } from "../../constant/colors";

interface Props extends ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title?: string;
  children: any;
  btnText?: string;
  btnClick?: () => void;
}

export const BaseModal = ({
  isOpen,
  onOpen,
  onClose,
  children,
  title,
  btnText,
  btnClick,
  ...rest
}: Props) => {
  const bgComp = useBgComponentBaseColor();

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
      <ModalContent bg={bgComp}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button variant={"ghost"} size={"sm"} onClick={onClose}>
            Batal
          </Button>

          <Button
            ml={4}
            variant={"solid"}
            size={"sm"}
            colorScheme="teal"
            onClick={btnClick}
          >
            {!!btnText ? btnText : `Terapkan`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

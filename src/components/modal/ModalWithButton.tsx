import {
  Button,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";

interface Props extends ModalProps {
  children: any;
  modalTitle: string;
  buttonTitle: string;
  isOpen: boolean;
  bgColorMode?: any;
  size: string;
  icon?: RemixiconComponentType;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalWithButton = (
  {
    children,
    modalTitle,
    buttonTitle,
    isOpen,
    icon,
    bgColorMode,
    size,
    onOpen,
    onClose,
  }: Props,
  { ...rest }
) => {
  return (
    <>
      <Button
        size={"xs"}
        py={5}
        px={7}
        bg={bgColorMode !== undefined ? bgColorMode : undefined}
        leftIcon={icon !== undefined ? <Icon as={icon} /> : undefined}
        onClick={onOpen}
        {...rest}
      >
        {buttonTitle}
      </Button>

      <Modal isCentered size={size} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

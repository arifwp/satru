import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

interface Props extends ModalProps {
  children: any;
  size: string;
  modalTitle: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const CModal = ({
  children,
  size,
  modalTitle,
  onOpen,
  onClose,
  isOpen,
}: Props) => {
  return (
    <Modal isCentered size={size} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};

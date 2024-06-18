import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

// interface DisclosureProps extends UseDisclosureProps {
//   open: any;
//   close: any;
// }

interface Props extends ModalProps {
  children: any;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomModal = ({ children, title, isOpen, onClose }: Props) => {
  return (
    <Modal id={title} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        // backdropInvert="80%"
        backdropBlur="5px"
      />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};

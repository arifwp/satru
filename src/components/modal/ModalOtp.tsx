import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBgComponentBaseColor } from "../../constant/colors";
import { CButton } from "../CButton";

interface Props extends ModalProps {
  children: any;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  headerText: string;
  url: string;
  onClick: () => void;
  formId: string;
}

export const ModalOtp = ({
  children,
  isOpen,
  onOpen,
  onClose,
  headerText,
  url,
  onClick,
  formId,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const bgComponent = useBgComponentBaseColor();

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay bg={"none"} backdropFilter={"auto"} backdropBlur={"5px"} />
      <ModalContent bg={bgComponent}>
        <ModalHeader>{headerText}</ModalHeader>
        {children}
      </ModalContent>
    </Modal>
  );
};

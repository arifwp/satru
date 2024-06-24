import {
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { useState } from "react";
import { CButton } from "../CButton";

interface BtnProps extends ButtonProps {
  children: any;
  modalTitle: string;
  modalSize: string;
  btnIcon?: RemixiconComponentType;
  btnTitle: string;
  btnVariant?: any;
  btnSize?: string;
  btnBg?: any;
  btnOnClick?: () => void;
}

export const ModalWithButton = ({
  children,
  modalTitle,
  modalSize,
  btnTitle,
  btnIcon,
  btnBg,
  btnSize,
  btnVariant,
  btnOnClick,
  ...rest
}: BtnProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgComponent = useColorModeValue("white", "black");

  return (
    <>
      <CButton
        size={btnSize}
        variant={btnVariant}
        btnColor={btnBg !== undefined ? btnBg : undefined}
        icon={btnIcon !== undefined ? btnIcon : undefined}
        onClick={onOpen}
        {...rest}
      >
        {btnTitle}
      </CButton>

      <Modal isCentered size={modalSize} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent bg={bgComponent}>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <CButton variant="solid" onClick={onClose}>
              Close
            </CButton>

            <CButton
              variant="solid"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              onClick={btnOnClick}
            >
              Close
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

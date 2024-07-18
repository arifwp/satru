import {
  Link as ChakraLink,
  Button,
  ButtonProps,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../CButton";
import { RemixiconComponentType, RiAddCircleLine } from "@remixicon/react";
import { useBgComponentBaseColor } from "../../constant/colors";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie } from "typescript-cookie";

interface Props extends ButtonProps {
  colorScheme?: string;
  size?: string;
  btnText: string;
  message: string;
  modalHeader?: string;
  variant?: string;
  url: string;
  method: string;
  icon: RemixiconComponentType;
  onConfirm?: (inputValue: boolean) => void;
}

export const Confirmation = ({
  btnText,
  url,
  method,
  colorScheme,
  variant,
  message,
  modalHeader,
  size,
  icon,
  onConfirm,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgComponent = useBgComponentBaseColor();

  const toast = useToast();

  const handleClick = () => {
    setLoading(true);
    const token = getCookie("token");
    axios({
      method: method,
      url: `${process.env.REACT_APP_API_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: AxiosResponse) => {
        toast({
          title: JSON.parse(response.request.response).message,
          status: "success",
          duration: 2000,
        });
      })
      .catch((error: AxiosError) => {
        toast({
          title: JSON.parse(error.request.response).message,
          status: "error",
          duration: 2000,
        });
      })
      .finally(() => {
        onConfirm && onConfirm(true);
        setLoading(false);
        onClose();
      });
  };

  return (
    <>
      <CButton
        onClick={onOpen}
        variant={variant ? variant : "outline"}
        size={"xs"}
        colorScheme={colorScheme}
        icon={icon}
      >
        {btnText}
      </CButton>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent bg={bgComponent}>
          <ModalHeader>{modalHeader ? modalHeader : "Konfirmasi"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"sm"}>{message}</Text>
          </ModalBody>

          <ModalFooter>
            <CButton variant="solid" onClick={onClose}>
              Batal
            </CButton>

            <CButton
              ml={4}
              variant="solid"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              colorScheme="teal"
              onClick={handleClick}
            >
              {btnText}
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent bg={bgComponent}></ModalContent>
        <ModalHeader>{modalHeader ? modalHeader : "Konfirmasi"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <CButton variant="solid" onClick={onClose}>
            Close
          </CButton>

          <CButton
            ml={4}
            variant="solid"
            isLoading={loading}
            loadingText="Loading"
            spinnerPlacement="start"
            onClick={handleClick}
          >
            {btnText}
          </CButton>
        </ModalFooter>
      </Modal> */}
    </>
  );
};

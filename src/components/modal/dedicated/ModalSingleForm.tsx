import {
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RiAddCircleLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useBgComponentBaseColor } from "../../../constant/colors";
import { CButton } from "../../CButton";
import { getCookie } from "typescript-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";

interface Props {
  btnText: string;
  placeholder: string;
  formValue: string;
  url: string;
  onConfirm: (value: boolean) => void;
}

const initialValues = {
  name: undefined,
};

export const ModalSingleForm = ({
  btnText,
  placeholder,
  formValue,
  url,
  onConfirm,
  ...rest
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const bgComponent = useBgComponentBaseColor();
  const toast = useToast();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      const token = getCookie("token");
      axios
        .post(`${process.env.REACT_APP_API_URL}${url}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          onConfirm(true);
          toast({
            title: JSON.parse(response.request.response).message,
            status: "success",
            isClosable: true,
          });
          onClose();
        })
        .catch((error: AxiosError) => {
          toast({
            title: JSON.parse(error.request.response).message,
            status: "error",
            isClosable: true,
          });
          onClose();
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      <CButton
        icon={RiAddCircleLine}
        variant="outline"
        colorScheme="teal"
        onClick={onOpen}
      >
        {btnText}
      </CButton>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <form
          id={formValue}
          onSubmit={formik.handleSubmit}
          style={{ width: "100%" }}
        >
          <ModalContent bg={bgComponent}>
            <ModalHeader>{placeholder}</ModalHeader>

            <ModalBody>
              <FormControl
                isInvalid={
                  formik.errors.name && formik.touched.name ? true : false
                }
              >
                <Input
                  name="name"
                  type="text"
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <CButton variant="outline" onClick={onClose}>
                Tutup
              </CButton>

              <CButton
                ml={4}
                form={formValue}
                type="submit"
                variant="solid"
                colorScheme="teal"
                isLoading={loading}
                loadingText="Loading"
                spinnerPlacement="start"
              >
                Terapkan
              </CButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

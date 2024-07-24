import {
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useBgComponentBaseColor } from "../../constant/colors";
import { CButton } from "../CButton";
import axios from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  headerText: string;
  url: string;
  formId: string;
}

export const OtpForm = ({
  isOpen,
  onClose,
  headerText,
  url,
  formId,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const bgComponent = useBgComponentBaseColor();

  const field1Ref = useRef<HTMLInputElement>(null);
  const field2Ref = useRef<HTMLInputElement>(null);
  const field3Ref = useRef<HTMLInputElement>(null);
  const field4Ref = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: false,
    initialValues: {
      field1: "",
      field2: "",
      field3: "",
      field4: "",
    },
    validationSchema: Yup.object().shape({
      field1: Yup.number()
        .required("Harus diisi")
        .typeError("Harus berupa angka"),
      field2: Yup.number()
        .required("Harus diisi")
        .typeError("Harus berupa angka"),
      field3: Yup.number()
        .required("Harus diisi")
        .typeError("Harus berupa angka"),
      field4: Yup.number()
        .required("Harus diisi")
        .typeError("Harus berupa angka"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      const combinedValue = `${values.field1}${values.field2}${values.field3}${values.field4}`;
      const numericValue = Number(combinedValue);

      const finalValue = {
        otpCode: numericValue,
      };

      axios.post(`${process.env.REACT_APP_API_URL}/v1/user/changeEmail`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextFieldRef: React.RefObject<HTMLInputElement> | null,
    prevFieldRef: React.RefObject<HTMLInputElement> | null
  ) => {
    formik.handleChange(e);

    // Move focus to the next field if the current field is filled
    if (e.target.value.length === 1 && nextFieldRef?.current) {
      nextFieldRef.current.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    if (e.key === "Backspace") {
      // Check if the field is empty
      const currentField =
        formik.values[`field${currentIndex + 1}` as keyof typeof formik.values];
      if (currentField === "" && currentIndex > 0) {
        // Clear current and previous fields
        formik.setFieldValue(
          `field${currentIndex + 1}` as keyof typeof formik.values,
          ""
        );
        formik.setFieldValue(
          `field${currentIndex}` as keyof typeof formik.values,
          ""
        );

        // Move focus to the previous field
        const prevFieldRef = [field1Ref, field2Ref, field3Ref, field4Ref][
          currentIndex - 1
        ];
        if (prevFieldRef?.current) {
          prevFieldRef.current.focus();
        }
      }
    }
  };

  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <ModalOverlay bg={"none"} backdropFilter={"auto"} backdropBlur={"5px"} />
      <ModalContent bg={bgComponent}>
        <ModalHeader>{headerText}</ModalHeader>
        <form
          id={formId}
          onSubmit={formik.handleSubmit}
          style={{ width: "100%" }}
        >
          <ModalBody>
            <VStack w={"100%"}>
              <Text
                as={"b"}
                fontWeight={"semibold"}
                fontSize={{
                  base: "14px",
                  sm: "16px",
                  md: "16px",
                  lg: "16px",
                  xl: "18px",
                }}
              >
                Kode OTP
              </Text>

              <Text textAlign={"center"} fontSize={"sm"} variant={"secondary"}>
                Periksa di spam/kotak masuk email anda untuk kode OTP yang kami
                kirimkan melalui email
              </Text>

              <HStack mt={6}>
                <FormControl
                  isInvalid={
                    formik.errors.field1 && formik.touched.field1 ? true : false
                  }
                >
                  <Input
                    ref={field1Ref}
                    name="field1"
                    size={"md"}
                    maxW={"42px"}
                    textAlign={"center"}
                    maxLength={1}
                    value={formik.values.field1 || ""}
                    onChange={(e) => handleChange(e, field2Ref, null)}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.errors.field2 && formik.touched.field2 ? true : false
                  }
                >
                  <Input
                    ref={field2Ref}
                    name="field2"
                    size={"md"}
                    maxW={"42px"}
                    textAlign={"center"}
                    maxLength={1}
                    value={formik.values.field2 || ""}
                    onChange={(e) => handleChange(e, field3Ref, field1Ref)}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.errors.field3 && formik.touched.field3 ? true : false
                  }
                >
                  <Input
                    ref={field3Ref}
                    name="field3"
                    size={"md"}
                    maxW={"42px"}
                    textAlign={"center"}
                    maxLength={1}
                    value={formik.values.field3 || ""}
                    onChange={(e) => handleChange(e, field4Ref, field2Ref)}
                    onKeyDown={(e) => handleKeyDown(e, 2)}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.errors.field4 && formik.touched.field4 ? true : false
                  }
                >
                  <Input
                    ref={field4Ref}
                    name="field4"
                    size={"md"}
                    maxW={"42px"}
                    textAlign={"center"}
                    maxLength={1}
                    value={formik.values.field4 || ""}
                    onChange={(e) => handleChange(e, null, field3Ref)}
                    onKeyDown={(e) => handleKeyDown(e, 3)}
                  />
                </FormControl>
              </HStack>

              {(formik.errors.field1 && formik.touched.field1) ||
              (formik.errors.field2 && formik.touched.field2) ||
              (formik.errors.field3 && formik.touched.field3) ||
              (formik.errors.field4 && formik.touched.field4) ? (
                <Text fontSize={"xs"} color={"red.300"} mt={4}>
                  Semua field harus diisi
                </Text>
              ) : undefined}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <CButton
              form={formId}
              spinnerPlacement="start"
              isLoading={loading}
              loadingText="Loading..."
              type="submit"
              variant="solid"
              colorScheme="teal"
            >
              Terapkan
            </CButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

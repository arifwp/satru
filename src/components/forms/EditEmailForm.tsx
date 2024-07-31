import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { UserInterface } from "../../constant/User";
import { useTempValueStore } from "../../store/useTempValueStore";
import { getDataUser } from "../../utils/helperFunction";
import { OtpForm } from "./OtpForm";

interface Props {
  data: UserInterface | undefined;
  loaded: boolean;
}

export const EditEmailForm = ({ data, loaded, ...rest }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setTempValue } = useTempValueStore();

  const initialValues = {
    oldEmail: data && data.email,
    newEmail: undefined,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      newEmail: Yup.string()
        .required("Email baru harus diisi")
        .email("Masukkan format email yang benar"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      console.log(values);

      const finalValue = {
        userId: getDataUser()._id,
        oldEmail: values.oldEmail,
        newEmail: values.newEmail,
      };
      const token = getCookie("token");

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/v1/user/confirmEmailChange`,
          finalValue,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response: AxiosResponse) => {
          values.newEmail && setTempValue(values.newEmail);
          setIsModalOpen(true);
          resetForm({ values: initialValues });
        })
        .catch((error: AxiosError) => {
          toast({
            title: JSON.parse(error.request.response).message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      <form
        id="editEmailForm"
        className="edit-email-container"
        style={{ width: "100%" }}
        onSubmit={formik.handleSubmit}
      >
        <VStack w={"100%"} spacing={6}>
          <FormControl>
            <FormLabel htmlFor="oldEmail">Email</FormLabel>
            <Skeleton
              isLoaded={loaded}
              height={!loaded ? "40px" : ""}
              borderRadius={"md"}
            >
              <Input
                name="oldEmail"
                type="text"
                fontSize={"xs"}
                onChange={formik.handleChange}
                value={formik.values.oldEmail || ""}
                readOnly
              />
            </Skeleton>
          </FormControl>

          <FormControl
            isInvalid={
              formik.errors.newEmail && formik.touched.newEmail ? true : false
            }
          >
            <FormLabel htmlFor="newEmail">Email Baru</FormLabel>
            <Input
              name="newEmail"
              type="text"
              fontSize={"xs"}
              onChange={formik.handleChange}
              value={formik.values.newEmail || ""}
            />
            <FormErrorMessage>{formik.errors.newEmail}</FormErrorMessage>
          </FormControl>

          <Button
            form="editEmailForm"
            type="submit"
            borderRadius={"md"}
            fontSize={[12, null, 14]}
            spinnerPlacement="start"
            loadingText={"Loading..."}
            isLoading={loading}
            alignSelf={"start"}
            colorScheme="teal"
            variant="outline"
          >
            Ganti Email
          </Button>
        </VStack>
      </form>

      <OtpForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        headerText="Kode Otp"
        subTitle="Periksa di spam/kotak masuk email anda untuk kode OTP yang kami
                kirimkan melalui email"
        url="/v1/user/changeEmail"
        formId="changeEmailForm"
      />
    </>
  );
};

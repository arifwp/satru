import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { UserInterface } from "../../constant/User";
import { getDataUser } from "../../utils/helperFunction";

interface Props {
  data: UserInterface | undefined;
  loaded: boolean;
}

export const EditPasswordForm = ({ data, loaded, ...rest }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      oldPass: undefined,
      newPass: undefined,
    },
    validationSchema: Yup.object().shape({
      oldPass: Yup.string().required("Password lama harus diisi"),
      newPass: Yup.string().required("Password baru harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const request = {
        userId: getDataUser()._id,
        oldPass: values.oldPass,
        newPass: values.newPass,
      };
      const token = getCookie("token");

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/v1/user/changePassword`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response: AxiosResponse) => {
          toast({
            title: JSON.parse(response.request.response).message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
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
          resetForm({ values: { oldPass: undefined, newPass: undefined } });
          setLoading(false);
        });
    },
  });

  return (
    <form
      id="editPasswordForm"
      className="edit-password-containter"
      style={{ width: "100%" }}
      onSubmit={formik.handleSubmit}
    >
      <VStack w={"100%"} spacing={6}>
        <FormControl
          isInvalid={
            formik.touched.oldPass && formik.errors.oldPass ? true : false
          }
        >
          <FormLabel htmlFor="oldPass">Password Lama</FormLabel>
          <Input
            name="oldPass"
            type="password"
            fontSize={"xs"}
            onChange={formik.handleChange}
            value={formik.values.oldPass || ""}
          />
          <FormErrorMessage>{formik.errors.oldPass}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.touched.newPass && formik.errors.newPass ? true : false
          }
        >
          <FormLabel htmlFor="newPass">Password Baru</FormLabel>
          <Input
            name="newPass"
            type="password"
            fontSize={"xs"}
            onChange={formik.handleChange}
            value={formik.values.newPass || ""}
          />
          <FormErrorMessage>{formik.errors.newPass}</FormErrorMessage>
        </FormControl>

        <Button
          form="editPasswordForm"
          type="submit"
          borderRadius={"md"}
          size={"sm"}
          spinnerPlacement="start"
          loadingText={"Loading..."}
          isLoading={loading}
          alignSelf={"start"}
          colorScheme="teal"
          variant="outline"
          fontSize={[12, null, 14]}
        >
          Ganti Password
        </Button>
      </VStack>
    </form>
  );
};

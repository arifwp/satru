import {
  AspectRatio,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { getDataUser } from "../../utils/helperFunction";
import {
  RiDeleteBack2Line,
  RiDeleteBin2Line,
  RiEdit2Line,
  RiRecycleLine,
} from "@remixicon/react";
import { CButton } from "../CButton";

const initialValues = {
  name: undefined,
  email: undefined,
  phone: undefined,
  bornDate: undefined,
  avatar: undefined,
  createdAt: undefined,
  lastLogin: undefined,
  updatedAt: undefined,
};

interface Props {
  paramsId: any;
}

export const EditProfileForm = ({ paramsId, ...rest }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const token = getCookie("token");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/user/getDetailUser/${
          getDataUser()._id
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {})
      .catch((error: AxiosError) => {})
      .finally(() => {
        setLoaded(false);
      });
  }, []);

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      email: Yup.string()
        .required("Email harus diisi")
        .email("Format email harus benar"),
      phone: Yup.string().required("Nomor telepon harus diisi"),
      bornDate: Yup.string().required("Tanggal lahir harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // setLoading(true)
    },
  });

  return (
    <form
      id="editProfileForm"
      style={{ width: "100%" }}
      onSubmit={formik.handleSubmit}
    >
      <Stack
        direction={["row", "row", "column", "column", "column"]}
        className="form-container"
        w={"100%"}
        spacing={6}
        {...rest}
      >
        <VStack w={"50%"}>
          <FormControl
            isInvalid={formik.errors.name && formik.touched.name ? true : false}
          >
            <FormLabel htmlFor="name">Nama</FormLabel>
            <Input
              name="name"
              type="text"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              fontSize={"xs"}
            />
          </FormControl>
        </VStack>

        <VStack w={"50%"}>
          <AspectRatio ratio={4 / 3} w={"100%"} minW={"75px"} maxW={"200px"}>
            <Image w={"100%"} src="https://placehold.co/600x400" />
          </AspectRatio>

          <CButton
            mt={4}
            colorScheme="teal"
            variant={"outline"}
            icon={RiEdit2Line}
          >
            Edit Foto
          </CButton>

          <CButton colorScheme="red" variant={"ghost"} icon={RiDeleteBin2Line}>
            Hapus Foto
          </CButton>
        </VStack>
      </Stack>
    </form>
  );
};

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiEyeFill, RiEyeOffFill } from "@remixicon/react";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { SelectDateSingle } from "../modal/dedicated/SelectDateSingle";

const initialValues = {
  name: undefined,
  username: undefined,
  email: undefined,
  password: undefined,
  phone: undefined,
  bornDate: undefined,
};

export const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>("hide");
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      username: Yup.string().required("Username harus diisi"),
      email: Yup.string().email("Invalid email").required("Email harus diisi"),
      password: Yup.string().required("Password harus diisi"),
      phone: Yup.string().required("Nomor telepon harus diisi"),
      bornDate: Yup.string().required("Tanggal lahir harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/v1/auth/register`, values)
        .then((response) => {
          console.log(response);
          toast({
            title: response.data.message,
            status: "success",
            isClosable: true,
          });
        })
        .catch((error: AxiosError) => {
          console.log(error);
          toast({
            title: JSON.parse(error.request.response).message,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const togglePassword = () => {
    toggle === "show" ? setToggle("hide") : setToggle("show");
  };

  return (
    <form
      id="registerForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%" }}
    >
      <VStack spacing={6} mt={8}>
        <FormControl
          isInvalid={formik.errors.name && formik.touched.name ? true : false}
        >
          <FormLabel htmlFor="name">Nama</FormLabel>

          <Input
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
          />

          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.username && formik.touched.username ? true : false
          }
        >
          <FormLabel htmlFor="username">Username</FormLabel>

          <Input
            name="username"
            type="text"
            placeholder="Username"
            onChange={formik.handleChange}
          />

          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.errors.email && formik.touched.email ? true : false}
        >
          <FormLabel htmlFor="email">Email</FormLabel>

          <Input
            name="email"
            type="email"
            placeholder="email@gmail.com"
            onChange={formik.handleChange}
          />

          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.password && formik.touched.password ? true : false
          }
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={toggle === "show" ? "text" : "password"}
              placeholder="Password"
              onChange={formik.handleChange}
            />
            <InputRightElement>
              <IconButton
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                icon={
                  toggle === "hide" ? (
                    <Icon as={RiEyeFill} />
                  ) : (
                    <Icon as={RiEyeOffFill} />
                  )
                }
                aria-label="togglePassword"
                onClick={togglePassword}
              />
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.errors.phone && formik.touched.phone ? true : false}
        >
          <FormLabel htmlFor="phone">Nomor Whatsapp</FormLabel>
          <Input
            name="phone"
            type="text"
            placeholder="Phone"
            onChange={formik.handleChange}
          />

          <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.bornDate && formik.touched.bornDate ? true : false
          }
        >
          <FormLabel htmlFor="bornDate">Tanggal lahir</FormLabel>
          <SelectDateSingle
            initialDate={null}
            placeholder="Tanggal lahir"
            onConfirm={(inputValue) => {
              console.log(inputValue);
              formik.setFieldValue("bornDate", inputValue);
            }}
            w={"100%"}
            h={"40px"}
            borderWidth={"1px"}
            borderColor={"rgba(255, 255, 255, 0.24)"}
            color={
              formik.values.bornDate
                ? "fieldtext !important"
                : "rgba(255, 255, 255, 0.24)"
            }
            fontWeight={"normal"}
            fontSize={"sm"}
            justifyContent={"flex-start"}
          />

          <FormErrorMessage>{formik.errors.bornDate}</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={loading}
          loadingText="Loading"
          spinnerPlacement="start"
          type="submit"
          form="registerForm"
          colorScheme="teal"
          w={"100%"}
        >
          Daftar
        </Button>
      </VStack>
    </form>
  );
};

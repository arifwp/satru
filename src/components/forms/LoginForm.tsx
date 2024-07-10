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
import axios from "axios";
import { FormikValues, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies, setCookie } from "typescript-cookie";
import * as Yup from "yup";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>("hide");
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email harus diisi"),
      password: Yup.string().required("Password harus diisi"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/v1/auth/login`, values)
        .then((response) => {
          setLoading(false);
          console.log(response);
          const token = response.data.data.token;
          setCookie("token", token, { expires: 0.1 });
          toast({
            title: response.data.message,
            status: "success",
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast({
            title: error.response.data.message,
            status: "error",
            isClosable: true,
          });
        });

      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      //   navigate("/fill-data");
      // }, 1000);
    },
  });

  const togglePassword = () => {
    toggle === "show" ? setToggle("hide") : setToggle("show");
  };

  return (
    <form
      id="loginForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%" }}
    >
      <VStack spacing={6} mt={8}>
        <FormControl
          isInvalid={formik.errors.email && formik.touched.email ? true : false}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            type="text"
            placeholder="email@gmail.com"
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          ) : null}
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
          {formik.touched.password && formik.errors.password ? (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          ) : null}
        </FormControl>

        <Button
          isLoading={loading}
          loadingText="Loading"
          spinnerPlacement="start"
          type="submit"
          form="loginForm"
          colorScheme="teal"
          w={"100%"}
        >
          Log In
        </Button>
      </VStack>
    </form>
  );
};

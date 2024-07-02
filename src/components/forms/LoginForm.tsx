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
  VStack,
} from "@chakra-ui/react";
import { RiEyeFill, RiEyeOffFill } from "@remixicon/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>("hide");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email harus diisi"),
      password: Yup.string().required("Password harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/fill-data");
      }, 1000);
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

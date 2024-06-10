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

const initialValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

export const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>("hide");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      username: Yup.string().required("Username harus diisi"),
      email: Yup.string().email("Invalid email").required("Email harus diisi"),
      password: Yup.string().required("Password harus diisi"),
      phone: Yup.string().required("Nomor telepon harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 1000 * 2);
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

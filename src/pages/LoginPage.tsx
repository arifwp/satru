import {
  Image,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useScreenWidth from "../lib/useScreenWidth";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { LoginForm } from "../components/forms/LoginForm";

export const LoginPage = () => {
  const sw = useScreenWidth();

  return (
    <VStack
      w={"100%"}
      h={"100vh"}
      overflow={"clip"}
      overflowY={"auto"}
      className="root-login-page"
    >
      <SimpleGrid
        columns={[1, 2, 2]}
        spacing={0}
        w={"100%"}
        h={"100%"}
        className="simplegrid"
        p={4}
      >
        <VStack
          bgColor={"teal.400"}
          p={10}
          borderRadius={"xl"}
          justify={"center"}
          textAlign={"center"}
        >
          <HStack className="wrap-logo">
            <Image
              src="https://placehold.co/600x400/000000/FFFFFF/png"
              w={"100%"}
              maxW={"28px"}
            />
            <Heading as={"h6"} fontSize={"20px"}>
              Satru
            </Heading>
          </HStack>

          <Heading mt={4}>Selamat datang di Satru</Heading>
          <Text mt={2}>
            Satru bantu kamu memanajemen usaha kamu agar makin berkembang
          </Text>

          {sw > 640 && (
            <Image
              src="/assets/svg/illustration_login.svg"
              mt={8}
              w={"100%"}
              maxW={"200px"}
            />
          )}
        </VStack>

        <VStack p={10} justify={"center"} position={"relative"}>
          <Heading>Masuk ke akun anda</Heading>
          <Text variant={"secondary"}>
            Masuk untuk bisa memanajemen usaha anda
          </Text>

          <LoginForm />
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};

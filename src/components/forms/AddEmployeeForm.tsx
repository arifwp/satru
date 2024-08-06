import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiEyeFill, RiEyeOffFill } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { useBgComponentBaseColor } from "../../constant/colors";
import { getDataUser } from "../../utils/helperFunction";
import { CButton } from "../CButton";
import { SelectDateSingle } from "../modal/dedicated/SelectDateSingle";
import { SelectInputOutlet } from "../modal/dedicated/SelectInputOutlet";

const initialValues = {
  name: undefined,
  email: undefined,
  password: undefined,
  phone: undefined,
  bornDate: undefined,
  outlet: [],
};

export const AddEmployeeForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string>("hide");
  const toast = useToast();
  const bgComp = useBgComponentBaseColor();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      email: Yup.string()
        .required("Email harus diisi")
        .email("Format email harus benar"),
      password: Yup.string().required("Kata sandi harus diisi"),
      phone: Yup.string()
        .required("Nomor telepon harus diisi")
        .test({
          name: "wrong-format-phone-number",
          message: "Format nomor whatsapp salah",
          test: function (value) {
            return value !== undefined && value[0] !== "8" ? false : true;
          },
        }),
      bornDate: Yup.string().required("Tanggal lahir harus diisi"),
      outlet: Yup.array()
        .required("Outlet harus diisi")
        .test({
          name: "requiredOutlet",
          message: "Pilih outlet terlebih dahulu",
          test: function (value) {
            return value.length !== 0;
          },
        }),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const token = getCookie("token");
      const arrOutletId =
        values.outlet && (values.outlet as any[]).map((item: any) => item._id);

      const formattedDate = values.bornDate
        ? (values.bornDate as unknown as string).split("/").reverse().join("-")
        : "";

      const request = {
        userId: getDataUser()._id,
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        owner: false,
        bornDate: formattedDate,
      };

      if (arrOutletId) {
        const dataArray = arrOutletId.join(",").split(",");

        Object.assign(request, { outletId: dataArray });
      }

      axios
        .post(`${process.env.REACT_APP_API_URL}/v1/user/createUser`, request, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          resetForm({ values: initialValues });
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
          setLoading(false);
        });
    },
  });

  const togglePassword = () => {
    toggle === "show" ? setToggle("hide") : setToggle("show");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <form
      id="addEmployeeForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%" }}
    >
      <VStack spacing={6} bg={bgComp} p={4} borderRadius={"md"}>
        <FormControl
          isInvalid={formik.errors.name && formik.touched.name ? true : false}
        >
          <FormLabel htmlFor="name">Nama Karyawan</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name || ""}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.errors.email && formik.touched.email ? true : false}
        >
          <FormLabel htmlFor="name">Email Karyawan</FormLabel>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email || ""}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.password && formik.touched.password ? true : false
          }
        >
          <FormLabel htmlFor="name">Password</FormLabel>

          <InputGroup>
            <Input
              name="password"
              type={toggle === "show" ? "text" : "password"}
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password || ""}
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
          <InputGroup>
            <InputLeftElement
              pointerEvents={"none"}
              color={"gray.300"}
              fontSize={[12, null, 14]}
            >
              +62
            </InputLeftElement>
            <Input
              name="phone"
              type="text"
              placeholder="Phone"
              onChange={formik.handleChange}
              value={formik.values.phone || ""}
            />
          </InputGroup>
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
              formik.setFieldValue("bornDate", inputValue);
            }}
            w={"100%"}
            h={"40px"}
            borderWidth={!!formik.errors.bornDate ? "2px" : "1px"}
            borderColor={
              !!formik.errors.bornDate ? "red.300" : "rgba(255, 255, 255, 0.24)"
            }
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

        <FormControl
          isInvalid={
            formik.errors.outlet && formik.touched.outlet ? true : false
          }
        >
          <FormLabel htmlFor="outlet">Outlet</FormLabel>
          <SelectInputOutlet
            name="outlet"
            onConfirm={(inputValue) => {
              console.log(inputValue);
              formik.setFieldValue("outlet", inputValue);
            }}
            inputValue={formik.values.outlet}
            placeholder="Pilih Outlet"
            isError={
              formik.touched.outlet && formik.errors.outlet ? true : false
            }
            withSearch={true}
            w={"100%"}
          />
          <FormErrorMessage>{formik.errors.outlet as string}</FormErrorMessage>
        </FormControl>

        <HStack w={"100%"}>
          <CButton
            variant="outline"
            colorScheme="teal"
            w={"100%"}
            mt={4}
            onClick={handleBack}
          >
            Batal
          </CButton>

          <CButton
            form="addEmployeeForm"
            w={"100%"}
            mt={4}
            isLoading={loading}
            loadingText="Loading"
            spinnerPlacement="start"
            type="submit"
            colorScheme="teal"
          >
            Tambah Karyawan
          </CButton>
        </HStack>
      </VStack>
    </form>
  );
};

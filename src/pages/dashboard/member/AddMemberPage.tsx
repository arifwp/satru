import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { SelectDateSingle } from "../../../components/modal/dedicated/SelectDateSingle";
import {
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../../constant/colors";
import { getDataUser, getUserOrAdminId } from "../../../utils/helperFunction";

const initialValues = {
  name: undefined,
  phone: undefined,
  bornDate: undefined,
};

export const AddMemberPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const bgComp = useBgComponentBaseColor();
  const borderColor = useBorderColorInput();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Judul diskon harus diisi"),
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
    }),
    onSubmit: (values) => {
      setLoading(true);
      const token = getCookie("token");

      const formattedDate = values.bornDate
        ? (values.bornDate as unknown as string).split("/").reverse().join("-")
        : "";

      const request = {
        ownerId: getUserOrAdminId(),
        userId: getDataUser()._id,
        name: values.name,
        phone: values.phone,
        bornDate: formattedDate,
      };

      console.log(request);

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/v1/member/createMember`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: AxiosResponse) => {
          toast({
            title: JSON.parse(res.request.response).message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          navigate("/member");
        })
        .catch((err: AxiosError) => {
          toast({
            title: JSON.parse(err.request.response).message,
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
    <VStack className="add-member-container" w={"100%"} p={4}>
      <form
        id="addMemberForm"
        onSubmit={formik.handleSubmit}
        style={{ width: "100%" }}
      >
        <VStack
          w={"100%"}
          bg={bgComp}
          p={4}
          spacing={6}
          borderRadius={"md"}
          align={"stretch"}
        >
          <FormControl
            isInvalid={formik.errors.name && formik.touched.name ? true : false}
          >
            <FormLabel htmlFor="name">Nama</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="Promo Kemerdekaan"
              onChange={formik.handleChange}
              value={formik.values.name || ""}
              borderColor={borderColor}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              formik.errors.phone && formik.touched.phone ? true : false
            }
          >
            <FormLabel htmlFor="phone">Nomor Whatsapp</FormLabel>
            <InputGroup borderColor={borderColor}>
              <InputLeftElement
                pointerEvents={"none"}
                fontSize={[12, null, 14]}
              >
                +62
              </InputLeftElement>
              <Input
                name="phone"
                type="text"
                placeholder="85000000000"
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
              placeholder="17/08/1945"
              onConfirm={(inputValue) => {
                formik.setFieldValue("bornDate", inputValue);
              }}
              w={"100%"}
              h={"40px"}
              borderWidth={
                !!formik.errors.bornDate && formik.touched.bornDate
                  ? "3px"
                  : "1px"
              }
              borderColor={
                !!formik.errors.bornDate && formik.touched.bornDate
                  ? "red.300"
                  : borderColor
              }
              color={
                formik.values.bornDate ? "fieldtext !important" : "#96969691"
              }
              fontWeight={"normal"}
              fontSize={"sm"}
              justifyContent={"flex-start"}
            />

            <FormErrorMessage>{formik.errors.bornDate}</FormErrorMessage>
          </FormControl>

          <Button
            form="addMemberForm"
            type="submit"
            w={"100%"}
            size={"sm"}
            isLoading={loading}
            loadingText="Loading"
            spinnerPlacement="start"
            colorScheme="teal"
            variant={"solid"}
          >
            Tambah Member
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

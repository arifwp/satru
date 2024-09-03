import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { SelectDateSingle } from "../../../components/modal/dedicated/SelectDateSingle";
import {
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../../constant/colors";
import { MemberInterface } from "../../../constant/Member";

export const EditMemberPage = () => {
  const [data, setData] = useState<MemberInterface | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { memberId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const bgComp = useBgComponentBaseColor();
  const borderColor = useBorderColorInput();

  useEffect(() => {
    const token = getCookie("token");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/member/detailMember/${memberId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        const obj: MemberInterface = JSON.parse(res.request.response).data;
        const trimmedPhone = obj.phone.slice(2);
        // Hanya update state jika phone berubah
        if (data?.phone !== trimmedPhone) {
          obj.phone = trimmedPhone;
          setData(obj);
        }
      })
      .catch((err: AxiosError) => {
        toast({
          title: JSON.parse(err.request.response).message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [memberId, toast, data?.phone]);

  const initialValues = {
    name: data && data.name,
    phone: data && data.phone,
    bornDate: data?.bornDate
      ? new Date(data.bornDate).toLocaleDateString("en-GB")
      : "",
  };

  const formik = useFormik({
    enableReinitialize: true,
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
        ownerId: data?.ownerId,
        userId: data?.assignedBy,
        memberId: data?._id,
        name: values.name,
        phone: values.phone,
        bornDate: formattedDate,
      };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/v1/member/updateMember`,
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
            status: "success",
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
    <VStack className="edit-member-container" w={"100%"} p={4}>
      <form
        id="editMemberForm"
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
            <Skeleton isLoaded={loaded} borderRadius={"md"}>
              <Input
                name="name"
                type="text"
                placeholder="Promo Kemerdekaan"
                onChange={formik.handleChange}
                value={formik.values.name || ""}
                borderColor={borderColor}
              />
            </Skeleton>
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              formik.errors.phone && formik.touched.phone ? true : false
            }
          >
            <FormLabel htmlFor="phone">Nomor Whatsapp</FormLabel>
            <Skeleton isLoaded={loaded} borderRadius={"md"}>
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
            </Skeleton>
            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              formik.errors.bornDate && formik.touched.bornDate ? true : false
            }
          >
            <FormLabel htmlFor="bornDate">Tanggal lahir</FormLabel>
            <Skeleton isLoaded={loaded} borderRadius={"md"}>
              <SelectDateSingle
                initialDate={
                  formik.values.bornDate
                    ? new Date(
                        formik.values.bornDate.split("/").reverse().join("-")
                      )
                    : undefined
                }
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
            </Skeleton>
            <FormErrorMessage>{formik.errors.bornDate}</FormErrorMessage>
          </FormControl>

          <Button
            form="editMemberForm"
            type="submit"
            w={"100%"}
            size={"sm"}
            isLoading={loading}
            loadingText="Loading"
            spinnerPlacement="start"
            colorScheme="teal"
            variant={"solid"}
          >
            Edit Member
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

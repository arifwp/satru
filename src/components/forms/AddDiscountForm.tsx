import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import {
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../constant/colors";
import { getDataUser } from "../../utils/helperFunction";
import { DiscountTypeInterface } from "../drawer/dedicated/DetailItemDrawer";
import { NumberInput } from "../input/NumberInput";
import { SelectDateSingle } from "../modal/dedicated/SelectDateSingle";
import { SelectInputOutlet } from "../modal/dedicated/SelectInputOutlet";

const initialValues = {
  ownerId: undefined,
  outlet: [],
  name: undefined,
  discountType: undefined,
  discount: undefined,
  expiredDate: undefined,
};

const dataDiscountType = [
  { id: 1, name: "Rp" },
  { id: 2, name: "%" },
];

export const AddDiscountForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [discountRpPercentage, setDiscountRpPercentage] = useState<
    DiscountTypeInterface | undefined
  >(undefined);
  const bgComp = useBgComponentBaseColor();
  const borderColor = useBorderColorInput();
  const toast = useToast();

  useEffect(() => {
    formik.setFieldValue("discountType", 1);
    setDiscountRpPercentage(dataDiscountType[0]);
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Judul diskon harus diisi"),
      outlet: Yup.array()
        .required("Outlet harus diisi")
        .test({
          name: "requiredOutlet",
          message: "Pilih outlet terlebih dahulu",
          test: function (value) {
            return value.length !== 0;
          },
        }),
      discountType: Yup.string().required("Jenis diskon harus diisi"),
      discount: Yup.number()
        .required("Harga harus diisi")
        .typeError("Harga harus berupa angka"),
      expiredDate: Yup.string().required("Tanggal berakhir diskon harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const token = getCookie("token");
      const formattedDate = values.expiredDate
        ? (values.expiredDate as unknown as string)
            .split("/")
            .reverse()
            .join("-")
        : "";

      const arrOutletId =
        values.outlet && (values.outlet as any[]).map((item: any) => item._id);

      const request = {
        ownerId: getDataUser()._id,
        outletId: arrOutletId,
        name: values.name,
        discountType: values.discountType,
        discount: values.discount,
        expiredDate: formattedDate,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/v1/discount/createDiscount`,
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
          resetForm({ values: initialValues });
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

  const selectDiscountType = (val: DiscountTypeInterface) => {
    setDiscountRpPercentage(val);
    formik.setFieldValue("discountType", val.id);
    console.log("type", val.id);
  };

  const handleInputDiscount = (event: any) => {
    let newDiscount = event.replace(/[^0-9]/g, "");
    formik.setFieldValue("discount", newDiscount);
    console.log(newDiscount);
  };

  return (
    <form
      id="addDiscountForm"
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
          isInvalid={
            formik.errors.outlet && formik.touched.outlet ? true : false
          }
        >
          <FormLabel htmlFor="outlet">Outlet</FormLabel>
          <SelectInputOutlet
            name="outlet"
            onConfirm={(inputValue) => {
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

        <FormControl
          isInvalid={formik.errors.name && formik.touched.name ? true : false}
        >
          <FormLabel htmlFor="name">Nama Diskon</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="Promo Kemerdekaan"
            onChange={formik.handleChange}
            value={formik.values.name || ""}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.discountType && formik.touched.discountType
              ? true
              : false
          }
        >
          <FormLabel htmlFor="discountType">Jenis Diskon</FormLabel>
          <HStack>
            {dataDiscountType.map((item) => (
              <Box
                key={item.id}
                py={2}
                px={3}
                borderRadius={"md"}
                borderWidth={"1px"}
                borderColor={
                  discountRpPercentage && discountRpPercentage.id === item.id
                    ? "teal.400"
                    : borderColor
                }
                cursor={"pointer"}
                onClick={() => selectDiscountType(item)}
              >
                <Text>{item.name}</Text>
              </Box>
            ))}
          </HStack>
          <FormErrorMessage>{formik.errors.discountType}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.discount && formik.touched.discount ? true : false
          }
        >
          <FormLabel htmlFor="discount">Diskon</FormLabel>
          {discountRpPercentage && discountRpPercentage.id === 1 ? (
            <NumberInput
              name="discount"
              onChange={(inputValue) => {
                formik.setFieldValue("discount", inputValue);
              }}
              inputValue={formik.values.discount}
              placeholder="Diskon dengan rupiah"
              isCurrency={true}
            />
          ) : (
            <InputGroup>
              <InputLeftElement pointerEvents="none" fontSize={"sm"}>
                %
              </InputLeftElement>
              <Input
                name="discount"
                type="text"
                value={formik.values.discount || ""}
                placeholder="Diskon dengan persen"
                autoComplete="off"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputDiscount(event.target.value);
                }}
              />
            </InputGroup>
          )}
          <FormErrorMessage>{formik.errors.discountType}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.expiredDate && formik.touched.expiredDate
              ? true
              : false
          }
        >
          <FormLabel htmlFor="expiredDate">Tanggal Akhir Diskon</FormLabel>
          <SelectDateSingle
            initialDate={null}
            placeholder="Tanggal berakhir diskon"
            onConfirm={(inputValue) => {
              formik.setFieldValue("expiredDate", inputValue);
            }}
            w={"100%"}
            h={"40px"}
            borderWidth={!!formik.errors.expiredDate ? "2px" : "1px"}
            borderColor={
              !!formik.errors.expiredDate && formik.touched.expiredDate
                ? "red.300"
                : borderColor
            }
            color={
              formik.values.expiredDate ? "fieldtext !important" : "#96969691"
            }
            fontWeight={"normal"}
            fontSize={"sm"}
            justifyContent={"flex-start"}
          />
          <FormErrorMessage>{formik.errors.expiredDate}</FormErrorMessage>
        </FormControl>

        <Button
          form="addDiscountForm"
          type="submit"
          w={"100%"}
          size={"sm"}
          isLoading={loading}
          loadingText="Loading"
          spinnerPlacement="start"
          colorScheme="teal"
          variant={"solid"}
        >
          Tambah Diskon
        </Button>
      </VStack>
    </form>
  );
};

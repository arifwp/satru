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
  Skeleton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { DiscountTypeInterface } from "../../../components/drawer/dedicated/DetailItemDrawer";
import { NumberInput } from "../../../components/input/NumberInput";
import { SelectDateSingle } from "../../../components/modal/dedicated/SelectDateSingle";
import { SelectInputOutlet } from "../../../components/modal/dedicated/SelectInputOutlet";
import {
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../../constant/colors";
import { DiscountInterface } from "../../../constant/Discount";
import { getDataUser, getUserOrAdminId } from "../../../utils/helperFunction";

const dataDiscountType = [
  { id: 1, name: "Rp" },
  { id: 2, name: "%" },
];

export const EditDiscountPage = () => {
  const { discountId } = useParams();
  const [data, setData] = useState<DiscountInterface | undefined>(undefined);
  const [discountRpPercentage, setDiscountRpPercentage] = useState<
    DiscountTypeInterface | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const toast = useToast();
  const bgComp = useBgComponentBaseColor();
  const borderColor = useBorderColorInput();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserOrAdminId();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/discount/detailDiscount/${userId}/${discountId}`
      )
      .then((res: AxiosResponse) => {
        setData(JSON.parse(res.request.response).data);
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
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    formik.setFieldValue(
      "discountType",
      data && data.discountType === 1 ? 1 : 2
    );
    setDiscountRpPercentage(
      data && data.discountType === 1
        ? dataDiscountType[0]
        : dataDiscountType[1]
    );
  }, [data?.discountType]);

  const initialValues = {
    outlet: (data && data.outlet) || [],
    name: data && data.name,
    discountType: data && data.discountType,
    discount: data && data.discount,
    expiredDate: data?.expiredDate
      ? new Date(data.expiredDate).toLocaleDateString("en-GB")
      : "",
  };

  const formik = useFormik({
    enableReinitialize: true,
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
    onSubmit: (values) => {
      setLoading(true);

      if (getDataUser().owner !== true) {
        toast({
          title: "Merubah diskon hanya bisa dilakukan oleh akun pemilik toko",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const token = getCookie("token");
      const userId = getDataUser()._id;

      const arrOutletId =
        values.outlet && (values.outlet as any[]).map((item: any) => item._id);

      const formattedDate = values.expiredDate
        ? (values.expiredDate as unknown as string)
            .split("/")
            .reverse()
            .join("-")
        : "";

      const request = {
        discountId: data?._id,
        ownerId: userId,
        outletId: arrOutletId,
        name: values.name,
        discountType: values.discountType,
        discount: values.discount,
        expiredDate: formattedDate,
      };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/v1/discount/updateDiscount`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Beaerr ${token}`,
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

          navigate("/discount");
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

  const selectDiscountType = (val: DiscountTypeInterface) => {
    setDiscountRpPercentage(val);
    formik.setFieldValue("discountType", val.id);
  };

  const handleInputDiscount = (event: any) => {
    let newDiscount = event.replace(/[^0-9]/g, "");
    formik.setFieldValue("discount", newDiscount);
  };

  return (
    <VStack className="edit-discount" w={"100%"} p={4}>
      <form
        id="editDiscountForm"
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
            <Skeleton isLoaded={loaded} borderRadius={"md"}>
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
            </Skeleton>
            <FormErrorMessage>
              {formik.errors.outlet as string}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.errors.name && formik.touched.name ? true : false}
          >
            <FormLabel htmlFor="name">Nama Diskon</FormLabel>
            <Skeleton isLoaded={loaded} borderRadius={"md"}>
              <Input
                name="name"
                type="text"
                placeholder="Promo Desember"
                onChange={formik.handleChange}
                value={formik.values.name || ""}
              />
            </Skeleton>

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
                <Skeleton
                  key={item.id}
                  isLoaded={loaded}
                  borderRadius={"md"}
                  w={"fit-content"}
                >
                  <Box
                    py={2}
                    px={3}
                    borderRadius={"md"}
                    borderWidth={"1px"}
                    borderColor={
                      discountRpPercentage &&
                      discountRpPercentage.id === item.id
                        ? "teal.400"
                        : borderColor
                    }
                    cursor={"pointer"}
                    onClick={() => selectDiscountType(item)}
                  >
                    <Text>{item.name}</Text>
                  </Box>
                </Skeleton>
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
            <Skeleton isLoaded={loaded} borderRadius={"md"}>
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
            </Skeleton>
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
            <Skeleton isLoaded={loaded} borderRadius={"md"}>
              <SelectDateSingle
                initialDate={
                  formik.values.expiredDate
                    ? new Date(
                        formik.values.expiredDate.split("/").reverse().join("-")
                      )
                    : undefined
                }
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
                  formik.values.expiredDate
                    ? "fieldtext !important"
                    : "#96969691"
                }
                fontWeight={"normal"}
                fontSize={"sm"}
                justifyContent={"flex-start"}
              />
            </Skeleton>
            <FormErrorMessage>{formik.errors.expiredDate}</FormErrorMessage>
          </FormControl>

          <Button
            form="editDiscountForm"
            type="submit"
            w={"100%"}
            size={"sm"}
            isLoading={loading}
            loadingText="Loading"
            spinnerPlacement="start"
            colorScheme="teal"
            variant={"solid"}
          >
            Edit Diskon
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

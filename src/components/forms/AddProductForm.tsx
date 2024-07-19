import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useBgComponentBaseColor } from "../../constant/colors";
import useScreenWidth from "../../lib/useScreenWidth";
import { CButton } from "../CButton";
import { SelectInputBrand } from "../modal/dedicated/SelectInputBrand";
import { SelectInputCategory } from "../modal/dedicated/SelectInputCategory";
import { NumberInput } from "../input/NumberInput";
import { FileInput } from "../input/dedicated/FileInput";
import { getDataUser } from "../../utils/helperFunction";
import { getCookie } from "typescript-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SelectInputOutlet } from "../modal/dedicated/SelectInputOutlet";

const initialValues = {
  ownerId: undefined,
  outlet: [],
  imageProduct: undefined,
  code: undefined,
  name: undefined,
  description: undefined,
  price: undefined,
  category: undefined,
  brand: undefined,
  stock: undefined,
  minimumStock: undefined,
  isHaveVariant: undefined,
  variant: [
    {
      variantName: undefined,
      variantPrice: undefined,
      variantStock: undefined,
      variantMinimumStock: undefined,
    },
  ],
};

export const AddProductForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const sw = useScreenWidth();

  const bgComponent = useBgComponentBaseColor();

  const fileInputRef = useRef<{ reset: () => void }>(null);

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      price: Yup.number()
        .required("Harga harus diisi")
        .typeError("Harga harus berupa angka"),
      outlet: Yup.array().required("Outlet harus diisi"),
      category: Yup.object().required("Kategori harus diisi"),
      stock: Yup.number().required("Stok harus diisi"),
      minimumStock: Yup.number().test({
        name: "minimumstock-less-than-stock",
        message: "Minimal stock tidak boleh lebih dari stok",
        test: function (value) {
          const { stock }: { stock: number } = this.parent;

          return value !== undefined && stock !== undefined
            ? value <= stock
            : true;
        },
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const token = getCookie("token");

      const category = JSON.stringify(values.category);
      const brand = JSON.stringify(values.brand);
      const outlet = JSON.stringify(values.outlet);

      const arrOutletId =
        values.outlet && (values.outlet as any[]).map((item: any) => item._id);
      const formData = new FormData();
      formData.append("ownerId", getDataUser()._id);
      if (arrOutletId) {
        const dataArray = arrOutletId.join(",").split(",");
        for (let i = 0; i < values.outlet.length; i++) {
          formData.append(`outletId[${i}]`, dataArray[i]);
        }
      }
      formData.append("name", values.name || "");
      formData.append("price", values.price || "");
      formData.append("categoryId", JSON.parse(category)._id);
      formData.append("stock", values.stock || "");

      const newValue = {
        ownerId: getDataUser()._id,
        outletId: JSON.parse(outlet)._id,
        name: values.name,
        price: values.price,
        categoryId: JSON.parse(category)._id,
        stock: values.stock,
      };

      if (values.code) {
        formData.append("code", values.code || "");
        Object.assign(newValue, { code: values.code });
      }

      if (values.description) {
        formData.append("description", values.description || "");
        Object.assign(newValue, { description: values.description });
      }

      if (values.brand) {
        formData.append("brandId", JSON.parse(brand)._id);
        Object.assign(newValue, { code: JSON.parse(brand)._id });
      }

      if (values.minimumStock) {
        formData.append("minimumStock", values.minimumStock || "");
        Object.assign(newValue, { minimumStock: values.minimumStock });
      }

      if (values.imageProduct) {
        formData.append("imageProduct", values.imageProduct || "");
        Object.assign(newValue, { imageProduct: values.imageProduct });
      }

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/v1/product/createProduct`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response: AxiosResponse) => {
          resetForm({ values: initialValues });
          if (fileInputRef.current) {
            fileInputRef.current.reset();
          }
          toast({
            title: JSON.parse(response.request.response).message,
            status: "success",
            duration: 2000,
          });
        })
        .catch((error: AxiosError) => {
          toast({
            title: JSON.parse(error.request.response).message,
            status: "error",
            duration: 2000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleBack = () => {
    window.history.back();
  };

  return (
    <form
      id="addProductForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%" }}
    >
      <Stack
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
        w={"100%"}
        spacing={4}
      >
        <VStack
          className="left-container"
          w={sw > 768 ? "70%" : "100%"}
          spacing={4}
        >
          <VStack
            className="general-information"
            w={"100%"}
            p={4}
            borderRadius={"md"}
            spacing={6}
            bg={bgComponent}
            align={"stretch"}
          >
            <Text as={"b"}>Informasi umum</Text>
            <FormControl>
              <FormLabel htmlFor="code">Kode Produk</FormLabel>
              <Input
                name="code"
                type="text"
                placeholder="ABC-001"
                onChange={formik.handleChange}
                value={formik.values.code || ""}
                fontSize={"xs"}
              />
            </FormControl>

            <FormControl
              isInvalid={
                formik.errors.name && formik.touched.name ? true : false
              }
            >
              <FormLabel htmlFor="name">Nama Produk</FormLabel>
              <Input
                name="name"
                type="text"
                placeholder="Xiaomi M2 Pro"
                onChange={formik.handleChange}
                value={formik.values.name || ""}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                formik.errors.price && formik.touched.price ? true : false
              }
            >
              <FormLabel htmlFor="price">Harga Jual</FormLabel>
              <NumberInput
                name="price"
                onChange={(inputValue) => {
                  formik.setFieldValue("price", inputValue);
                }}
                inputValue={formik.values.price}
                placeholder="1.650.000"
                isCurrency={true}
              />
              <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Deskripsi Produk</FormLabel>
              <Textarea
                name="description"
                size="sm"
                resize={"vertical"}
                placeholder="lorem ipsum dolor sit amet"
                onChange={formik.handleChange}
                value={formik.values.description || ""}
              />
            </FormControl>
          </VStack>

          <VStack
            className="label"
            w={"100%"}
            p={4}
            borderRadius={"md"}
            spacing={6}
            bg={bgComponent}
            align={"stretch"}
          >
            <VStack className="category" align={"stretch"} spacing={6}>
              <Text as={"b"}>Kelola Label</Text>

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
                <FormErrorMessage>
                  {formik.errors.outlet as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  formik.errors.category && formik.touched.category
                    ? true
                    : false
                }
              >
                <FormLabel htmlFor="category">Kategori</FormLabel>
                <SelectInputCategory
                  name="category"
                  onConfirm={(inputValue) => {
                    formik.setFieldValue("category", inputValue);
                  }}
                  inputValue={formik.values.category}
                  placeholder="Pilih Kategori"
                  isError={
                    formik.touched.category && formik.errors.category
                      ? true
                      : false
                  }
                  withSearch={true}
                  w={"100%"}
                />
                <FormErrorMessage>
                  {formik.errors.category as string}
                </FormErrorMessage>
              </FormControl>
            </VStack>

            <VStack className="brand">
              <FormControl>
                <FormLabel htmlFor="brand">Merk</FormLabel>
                <SelectInputBrand
                  name="brand"
                  onConfirm={(inputValue) => {
                    formik.setFieldValue("brand", inputValue);
                  }}
                  inputValue={formik.values.brand}
                  placeholder="Pilih Merk"
                  isError={
                    formik.touched.brand && formik.errors.brand ? true : false
                  }
                  withSearch={true}
                  w={"100%"}
                />
              </FormControl>
            </VStack>
          </VStack>

          <VStack
            className="stock"
            w={"100%"}
            p={4}
            borderRadius={"md"}
            spacing={6}
            bg={bgComponent}
            align={"stretch"}
          >
            <VStack className="stock-form" align={"stretch"} spacing={6}>
              <Text as={"b"}>Manajemen Stok</Text>

              <FormControl
                isInvalid={
                  formik.errors.stock && formik.touched.stock ? true : false
                }
              >
                <FormLabel htmlFor="stock">Stok</FormLabel>
                <NumberInput
                  name="stock"
                  onChange={(inputValue) => {
                    formik.setFieldValue("stock", inputValue);
                  }}
                  inputValue={formik.values.stock}
                  placeholder="12"
                  isCurrency={false}
                />
                <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
              </FormControl>
            </VStack>

            <VStack className="minimum-stock">
              <FormControl
                isInvalid={
                  formik.errors.minimumStock && formik.touched.minimumStock
                    ? true
                    : false
                }
              >
                <FormLabel htmlFor="minimumStock">Minimal Stok</FormLabel>
                <NumberInput
                  name="minimumStock"
                  onChange={(inputValue) => {
                    formik.setFieldValue("minimumStock", inputValue);
                  }}
                  inputValue={formik.values.minimumStock}
                  placeholder="12"
                  isCurrency={false}
                />
                <FormHelperText fontSize={"xs"}>
                  Kami akan memberikan notifikasi ketika stok anda mencapai
                  minimal stok
                </FormHelperText>
                <FormErrorMessage>
                  {formik.errors.minimumStock}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </VStack>

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
              form="addProductForm"
              w={"100%"}
              mt={4}
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              type="submit"
              colorScheme="teal"
            >
              Tambah Produk
            </CButton>
          </HStack>
        </VStack>

        <VStack
          className="right-container"
          w={sw > 768 ? "30%" : "100%"}
          spacing={4}
        >
          <VStack
            w={"100%"}
            p={4}
            borderRadius={"md"}
            spacing={6}
            bg={bgComponent}
            align={"stretch"}
          >
            <Text as={"b"}>Media</Text>

            <FormControl>
              <FormLabel htmlFor="imageProduct">Foto</FormLabel>
              <FileInput
                ref={fileInputRef}
                onFileChange={(inputValue) => {
                  formik.setFieldValue("imageProduct", inputValue);
                }}
                onHandleDrop={(inputValue) => {
                  formik.setFieldValue("imageProduct", inputValue);
                }}
              />
            </FormControl>
          </VStack>
        </VStack>
      </Stack>
    </form>
  );
};

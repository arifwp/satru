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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { CButton } from "../../../components/CButton";
import { SelectBrand } from "../../../components/SelectBrand";
import { SelectCategory } from "../../../components/SelectCategory";
import { PriceInput } from "../../../components/input/PriceInput";
import { FileInput } from "../../../components/input/dedicated/FileInput";
import useScreenWidth from "../../../lib/useScreenWidth";
import { useBgComponentBaseColor } from "../../../constant/colors";
import { AddProductForm } from "../../../components/forms/AddProductForm";

const initialValues = {
  img: undefined,
  code: undefined,
  name: undefined,
  description: undefined,
  price: undefined,
  discount: undefined,
  category: undefined,
  brand: undefined,
  stock: undefined,
  minimumStock: undefined,
  isHaveVariant: false,
  variant: [
    {
      variantName: undefined,
      variantPrice: undefined,
      variantStock: undefined,
      variantMinimumStock: undefined,
    },
  ],
};

export const AddProductPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const sw = useScreenWidth();

  const bgComponent = useBgComponentBaseColor();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      price: Yup.number()
        .required("Harga harus diisi")
        .typeError("Harga harus berupa angka"),
      category: Yup.object().required("Kategori harus diisi"),
      stock: Yup.number().required("Stok harus diisi"),
    }),
    onSubmit: (values) => {
      console.log("submit!");
      // console.log(JSON.stringify(values));
      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      //   // navigate("/product");
      // }, 500);
    },
  });

  const handleBack = () => {
    window.history.back();
  };

  return (
    <VStack className="add-product-container" w={"100%"} p={4}>
      <AddProductForm />
      {/* <form
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
                <FormLabel htmlFor="code">
                  Kode Produk
                  <Text variant={"secondary"} as={"i"} fontSize={"xs"}>
                    (Opsional)
                  </Text>
                </FormLabel>
                <Input
                  name="code"
                  type="text"
                  placeholder="ABC-001"
                  onChange={formik.handleChange}
                  fontSize={"xs"}
                />
              </FormControl>

              <FormControl
                isInvalid={
                  formik.errors.name && formik.touched.name ? true : false
                }
              >
                <FormLabel htmlFor="name" className="form-label">
                  Nama Produk
                </FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder="Xiaomi M2 Pro"
                  onChange={formik.handleChange}
                />
                <FormErrorMessage fontSize={"xs"}>
                  {formik.errors.name}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  formik.errors.price && formik.touched.price ? true : false
                }
              >
                <FormLabel htmlFor="price" className="form-label">
                  Harga Jual
                </FormLabel>
                <PriceInput
                  name="price"
                  onChange={(inputValue) => {
                    formik.setFieldValue("price", inputValue);
                  }}
                  inputValue={formik.values.price}
                  placeholder="1.650.000"
                  isError={!!formik.errors.price}
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

                <FormControl isInvalid={formik.errors.category ? true : false}>
                  <FormLabel htmlFor="category">Kategori</FormLabel>
                  <SelectCategory
                    name="category"
                    onConfirm={(inputValue) => {
                      formik.setFieldValue("category", inputValue);
                    }}
                    inputValue={formik.values.category}
                    placeholder="Pilih Kategori"
                    isError={!!formik.errors.category}
                    withSearch={true}
                  />
                  <FormErrorMessage>
                    {formik.errors.category as string}
                  </FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack className="brand">
                <FormControl isInvalid={formik.errors.brand ? true : false}>
                  <FormLabel htmlFor="brand">Merk</FormLabel>
                  <SelectBrand
                    name="brand"
                    onConfirm={(inputValue) => {
                      formik.setFieldValue("brand", inputValue);
                    }}
                    inputValue={formik.values.brand}
                    placeholder="Pilih Kategori"
                    isError={!!formik.errors.brand}
                    withSearch={true}
                  />
                  <FormErrorMessage>
                    {formik.errors.brand as string}
                  </FormErrorMessage>
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

                <FormControl isInvalid={formik.errors.stock ? true : false}>
                  <FormLabel htmlFor="stock">Stok</FormLabel>
                  <Input
                    name="stock"
                    type="number"
                    placeholder="69"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack className="minimum-stock">
                <FormControl
                  isInvalid={formik.errors.minimumStock ? true : false}
                >
                  <FormLabel htmlFor="minimumStock">Minimal Sotk</FormLabel>
                  <Input
                    name="minimumStock"
                    type="number"
                    placeholder="5"
                    onChange={formik.handleChange}
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

              <FileInput
                onFileChange={(inputValue) => {
                  formik.setFieldValue("img", inputValue);
                }}
                onHandleDrop={(inputValue) => {
                  formik.setFieldValue("img", inputValue);
                }}
              />
            </VStack>
          </VStack>
        </Stack>
      </form> */}
    </VStack>
  );
};

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { CButton } from "../../../components/CButton";
import { SelectCategory } from "../../../components/SelectCategory";
import useScreenWidth from "../../../lib/useScreenWidth";
import { SelectBrand } from "../../../components/SelectBrand";
import { FileInput } from "../../../components/input/dedicated/FileInput";

const initialValues = {
  img: undefined,
  code: undefined,
  name: undefined,
  description: undefined,
  price: undefined,
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
  const [previewImage, setPreviewImage] = useState<string>("");
  const toast = useToast();
  const sw = useScreenWidth();

  const bgComponent = useColorModeValue("#F8F9FA", "#1C1C1E");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const bgHover = useColorModeValue("#ebedf0", "#ebedf020");

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      price: Yup.number().required("Harga harus diisi"),
      category: Yup.object().required("Kategori harus diisi"),
      stock: Yup.number().required("Stok harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // navigate("/product");
      }, 1000);
    },
  });

  console.log(formik.values);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("img", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      formik.setFieldValue("img", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <VStack className="add-product-container" w={"100%"} p={4}>
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
                <FormLabel htmlFor="code">
                  Kode Produk{" "}
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
                <Text as={"b"}>Label</Text>

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
                    // maxW={"calc(307.6px - 16px)"}
                  />
                  <FormErrorMessage>
                    {formik.errors.category as string}
                  </FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack className="brand">
                <FormControl isInvalid={formik.errors.category ? true : false}>
                  <FormLabel htmlFor="brand">Brand</FormLabel>
                  <SelectBrand
                    name="brand"
                    onConfirm={(inputValue) => {
                      formik.setFieldValue("brand", inputValue);
                    }}
                    inputValue={formik.values.brand}
                    placeholder="Pilih Kategori"
                    isError={!!formik.errors.brand}
                    withSearch={true}
                    // maxW={"calc(307.6px - 16px)"}
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
                <Text as={"b"}>Label</Text>

                <FormControl isInvalid={formik.errors.stock ? true : false}>
                  <FormLabel htmlFor="stock">Stok</FormLabel>
                  <Input
                    name="stock"
                    type="number"
                    placeholder="69"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>
                    {formik.errors.stock as string}
                  </FormErrorMessage>
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
                    {formik.errors.minimumStock as string}
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

              {/* <FormControl>
                <FormLabel htmlFor="img">Foto</FormLabel>
                <Box
                  p={2}
                  border={"1px dashed"}
                  borderColor={"gray.400"}
                  borderRadius={"md"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  cursor={"pointer"}
                  _hover={{ bg: bgHover }}
                  onClick={() => inputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Product Preview"
                      // boxSize="200px"
                      objectFit="contain"
                    />
                  ) : (
                    <>
                      <Image
                        src="/assets/svg/ic_upload.svg"
                        w={"100%"}
                        maxW={"100px"}
                      />
                      <Text fontSize={"xs"}>
                        Geser foto anda disini atau klik untuk memilih
                      </Text>
                      <Text fontSize={"xs"} color="gray.500">
                        (JPG, JPEG, PNG)
                      </Text>
                    </>
                  )}
                </Box>
                <Input
                  ref={inputRef}
                  id="imgInput"
                  type="file"
                  name="img"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                    handleFileChange(event);
                    formik.handleChange(event);
                  }}
                  display={"none"}
                />
                <CButton mt={4} variant="outline" colorScheme="red">
                  Reset
                </CButton>
              </FormControl> */}
            </VStack>
          </VStack>
        </Stack>
      </form>
    </VStack>
  );
};

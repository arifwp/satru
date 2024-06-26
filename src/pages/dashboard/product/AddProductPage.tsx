import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
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
import { PickerModal } from "../../../components/modal/PickerModal";
import { category } from "../../../data/category";
import { SelectCategory } from "../../../components/SelectCategory";
import { SelectOption } from "../../../constant/SelectOption";

const initialValues = {
  img: undefined,
  code: undefined,
  name: undefined,
  description: undefined,
  price: undefined,
  category: undefined,
  merk: undefined,
  stock: undefined,
  isHaveVariant: false,
  variant: [
    {
      variantName: undefined,
      variantPrice: undefined,
      variantStock: undefined,
    },
  ],
};

export const AddProductPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const toast = useToast();
  // const navigate = useNavigate();
  const bgComponent = useColorModeValue("#F8F9FA", "#1C1C1E");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const bgHover = useColorModeValue("#ebedf0", "#ebedf020");

  const formik = useFormik({
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

  return (
    <VStack className="add-product-container" w={"100%"} p={4}>
      <form id="addProductForm" style={{ width: "100%" }}>
        <HStack align={"start"}>
          <VStack className="left-container" w={"100%"}>
            <VStack
              className="general-information"
              w={"100%"}
              p={4}
              borderRadius={"md"}
              spacing={6}
              bg={bgComponent}
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
          </VStack>

          <VStack className="right-container" w={"100%"}>
            <VStack
              w={"100%"}
              p={4}
              borderRadius={"md"}
              spacing={6}
              bg={bgComponent}
            >
              <Text as={"b"}>Media</Text>

              <FormControl>
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
              </FormControl>
            </VStack>
            <VStack
              className="category"
              w={"100%"}
              p={4}
              borderRadius={"md"}
              spacing={6}
              bg={bgComponent}
              align={"stretch"}
            >
              <Text>Label</Text>

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
          </VStack>
        </HStack>
      </form>
    </VStack>
  );
};

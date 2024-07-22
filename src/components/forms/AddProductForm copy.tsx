import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  ModalBody,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { RiDeleteBinLine } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { ProductVariantInterface } from "../../constant/Product";
import { useBgComponentBaseColor } from "../../constant/colors";
import formatNumber from "../../lib/formatNumber";
import useScreenWidth from "../../lib/useScreenWidth";
import { useProductVariantStore } from "../../store/useProductVariantStore";
import { getDataUser } from "../../utils/helperFunction";
import { CButton } from "../CButton";
import { NumberInput } from "../input/NumberInput";
import { FileInput } from "../input/dedicated/FileInput";
import { ModalInputForm } from "../modal/ModalInputForm";
import { SelectInputBrand } from "../modal/dedicated/SelectInputBrand";
import { SelectInputCategory } from "../modal/dedicated/SelectInputCategory";
import { SelectInputOutlet } from "../modal/dedicated/SelectInputOutlet";

interface FormValues {
  ownerId: undefined;
  outlet: [];
  imageProduct: undefined;
  code: undefined;
  name: undefined;
  description: undefined;
  price: undefined;
  category: undefined;
  brand: undefined;
  stock: undefined;
  minimumStock: undefined;
  variant: ProductVariantInterface[];
}

interface VariantError {
  variantName?: string;
  variantPrice?: string;
  variantStock?: string;
}

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
};

export const AddProductForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { variants, addVariant, removeVariant, updateVariant } =
    useProductVariantStore();
  const toast = useToast();
  const sw = useScreenWidth();

  const bgComponent = useBgComponentBaseColor();

  const fileInputRef = useRef<{ reset: () => void }>(null);

  const handleAddVariant = () => {
    const valueVariant: ProductVariantInterface = {
      variantId: Date.now(),
      variantName: formik.values.variant[0].variantName,
      variantPrice: formik.values.variant[0].variantPrice,
      variantStock: formik.values.variant[0].variantStock,
    };

    addVariant(valueVariant);

    formik.setFieldValue("variant", [
      {
        variantId: undefined,
        variantName: undefined || "",
        variantPrice: undefined || 0,
        variantStock: undefined || 0,
      },
    ]);

    toast({
      title: "Varian berhasil ditambahkan",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    console.log(formik.values);
  };

  const handleRemoveVariant = (variantId: any) => {
    removeVariant(variantId);
  };

  const handleUpdateVariant = (updatedVariant: ProductVariantInterface) => {
    updateVariant(updatedVariant);
  };

  const formik = useFormik<FormValues>({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
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
      variant: [
        {
          variantId: undefined,
          variantName: undefined || "",
          variantPrice: undefined || 0,
          variantStock: undefined || 0,
        },
      ],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      price: Yup.number()
        .required("Harga harus diisi")
        .typeError("Harga harus berupa angka"),
      outlet: Yup.array()
        .required("Outlet harus diisi")
        .test({
          name: "requiredOutlet",
          message: "Pilih outlet terlebih dahulu",
          test: function (value) {
            return value.length !== 0;
          },
        }),
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
      variant: Yup.array().of(
        Yup.object().shape({
          variantName: Yup.string()
            .required("Nama varian produk harus diisi")
            .test({
              name: "requiredVariantName",
              message: "Nama varian harus diisi",
              test: function (value) {
                return value !== undefined;
              },
            }),
          variantPrice: Yup.number()
            .required("Harga varian produk harus diisi")
            .typeError("Harga varian harus berupa angka")
            .test({
              name: "requiredVariantPrice",
              message: "Harga varian harus diisi",
              test: function (value) {
                return value !== undefined;
              },
            }),
          variantStock: Yup.number()
            .required("Jumlah stok harus diisi")
            .typeError("Jumlah stok harus berupa angka")
            .test({
              name: "requiredVariantStock",
              message: "Stok varian harus diisi",
              test: function (value) {
                return value !== undefined;
              },
            }),
        })
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      console.log(values);
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
          resetForm({
            values: {
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
              variant: [
                {
                  variantId: undefined,
                  variantName: undefined || "",
                  variantPrice: undefined || 0,
                  variantStock: undefined || 0,
                },
              ],
            },
          });
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

          <VStack
            className="varian"
            w={"100%"}
            p={4}
            borderRadius={"md"}
            spacing={6}
            bg={bgComponent}
            align={"stretch"}
          >
            <VStack className="stock-form" align={"stretch"} spacing={6}>
              <Text as={"b"}>Varian Produk</Text>

              <ModalInputForm
                btnText="Tambah varian"
                headerText="Tambah varian"
                onClick={handleAddVariant}
              >
                {formik.values.variant.map((variant, index) => (
                  <ModalBody key={index}>
                    <VStack spacing={6}>
                      <FormControl
                        isInvalid={
                          formik.errors.variant &&
                          (formik.errors.variant[index] as VariantError)
                            .variantName &&
                          formik.touched.variant &&
                          formik.touched.variant[index]?.variantName
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor={`variant[${index}].variantName`}>
                          Nama varian
                        </FormLabel>
                        <Input
                          name={`variant[${index}].variantName`}
                          type="text"
                          placeholder="Nama Varian"
                          onChange={formik.handleChange}
                          value={formik.values.variant[index].variantName || ""}
                        />
                        <FormErrorMessage>
                          {formik.errors.variant &&
                            (formik.errors.variant[index] as VariantError)
                              .variantName}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={
                          formik.errors.variant &&
                          (formik.errors.variant[index] as VariantError)
                            .variantPrice &&
                          formik.touched.variant &&
                          formik.touched.variant[index]?.variantPrice
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor={`variant[${index}].variantPrice`}>
                          Harga varian
                        </FormLabel>
                        <NumberInput
                          name={`variant[${index}].variantPrice`}
                          placeholder="Harga Varian"
                          onChange={(inputValue) => {
                            formik.setFieldValue(
                              `variant[${index}].variantPrice`,
                              inputValue
                            );
                          }}
                          inputValue={
                            formik.values.variant &&
                            formik.values.variant[index].variantPrice
                          }
                          isCurrency={true}
                        />
                        <FormErrorMessage>
                          {formik.errors.variant &&
                            (formik.errors.variant[index] as VariantError)
                              .variantPrice}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={
                          formik.errors.variant &&
                          (formik.errors.variant[index] as VariantError)
                            .variantStock &&
                          formik.touched.variant &&
                          formik.touched.variant[index]?.variantStock
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor={`variant[${index}].variantStock`}>
                          Stok varian
                        </FormLabel>
                        <NumberInput
                          name={`variant[${index}].variantStock`}
                          placeholder="Stok Varian"
                          onChange={(inputValue) => {
                            formik.setFieldValue(
                              `variant[${index}].variantStock`,
                              inputValue
                            );
                          }}
                          inputValue={
                            formik.values.variant &&
                            formik.values.variant[index].variantStock
                          }
                          isCurrency={false}
                        />
                        <FormErrorMessage>
                          {formik.errors.variant &&
                            (formik.errors.variant[index] as VariantError)
                              .variantStock}
                        </FormErrorMessage>
                      </FormControl>
                    </VStack>
                  </ModalBody>
                ))}
              </ModalInputForm>
            </VStack>

            {variants.length > 0 &&
              variants.map((variant, i) => (
                <VStack
                  w={"100%"}
                  flexWrap={"wrap"}
                  key={variant.variantId}
                  px={2}
                  align="stretch"
                  fontSize={"sm"}
                  mt={variants.length > 0 ? 2 : 0}
                >
                  <HStack>
                    <Text fontWeight="semibold">Nama Varian :</Text>
                    <Text>{variant.variantName}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="semibold">Harga Varian :</Text>
                    <Text>Rp {formatNumber(variant.variantPrice)}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="semibold">Stok Varian :</Text>
                    <Text>{variant.variantStock}</Text>
                  </HStack>

                  <CButton
                    justifyContent={"start"}
                    icon={RiDeleteBinLine}
                    colorScheme="red"
                    variant="ghost"
                    size={"xs"}
                    w={"min-content"}
                    onClick={() => handleRemoveVariant(variant.variantId)}
                  >
                    Hapus
                  </CButton>
                </VStack>
              ))}
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

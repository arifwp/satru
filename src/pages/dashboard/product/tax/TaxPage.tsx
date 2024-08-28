import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { PageContainer } from "../../../../components/containers/PageContainer";
import { useBorderColorInput } from "../../../../constant/colors";
import { pageNavsProduct } from "../../../../constant/pageNavs";
import { getDataUser } from "../../../../utils/helperFunction";

export const TaxPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const borderColor = useBorderColorInput();
  const [taxValue, setTaxValue] = useState<string | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    const token = getCookie("token");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/outlet/getTax/${
          getDataUser()._id
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        setTaxValue(JSON.parse(response.request.response).data.tax);
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
        setLoaded(true);
      });
  }, []);

  const initialValues = {
    tax: taxValue && taxValue,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      tax: Yup.number().required("Harus diisi").typeError("Harus berupa angka"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      if (getDataUser().owner !== true) {
        toast({
          title: "Merubah pajak hanya bisa dilakukan oleh akun pemilik toko",
          status: "error",
          duration: 2000,
          isClosable: true,
        });

        setLoading(false);
        return;
      }

      const token = getCookie("token");

      const request = {
        ownerId: getDataUser()._id,
        tax: values.tax,
      };

      axios
        .put(`${process.env.REACT_APP_API_URL}/v1/outlet/updateTax`, request, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: AxiosResponse) => {
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

  const filteredNavsProduct =
    getDataUser().owner === true
      ? pageNavsProduct
      : pageNavsProduct.filter((nav) => !nav.adminRequired);

  const handleChangeTax = (event: any) => {
    let newTax = event.replace(/[^0-9.]/g, "");
    formik.setFieldValue("tax", newTax);
  };

  return (
    <PageContainer navs={filteredNavsProduct}>
      <VStack className="tax-container" w={"100%"} p={4}>
        <SimpleGrid w={"100%"} columns={[2]} p={4} borderRadius={"md"}>
          <Text>Pajak per tranksasi</Text>

          <form id="taxForm" onSubmit={formik.handleSubmit}>
            <VStack align={"start"}>
              <FormControl
                isInvalid={
                  formik.errors.tax && formik.touched.tax ? true : false
                }
              >
                <Skeleton isLoaded={loaded} borderRadius={"md"}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" fontSize={"sm"}>
                      %
                    </InputLeftElement>
                    <Input
                      name="tax"
                      type="text"
                      value={formik.values.tax || ""}
                      placeholder="Pajak dengan persen"
                      autoComplete="off"
                      borderColor={borderColor}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeTax(event.target.value)
                      }
                    />
                  </InputGroup>
                </Skeleton>
                <FormHelperText>
                  <Text
                    as={"i"}
                    fontSize={[10, null, 12]}
                    variant={"secondary"}
                  >
                    *Opsional : Gunakan titik (.) sebagai pengganti koma pada
                    kolom input
                  </Text>
                </FormHelperText>
                <FormErrorMessage>{formik.errors.tax}</FormErrorMessage>
              </FormControl>

              <Button
                form="taxForm"
                size={"sm"}
                isLoading={loading}
                loadingText="Loading"
                spinnerPlacement="start"
                type="submit"
                colorScheme="teal"
                mt={4}
              >
                Terapkan
              </Button>
            </VStack>
          </form>
        </SimpleGrid>
      </VStack>
    </PageContainer>
  );
};

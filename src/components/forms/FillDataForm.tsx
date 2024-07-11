import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { SelectTotalEmployees } from "../modal/dedicated/SelectTotalEmployees";
import { SelectBusinessType } from "../modal/dedicated/SelectBusinessType";
import { CButton } from "../CButton";
import { useNavigate } from "react-router-dom";
import { getCookieToken, getDataUser } from "../../utils/helperFunction";
import axios, { AxiosError, AxiosResponse } from "axios";

const initialValues = {
  businessName: undefined,
  totalEmployees: undefined,
  businessAddress: undefined,
  businessType: undefined,
};

export const FillDataForm = ({ ...rest }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      businessName: Yup.string().required("Nama bisnis harus diisi"),
      totalEmployees: Yup.object().required("Total karyawan harus diisi"),
      businessAddress: Yup.string().required("Alamat bisnis harus diisi"),
      businessType: Yup.object().required("Jenis bisnis harus diisi"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      const type = JSON.stringify(values.businessType);
      const estEmployee = JSON.stringify(values.totalEmployees);

      const finalValue = {
        ownerId: getDataUser()._id,
        name: values.businessName,
        estEmployee: JSON.parse(estEmployee).value,
        address: values.businessAddress,
        typeId: JSON.parse(type)._id,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/v1/outlet/createOutlet`,
          finalValue,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookieToken()}`,
            },
          }
        )
        .then((response: AxiosResponse) => {
          console.log(response);
        })
        .catch((error: AxiosError) => {
          console.log(error.request.response);
        });
    },
  });

  return (
    <form
      id="fillDataForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%" }}
    >
      <VStack className="form-container" spacing={6} {...rest}>
        <FormControl
          isInvalid={
            formik.errors.businessName && formik.touched.businessName
              ? true
              : false
          }
        >
          <FormLabel htmlFor="businessName">Nama Bisnis</FormLabel>
          <Input
            name="businessName"
            type="text"
            value={formik.values.businessName || ""}
            placeholder="Xiaomi Coffe"
            onChange={formik.handleChange}
            fontSize={"xs"}
          />
          <FormErrorMessage>{formik.errors.businessName}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.totalEmployees && formik.touched.totalEmployees
              ? true
              : false
          }
        >
          <FormLabel htmlFor="totalEmployees">
            Jumlah karyawan yang bekerja di bisnis anda saat ini
          </FormLabel>
          <SelectTotalEmployees
            name="totalEmployees"
            onConfirm={(inputValue) => {
              formik.setFieldValue("totalEmployees", inputValue);
            }}
            inputValue={formik.values.totalEmployees}
            placeholder="Pilih Kategori"
            isError={
              formik.touched.totalEmployees && formik.errors.totalEmployees
                ? true
                : false
            }
            withSearch={true}
            w={"100%"}
          />
          <FormErrorMessage>{formik.errors.totalEmployees}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.businessAddress && formik.touched.businessAddress
              ? true
              : false
          }
        >
          <FormLabel htmlFor="businessAddress">Alamat Bisnis</FormLabel>
          <Textarea
            name="businessAddress"
            size="sm"
            resize={"vertical"}
            placeholder="lorem ipsum dolor sit amet"
            onChange={formik.handleChange}
            value={formik.values.businessAddress || ""}
          />
          <FormErrorMessage>{formik.errors.businessAddress}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.businessType && formik.touched.businessType
              ? true
              : false
          }
        >
          <FormLabel htmlFor="businessType">Jenis Bisnis</FormLabel>
          <SelectBusinessType
            name="businessType"
            onConfirm={(inputValue) => {
              formik.setFieldValue("businessType", inputValue);
            }}
            inputValue={formik.values.businessType}
            placeholder="Pilih Jenis Bisnis"
            isError={
              formik.touched.totalEmployees && formik.errors.totalEmployees
                ? true
                : false
            }
            withSearch={true}
            w={"100%"}
          />
          <FormErrorMessage>{formik.errors.businessType}</FormErrorMessage>
        </FormControl>

        <VStack w={"100%"} mt={4}>
          <CButton
            form="fillDataForm"
            w={"100%"}
            height={"40px"}
            colorScheme="teal"
            type="submit"
          >
            Submit
          </CButton>

          <CButton
            w={"100%"}
            height={"40px"}
            colorScheme="teal"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
          >
            Next
          </CButton>
        </VStack>
      </VStack>
    </form>
  );
};

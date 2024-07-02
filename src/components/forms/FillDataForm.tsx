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
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      businessName: Yup.string().required("Nama bisnis harus diisi"),
      totalEmployees: Yup.object().required("Total karyawan harus diisi"),
      businessAddress: Yup.string().required("Alamat bisnis harus diisi"),
      businessType: Yup.object().required("Jenis bisnis harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });

  return (
    <form
      id="fillDataForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%" }}
    >
      <VStack className="form-container" spacing={6} {...rest}>
        <FormControl isInvalid={formik.errors.businessName ? true : false}>
          <FormLabel htmlFor="businessName">Nama Bisnis</FormLabel>
          <Input
            name="businessName"
            type="text"
            placeholder="Xiaomi Coffe"
            onChange={formik.handleChange}
            fontSize={"xs"}
          />
          <FormErrorMessage>{formik.errors.businessName}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.totalEmployees ? true : false}>
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
            isError={!!formik.errors.totalEmployees}
            withSearch={true}
            w={"100%"}
          />
          <FormErrorMessage>{formik.errors.totalEmployees}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.businessAddress ? true : false}>
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

        <FormControl isInvalid={formik.errors.businessType ? true : false}>
          <FormLabel htmlFor="businessType">Jenis Bisnis</FormLabel>
          <SelectBusinessType
            name="businessType"
            onConfirm={(inputValue) => {
              formik.setFieldValue("businessType", inputValue);
            }}
            inputValue={formik.values.businessType}
            placeholder="Pilih Jenis Bisnis"
            isError={!!formik.errors.businessType}
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

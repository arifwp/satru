import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  StackProps,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { businessType } from "../../data/businessType";

const initialValues = {
  businessName: "",
  businessType: "",
  businessAddress: "",
};

export const BusinessForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      businessName: Yup.string().required("Nama bisnis harus diisi"),
      businessType: Yup.string().required("Harus memilih tipe bisnis"),
      businessAddress: Yup.string().required("Alamat bisnis harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      setLoading(true);
      //   setTimeout(() => {
      //     navigate("/dashboard");
      //   }, 1000);
    },
  });

  return (
    <form
      id="businessDataForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%", marginTop: "30px" }}
    >
      <VStack spacing={10}>
        <FormControl
          isInvalid={
            formik.touched.businessName && formik.errors.businessName
              ? true
              : false
          }
        >
          <FormLabel htmlFor="businessName">Nama Bisnis</FormLabel>
          <Input
            name="businessName"
            type="text"
            placeholder="Kedai Kopi Uncle Mutu"
            onChange={formik.handleChange}
          />
          {formik.touched.businessName && formik.errors.businessName ? (
            <FormErrorMessage>{formik.errors.businessName}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl
          isInvalid={
            formik.touched.businessType && formik.errors.businessType
              ? true
              : false
          }
        >
          <FormLabel htmlFor="businessType">Tipe Bisnis</FormLabel>
          <Select
            name="businessType"
            placeholder="Pilih tipe bisnis kamu!"
            onChange={formik.handleChange}
          >
            {businessType.map((item, i) => (
              <optgroup
                label={item.optGroup === true ? item.name : ""}
                key={item.id}
              >
                <option value={item.optGroup === false ? item.name : ""}>
                  {item.optGroup === false ? item.name : ""}
                </option>
              </optgroup>
            ))}
          </Select>
          {formik.touched.businessType && formik.errors.businessType ? (
            <FormErrorMessage>{formik.errors.businessType}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl
          isInvalid={
            formik.touched.businessAddress && formik.errors.businessAddress
              ? true
              : false
          }
        >
          <FormLabel htmlFor="businessAddress">Alamat Bisnis</FormLabel>
          <Textarea
            size={"md"}
            name="businessAddress"
            resize={"vertical"}
            placeholder="Jln. kenangan sama kamu nomer 1"
            onChange={formik.handleChange}
          />
          {formik.touched.businessAddress && formik.errors.businessAddress ? (
            <FormErrorMessage>{formik.errors.businessAddress}</FormErrorMessage>
          ) : null}
        </FormControl>

        <Button
          isLoading={loading}
          loadingText="Loading"
          spinnerPlacement="start"
          type="submit"
          form="businessDataForm"
          colorScheme="teal"
          w={"100%"}
        >
          Submit
        </Button>
      </VStack>
    </form>
  );
};

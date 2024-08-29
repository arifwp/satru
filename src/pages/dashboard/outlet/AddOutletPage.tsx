import { FormControl, FormLabel, useToast, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getDataUser } from "../../../utils/helperFunction";
import { getCookie } from "typescript-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FillDataForm } from "../../../components/forms/FillDataForm";
import { useBgComponentBaseColor } from "../../../constant/colors";

const initialValues = {
  businessName: undefined,
  totalEmployees: undefined,
  businessAddress: undefined,
  businessType: undefined,
};

export const AddOutletPage = () => {
  const bgComp = useBgComponentBaseColor();

  return (
    <VStack className="add-outlet-container" w={"100%"} p={4}>
      <FillDataForm bg={bgComp} p={4} borderRadius={"md"} />
    </VStack>
  );
};

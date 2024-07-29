import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserInterface } from "../../constant/User";
import { useTriggerRenderStore } from "../../store/useTriggerRenderStore";
import { getCookie } from "typescript-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getDataUser } from "../../utils/helperFunction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CButton } from "../CButton";

interface Props {
  paramsId: any;
}

export const EditWhatsappForm = ({ paramsId, ...rest }: Props) => {
  const [data, setData] = useState<UserInterface | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const toast = useToast();
  const { statusData, setStatusData } = useTriggerRenderStore();

  useEffect(() => {
    const token = getCookie("token");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/user/getDetailUser/${
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
        setData(JSON.parse(response.request.response).data);
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
  }, [statusData]);

  const initialValues = {
    oldWa: data && data.phone,
    newWa: undefined,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      newWa: Yup.string().required("Nomor whatsapp baru harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const token = getCookie("token");

      const finalValue = {
        userId: getDataUser()._id,
        oldEmail: values.oldWa,
        newEmail: values.newWa,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/v1/user/confirmWhatsappChange`,
          finalValue,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response: AxiosResponse) => [
          resetForm({ values: initialValues }),
        ])
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

  return (
    <form
      id="editWhatsapp"
      className="edit-whatsapp-container"
      style={{ width: "100%" }}
      onSubmit={formik.handleSubmit}
    >
      <VStack w={"100%"} spacing={6}>
        <FormControl>
          <FormLabel htmlFor="oldWa">Nomor Whatsapp</FormLabel>
          <Skeleton
            isLoaded={loaded}
            height={!loaded ? "40px" : ""}
            borderRadius={"md"}
          >
            <Input
              name="oldWa"
              type="text"
              fontSize={"xs"}
              onChange={formik.handleChange}
              value={formik.values.oldWa || ""}
              readOnly
            />
          </Skeleton>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="newWa">Nomor Whatsapp Baru</FormLabel>
          <Input
            name="newWa"
            type="text"
            fontSize={"xs"}
            onChange={formik.handleChange}
            value={formik.values.newWa || ""}
          />
          <FormErrorMessage>{formik.errors.newWa}</FormErrorMessage>
        </FormControl>

        <CButton
          form="editWhatsapp"
          type="submit"
          isLoading={loading}
          spinnerPlacement="start"
          loadingText={"Loading..."}
          alignSelf={"start"}
          colorScheme="teal"
          variant="outline"
        >
          Ganti Whatsapp
        </CButton>
      </VStack>
    </form>
  );
};

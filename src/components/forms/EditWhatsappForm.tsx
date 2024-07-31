import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Skeleton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { UserInterface } from "../../constant/User";
import { useTempValueStore } from "../../store/useTempValueStore";
import { getDataUser } from "../../utils/helperFunction";
import { OtpForm } from "./OtpForm";

interface Props {
  data: UserInterface | undefined;
  loaded: boolean;
}

export const EditWhatsappForm = ({ data, loaded, ...rest }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setTempValue } = useTempValueStore();

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
        oldWa: values.oldWa,
        newWa: values.newWa,
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
        .then((response: AxiosResponse) => {
          values.newWa && setTempValue(values.newWa);
          setIsModalOpen(true);
          resetForm({ values: initialValues });
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

  return (
    <>
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
            <FormHelperText fontSize={[12, null, 14]}>
              Format nomor harus diawali dengan 62
            </FormHelperText>
            <FormErrorMessage>{formik.errors.newWa}</FormErrorMessage>
          </FormControl>

          <Button
            form="editWhatsapp"
            type="submit"
            fontSize={[12, null, 14]}
            size={"sm"}
            borderRadius={"md"}
            isLoading={loading}
            spinnerPlacement="start"
            loadingText={"Loading..."}
            alignSelf={"start"}
            colorScheme="teal"
            variant="outline"
          >
            Ganti Whatsapp
          </Button>
        </VStack>
      </form>

      <OtpForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        headerText="Kode Otp"
        subTitle="Kami telah mengirimkan kode otp ke whatsapp anda"
        url="/v1/user/changeWhatsapp"
        formId="changeWhatsappForm"
      />
    </>
  );
};

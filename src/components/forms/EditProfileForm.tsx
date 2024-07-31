import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { useBorderColorInput } from "../../constant/colors";
import { UserInterface } from "../../constant/User";
import { useTriggerRenderStore } from "../../store/useTriggerRenderStore";
import { getDataUser } from "../../utils/helperFunction";
import { InputAvatar } from "../avatar/InputAvatar";
import { SelectDateSingle } from "../modal/dedicated/SelectDateSingle";

interface Props {
  data: UserInterface | undefined;
  loaded: boolean;
}

export const EditProfileForm = ({ data, loaded, ...rest }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const fileInputRef = useRef<{ reset: () => void }>(null);
  const borderColorInput = useBorderColorInput();
  const { setStatusData } = useTriggerRenderStore();

  const initialValues = {
    name: data && data.name,
    bornDate: data?.bornDate
      ? new Date(data.bornDate).toLocaleDateString("en-GB")
      : "",
    avatar: data && data.avatar,
  };

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Nama harus diisi"),
      bornDate: Yup.string().required("Tanggal lahir harus diisi"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      const token = getCookie("token");
      const formattedDate = values.bornDate
        ? (values.bornDate as unknown as string).split("/").reverse().join("-")
        : "";

      const formData = new FormData();
      formData.append("name", values.name || "");
      formData.append("bornDate", formattedDate);
      formData.append("avatar", values.avatar || "");

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/v1/user/updateUser/${
            getDataUser()._id
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response: AxiosResponse) => {
          setStatusData();
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

  return (
    <form
      id="editProfileForm"
      style={{ width: "100%" }}
      onSubmit={formik.handleSubmit}
    >
      <Stack
        direction={["column-reverse", "column-reverse", "row", "row", "row"]}
        className="form-container"
        w={"100%"}
        spacing={6}
        {...rest}
      >
        <VStack w={"100%"} spacing={6}>
          <InputAvatar
            ref={fileInputRef}
            onFileChange={(inputValue) => {
              formik.setFieldValue("avatar", inputValue);
            }}
            onHandleDrop={(inputValue) => {
              formik.setFieldValue("avatar", inputValue);
            }}
            alt={formik.values.name}
            initValue={
              formik.values.avatar && `users/avatars/${formik.values.avatar}`
            }
          />

          <FormControl
            isInvalid={formik.errors.name && formik.touched.name ? true : false}
          >
            <FormLabel htmlFor="name">Nama</FormLabel>
            <Skeleton
              isLoaded={loaded}
              height={!loaded ? "40px" : ""}
              borderRadius={"md"}
            >
              <Input
                name="name"
                type="text"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                fontSize={"xs"}
                placeholder="Nama"
              />
            </Skeleton>
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              formik.errors.bornDate && formik.touched.bornDate ? true : false
            }
          >
            <FormLabel htmlFor="bornDate">Tanggal Lahir</FormLabel>
            <Skeleton
              isLoaded={loaded}
              height={!loaded ? "40px" : ""}
              borderRadius={"md"}
            >
              <SelectDateSingle
                initialDate={
                  formik.values.bornDate
                    ? new Date(
                        formik.values.bornDate.split("/").reverse().join("-")
                      )
                    : undefined
                }
                placeholder="Tanggal lahir"
                onConfirm={(inputValue) => {
                  console.log("hasil input", inputValue);
                  formik.setFieldValue("bornDate", inputValue);
                }}
                w={"100%"}
                h={"40px"}
                borderWidth={!!formik.errors.bornDate ? "2px" : "1px"}
                borderColor={
                  !!formik.errors.bornDate ? "red.300" : borderColorInput
                }
                boxShadow={"0 0 0 2px var(--p500) !important"}
                color={
                  formik.values.bornDate ? "fieldtext !important" : "#96969691"
                }
                fontWeight={"normal"}
                fontSize={"sm"}
                justifyContent={"flex-start"}
              />
            </Skeleton>
            <FormErrorMessage>{formik.errors.bornDate}</FormErrorMessage>
          </FormControl>

          <Button
            mt={2}
            form="editProfileForm"
            type="submit"
            borderRadius={"md"}
            size={"sm"}
            spinnerPlacement="start"
            loadingText={"Loading..."}
            isLoading={loading}
            alignSelf={"start"}
            colorScheme="teal"
            variant="outline"
            fontSize={[12, null, 14]}
          >
            Ganti Profil
          </Button>
        </VStack>
      </Stack>
    </form>
  );
};

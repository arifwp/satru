import {
  AspectRatio,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiDeleteBin2Line, RiEdit2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import * as Yup from "yup";
import { getDataUser } from "../../utils/helperFunction";
import { CButton } from "../CButton";
import { SelectDateSingle } from "../modal/dedicated/SelectDateSingle";
import { FileInput } from "../input/dedicated/FileInput";
import {
  useBgComponentBaseColor,
  useBorderColorInput,
} from "../../constant/colors";
import { UserInterface } from "../../constant/User";
import { useTriggerRenderStore } from "../../store/useTriggerRenderStore";

interface Props {
  paramsId: any;
}

export const EditProfileForm = ({ paramsId, ...rest }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<UserInterface>();
  const toast = useToast();
  const fileInputRef = useRef<{ reset: () => void }>(null);
  const borderColorInput = useBorderColorInput();
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
        setLoaded(false);
      });
  }, [statusData, toast]);

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
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // setStatusData()
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
        direction={["column-reverse", "row", "row", "row", "row"]}
        className="form-container"
        w={"100%"}
        spacing={6}
        {...rest}
      >
        <VStack w={"50%"} spacing={6}>
          <FormControl
            isInvalid={formik.errors.name && formik.touched.name ? true : false}
          >
            <FormLabel htmlFor="name">Nama</FormLabel>
            <Input
              name="name"
              type="text"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              fontSize={"xs"}
              placeholder="Nama"
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              formik.errors.bornDate && formik.touched.bornDate ? true : false
            }
          >
            <FormLabel htmlFor="bornDate">Tanggal Lahir</FormLabel>
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
            <FormErrorMessage>{formik.errors.bornDate}</FormErrorMessage>
          </FormControl>

          <Button
            mt={2}
            alignSelf={"stretch"}
            form="editProfileForm"
            size={"sm"}
            isLoading={loading}
            colorScheme="teal"
            variant={"solid"}
            type="submit"
            loadingText="Loading..."
            spinnerPlacement="start"
          >
            Submit
          </Button>
        </VStack>

        <VStack w={"50%"} align={"start"}>
          <FileInput
            ref={fileInputRef}
            onFileChange={(inputValue) => {
              formik.setFieldValue("avatar", inputValue);
            }}
            onHandleDrop={(inputValue) => {
              formik.setFieldValue("avatar", inputValue);
            }}
            initValue={
              formik.values.avatar && `users/avatars/${formik.values.avatar}`
            }
          />
        </VStack>
      </Stack>
    </form>
  );
};

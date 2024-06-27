import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { CButton } from "../../CButton";
import { useBgComponentBaseColor, useBgHover } from "../../../constant/colors";

interface Props {
  onFileChange: (file: any | undefined) => void;
  onHandleDrop: (file: any | undefined) => void;
}

export const FileInput = ({ onFileChange, onHandleDrop }: Props) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      onFileChange(file);
      // formik.setFieldValue("img", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      // formik.setFieldValue("img", file);
      onHandleDrop(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor="img">Foto</FormLabel>
      <Box
        p={2}
        border={"1px dashed"}
        borderColor={"gray.400"}
        borderRadius={"md"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        cursor={"pointer"}
        _hover={{ bg: bgHover }}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Product Preview"
            // boxSize="200px"
            objectFit="contain"
          />
        ) : (
          <>
            <Image src="/assets/svg/ic_upload.svg" w={"100%"} maxW={"100px"} />
            <Text fontSize={"xs"}>
              Geser foto anda disini atau klik untuk memilih
            </Text>
            <Text fontSize={"xs"} color="gray.500">
              (JPG, JPEG, PNG)
            </Text>
          </>
        )}
      </Box>
      <Input
        ref={inputRef}
        id="imgInput"
        type="file"
        name="img"
        accept="image/jpeg, image/png"
        onChange={(event) => {
          handleFileChange(event);
          // formik.handleChange(event);
        }}
        display={"none"}
      />
      <CButton mt={4} variant="outline" colorScheme="red">
        Reset
      </CButton>
    </FormControl>
  );
};

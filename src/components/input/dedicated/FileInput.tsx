import { Box, Icon, Image, Input, Text, VStack } from "@chakra-ui/react";
import { RiFileUploadLine } from "@remixicon/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useBgHover } from "../../../constant/colors";
import { CButton } from "../../CButton";

interface Props {
  onFileChange: (file: any | undefined) => void;
  onHandleDrop: (file: any | undefined) => void;
  initValue?: string;
}

export const FileInput = forwardRef(
  ({ onFileChange, onHandleDrop, initValue }: Props, ref) => {
    const [previewImage, setPreviewImage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const bgHover = useBgHover();

    useEffect(() => {
      if (initValue) {
        setPreviewImage(`http://localhost:3000/uploads/products/${initValue}`);
      }
    }, [initValue]);

    useImperativeHandle(ref, () => ({
      reset() {
        setPreviewImage("");
      },
    }));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        onFileChange(file);
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
        onHandleDrop(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <>
        <Box
          px={4}
          py={10}
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
              w={"100%"}
              maxW={"200px"}
              alt="Product Preview"
              objectFit="contain"
              style={{ aspectRatio: 1 / 1 }}
            />
          ) : (
            <>
              <VStack fontSize={"xs"}>
                <Icon
                  as={RiFileUploadLine}
                  color={"teal.400"}
                  fontSize={"72px"}
                />
                <Text textAlign={"center"}>
                  Geser foto anda disini atau klik untuk memilih
                </Text>
                <Text color="gray.500">(JPG, JPEG, PNG)</Text>
              </VStack>
            </>
          )}
        </Box>
        <Input
          ref={inputRef}
          id="imageProduct"
          type="file"
          name="imageProduct"
          accept="image/jpeg, image/png"
          onChange={(event) => {
            handleFileChange(event);
          }}
          display={"none"}
        />
        <CButton
          mt={4}
          variant="ghost"
          colorScheme="red"
          onClick={() => {
            setPreviewImage("");
          }}
        >
          Hapus Foto
        </CButton>
      </>
    );
  }
);

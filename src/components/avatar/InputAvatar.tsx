import { Avatar, Box, BoxProps, Input } from "@chakra-ui/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useBgHover } from "../../constant/colors";
import { CButton } from "../CButton";

interface Props extends BoxProps {
  onFileChange: (file: any | undefined) => void;
  onHandleDrop: (file: any | undefined) => void;
  initValue?: string;
  alt: string | undefined;
}

export const InputAvatar = forwardRef(
  ({ onFileChange, onHandleDrop, initValue, alt, ...rest }: Props, ref) => {
    const [previewImage, setPreviewImage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const bgHover = useBgHover();

    useEffect(() => {
      if (initValue) {
        setPreviewImage(`http://localhost:3000/uploads/${initValue}`);
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
          p={2}
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
          {...rest}
        >
          {previewImage ? (
            <Avatar
              size={{ base: "lg", sm: "xl", md: "xl", lg: "2xl", xl: "2xl" }}
              name={alt}
              src={previewImage}
            />
          ) : (
            <Avatar
              size={{ base: "lg", sm: "xl", md: "xl", lg: "2xl", xl: "2xl" }}
              name={alt}
              bg={"teal.400"}
            />
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

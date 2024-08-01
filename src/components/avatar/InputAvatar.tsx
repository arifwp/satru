import { Avatar, Box, BoxProps, Image, Input } from "@chakra-ui/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useBgHover } from "../../constant/colors";
import { CButton } from "../CButton";
import { getDataUser } from "../../utils/helperFunction";

interface Props extends BoxProps {
  onFileChange: (file: File | undefined) => void;
  onHandleDrop: (file: File | undefined) => void;
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
          borderRadius={"full"}
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
            <Image
              src={previewImage}
              objectFit={"cover"}
              boxSize={"160px"}
              borderRadius={"full"}
              style={{ aspectRatio: 1 }}
            />
          ) : (
            <Avatar
              size={["lg", "xl", "xl", "2xl", "2xl"]}
              name={getDataUser().name}
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
          onChange={handleFileChange}
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

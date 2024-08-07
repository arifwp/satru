import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { useTextPrimaryColor } from "../../constant/colors";
import { CButton } from "../CButton";

interface Props {
  children?: any;
}
export const RequiredAuth = ({ children, ...rest }: Props) => {
  const token = getCookie("token");
  const txtColor = useTextPrimaryColor();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  if (!token) {
    return (
      <VStack w={"100%"} h={"100vh"} position={"relative"} justify={"center"}>
        <Image
          w={"100%"}
          maxW={"350px"}
          src="/assets/svg/illustration_secure.svg"
        />

        <VStack>
          <Heading fontSize={"32px"} as={"h4"}>
            Login Terlebih dahulu!
          </Heading>
          <Text fontSize={"14px"}>
            Anda harus login terlebih dahulu untuk dapat mengakses halaman ini
          </Text>

          <CButton
            mt={6}
            variant="unstyled"
            color={txtColor}
            fontSize={"14px"}
            fontWeight={"normal"}
            onClick={handleClick}
          >
            {`Kembali ke halaman login >>`}
          </CButton>
        </VStack>

        <ColorModeSwitcher
          position={"absolute"}
          bottom={0}
          right={0}
          fontSize={"24px"}
          mb={"15px"}
          mr={"15px"}
        />
      </VStack>
    );
  }

  return children;
};

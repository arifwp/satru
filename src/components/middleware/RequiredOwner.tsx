import { useNavigate } from "react-router-dom";
import { useTextPrimaryColor } from "../../constant/colors";
import { getDataUser } from "../../utils/helperFunction";
import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import { CButton } from "../CButton";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

interface Props {
  children?: any;
}

export const RequiredOwner = ({ children, ...rest }: Props) => {
  const txtColor = useTextPrimaryColor();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  if (!getDataUser().owner) {
    return (
      <VStack w={"100%"} h={"100vh"} position={"relative"} justify={"center"}>
        <Image
          w={"100%"}
          maxW={"350px"}
          src="/assets/svg/illustration_secure.svg"
        />

        <VStack>
          <Heading fontSize={"32px"} as={"h4"}>
            Tidak mendapat izin!
          </Heading>
          <Text fontSize={"14px"}>
            Tidak mendapat izin, sistem mendeteksi anda bukan owner
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

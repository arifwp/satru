import {
  Button,
  ButtonProps,
  Image,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BaseModal } from "../modal/BaseModal";

interface Props extends ButtonProps {
  isDisable: boolean;
}

export const CheckoutButton = ({ isDisable, ...rest }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleClick = () => {
    if (isDisable) {
      toast({
        title: "Belum ada item di keranjang",
        description: "Tambahkan item dengan cara klik item disamping keranjang",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Button
        w={"100%"}
        size={["sm", "md"]}
        colorScheme="teal"
        variant={"solid"}
        onClick={handleClick}
      >
        Bayar
      </Button>

      <BaseModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnText="Simpan"
        btnClick={() => {}}
      >
        <VStack textAlign={"center"}>
          <Image
            src="/assets/svg/illustration_empty.svg"
            w={"100%"}
            maxW={"100px"}
          />

          <Text fontWeight={"semibold"} fontSize={[16, null, 18]}>
            Anda yakin ingin menyimpan tranksasi?
          </Text>
          <Text variant={"secondary"}>
            Tranksasi yang disimpan dapat dilihat kembali di halaman Riwayat
            Tranksasi
          </Text>
        </VStack>
      </BaseModal>
    </>
  );
};

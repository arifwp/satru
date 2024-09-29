import {
  Icon,
  IconButton,
  Image,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiBookmark2Line } from "@remixicon/react";
import { BaseModal } from "../modal/BaseModal";

interface Props {
  isDisable: boolean;
}

export const SaveTransactionButton = ({ isDisable, ...rest }: Props) => {
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
      <IconButton
        size="md"
        variant="outline"
        icon={<Icon as={RiBookmark2Line} />}
        aria-label={`Save Transaction`}
        onClick={handleClick}
      />

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

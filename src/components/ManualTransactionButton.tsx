import { useDisclosure } from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { CButton } from "./CButton";
import { ManualTransactionDrawer } from "./drawer/dedicated/ManualTransactionDrawer";

export const ManualTransactionButton = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CButton
        variant="outline"
        colorScheme="teal"
        icon={RiAddLine}
        onClick={onOpen}
        {...rest}
      >
        Tranksasi Manual
      </CButton>

      <ManualTransactionDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        children={undefined}
      />
    </>
  );
};

import {
  HStack,
  Icon,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useBgHover, useBorderColorInput } from "../../constant/colors";
import { ManualTransactionInterface } from "../../constant/Transaction";
import { RemixiconComponentType } from "@remixicon/react";

interface Props extends StackProps {
  data: ManualTransactionInterface[] | undefined;
  placeholder: string;
  icon: RemixiconComponentType;
}

export const DrawerList = ({ data, placeholder, icon, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const bgHover = useBgHover();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack
        w={"100%"}
        py={2}
        px={3}
        borderColor={borderColor}
        borderWidth={"1px"}
        borderRadius={"md"}
        justify={"space-between"}
        cursor={"pointer"}
        _hover={{ bg: bgHover }}
        onClick={onOpen}
        {...rest}
      >
        <Text>{placeholder}</Text>
        <Icon as={icon} />
      </HStack>
    </>
  );
};

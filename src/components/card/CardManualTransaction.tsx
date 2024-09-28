import {
  HStack,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useBorderColorInput } from "../../constant/colors";
import { ManualTransactionInterface } from "../../constant/Transaction";
import { ManualTransactionDrawer } from "../drawer/dedicated/ManualTransactionDrawer";
import formatNumber from "../../lib/formatNumber";

interface Props extends StackProps {
  item: ManualTransactionInterface;
}

export const CardManualTransaction = ({ item, ...rest }: Props) => {
  const borderColor = useBorderColorInput();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack
        w={"100%"}
        p={2}
        borderRadius={"md"}
        borderWidth={"2px"}
        borderColor={borderColor}
        fontSize={[10, null, 12]}
        align={"stretch"}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Text
          fontSize={[12, null, 14]}
          noOfLines={2}
          textOverflow={"ellipsis"}
          fontWeight={"semibold"}
        >
          {item.name}
        </Text>

        <HStack justify={"space-between"}>
          <Text variant={"secondary"}>Total</Text>

          <Text>{`Rp ${formatNumber(item.price)}`}</Text>
        </HStack>
      </VStack>

      <ManualTransactionDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        children={undefined}
        item={item}
      />
    </>
  );
};

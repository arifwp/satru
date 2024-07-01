import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { useEffect, useState } from "react";
import { SelectOption } from "../../constant/SelectOption";
import { useBgComponentBaseColor, useBgHover } from "../../constant/colors";
import { CButton } from "../CButton";

interface Props {
  name: string;
  placeholder: string;
  withSearch: boolean;
  withSkeleton: boolean;
  icon: RemixiconComponentType;
  options: SelectOption[];
  onConfirm: (inputValue: SelectOption | undefined) => void;
}

export const PickerButton = ({
  name,
  placeholder,
  withSearch,
  withSkeleton,
  options,
  icon,
  onConfirm,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined);
  const [displayText, setDisplayText] = useState<string>(placeholder);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const handleSelect = (val: any) => {
    val.id === selected?.id ? setSelected(undefined) : setSelected(val);
  };

  const handleSubmit = () => {
    setLoading(true);

    if (selected) {
      onConfirm(selected);
      setDisplayText(selected.name);
    } else {
      onConfirm(undefined);
      setDisplayText(placeholder);
    }

    setTimeout(() => {
      // TODO ADD API

      setLoading(false);
      onClose();
    }, 1000);
  };

  const limitedTextDisplay =
    selected && displayText.length > 20
      ? `${displayText.slice(0, 20)}...`
      : selected && displayText;

  const compWithSkeleton = () => (
    <Wrap spacing={2}>
      {options.map((item, i) => (
        <WrapItem key={item.id}>
          <Skeleton
            height={!loaded ? "20px" : ""}
            isLoaded={loaded}
            fadeDuration={1}
          >
            <Box
              as="button"
              px={4}
              py={2}
              textAlign={"start"}
              lineHeight="1.2"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              borderWidth={"1px"}
              borderRadius={"md"}
              fontSize="xs"
              _hover={{ bg: bgHover }}
              borderColor={
                selected && selected.id === item.id ? "teal.400" : undefined
              }
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </Box>
          </Skeleton>
        </WrapItem>
      ))}
    </Wrap>
  );

  const compBasic = () => (
    <Wrap spacing={2}>
      {options.map((item, i) => (
        <WrapItem key={item.id}>
          <Box
            as="button"
            px={4}
            py={2}
            textAlign={"start"}
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            borderWidth={"1px"}
            borderRadius={"md"}
            fontSize="xs"
            _hover={{ bg: bgHover }}
            borderColor={
              selected && selected.id === item.id ? "teal.400" : undefined
            }
            onClick={() => handleSelect(item)}
          >
            {item.name}
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );

  return (
    <>
      <CButton
        variant="outline"
        colorScheme="teal"
        icon={icon}
        onClick={onOpen}
        {...rest}
      >
        <Text>{selected ? limitedTextDisplay : placeholder}</Text>
      </CButton>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent bg={bgComponent}>
          <ModalHeader>{placeholder}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {withSkeleton ? compWithSkeleton() : compBasic()}
          </ModalBody>
          <ModalFooter>
            <CButton variant="outline" onClick={onClose}>
              Tutup
            </CButton>

            <CButton
              ml={4}
              variant="solid"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              onClick={handleSubmit}
            >
              Terapkan
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

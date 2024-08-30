import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { useCallback, useState } from "react";
import { SelectOption } from "../../constant/SelectOption";
import { useBgComponentBaseColor, useBgHover } from "../../constant/colors";
import { rowOptions } from "../../constant/utilsConstant";
import { debounce } from "../../utils/helperFunction";
import { CButton } from "../CButton";
import { TableSkeleton } from "../TableSkeleton";
import { SearchInput } from "../input/SearchInput";

interface Props {
  name: string;
  placeholder: string;
  withSearch: boolean;
  withSkeleton: boolean;
  icon: RemixiconComponentType;
  options: SelectOption[] | undefined;
  onConfirm: (inputValue: SelectOption[] | undefined) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  loaded: boolean;
  filterSearch: (inputValue: string) => void;
  totalItems?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const MultiPickerButtonList = ({
  name,
  placeholder,
  withSearch,
  withSkeleton,
  options,
  icon,
  onConfirm,
  isOpen,
  onOpen,
  onClose,
  loaded,
  filterSearch,
  totalItems,
  totalPages,
  onPageChange,
  onLimitChange,
  ...rest
}: Props) => {
  const [selected, setSelected] = useState<SelectOption[]>([]);
  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();
  const [display, setDisplay] = useState<SelectOption[] | undefined>([]);
  const pagesArr = Array.from({ length: totalPages as any }, (_, i) => i + 1);

  const selectLimit = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    (onLimitChange as any)(parseInt(value));
  };

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => filterSearch(searchQuery), 500),
    []
  );

  const handleSearch = (inputValue: string) => {
    debouncedSearch(inputValue);
  };

  const handleSelect = (val: SelectOption) => {
    setSelected((prevSelected) =>
      prevSelected && prevSelected.find((item: any) => item._id === val._id)
        ? prevSelected.filter((item: any) => item._id !== val._id)
        : [...prevSelected, val]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === options?.length) {
      setSelected([]);
    } else {
      setSelected(options || []);
    }
  };

  const handleSubmit = () => {
    if (selected) {
      setDisplay(selected);
      onConfirm(selected);
    } else {
      setDisplay(undefined);
      onConfirm(undefined);
    }

    onClose();
  };

  const skeleton = () => <TableSkeleton row={3} column={3} />;

  const component = () => (
    <VStack w={"100%"} spacing={2}>
      {options &&
        options.map((item, i) => (
          <Box
            key={item._id}
            w={"100%"}
            as="button"
            px={4}
            py={2}
            textAlign={"start"}
            borderWidth={"1px"}
            borderRadius={"md"}
            fontSize="xs"
            _hover={{ bg: bgHover }}
            borderColor={
              selected.find((selectedItem) => selectedItem._id === item._id)
                ? "teal.400"
                : undefined
            }
            onClick={() => handleSelect(item)}
          >
            {item.name}
          </Box>
        ))}
    </VStack>
  );

  const empty = () => (
    <VStack>
      <Image
        src="/assets/svg/illustration_empty.svg"
        w={"100%"}
        maxW={"100px"}
      />
      <Text>Data tidak ditemukan</Text>
    </VStack>
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
        <Text overflow={"hidden"} textOverflow={"ellipsis"} maxW={"100px"}>
          {display && display.length > 0
            ? display.map((item) => item.name).join(", ")
            : placeholder}
        </Text>
      </CButton>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent bg={bgComponent}>
          <ModalHeader>{placeholder}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {withSearch && (
              <SearchInput
                placeholder="Cari nama..."
                onConfirm={(inputValue) => {
                  handleSearch(inputValue);
                }}
                mb={4}
              />
            )}
            <Checkbox
              isChecked={selected.length === options?.length}
              onChange={handleSelectAll}
              mb={4}
              size={"sm"}
            >
              Pilih Semua
            </Checkbox>
            {loaded
              ? options?.length === 0
                ? empty()
                : component()
              : skeleton()}
          </ModalBody>
          <ModalFooter>
            <VStack w={"100%"} align={"stretch"}>
              <HStack w={"100%"} justify={"space-between"}>
                {totalItems && (
                  <HStack>
                    <Select
                      w={"fit-content"}
                      onChange={selectLimit}
                      isDisabled={
                        (totalItems as any) > rowOptions[0].name ? false : true
                      }
                    >
                      {rowOptions[0].name < (totalItems as any) ? (
                        rowOptions.map((item, i) => (
                          <option key={i} value={item.name}>
                            {item.name}
                          </option>
                        ))
                      ) : (
                        <option value={totalItems}>{totalItems}</option>
                      )}
                    </Select>

                    <Text
                      fontSize={[12, null, 14]}
                    >{`dari ${totalItems}`}</Text>
                  </HStack>
                )}

                {totalPages && (
                  <HStack>
                    {pagesArr.map((page: any, i: any) => (
                      <Button
                        key={i}
                        size={"sm"}
                        colorScheme="teal"
                        borderRadius={"md"}
                        variant={"outline"}
                        onClick={() => (onPageChange as any)(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </HStack>
                )}
              </HStack>

              <HStack w={"100%"} justify={"end"} mt={4}>
                <CButton variant="ghost" onClick={onClose}>
                  Tutup
                </CButton>

                <CButton
                  ml={4}
                  variant="solid"
                  colorScheme="teal"
                  onClick={handleSubmit}
                >
                  Terapkan
                </CButton>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

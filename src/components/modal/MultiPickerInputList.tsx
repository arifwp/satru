import {
  Box,
  Button,
  Checkbox,
  HStack,
  Icon,
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
import { RiArrowDownSLine } from "@remixicon/react";
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "../../constant/SelectOption";
import {
  useBgComponentBaseColor,
  useBgHover,
  useBorderColorInput,
} from "../../constant/colors";
import { CButton } from "../CButton";
import { TableSkeleton } from "../TableSkeleton";
import { SearchInput } from "../input/SearchInput";
import { debounce } from "../../utils/helperFunction";
import { rowOptions } from "../../constant/utilsConstant";

interface Props {
  name: string;
  placeholder: string;
  withSearch: boolean;
  isError?: boolean;
  options: SelectOption[] | undefined;
  inputValue: SelectOption[] | undefined;
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

export const MultiPickerInputList = ({
  name,
  placeholder,
  withSearch,
  isError,
  options,
  inputValue,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectOption[]>(inputValue || []);
  const bgComponent = useBgComponentBaseColor();
  const bgHover = useBgHover();
  const borderColorInput = useBorderColorInput();
  const pagesArr = Array.from({ length: totalPages as any }, (_, i) => i + 1);

  useEffect(() => {
    setSelected(inputValue || []);
  }, [inputValue]);

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
      prevSelected.find((item) => item._id === val._id)
        ? prevSelected.filter((item) => item._id !== val._id)
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
    onConfirm(selected);
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
      <Text>Data tidak ada</Text>
    </VStack>
  );

  return (
    <>
      <CButton
        height={"40px"}
        variant="outline"
        borderColor={isError ? "red.300" : borderColorInput}
        borderWidth={isError ? "2px" : ""}
        onClick={onOpen}
        justifyContent={"space-between"}
        {...rest}
      >
        <Text
          opacity={inputValue && inputValue.length > 0 ? 1 : 0.3}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          maxW={"200px"}
          fontSize={"13px"}
          fontWeight={"normal"}
        >
          {inputValue && inputValue.length > 0
            ? inputValue.map((item) => item.name).join(", ")
            : placeholder}
        </Text>

        <Icon as={RiArrowDownSLine} fontSize={18} />
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
                  isLoading={loading}
                  loadingText="Loading"
                  spinnerPlacement="start"
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

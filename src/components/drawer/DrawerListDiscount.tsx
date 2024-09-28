import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { useCallback, useState } from "react";
import {
  useBgComponentBaseColor,
  useBgHover,
  useBorderColorInput,
  useTextPrimaryColor,
} from "../../constant/colors";
import { DiscountInterface } from "../../constant/Discount";
import { SelectOption } from "../../constant/SelectOption";
import { rowOptions } from "../../constant/utilsConstant";
import { debounce, formatCurrency } from "../../utils/helperFunction";
import { CButton } from "../CButton";
import { SearchInput } from "../input/SearchInput";
import { TableSkeleton } from "../TableSkeleton";

interface Props {
  name: string;
  icon: RemixiconComponentType;
  withSearch: boolean;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  placeholder: string;
  options: SelectOption[] | undefined;
  filterSearch?: (inputValue: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  loaded: boolean;
  totalItems?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const DrawerListDiscount = ({
  name,
  withSearch,
  onConfirm,
  icon,
  placeholder,
  filterSearch,
  options,
  isOpen,
  onOpen,
  onClose,
  loaded,
  totalItems,
  totalPages,
  onPageChange,
  onLimitChange,
  ...rest
}: Props) => {
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined);
  const bgComp = useBgComponentBaseColor();
  const bgHover = useBgHover();
  const pagesArr = Array.from({ length: totalPages as any }, (_, i) => i + 1);
  const borderColor = useBorderColorInput();
  const textPrimaryColor = useTextPrimaryColor();

  const selectLimit = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    (onLimitChange as any)(parseInt(value));
  };

  const handleSelect = (val: any) => {
    val._id === selected?._id ? setSelected(undefined) : setSelected(val);
  };

  const debouncedSearch = useCallback(
    debounce(
      (searchQuery: string) => filterSearch && filterSearch(searchQuery),
      500
    ),
    []
  );

  const handleSearch = (inputValue: string) => {
    debouncedSearch(inputValue);
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
          <HStack
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
              selected && selected._id === item._id ? "teal.400" : undefined
            }
            onClick={() => handleSelect(item)}
          >
            <Text>{item.name}</Text>
            <Text>-</Text>
            <Text>
              {(item as DiscountInterface).discountType === 1
                ? `Rp ${formatCurrency((item as DiscountInterface).discount)}`
                : `${formatCurrency((item as DiscountInterface).discount)}%`}
            </Text>
          </HStack>
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
        fontWeight={"semibold"}
        {...rest}
      >
        {selected ? (
          <>
            <Text color={textPrimaryColor}>{selected.name}</Text>
            <Text color={textPrimaryColor}>
              {(selected as DiscountInterface).discountType === 1
                ? `Rp ${formatCurrency(
                    (selected as DiscountInterface).discount
                  )}`
                : `${formatCurrency(
                    (selected as DiscountInterface).discount
                  )}%`}
            </Text>
          </>
        ) : (
          <>
            <Text color={textPrimaryColor}>{placeholder}</Text>
            <Icon color={textPrimaryColor} as={icon} />
          </>
        )}
      </HStack>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <DrawerContent bg={bgComp}>
          <DrawerCloseButton />
          <DrawerHeader>{name}</DrawerHeader>

          <DrawerBody>
            <VStack w={"100%"} spacing={2} align={"stretch"}>
              {withSearch && (
                <SearchInput
                  placeholder="Cari nama..."
                  onConfirm={(inputValue) => {
                    handleSearch(inputValue);
                  }}
                  mb={4}
                />
              )}
              {loaded
                ? options?.length === 0
                  ? empty()
                  : component()
                : skeleton()}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
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
                  loadingText="Loading"
                  spinnerPlacement="start"
                  onClick={handleSubmit}
                >
                  Terapkan
                </CButton>
              </HStack>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

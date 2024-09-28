import {
  DrawerProps,
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTransactionStore } from "../../../store/useTransactionStore";
import { useBgComponentBaseColor } from "../../../constant/colors";
import { ManualTransactionInterface } from "../../../constant/Transaction";
import { NumberInput } from "../../input/NumberInput";

interface Props extends DrawerProps {
  children: any;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  item?: ManualTransactionInterface;
}

export const ManualTransactionDrawer = ({
  isOpen,
  onOpen,
  onClose,
  item,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const bgComp = useBgComponentBaseColor();
  const { manualTransaction, addManualTransaction } = useTransactionStore();
  const toast = useToast();

  const initialValues = {
    name: item && item.name,
    price: item && item.price,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Judul tranksasi harus diisi"),
      price: Yup.number()
        .required("Harga harus diisi")
        .typeError("Harus berupa angka"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      const idx = manualTransaction && (manualTransaction as any).length + 1;

      if (!!values.name && !!values.price) {
        const newTrx: ManualTransactionInterface = {
          _id: idx,
          name: values.name,
          price: parseInt(values.price.toString()),
        };

        addManualTransaction(newTrx);
        toast({
          title: `${values.name} telah ditambahkan`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
        resetForm({ values: initialValues });
      } else {
        toast({
          title: `Gagal menambahkan tranksasi manual`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      setLoading(false);
    },
  });

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
      size={"md"}
      {...rest}
    >
      <DrawerOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
      <DrawerContent bg={bgComp}>
        <DrawerCloseButton />

        <DrawerHeader>Tranksasi Manual</DrawerHeader>
        <form
          id="manualTransactionForm"
          onSubmit={formik.handleSubmit}
          style={{ width: "100%" }}
        >
          <DrawerBody>
            <VStack w={"100%"} spacing={2} align={"stretch"}>
              <FormControl
                isInvalid={
                  formik.errors.name && formik.touched.name ? true : false
                }
              >
                <FormLabel htmlFor="name">Nama Item</FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder="Item tambahan"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.name || ""}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  formik.errors.price && formik.touched.price ? true : false
                }
              >
                <FormLabel htmlFor="price">Harga</FormLabel>
                <NumberInput
                  name="price"
                  onChange={(inputValue) => {
                    formik.setFieldValue("price", inputValue);
                  }}
                  inputValue={formik.values.price}
                  placeholder="1.650.000"
                  isCurrency={true}
                />
                <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
              </FormControl>
            </VStack>
          </DrawerBody>
          <DrawerFooter w={"100%"}>
            <Button
              variant={"outline"}
              colorScheme="teal"
              size={"sm"}
              borderRadius={"md"}
              mr={2}
              onClick={onClose}
              flex={1}
            >
              Batal
            </Button>
            <Button
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              type="submit"
              size={"sm"}
              borderRadius={"md"}
              form="manualTransactionForm"
              colorScheme="teal"
              flex={1}
            >
              Tambahkan
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

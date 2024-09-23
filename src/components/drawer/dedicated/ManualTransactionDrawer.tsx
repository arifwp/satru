import {
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
  VStack,
} from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { ManualTransactionInterface } from "../../../constant/Transaction";
import { CButton } from "../../CButton";
import { useBgComponentBaseColor } from "../../../constant/colors";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NumberInput } from "../../input/NumberInput";
import { useTransactionStore } from "../../../store/useTransactionStore";

interface Props {
  onConfirm: (inputValue: ManualTransactionInterface | undefined) => void;
}

const initialValues = {
  name: undefined,
  price: undefined,
};

export const ManualTransactionDrawer = ({ onConfirm, ...rest }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgComp = useBgComponentBaseColor();
  const { manualTransaction, addManualTransaction } = useTransactionStore();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Judul tranksasi harus diisi"),
      price: Yup.number()
        .required("Harga harus diisi")
        .typeError("Harus berupa angka"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const idx = manualTransaction && (manualTransaction as any).length + 1;

      if (!!values.name && !!values.price) {
        const newTrx: ManualTransactionInterface = {
          _id: idx,
          name: values.name,
          price: parseInt(values.price),
        };

        addManualTransaction(newTrx);
      }

      setLoading(false);
    },
  });

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

      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        size={"full"}
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
    </>
  );
};

import { HStack, StackProps, Text, useToast, VStack } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { CategoryInterface } from "../../constant/Category";
import { SelectOption } from "../../constant/SelectOption";
import { getDataUser } from "../../utils/helperFunction";
import { TableSkeleton } from "../TableSkeleton";
import { useBorderColorInput } from "../../constant/colors";

interface Props extends StackProps {
  onConfirm: (inputValue: SelectOption[] | undefined) => void;
}

export const CategoryCard = ({ onConfirm, ...rest }: Props) => {
  const [selected, setSelected] = useState<SelectOption[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<CategoryInterface[] | undefined>(undefined);
  const toast = useToast();
  const borderColor = useBorderColorInput();

  useEffect(() => {
    const userId = getDataUser().ownerId
      ? getDataUser().ownerId
      : getDataUser()._id;
    const token = getCookie("token");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/category/getAllCategory/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        setData(JSON.parse(response.request.response).data);
      })
      .catch((error: AxiosError) => {
        toast({
          title: JSON.parse(error.request.response).message,
          status: "error",
          duration: 2000,
        });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const handleSelect = (val: SelectOption) => {
    setSelected((prevSelected) =>
      prevSelected && prevSelected.find((item: any) => item._id === val._id)
        ? prevSelected.filter((item: any) => item._id !== val._id)
        : [...prevSelected, val]
    );
  };

  useEffect(() => {
    onConfirm(selected);
  }, [selected]);

  return (
    <HStack w={"100%"} {...rest}>
      {loaded ? (
        data?.map((item, i) => (
          <VStack
            key={item._id}
            p={2}
            borderRadius={"md"}
            borderWidth={"1px"}
            borderColor={borderColor}
            bg={
              selected.find((selectedItem) => selectedItem._id === item._id)
                ? "teal.400"
                : undefined
            }
            color={
              selected.find((selectedItem) => selectedItem._id === item._id)
                ? "teal.900"
                : undefined
            }
            cursor={"pointer"}
            onClick={() => handleSelect(item)}
            align={"stretch"}
          >
            <Text fontSize={[12, null, 14]}>{item?.name}</Text>
          </VStack>
        ))
      ) : (
        <TableSkeleton row={3} column={1} />
      )}
    </HStack>
  );
};

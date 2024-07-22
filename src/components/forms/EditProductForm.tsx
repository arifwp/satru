import { Text, useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { ProductInterface } from "../../constant/Product";

interface Props {
  paramsId: string | undefined;
}

export const EditProductForm = ({ paramsId }: Props) => {
  const [data, setData] = useState<ProductInterface>();
  const toast = useToast();
  const token = getCookie("token");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/product/detailProduct/${paramsId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        setData(JSON.parse(response.request.response).data);
        console.log(JSON.parse(response.request.response).data);
      })
      .catch((error: AxiosError) => {
        toast({
          title: JSON.parse(error.request.response).message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }, []);

  return <Text>loaded</Text>;
};

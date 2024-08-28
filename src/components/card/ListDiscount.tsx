import { Wrap, WrapItem, WrapProps, useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { SelectOption } from "../../constant/SelectOption";
import { getDataUser } from "../../utils/helperFunction";
import { DiscountInterface } from "../../constant/Discount";
import { DiscountCard } from "./DiscountCard";
import { TableSkeleton } from "../TableSkeleton";

interface Props extends WrapProps {
  filterSearch: string;
  filterOutlet: SelectOption[] | undefined;
}

export const ListDiscount = ({
  filterSearch,
  filterOutlet,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DiscountInterface | undefined>(undefined);
  const toast = useToast();

  const generateRandomGradient = () => {
    const gradients = [
      "linear(to-r, teal.100, green.100)",
      "linear(to-r, blue.100, purple.100)",
      "linear(to-r, red.100, yellow.100)",
      "linear(to-r, pink.100, orange.100)",
      "linear(to-r, red.100, pink.100)",
      "linear(to-r, green.100, yellow.100)",
      "linear(to-r, red.100, purple.100)",
    ];

    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  };

  useEffect(() => {
    const token = getCookie("token");
    const userId = getDataUser().ownerId
      ? getDataUser().ownerId
      : getDataUser()._id;
    console.log(filterOutlet);

    const otltIds =
      filterOutlet && (filterOutlet as any[]).map((item) => item._id);
    const outletIds = otltIds && (otltIds as string[]).join(",");

    const request = {
      ownerId: userId,
      page: 1,
      limit: 10,
      search: filterSearch,
      outletIds: outletIds,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/discount/getAllDiscount`,
        request,
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
          isClosable: true,
        });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [toast, filterSearch, filterOutlet]);

  if (!loaded) {
    return <TableSkeleton row={4} column={4} />;
  }

  return (
    <Wrap {...rest}>
      {data &&
        (data as any).map((item: any) => (
          <WrapItem key={item._id}>
            <DiscountCard
              name={item.name}
              discountType={item.discountType}
              discount={item.discount}
              expiredDate={item.expiredDate}
              backgroundImage={generateRandomGradient()}
            />
          </WrapItem>
        ))}
    </Wrap>
  );
};

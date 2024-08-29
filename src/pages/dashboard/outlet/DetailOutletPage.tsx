import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OutletInterface } from "../../../constant/Outlet";
import { Heading, VStack } from "@chakra-ui/react";

export const DetailOutletPage = () => {
  const { outletId } = useParams();

  const [data, setData] = useState<OutletInterface | undefined>(undefined);

  useEffect(() => {}, []);

  return (
    <VStack className="outlet-container" w={"100%"} p={4}>
      <Heading>{outletId}</Heading>
    </VStack>
  );
};

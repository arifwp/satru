import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const DetailPage = () => {
  const { _id } = useParams();
  return <Heading color={"purple"}>Ini adalah detail dari id {_id}</Heading>;
};

import { Heading, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const DetailMemberPage = () => {
  const { memberId } = useParams();
  return (
    <VStack className="detail-member-container" w={"100%"} p={4}>
      <Heading>{memberId}</Heading>
    </VStack>
  );
};

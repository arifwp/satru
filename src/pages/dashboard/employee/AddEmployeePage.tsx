import { VStack } from "@chakra-ui/react";
import { AddEmployeeForm } from "../../../components/forms/AddEmployeeForm";

export const AddEmployeePage = () => {
  return (
    <VStack className="addemployee-container" w={"100%"} p={4}>
      <AddEmployeeForm />
    </VStack>
  );
};

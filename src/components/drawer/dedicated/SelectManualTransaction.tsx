import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ManualTransactionInterface } from "../../../constant/Transaction";
import { useTransactionStore } from "../../../store/useTransactionStore";
import { DrawerList } from "../DrawerList";
import { RiArrowRightSLine } from "@remixicon/react";

export const SelectManualTransaction = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<ManualTransactionInterface[] | undefined>(
    undefined
  );
  const [search, setSearch] = useState<string>("");
  const toast = useToast();
  const { manualTransaction } = useTransactionStore();

  return (
    <DrawerList
      data={manualTransaction}
      placeholder={`Manual (${manualTransaction.length})`}
      icon={RiArrowRightSLine}
    />
  );
};

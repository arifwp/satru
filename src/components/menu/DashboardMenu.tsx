import {
  Button,
  ModalBody,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RiCalendar2Fill, RiShoppingBag4Line } from "@remixicon/react";
import { useState } from "react";
import { OutletPicker } from "../OutletPicker";
import { RangeDatePicker } from "../RangeDatePicker";
import { ModalWithButton } from "../modal/ModalWithButton";

export const DashboardMenu = () => {
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const {
    isOpen: dateModalIsOpen,
    onOpen: dateModalOnOpen,
    onClose: dateModalOnClose,
  } = useDisclosure();

  const {
    isOpen: outletModalIsOpen,
    onOpen: outletModalOnOpen,
    onClose: outletModalOnClose,
  } = useDisclosure();

  const bgComponent = useColorModeValue("#F8F9FA", "#1C1C1E");

  return (
    <>
      <ModalWithButton
        id="modal-tanggal"
        size="xs"
        modalTitle="Filter Tanggal"
        buttonTitle="Filter"
        icon={RiCalendar2Fill}
        bgColorMode={bgComponent}
        onOpen={dateModalOnOpen}
        isOpen={dateModalIsOpen}
        onClose={dateModalOnClose}
      >
        <ModalBody>
          <RangeDatePicker
            onOpen={dateModalOnOpen}
            isOpen={dateModalIsOpen}
            onClose={dateModalOnClose}
          >
            <Button p={4} size={"xs"} onClick={dateModalOnClose}>
              Close
            </Button>
          </RangeDatePicker>

          {/* <ModalDateRange onChange={setSelectedDate} /> */}
        </ModalBody>
      </ModalWithButton>

      <ModalWithButton
        id="modal-outlet"
        size="md"
        modalTitle="Outlet"
        buttonTitle="Outlet"
        icon={RiShoppingBag4Line}
        bgColorMode={bgComponent}
        onOpen={outletModalOnOpen}
        isOpen={outletModalIsOpen}
        onClose={outletModalOnClose}
      >
        <ModalBody>
          <OutletPicker
            onOpen={outletModalOnOpen}
            isOpen={outletModalIsOpen}
            onClose={outletModalOnClose}
          >
            <Button p={4} size={"xs"} onClick={outletModalOnClose}>
              Close
            </Button>
          </OutletPicker>
        </ModalBody>
      </ModalWithButton>
    </>
  );
};

import {
  Button,
  ModalBody,
  ModalProps,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RiCalendarFill, RiOutletFill } from "@remixicon/react";
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

  const bgComponent = useColorModeValue("gray.100", "#161618");

  return (
    <>
      <ModalWithButton
        id="modal-tanggal"
        size="xs"
        modalTitle="Filter Tanggal"
        buttonTitle="Filter"
        icon={RiCalendarFill}
        bgColorMode={bgComponent}
        onOpen={dateModalOnOpen}
        isOpen={dateModalIsOpen}
        onClose={dateModalOnClose}
      >
        <ModalBody>
          <RangeDatePicker />

          {/* <ModalDateRange onChange={setSelectedDate} /> */}
        </ModalBody>
      </ModalWithButton>

      <ModalWithButton
        id="modal-outlet"
        size="md"
        modalTitle="Outlet"
        buttonTitle="Outlet"
        icon={RiOutletFill}
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
            <Button p={4} size={"xs"} onClick={dateModalOnClose}>
              Close
            </Button>
          </OutletPicker>
        </ModalBody>
      </ModalWithButton>
    </>
  );
};

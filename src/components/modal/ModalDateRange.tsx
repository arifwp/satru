// StyledDatePicker.js
import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Icon,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  RiCalendarFill,
  RiSendBackward,
  RiSendPlaneFill,
} from "@remixicon/react";

interface RangeDatePickerProps {
  onChange?: (dates: { start: Date | null; end: Date | null }) => void;
}

export const ModalDateRange: React.FC<RangeDatePickerProps> = ({
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange && onChange({ start, end });
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: any) => {
    return (
      <HStack justify={"center"}>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Previous Month"
          borderRadius={"lg"}
          size={"sm"}
          icon={<Icon as={RiSendBackward} />}
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        />
        <Text>
          {new Intl.DateTimeFormat("en-AU", {
            // year: "numeric",
            month: "long",
          }).format(date)}
        </Text>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Next Month"
          borderRadius={"lg"}
          size={"sm"}
          icon={<Icon as={RiSendPlaneFill} />}
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        />
      </HStack>
    );
  };

  return (
    <VStack className="container-datepicker">
      <DatePicker
        selected={startDate ?? undefined}
        onChange={handleDateChange}
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        selectsRange
        inline
        calendarClassName="custom-calendar"
        dayClassName={() => "custom-day"}
        renderCustomHeader={CustomHeader}
      />
    </VStack>
  );
};

import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  useColorModeValue,
  Flex,
  Grid,
  GridItem,
  VStack,
  IconButton,
  Icon,
  HStack,
} from "@chakra-ui/react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiSendBackward,
} from "@remixicon/react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

interface RangeDatePickerProps {
  onChange?: (dates: { start: Date | null; end: Date | null }) => void;
}

export const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      onChange && onChange({ start: date, end: null });
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
        onChange && onChange({ start: date, end: startDate });
      } else {
        setEndDate(date);
        onChange && onChange({ start: startDate, end: date });
      }
    }
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const dates = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(<GridItem key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      dates.push(
        <GridItem key={i}>
          <Button
            size="sm"
            onClick={() => handleDateClick(date)}
            fontSize="xs"
            lineHeight="1"
            p={1}
            minW="24px"
            bg={
              (startDate && date.toDateString() === startDate.toDateString()) ||
              (endDate && date.toDateString() === endDate.toDateString())
                ? "blue.300"
                : isInRange(date)
                ? "blue.100"
                : "white"
            }
          >
            {i}
          </Button>
        </GridItem>
      );
    }

    return dates;
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString("en-GB") : "";
  };

  return (
    <VStack>
      <HStack mb={4} justifyContent="space-between">
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Previous Month"
          borderRadius={"lg"}
          size={"sm"}
          icon={<Icon as={RiArrowLeftLine} />}
          onClick={() =>
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
          }
        />
        <Text fontSize="sm">{`${months[currentMonth]} ${currentYear}`}</Text>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Previous Month"
          borderRadius={"lg"}
          size={"sm"}
          icon={<Icon as={RiArrowRightLine} />}
          onClick={() =>
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
          }
        />
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {days.map((day) => (
          <GridItem key={day}>
            <Text fontSize="xs" textAlign="center">
              {day}
            </Text>
          </GridItem>
        ))}
        {renderCalendar()}
      </Grid>
      <Flex mt={4}>
        <Input
          placeholder="Start Date"
          value={formatDate(startDate)}
          readOnly
          mr={2}
        />
        <Input placeholder="End Date" value={formatDate(endDate)} readOnly />
      </Flex>
    </VStack>
  );
};

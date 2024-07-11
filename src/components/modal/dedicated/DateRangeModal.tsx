import {
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleFill,
  RiCalendar2Line,
} from "@remixicon/react";
import React, { useEffect, useState } from "react";
import { CButton } from "../../CButton";

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
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  placeholder: Date | string | null;
  onConfirmStart: (labelStartDate: Date | string | null) => void;
  onConfirmEnd: (labelEndDate: Date | string | null) => void;
  onChange?: (dates: { start: Date | null; end: Date | null }) => void;
}

export const DateRangeModal = ({
  initialStartDate,
  initialEndDate,
  placeholder,
  onConfirmStart,
  onConfirmEnd,
  onChange,
  ...rest
}: RangeDatePickerProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | string | null;
    end: Date | string | null;
  }>({ start: null, end: null });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      setStartDate(initialStartDate);
      setEndDate(initialEndDate);
      setCurrentMonth(initialStartDate.getMonth());
      setCurrentYear(initialStartDate.getFullYear());
    } else {
      const now = new Date();
      setCurrentMonth(now.getMonth());
      setCurrentYear(now.getFullYear());
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      setStartDate(start);
      setEndDate(end);
      onChange && onChange({ start, end });
    }
  }, [initialStartDate, initialEndDate, onChange]);

  const handleDateClick = (date: Date) => {
    // Check if the clicked date is within this week range
    const now = new Date();
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastDayOfWeek = new Date(now.setDate(firstDayOfWeek.getDate() + 6));

    if (date >= firstDayOfWeek && date <= lastDayOfWeek) {
      setStartDate(firstDayOfWeek);
      setEndDate(lastDayOfWeek);
      setCurrentMonth(firstDayOfWeek.getMonth());
      setCurrentYear(firstDayOfWeek.getFullYear());
      onChange && onChange({ start: firstDayOfWeek, end: lastDayOfWeek });
      return; // Exit early after setting week range
    }

    // Default logic for selecting dates
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
    if (currentMonth === null || currentYear === null) return null;
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Calculate the number of days from the previous month to display
    const previousMonthDays = firstDayOfMonth > 0 ? firstDayOfMonth : 0;
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear =
      currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPreviousMonth = getDaysInMonth(
      previousMonth,
      previousMonthYear
    );

    const dates = [];

    // Add dates from the previous month
    for (let i = previousMonthDays - 1; i >= 0; i--) {
      const date = new Date(
        previousMonthYear,
        previousMonth,
        daysInPreviousMonth - i
      );
      dates.push(
        <GridItem key={`prev-${i}`}>
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
                ? "teal.400"
                : isInRange(date)
                ? "teal.400"
                : "transparent"
            }
            color={
              (startDate && date.toDateString() === startDate.toDateString()) ||
              (endDate && date.toDateString() === endDate.toDateString())
                ? "white"
                : isInRange(date)
                ? "white"
                : "gray.500"
            }
          >
            {daysInPreviousMonth - i}
          </Button>
        </GridItem>
      );
    }

    // Add dates from the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      dates.push(
        <GridItem key={i}>
          <Button
            size="sm"
            onClick={() => handleDateClick(date)}
            fontSize="xs"
            p={1}
            minW="24px"
            bg={
              (startDate && date.toDateString() === startDate.toDateString()) ||
              (endDate && date.toDateString() === endDate.toDateString())
                ? "teal.400"
                : isInRange(date)
                ? "teal.400"
                : ""
            }
            color={
              (startDate && date.toDateString() === startDate.toDateString()) ||
              (endDate && date.toDateString() === endDate.toDateString())
                ? "white"
                : isInRange(date)
                ? "white"
                : ""
            }
          >
            {i}
          </Button>
        </GridItem>
      );
    }

    // Add dates from the next month with reduced opacity
    const totalDaysDisplayed = dates.length;
    const remainingGridItems = 42 - totalDaysDisplayed; // Assuming 6 rows of 7 days
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const daysInNextMonth = getDaysInMonth(nextMonth, nextMonthYear);

    for (let i = 1; i <= remainingGridItems; i++) {
      const date = new Date(nextMonthYear, nextMonth, i);
      dates.push(
        <GridItem key={`next-${i}`}>
          <Button
            size="sm"
            onClick={() => handleDateClick(date)}
            fontSize="xs"
            p={1}
            minW="24px"
            bg={
              (startDate && date.toDateString() === startDate.toDateString()) ||
              (endDate && date.toDateString() === endDate.toDateString())
                ? "teal.400"
                : isInRange(date)
                ? "teal.400"
                : currentMonth === date.getMonth()
                ? ""
                : "transparent"
            }
            color={
              (startDate && date.toDateString() === startDate.toDateString()) ||
              (endDate && date.toDateString() === endDate.toDateString())
                ? "white"
                : isInRange(date)
                ? "white"
                : currentMonth === date.getMonth()
                ? "gray.500"
                : ""
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

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const month = parseInt(event.target.value, 10);
    if (
      event.target.value === "" ||
      (!isNaN(month) && month >= 1 && month <= 12)
    ) {
      setCurrentMonth(event.target.value === "" ? null : month - 1);
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value, 10);

    if (event.target.value === "" || (!isNaN(year) && year > 0)) {
      setCurrentYear(event.target.value === "" ? null : year);
    }
  };

  const handleThisMonthClick = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setStartDate(start);
    setEndDate(end);
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    onChange && onChange({ start, end });
  };

  const handleThisWeekClick = () => {
    const now = new Date();
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastDayOfWeek = new Date(now.setDate(firstDayOfWeek.getDate() + 6));

    setStartDate(new Date(firstDayOfWeek));
    setEndDate(new Date(lastDayOfWeek));
    setCurrentMonth(firstDayOfWeek.getMonth());
    setCurrentYear(firstDayOfWeek.getFullYear());
    onChange && onChange({ start: firstDayOfWeek, end: lastDayOfWeek });
  };

  const handleSubmit = () => {
    setSelectedDates({
      start: formatDate(startDate),
      end: formatDate(endDate),
    });
    onConfirmStart(formatDate(startDate));
    onConfirmEnd(formatDate(endDate));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();

      // TODO ADD API
    }, 2000);
  };

  return (
    <>
      <CButton
        variant={"outline"}
        colorScheme="teal"
        icon={RiCalendar2Line}
        onClick={onOpen}
        {...rest}
      >
        {selectedDates.start
          ? `${selectedDates.start} - ${selectedDates.end}`
          : placeholder}
      </CButton>

      <Modal isCentered size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent>
          <ModalHeader>Filter Tanggal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <HStack className="input-form-container" w={"100%"} spacing={10}>
                <VStack className="month" align={"start"} flex={1}>
                  <Text fontSize={"xs"}>Bulan</Text>
                  <Input
                    size="sm"
                    type="number"
                    value={currentMonth !== null ? currentMonth + 1 : ""}
                    onChange={handleMonthChange}
                    mr={2}
                    placeholder="Month"
                    min={1}
                    max={12}
                  />
                </VStack>

                <VStack className="year" align={"start"} flex={1}>
                  <Text fontSize={"xs"}>Tahun</Text>
                  <Input
                    size="sm"
                    type="number"
                    value={currentYear !== null ? currentYear : ""}
                    onChange={handleYearChange}
                    placeholder="Year"
                    min={0}
                  />
                </VStack>
              </HStack>

              <HStack
                className="actionmonth-container"
                w={"100%"}
                mt={2}
                justify={"center"}
              >
                <IconButton
                  p={0}
                  size={"sm"}
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Previous Month"
                  borderRadius={"md"}
                  icon={<Icon as={RiArrowLeftDoubleFill} />}
                  onClick={() =>
                    setCurrentMonth((prev) => (prev === 0 ? 11 : prev! - 1))
                  }
                />

                <VStack
                  p={"5px"}
                  flex={1}
                  borderWidth={"1px"}
                  borderColor={"teal.400"}
                  borderRadius={"md"}
                >
                  <Text fontSize="sm" color={"teal.400"}>
                    {currentMonth !== null && currentYear !== null
                      ? `${months[currentMonth]} ${currentYear}`
                      : ""}
                  </Text>
                </VStack>

                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Previous Month"
                  borderRadius={"md"}
                  size={"sm"}
                  icon={<Icon as={RiArrowRightDoubleFill} />}
                  onClick={() =>
                    setCurrentMonth((prev) => (prev === 11 ? 0 : prev! + 1))
                  }
                />
              </HStack>

              <Grid w={"100%"} mt={2} templateColumns="repeat(7, 1fr)" gap={2}>
                {days.map((day) => (
                  <GridItem key={day}>
                    <Text fontSize="xs" textAlign="center">
                      {day}
                    </Text>
                  </GridItem>
                ))}
                {renderCalendar()}
              </Grid>

              <HStack w={"100%"} mt={2}>
                <Button
                  flex={1}
                  variant={"outline"}
                  colorScheme="teal"
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  p={4}
                  size="sm"
                  borderRadius={"md"}
                  onClick={handleThisMonthClick}
                >
                  Bulan Sekarang
                </Button>
                <Button
                  flex={1}
                  variant={"outline"}
                  colorScheme="teal"
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  p={4}
                  size="sm"
                  borderRadius={"md"}
                  onClick={handleThisWeekClick}
                >
                  Minggu Sekarang
                </Button>
              </HStack>

              <HStack w={"100%"} mt={2}>
                <VStack flex={1} align={"stretch"}>
                  <Input
                    name="startDate"
                    type="text"
                    size={"sm"}
                    placeholder="1/1/2024"
                    value={formatDate(startDate)}
                    readOnly
                  />
                </VStack>

                <VStack flex={1} align={"stretch"}>
                  <Input
                    name="endDate"
                    type="text"
                    size={"sm"}
                    placeholder="1/2/2024"
                    value={formatDate(endDate)}
                    readOnly
                  />
                </VStack>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <CButton variant="solid" onClick={onClose}>
              Tutup
            </CButton>

            <CButton
              variant="solid"
              type="submit"
              isLoading={loading}
              loadingText="Loading"
              spinnerPlacement="start"
              ml={4}
              onClick={handleSubmit}
            >
              Terapkan
            </CButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

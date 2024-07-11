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

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

interface DatePickerModalProps {
  initialDate?: Date | null;
  placeholder: string;
  onConfirm: (date: string | null) => void;
  [x: string]: any;
}

export const DateSingleModal: React.FC<DatePickerModalProps> = ({
  initialDate,
  placeholder,
  onConfirm,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
      setCurrentMonth(initialDate.getMonth());
      setCurrentYear(initialDate.getFullYear());
    } else {
      const now = new Date();
      setCurrentMonth(now.getMonth());
      setCurrentYear(now.getFullYear());
    }
  }, [initialDate]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const isInSelectedDate = (date: Date): boolean => {
    return (
      selectedDate !== null &&
      date.toDateString() === selectedDate.toDateString()
    );
  };

  const renderCalendar = (): React.ReactNode => {
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

    const dates: React.ReactNode[] = [];

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
            bg={isInSelectedDate(date) ? "teal.400" : "transparent"}
            color={isInSelectedDate(date) ? "white" : "gray.500"}
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
            bg={isInSelectedDate(date) ? "teal.400" : ""}
            color={isInSelectedDate(date) ? "white" : ""}
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
              isInSelectedDate(date)
                ? "teal.400"
                : currentMonth === date.getMonth()
                ? ""
                : "transparent"
            }
            color={
              isInSelectedDate(date)
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

  const formatDate = (date: Date | null): string | null => {
    return date ? date.toLocaleDateString("en-GB") : null;
  };

  const formatTime = (date: Date | null): string | null => {
    return date ? date.toLocaleString("en-GB") : null;
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

  const handleSubmit = () => {
    onConfirm(formatDate(selectedDate));
    onClose();
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   onClose();
    // }, 2000);
  };

  return (
    <>
      <CButton
        variant={"outline"}
        colorScheme="teal"
        onClick={onOpen}
        {...rest}
      >
        {selectedDate ? formatDate(selectedDate) : placeholder}
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
                    setCurrentMonth((prev) =>
                      prev === 0 ? 11 : prev && prev - 1
                    )
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
                  p={0}
                  size={"sm"}
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Next Month"
                  borderRadius={"md"}
                  icon={<Icon as={RiArrowRightDoubleFill} />}
                  onClick={() =>
                    setCurrentMonth((prev) =>
                      prev === 11 ? 0 : prev && prev + 1
                    )
                  }
                />
              </HStack>

              <VStack
                className="calendar-container"
                w={"100%"}
                spacing={3}
                mt={3}
              >
                <Grid
                  templateColumns="repeat(7, 1fr)"
                  w={"100%"}
                  justifyItems="center"
                >
                  {days.map((day, index) => (
                    <GridItem key={index}>
                      <Text
                        fontSize="xs"
                        fontWeight={"bold"}
                        color="teal.400"
                        letterSpacing="tight"
                      >
                        {day}
                      </Text>
                    </GridItem>
                  ))}
                </Grid>

                <Grid templateColumns="repeat(7, 1fr)" w={"100%"} rowGap={2}>
                  {renderCalendar()}
                </Grid>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              size="sm"
              colorScheme="teal"
              onClick={handleSubmit}
            >
              Terapkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleFill,
} from "@remixicon/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setStartDate(start);
    setEndDate(end);
    onChange && onChange({ start, end });
    formik.setFieldValue("startDate", start.toDateString());
    formik.setFieldValue("endDate", end.toDateString());
  }, [onChange]);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { startDate: "", endDate: "" },
    validationSchema: Yup.object().shape({
      startDate: Yup.string().required("Tanggal mulai harus diisi"),
      endDate: Yup.string().required("Tanggal berakhir harus diisi"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      setLoading(true);
      setTimeout(() => {
        // TODO ADD API

        setLoading(false);
      }, 1000);
    },
  });

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      formik.setFieldValue("startDate", date.toDateString());
      formik.setFieldValue("endDate", "");
      onChange && onChange({ start: date, end: null });
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
        formik.setFieldValue("startDate", date.toDateString());
        formik.setFieldValue("endDate", startDate.toDateString());
        onChange && onChange({ start: date, end: startDate });
      } else {
        setEndDate(date);
        formik.setFieldValue("endDate", date.toDateString());
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
    formik.setFieldValue("startDate", start.toDateString());
    formik.setFieldValue("endDate", end.toDateString());
    onChange && onChange({ start, end });
  };

  const handleThisWeekClick = () => {
    const now = new Date();
    const first = now.getDate() - now.getDay();
    const start = new Date(now.setDate(first));
    const end = new Date(now.setDate(first + 6));
    setStartDate(start);
    setEndDate(end);
    setCurrentMonth(start.getMonth());
    setCurrentYear(start.getFullYear());
    formik.setFieldValue("startDate", start.toDateString());
    formik.setFieldValue("endDate", end.toDateString());
    onChange && onChange({ start, end });
  };

  return (
    <form
      id="dateForm"
      onSubmit={formik.handleSubmit}
      style={{ width: "100%" }}
    >
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
            <FormControl isInvalid={!!formik.errors.startDate}>
              <FormLabel htmlFor="startDate" fontSize={"xs"}>
                Tanggal Mulai
              </FormLabel>
              <Input
                name="startDate"
                type="text"
                size={"sm"}
                placeholder="1/1/2024"
                value={formatDate(startDate)}
                onChange={formik.handleChange}
                readOnly
              />
              <FormErrorMessage fontSize={"xs"}>
                {formik.errors.startDate}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack flex={1} align={"stretch"}>
            <FormControl
              isInvalid={
                formik.errors.endDate && formik.touched.endDate ? true : false
              }
            >
              <FormLabel htmlFor="endDate" fontSize={"xs"}>
                Tanggal Berakhir
              </FormLabel>
              <Input
                name="endDate"
                type="text"
                size={"sm"}
                placeholder="1/2/2024"
                value={formatDate(endDate)}
                onChange={formik.handleChange}
                readOnly
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <FormErrorMessage fontSize={"xs"}>
                  {formik.errors.endDate}
                </FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>
        </HStack>

        <HStack
          className="modal-custom-footer"
          w={"100%"}
          justify={"end"}
          mt={2}
          mb={4}
        >
          <Button
            size={"xs"}
            p={4}
            // onClick={dateModalOnClose}
          >
            Close
          </Button>
          <Button
            size={"xs"}
            p={4}
            isLoading={loading}
            loadingText="Loading"
            spinnerPlacement="start"
            type="submit"
            form="dateForm"
            colorScheme="teal"
          >
            Terapkan
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

import { DateRangeModal } from "./DateRangeModal";

interface Props {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  onConfirmStart: (labelStartDate: Date | string | null) => void;
  onConfirmEnd: (labelEndDate: Date | string | null) => void;
}

export const SelectDateRange = ({
  initialStartDate,
  initialEndDate,
  onConfirmStart,
  onConfirmEnd,
}: Props) => {
  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString("en-GB") : "";
  };

  return (
    <DateRangeModal
      initialStartDate={initialStartDate}
      initialEndDate={initialEndDate}
      placeholder={
        initialStartDate || initialEndDate
          ? `${initialStartDate && formatDate(initialStartDate)} - ${
              initialEndDate && formatDate(initialEndDate)
            }`
          : "Filter Tanggal"
      }
      onConfirmStart={onConfirmStart}
      onConfirmEnd={onConfirmEnd}
    />
  );
};

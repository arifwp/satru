import moment from "moment";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID").format(value);
};

export const formatIDR = (value: string) => {
  // Remove non-digit characters
  const numericValue = value.replace(/\D/g, "");

  // Format the numeric value to currency IDR
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(parseInt(numericValue));

  return formatted;
};

export const getDataUser = () => {
  var dataUser = localStorage.getItem("user") || "";
  return JSON.parse(dataUser);
};

interface DateFormatProps {
  dateString: string;
}

export const formatDateToId = ({ dateString }: DateFormatProps) => {
  const formattedDate = moment(dateString).locale("id").format("D MMM YYYY");

  return formattedDate;
};

import moment from "moment";
import { DiscountInterface } from "../constant/Discount";
import { SelectOption } from "../constant/SelectOption";
import {
  ManualTransactionInterface,
  ProductCartInterface,
} from "../constant/Transaction";
import formatNumber from "../lib/formatNumber";

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

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getUserOrAdminId = () => {
  const id = getDataUser().ownerId ? getDataUser().ownerId : getDataUser()._id;

  return id;
};

interface CountTotalPrice {
  products: ProductCartInterface[];
  manualTransaction: ManualTransactionInterface[];
  applyDiscount: DiscountInterface;
  tax: number;
}

export const showPrice = (item: ProductCartInterface) => {
  let total = 0;

  total += item.price * item.qty;

  // cek apakah ada variant
  if (item && item.variants && item.variants.length > 0) {
    item.variants.map((variant) => {
      const variantPrice = variant.variantPrice;
      total = variantPrice * item.qty;

      if (item.discount && item.discountType.id === 1) {
        total = variantPrice * item.qty - item.discount || 0;
      } else if (item.discount && item.discountType.id === 2) {
        // total = variantPrice - item.discount || 0;
        let countDiscountVariant = (variantPrice * item.discount) / 100;
        let checkQtyVariant = countDiscountVariant * item.qty;
        total = variantPrice * item.qty - checkQtyVariant;
      }
    });

    //jika tidak ada variant
  } else if (item.discount && item.discountType.id === 1) {
    total = item.price * item.qty - item.discount || 0;

    // return `Rp ${formatNumber(total)}`;
  } else if (item.discount && item.discountType.id === 2) {
    // total = item.price * item.qty - item.discount || 0;
    let countDiscount = (item.price * item.discount) / 100;
    let checkQty = countDiscount * item.qty;
    total = item.price * item.qty - checkQty;
  }

  return `Rp ${formatNumber(total)}`;
};

export const showSubTotal = (
  products: ProductCartInterface[],
  manualTransaction: ManualTransactionInterface[],
  applyDiscount: SelectOption | undefined
) => {
  let total: number = 0;
  let totalProductPrice: number = 0;
  let totalManualTransaction: number = 0;

  if (products.length > 0) {
    products.map((item) => {
      if (item.finalPrice) {
        totalProductPrice += item.finalPrice;
      }
    });
  }

  if (manualTransaction.length > 0) {
    manualTransaction.map((item) => {
      totalManualTransaction += item.price;
    });
  }

  return `Rp ${
    products.length > 0 || manualTransaction.length > 0
      ? formatNumber(totalProductPrice + totalManualTransaction)
      : 0
  }`;
};

export const showTotalDiscount = (
  products: ProductCartInterface[],
  applyDiscount: SelectOption | undefined
) => {
  let totalPercent = 0;
  let totalRp = 0;

  products.map((item, i) => {
    if (!!item.discountType) {
      if (item.discountType.id === 2) {
        totalPercent += parseInt(item.discount.toString());
      }

      if (item.discountType.id === 1) {
        totalRp += parseInt(item.discount.toString());
      }
    }
  });

  if (!!applyDiscount) {
    if ((applyDiscount as DiscountInterface).discountType === 2) {
      totalPercent += (applyDiscount as DiscountInterface).discount;
    } else if ((applyDiscount as DiscountInterface).discountType === 1) {
      totalRp += (applyDiscount as DiscountInterface).discount;
    }
  }

  return `${!!totalRp ? `Rp ${formatNumber(totalRp)}` : ""} ${
    !!totalRp && !!totalPercent ? `+` : " "
  } ${!!totalPercent ? `${totalPercent}%` : "-"}`;
};

export const showTotalPrice = (
  products: ProductCartInterface[],
  manualTransaction: ManualTransactionInterface[],
  applyDiscount: SelectOption | undefined,
  tax: number | undefined
) => {
  let endPrice: number = 0;
  let priceAfterTax: number = 0;
  let totalManualTransaction: number = 0;

  if (manualTransaction.length > 0) {
    manualTransaction.map((item) => {
      totalManualTransaction += item.price;
    });
  }

  // count sub total
  let subTotal: number = 0;

  if (products.length > 0) {
    products.map((item) => {
      if (item.finalPrice) {
        subTotal += item.finalPrice;
      }
    });
  }

  // count subTotal - tax
  if (!!tax) {
    const countTax = (subTotal + totalManualTransaction * tax) / 100;
    priceAfterTax = subTotal + countTax;
  }

  endPrice = priceAfterTax + totalManualTransaction;

  //count total discount
  let totalPercent = 0;
  let totalRp = 0;

  products.map((item, i) => {
    if (!!item.discountType) {
      if (item.discountType.id === 2) {
        totalPercent += parseInt(item.discount.toString());
      }

      if (item.discountType.id === 1) {
        totalRp += parseInt(item.discount.toString());
      }
    }
  });

  if (!!applyDiscount) {
    if ((applyDiscount as DiscountInterface).discountType === 2) {
      totalPercent += (applyDiscount as DiscountInterface).discount;
    } else if ((applyDiscount as DiscountInterface).discountType === 1) {
      totalRp += (applyDiscount as DiscountInterface).discount;
    }
  }

  // count final price
  if (!!applyDiscount) {
    if ((applyDiscount as DiscountInterface).discountType === 2) {
      const countDiscount =
        (endPrice *
          parseInt((applyDiscount as DiscountInterface).discount.toString())) /
        100;
      // const checkQty = countDiscount * products.length;
      // endPrice = priceAfterTax * products.length - checkQty;
      endPrice = endPrice - countDiscount;
    } else if ((applyDiscount as DiscountInterface).discountType === 1) {
      endPrice = endPrice - totalRp;
    }
  }

  return `Rp ${endPrice !== 0 ? formatNumber(endPrice) : endPrice}`;
};

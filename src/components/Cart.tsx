import { useTransactionStore } from "../store/useTransactionStore";
import { ItemCart } from "./card/ItemCart";

export const Cart = ({ ...rest }) => {
  const { products, transaction } = useTransactionStore();

  return products && <ItemCart data={products} transaction={transaction} />;
};

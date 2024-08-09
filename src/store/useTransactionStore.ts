import { create } from "zustand";
import { TransactionInterface } from "../constant/Transaction";

interface TransactionState {
  transactions: TransactionInterface | undefined;
  addTransaction: (transaction: TransactionInterface) => void;
  updateTransaction: (transaction: TransactionInterface) => void;
  removeTransaction: (transactionId: any) => void;
  clearTransaction: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: undefined,
  // addTransaction: (transaction : TransactionInterface) =>
  //   set((state) => {
  //     const existingProduct =
  //       state.transactions &&
  //       (state.transactions as any).find(
  //         (trx: any) => trx._id === transaction._id
  //       );

  //     if (existingProduct) {

  //       const updatedTrx = state.transactions?.product.map((item) =>
  //         item._id === transaction.product[0]._id
  //           ? { ...item, qty: item.qty + 1 }
  //           : item
  //       );

  //       return { transactions: { ...state.transactions, product: updatedTrx } };
  //     }

  //     return { transactions: transaction };
  //   }),
  addTransaction: (newTransaction: TransactionInterface) =>
    set((state) => {
      if (state.transactions && state.transactions._id === newTransaction._id) {
        // Jika ID transaksi sudah ada, perbarui qty dari produk yang ada
        const updatedProducts = state.transactions.product.map((item) =>
          item._id === newTransaction.product[0]._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );

        return {
          transactions: {
            ...state.transactions,
            product: updatedProducts,
          },
        };
      } else {
        // Jika transaksi baru, tetapkan transaksi baru
        return {
          transactions: newTransaction,
        };
      }
    }),
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions:
        state.transactions &&
        (state.transactions as any).map((item: any) =>
          item._id === updatedTransaction._id ? updatedTransaction : item
        ),
    })),
  removeTransaction: (transactionId) =>
    set((state) => ({
      transactions:
        state.transactions &&
        (state.transactions as any).filter((v: any) => v._id !== transactionId),
    })),
  clearTransaction: () => set(() => ({ transactions: undefined })),
}));

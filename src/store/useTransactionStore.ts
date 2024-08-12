import { create } from "zustand";
import {
  ProductCartInterface,
  TransactionInterface,
} from "../constant/Transaction";

interface TransactionState {
  transaction: TransactionInterface | undefined;
  products: ProductCartInterface[];
  addProduct: (product: ProductCartInterface) => void;
  updateProduct: (id: string, updatedFields: any) => void;
  removeProduct: (id: string) => void;
  addTransaction: (transaction: TransactionInterface) => void;
  updateTransaction: (transaction: TransactionInterface) => void;
  removeTransaction: (transactionId: any) => void;
  clearTransaction: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transaction: undefined,
  products: [],
  addProduct: (newProduct: ProductCartInterface) =>
    set((state) => {
      const updatedProducts = [...state.products];
      const existingProductIndex = updatedProducts.findIndex(
        (product) => product._id === newProduct._id
      );

      if (existingProductIndex === -1) {
        updatedProducts.push({ ...newProduct, qty: 1 });
      } else {
        // Optional: Update quantity if you want to handle existing products differently
      }

      return { products: updatedProducts };
    }),
  updateProduct: (_id: string, updatedFields: any) =>
    set((state) => ({
      products: state.products.map((product) =>
        product._id === _id ? { ...product, ...updatedFields } : product
      ),
    })),
  removeProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter((v: any) => v._id !== id),
    })),
  addTransaction: (transaction: TransactionInterface) =>
    set((state) => {
      // Simply set or update the transaction without modifying the products
      return { transaction };
    }),
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transaction:
        state.transaction &&
        (state.transaction as any).map((item: any) =>
          item._id === updatedTransaction._id ? updatedTransaction : item
        ),
    })),
  removeTransaction: (transactionId) =>
    set((state) => ({
      transaction:
        state.transaction &&
        (state.transaction as any).filter((v: any) => v._id !== transactionId),
    })),
  clearTransaction: () => set(() => ({ transaction: undefined })),
}));

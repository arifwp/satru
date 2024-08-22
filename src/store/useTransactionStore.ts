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
  updateTransaction: (_id: string, updatedFields: any) => void;
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

      // if (existingProductIndex === -1) {
      //   // console.log("ini zustand masuk");
      //   updatedProducts.push({ ...newProduct, qty: 1 });
      // } else {
      //   // Optional: Update quantity if you want to handle existing products differently
      //   updatedProducts.push({ ...newProduct, qty: 1 });
      // }

      updatedProducts.push({ ...newProduct });

      return { products: updatedProducts };
    }),
  updateProduct: (indexProduct: string, updatedFields: any) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.indexProduct === indexProduct
          ? { ...product, ...updatedFields }
          : product
      ),
    })),
  removeProduct: (indexProduct: string) =>
    set((state) => ({
      products: state.products.filter(
        (v: any) => v.indexProduct !== indexProduct
      ),
    })),
  addTransaction: (transaction: TransactionInterface) =>
    set((state) => {
      // Simply set or update the transaction without modifying the products
      return { transaction };
    }),
  updateTransaction: (_id: string, updatedFields: any) =>
    set((state) => ({
      transaction:
        state.transaction &&
        (state.transaction as any).map((trx: any) =>
          trx._id === _id ? { ...trx, ...updatedFields } : trx
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

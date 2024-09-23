import { create } from "zustand";
import {
  ManualTransactionInterface,
  ProductCartInterface,
  TransactionInterface,
} from "../constant/Transaction";

interface TransactionState {
  transaction: TransactionInterface | undefined;
  products: ProductCartInterface[];
  manualTransaction: ManualTransactionInterface[];
  addProduct: (product: ProductCartInterface) => void;
  updateProduct: (id: string, updatedFields: any) => void;
  removeProduct: (id: string) => void;
  addManualTransaction: (trx: ManualTransactionInterface) => void;
  updateManualTransaction: (id: string, updatedFields: any) => void;
  removeManualTransaction: (id: string) => void;
  addTransaction: (transaction: TransactionInterface) => void;
  updateTransaction: (_id: string, updatedFields: any) => void;
  removeTransaction: (transactionId: any) => void;
  clearTransaction: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transaction: undefined,
  products: [],
  manualTransaction: [],
  addProduct: (newProduct: ProductCartInterface) =>
    set((state) => {
      const updatedProducts = [...state.products];
      const existingProductIndex = updatedProducts.findIndex(
        (product) => product._id === newProduct._id
      );

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
  addManualTransaction: (newTrx: ManualTransactionInterface) =>
    set((state) => {
      const updatedTrx = [...state.manualTransaction];
      updatedTrx.push({ ...newTrx });

      return { manualTransaction: updatedTrx };
    }),
  updateManualTransaction: (index: string, updatedFields: any) =>
    set((state) => ({
      manualTransaction: state.manualTransaction.map((trx) =>
        trx._id === index ? { ...trx, ...updatedFields } : trx
      ),
    })),
  removeManualTransaction: (index: string) =>
    set((state) => ({
      manualTransaction: state.manualTransaction.filter(
        (v: any) => v._id !== index
      ),
    })),
  addTransaction: (transaction: TransactionInterface) =>
    set((state) => {
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

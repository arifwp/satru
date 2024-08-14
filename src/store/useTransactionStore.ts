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
        // console.log("ini zustand masuk");
        updatedProducts.push({ ...newProduct, qty: 1 });
      } else {
        // Optional: Update quantity if you want to handle existing products differently
        updatedProducts.push({ ...newProduct, qty: 1 });
      }
      // else {
      // Optional: Update quantity if you want to handle existing products differently
      // if (newProduct.variants && newProduct.variants?.length > 0) {
      //   // updatedProducts.push({ ...newProduct, qty: 1 });
      //   const existingVariantIndex = updatedProducts.findIndex((product) =>
      //     product.variants?.map(
      //       (item) =>
      //         item._id ===
      //         newProduct.variants?.map((val) => val._id)
      //     )
      //   );
      //   console.log("adalah", existingVariantIndex);
      //   if (existingVariantIndex === 0) {
      //     console.log("varian sama tambah lagi");
      //     return { products: updatedProducts };
      //   }
      // }
      // }

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
  removeProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter((v: any) => v.indexProduct !== id),
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

import { create } from "zustand";
import { ProductVariantInterface } from "../constant/Product";

interface ProductVariantState {
  variants: ProductVariantInterface[];
  addVariant: (variant: ProductVariantInterface, note?: string) => void;
  removeVariant: (variantId: any) => void;
  updateVariant: (variant: ProductVariantInterface) => void;
  clearVariant: () => void;
}

export const useProductVariantStore = create<ProductVariantState>((set) => ({
  variants: [],
  // addVariant: (variant, note) =>

  //   set((state) => ({
  //     variants: [...state.variants, variant],
  //   })),
  // addVariant: (variant,note) =>
  //   set((state) => {
  //     if (note) {

  //     }
  //     const exists = state.variants.some((v) => v._id === variant._id);
  //     if (!exists) {
  //       return { variants: [...state.variants, variant] };
  //     }
  //     return state;
  //   }),
  addVariant: (variant, note) =>
    set((state) => {
      if (note) {
        const exists = state.variants.some((v) => v._id === variant._id);
        if (!exists) {
          return { variants: [...state.variants, variant] };
        }
        return state;
      }
      return { variants: [...state.variants, variant] };
    }),
  removeVariant: (variantId) =>
    set((state) => ({
      variants: state.variants.filter((v) => v.variantId !== variantId),
    })),
  updateVariant: (updatedVariant) =>
    set((state) => ({
      variants: state.variants.map((variant) =>
        variant.variantId === updatedVariant.variantId
          ? updatedVariant
          : variant
      ),
    })),
  clearVariant: () => set(() => ({ variants: [] })),
}));

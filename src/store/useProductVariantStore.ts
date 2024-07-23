import { create } from "zustand";
import { ProductVariantInterface } from "../constant/Product";

interface ProductVariantState {
  variants: ProductVariantInterface[];
  addVariant: (variant: ProductVariantInterface) => void;
  removeVariant: (variantId: any) => void;
  updateVariant: (variant: ProductVariantInterface) => void;
}

export const useProductVariantStore = create<ProductVariantState>((set) => ({
  variants: [],
  // addVariant: (variant) =>
  //   set((state) => ({
  //     variants: [...state.variants, variant],
  //   })),
  addVariant: (variant) =>
    set((state) => {
      const exists = state.variants.some((v) => v._id === variant._id);
      if (!exists) {
        return { variants: [...state.variants, variant] };
      }
      return state;
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
}));

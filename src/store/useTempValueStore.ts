import { create } from "zustand";

interface ValueTempInterface {
  tempValue: string;
  setTempValue: (value: string) => void;
  clearTempValue: () => void;
}

export const useTempValueStore = create<ValueTempInterface>((set) => ({
  tempValue: "",
  setTempValue: (value: string) => set((state) => ({ tempValue: value })),
  clearTempValue: () => set(() => ({ tempValue: "" })),
}));

import { create } from "zustand";

interface EmailTempInterface {
  tempEmail: string;
  setTempEmail: (email: string) => void;
  clearTempEmail: () => void;
}

export const useTempEmailStore = create<EmailTempInterface>((set) => ({
  tempEmail: "",
  setTempEmail: (email: string) => set((state) => ({ tempEmail: email })),
  clearTempEmail: () => set(() => ({ tempEmail: "" })),
}));

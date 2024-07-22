import { create } from "zustand";

interface StatusDataInterface {
  statusData: boolean;
  setStatusData: () => void;
}

export const useTriggerRenderStore = create<StatusDataInterface>((set) => ({
  statusData: false,
  setStatusData: () =>
    set((state) => ({ statusData: state.statusData ? false : true })),
}));

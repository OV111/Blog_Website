import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: false,
  login: () => set({ auth: true }),
  logout: () => set({ auth: false }),
}));

export  default useAuthStore;

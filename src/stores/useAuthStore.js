import { create } from "zustand";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const useAuthStore = create((set) => ({
  auth: false,
  isLoading: false,
  init: async () => {
    try {
      set({ isLoading: true });
      const request = await fetch(`${API_BASE_URL}/verify-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      });
      const response = await request.json();
      if(!response.valid) {
        localStorage.removeItem("JWT");
      }
      set({ auth: response.valid });
    } catch {
      set({ auth: false });
    } finally {
      set({ isLoading: false });
    }
  },
  login: (token) => {
    localStorage.setItem("JWT", token);
    set({ auth: true });
  },
  logout: () => {
    localStorage.removeItem("JWT");
    set({ auth: false });
  },
}));

export default useAuthStore;

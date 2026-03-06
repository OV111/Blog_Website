import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: JSON.parse(localStorage.getItem("AuthToken")) || false ,
  login: () => {
    localStorage.setItem("AuthToken", true);
    set({ auth: true });
  },  
  logout: () => {
    localStorage.setItem("AuthToken", false);
    set({ auth: false });
  },
}));

export default useAuthStore;

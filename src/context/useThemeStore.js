import { create } from "zustand";

const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("theme") || "light",
//   setTheme: () => {
//     const newTheme = get().theme === "dark" ? "light" : "dark";
//     set({ theme: newTheme });
//     localStorage.setItem("theme", newTheme);
//   },
  setTheme : () => {
    set({theme: get().theme === "dark" ? "light" : "dark"})
    localStorage.setItem("theme",get().theme)
  }
}));

export default useThemeStore;

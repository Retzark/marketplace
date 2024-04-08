// src/stores/useUserStore.js
import create from "zustand";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, // Initialize user from localStorage
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Persist user to localStorage
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user"); // Clear user from localStorage
    set({ user: null });
  },
}));

export default useUserStore;

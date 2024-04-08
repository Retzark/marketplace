import create from "zustand";
import apiService from "../api/apiService.js";

const useAppStore = create((set, get) => ({
  // Initial state
  settings: {},
  types: [],
  // Actions
  fetchSettings: async () => {
    try {
      const response = await apiService.fetchSettings();
      set({ settings: response, settingsReady: true });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  },
  getSettings: () => get().settings,
}));

export default useAppStore;

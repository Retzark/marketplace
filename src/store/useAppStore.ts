import create from "zustand";
import apiService from "@/api/apiService";
import { AppState } from "@/types/AppState";

const useAppStore = create<AppState>((set, get) => ({
  settings: null,
  settingsReady: false,
  error: null,

  fetchSettings: async () => {
    try {
      const response = await apiService.fetchSettings(); // Assume this returns a Settings object
      set({ settings: response, settingsReady: true });
    } catch (error) {
      console.log(error);
      set({ error });
    }
  },
}));

export default useAppStore;

import { Settings } from "@/types/Settings";

export interface AppState {
  error: Error | null;
  fetchSettings: () => Promise<void>;
  settings: Settings;
  settingsReady: boolean;
}

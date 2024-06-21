import axios from "axios";
import userStore from "@/store/userStore";
import useAppStore from "@/store/useAppStore";
import useStore from "@/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure the baseURL is correctly set from environment variables
  withCredentials: true,
});

const apiService = {
  async fetchSettings() {
    try {
      // Use the `api` instance to make the request
      const response = await api.get("/settings");
      return response.data; // Assuming the settings are directly in the response body
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error; // Re-throwing the error to handle it in the calling function
    }
  },
  async login(data) {
    try {
      // Use the `api` instance to make the request
      const response = await api.post("/auth/login", data);
      console.log(response);
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Re-throwing the error to handle it in the calling function
    }
  },
  async startTransfer(recipient, quantity) {
    try {
      const username = userStore.getState().user?.username;

      const { sidechain_id, nft_symbol } = useAppStore.getState().settings;

      const operations = [
        [
          "custom_json",
          {
            required_auths: [username],
            required_posting_auths: [],
            id: sidechain_id,
            json: JSON.stringify({
              contractName: "tokens",
              contractAction: "transfer",
              contractPayload: {
                nft_symbol,
                recipient,
                quantity: quantity.toString(),
              },
            }),
          },
        ],
      ];
      const broadcastOps = useStore.getState().requestBroadcastOps;
      await broadcastOps(username, operations, "Active");
    } catch (error) {
      console.log(error);
    }
  },
};

export default apiService;

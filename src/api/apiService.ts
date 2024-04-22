import axios from "axios";
import process from "node:process";

const apiService = {
  async fetchSettings() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/settings`,
      );
      return response.data; // Assuming the settings are directly in the response body
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error; // Re-throwing the error to handle it in the calling function
    }
  },
  async startPurchase() {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}purchases/start`,
      {
        username: "gacbaluyot",
        items: [{ symbol: "DATA", quantity: 1 }],
        payment_method: "crypto",
        currency: "HIVE",
      },
    );
    console.log(response);
  },

  async login(data) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      data,
    );
    console.log(response);
  },
};

export default apiService;

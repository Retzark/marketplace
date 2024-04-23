import axios from "axios";

// Create an Axios instance specifically for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure the baseURL is correctly set from environment variables
});

const apiService = {
  async fetchSettings() {
    try {
      // Use the `api` instance to make the request
      const response = await api.get("/settings");
      console.log(document.cookie);
      return response.data; // Assuming the settings are directly in the response body
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error; // Re-throwing the error to handle it in the calling function
    }
  },
  async startPurchase() {
    const payload = {
      username: "gacbaluyot",
      items: [{ symbol: "DATA", quantity: 1 }],
      payment_method: "crypto",
      currency: "HIVE",
    };

    try {
      const response = await api.post("/purchases/start", payload, {});
      console.log(response.data);
    } catch (error) {
      console.error("Error making the purchase:", error);
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
};

export default apiService;

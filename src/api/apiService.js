// src/services/apiService.js

import axios from "axios";

const baseURL = "https://market.retzark.com/api";

const apiService = {
  async fetchSettings() {
    try {
      const response = await axios.get(`${baseURL}/settings`);
      return response.data; // Assuming the settings are directly in the response body
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error; // Re-throwing the error to handle it in the calling function
    }
  },

  // You can add more API calls here
};

export default apiService;

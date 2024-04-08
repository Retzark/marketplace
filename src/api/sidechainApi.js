// src/services/sidechainApi.js
import axios from "axios";
import useAppStore from "../store/useAppStore"; // Adjust import path as needed

const sidechainApi = {
  async call(endpoint, request) {
    // Fetch settings directly from the store

    const { sidechain_rpc } = useAppStore.getState().settings;

    if (!sidechain_rpc) {
      console.error("sidechain_rpc is not set in settings.");
      throw new Error("sidechain_rpc is not set in settings.");
    }

    const postData = {
      jsonrpc: "2.0",
      id: Date.now(),
      ...request,
    };

    console.log(`${sidechain_rpc}/${endpoint}`);
    try {
      const response = await axios.post(
        `${sidechain_rpc}/${endpoint}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
      return response.data.result;
    } catch (error) {
      console.error("Sidechain call error:", error);
      throw error;
    }
  },

  // Other methods...
};

export default sidechainApi;

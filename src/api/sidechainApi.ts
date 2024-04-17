import axios from "axios";
import useAppStore from "@/store/useAppStore"; // Adjust import path as needed

interface SidechainRequest {
  method: string;
  params: any; // You can further detail this type based on actual parameters expected
}

// Interface for the response structure from the sidechain API
interface SidechainResponse {
  jsonrpc: string;
  id: number;
  result?: any; // Define more specific type if possible
  error?: { code: number; message: string; data?: any };
}

const sidechainApi = {
  async call(endpoint: string, request: SidechainRequest): Promise<any> {
    // Fetch settings directly from the store
    const { sidechain_rpc } = useAppStore.getState().settings;

    if (!sidechain_rpc) {
      throw new Error("sidechain_rpc is not set in settings.");
    }

    const postData: SidechainRequest = {
      jsonrpc: "2.0",
      id: Date.now(),
      ...request,
    };
    try {
      const response = await axios.post<SidechainResponse>(
        `${sidechain_rpc}/${endpoint}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );

      if (response.data.error) {
        throw new Error(`API Error: ${response.data.error.message}`);
      }
      return response.data.result;
    } catch (error) {
      console.error("Sidechain call error:", error);
      throw error;
    }
  },
};

export default sidechainApi;

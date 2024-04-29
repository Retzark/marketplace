import axios from "axios";
import userStore from "@/store/userStore";
import useAppStore from "@/store/useAppStore";
import useStore from "@/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure the baseURL is correctly set from environment variables
  withCredentials: true
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
    const username = userStore.getState().user.username;
    const payload ={
      "username":username,
      "items":[{"symbol":"DATA","quantity":1}],
      "payment_method":"crypto",
      "currency":"HBD"
    };


    try {
      // Create an Axios instance specifically for API requests
      const response = await axios.post(`https://market.retzark.com/api/purchases/start`, payload , {});
      let operations = []

      const paymentInfo = response.data;
      const { sidechain_id } = useAppStore.getState().settings;

      // console.log(paymentInfo)
      if (paymentInfo.payment_info.type === 'hive') {
        operations = [['transfer', {
          from: username,
          to: paymentInfo.payment_info.address,
          amount: `${paymentInfo.payment_info.amount} ${paymentInfo.payment_info.currency}`,
          memo: paymentInfo.payment_info.memo
        }]]
      } else {
        operations = [['custom_json', {
          required_auths: [username],
          required_posting_auths: [],
          id: sidechain_id,
          json: JSON.stringify({
            contractName: 'tokens',
            contractAction: 'transfer',
            contractPayload: {
              symbol: paymentInfo.currency,
              quantity: paymentInfo.payment.amount.toString(),
              to: paymentInfo.address,
              memo: paymentInfo.uid
            }
          })
        }]]
      }
      const broadcastOps = useStore.getState().requestBroadcastOps;
      await broadcastOps(username, operations, "Active"); // console.log("Packs opened successfully:", result.data);

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

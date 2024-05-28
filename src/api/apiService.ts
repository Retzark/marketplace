import axios from "axios";
import userStore from "@/store/userStore";
import useAppStore from "@/store/useAppStore";
import useStore from "@/store";

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const apiService = {
  async fetchSettings() {
    try {
      const response = await api.get("/settings");
      return response.data;
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error;
    }
  },

  async startPurchase() {
    const username = userStore.getState().user?.username;
    const payload = {
      username,
      items: [{ symbol: "DATA", quantity: 1 }],
      payment_method: "crypto",
      currency: "HBD",
    };

    try {
      const response = await axios.post(
        "https://market.retzark.com/api/purchases/start",
        payload,
      );
      const paymentInfo = response.data;
      const { sidechain_id } = useAppStore.getState().settings;
      const amount = parseFloat(paymentInfo.payment_info.amount).toFixed(3);
      let operations = [];

      if (paymentInfo.payment_info.type === "hive") {
        operations = [
          [
            "transfer",
            {
              from: username,
              to: paymentInfo.payment_info.address,
              amount: `${amount} ${paymentInfo.payment_info.currency}`,
              memo: paymentInfo.payment_info.memo,
            },
          ],
        ];
      } else {
        operations = [
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
                  symbol: paymentInfo.currency,
                  quantity: paymentInfo.payment.amount.toString(),
                  to: paymentInfo.address,
                  memo: paymentInfo.uid,
                },
              }),
            },
          ],
        ];
      }

      const broadcastOps = useStore.getState().requestBroadcastOps;
      await broadcastOps(username, operations, "Active");
    } catch (error) {
      console.error("Error making the purchase:", error);
    }
  },

  async login(data) {
    try {
      const response = await api.post("/auth/login", data);
      console.log(response);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  async startTransfer(recipient, quantity) {
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

    try {
      const broadcastOps = useStore.getState().requestBroadcastOps;
      await broadcastOps(username, operations, "Active");
    } catch (error) {
      console.log(error);
    }
  },
};

export default apiService;

import { useState } from "react";
import useUserStore from "@/store/userStore";
import apiService from "@/api/apiService";

export interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  if (!isOpen) return null;

  const handleLogin = () => {
    if (!username) return;
    if (!window.hive_keychain) return alert("Hive Keychain is not installed.");

    const ts = Date.now();
    window.hive_keychain.requestSignBuffer(
      username,
      `${username}${ts}`,
      "Posting",
      (response) => {
        if (response.success) {
          // Assuming the user object you want to store
          const user = { username };
          // console.log({ data : {response.result, ts, username}});

          apiService.login({ username, ts, sig: response.result });
          setUser(user); // Update Zustand store and localStorage with user data
          onClose(); // Close the modal
        } else {
          // Handle login failure
          alert("Login failed. Please try again.");
        }
      },
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150"
          >
            <span className="sr-only">Close</span>×
          </button>
        </div>
        <div className="mt-3 text-center">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Login with Hive Keychain
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-4 px-4 py-2 border rounded-md w-full"
          />
          <div className="mt-4">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

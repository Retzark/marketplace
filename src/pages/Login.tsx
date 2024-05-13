import LazyLoad from "react-lazyload";
import { useState } from "react";
import useUserStore from "@/store/userStore";
import apiService from "@/api/apiService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate(); // Using the useNavigate hook to redirect

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
          const user = { username };
          apiService.login({ username, ts, sig: response.result });
          setUser(user);
          navigate("/"); // Redirect to the home page on successful login
          onClose(); // Ensure onClose is defined or handled properly in your props
        } else {
          alert("Login failed. Please try again.");
        }
      },
    );
  };

  return (
    <div>
      <LazyLoad height="70vh" once>
        <div
          className="relative text-white text-center bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/open-pack-image.webp')`,
            height: "70vh",
            width: "100vw",
          }}
        >
          <div className="absolute inset-x-0 bottom-10 mx-auto w-full max-w-xs p-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login with Keychain
            </button>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default Login;

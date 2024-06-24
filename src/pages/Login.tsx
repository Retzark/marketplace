import LazyLoad from "react-lazyload";
import { useState } from "react";
import useUserStore from "@/store/userStore";
import apiService from "@/api/apiService";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Image, Input } from "@chakra-ui/react";

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
      }
    );
  };

  return (
    <div>
      <LazyLoad height="70vh" once>
        <Box
          className="relative text-white text-center bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/open-pack-image.webp')`,
            height: "91vh",
            // width: "100vh",
          }}
          p="10"
        >
          <Flex w="100%" h="100%" alignItems="center">
            <Flex flexDirection="column" alignItems="center" w="100%">
              <Image
                src="./images/retzark-logo.png"
                objectFit="contain"
                width="300px"
              />
              <Flex flexDirection="column" alignItems="center" mt="6" w="25%">
                <Input
                  type="text"
                  bgColor="white"
                  placeholder="Username"
                  fontFamily="Poppins"
                  fontWeight="400"
                  color="black"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  mt="2"
                  display="flex"
                  alignItems="center"
                  bg="#15C1A2"
                  color="white"
                  size="md"
                  shadow="md"
                  borderColor="#1C465B"
                  borderRadius="md"
                  fontFamily="CCElephantmenTall Regular"
                  fontWeight="400"
                  py="6"
                  w="full"
                  _hover={{ bg: "#15C1A2d6", transform: "scale(1.04)" }}
                  onClick={handleLogin}
                >
                  LOGIN WITH KEYCHAIN
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </LazyLoad>
    </div>
  );
};

export default Login;

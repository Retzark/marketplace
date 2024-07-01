import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AppRoutes from "@/routes";
import useInitializeSettings from "@/hooks/useInitializeSettings";
import Loading from "@/components/Loading";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import useBalanceStore from "@/store/useBalanceStore";

export default function App() {
  const settingsReady = useInitializeSettings();
  const { fetchData } = useBalanceStore();

  useEffect(() => {
    if (settingsReady) {
      fetchData();
    }
  }, [settingsReady, fetchData]);

  if (!settingsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <Flex direction="column" minH="100vh" bgColor="#090909">
        <Navbar />
        <Box flexGrow={1} mt="65px">
          <AppRoutes />
        </Box>
        {/* <Box className="w-full h-1 bg-yellow-500 mt-8"></Box> */}
      </Flex>
    </Router>
  );
}

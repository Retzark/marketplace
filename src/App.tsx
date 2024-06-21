import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AppRoutes from "@/routes";
import useInitializeSettings from "@/hooks/useInitializeSettings";
import Loading from "@/components/Loading";
import { Box } from "@chakra-ui/react";

export default function App() {
  const settingsReady = useInitializeSettings();

  if (!settingsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <Box className="min-h-screen flex flex-col" bgColor="#090909">
        <Navbar />
        <Box mt="65px">
          <AppRoutes />
        </Box>
        <div className="w-full h-1 bg-yellow-500 mt-8"></div>
      </Box>
    </Router>
  );
}

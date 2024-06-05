import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AppRoutes from "@/routes";
import useInitializeSettings from "@/hooks/useInitializeSettings";
import Loading from "@/components/Loading";

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
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <AppRoutes />
        <div className="w-full h-1 bg-yellow-500 mt-8"></div>
      </div>
    </Router>
  );
}

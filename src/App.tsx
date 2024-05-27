import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AppRoutes from "@/routes";
import useInitializeSettings from "@/hooks/useInitializeSettings";
import Loading from "@/components/Loading";

export default function App() {
  const settingsReady = useInitializeSettings();

  if (!settingsReady) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

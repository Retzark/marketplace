import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes.jsx";
import useAppStore from "./store/useAppStore.js";
import { useEffect } from "react";

export default function App() {
  const fetchSettings = useAppStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

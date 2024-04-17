import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AppRoutes from "@/routes";

export default function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

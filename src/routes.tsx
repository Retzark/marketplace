import { Route, Routes } from "react-router-dom";
import Marketplace from "@/pages/Marketplace";
import Cards from "@/pages/Cards";
import Open from "@/pages/Open";
import CardDetails from "@/pages/CardDetails";
import Home from "@/pages/Home";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cards" element={<Cards />} />
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/open" element={<Open />} />
    <Route path="/card/:id" element={<CardDetails />} />
    {/* Add route for card details */}
  </Routes>
);

export default AppRoutes;

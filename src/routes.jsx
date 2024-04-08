import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Marketplace from "./pages/Marketplace.jsx";
import Cards from "./pages/Cards.jsx";
import Open from "./pages/Open.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Hero />} />
    <Route path="/cards" element={<Cards />} />
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/open" element={<Open />} />
  </Routes>
);

export default AppRoutes;

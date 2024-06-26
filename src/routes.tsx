import { Route, Routes } from "react-router-dom";
import Marketplace from "@/pages/Marketplace";
import Cards from "@/pages/Cards";
import Open from "@/pages/Open";
import CardDetails from "@/pages/CardDetails";
import Home from "@/pages/Home";
import Packs from "@/pages/Packs";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import CollectionCardDetail from "@/pages/CollectionCardDetail";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cards/:username" element={<Cards />} />
    <Route
      path="/collection/card/:id"
      element={<CollectionCardDetail />}
    />{" "}
    <Route path="/packs" element={<Packs />} />
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/open" element={<Open />} />
    <Route path="/login" element={<Login />} />
    <Route path="/card/:id" element={<CardDetails />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default AppRoutes;

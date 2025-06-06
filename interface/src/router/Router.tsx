import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ShoppingCart from "../pages/ShoppingCart";
import Favorites from "../pages/Favorites";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

export default AppRouter;

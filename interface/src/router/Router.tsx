import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ShoppingCart from "../pages/ShoppingCart";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Buy from "../pages/Buy";
import { ProductPage } from "../pages/Product";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/buy" element={<Buy />} />
    </Routes>
  );
};

export default AppRouter;

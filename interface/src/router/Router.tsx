import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ShoppingCart from "../pages/ShoppingCart";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Buy from "../pages/Buy";
import ProductPage from "../pages/Product";

/**
 * AppRouter component that defines the application's routes.
 * 
 * This component uses React Router to define the routes for the application, mapping paths to specific components. 
 * It includes routes for the following pages:
 * - Home (`/`)
 * - Product page (`/product/:productId`)
 * - Shopping Cart (`/shopping-cart`)
 * - Favorites (`/favorites`)
 * - Login (`/login`)
 * - Buy (`/buy`)
 * 
 * @returns {JSX.Element} The rendered routes for the application.
 * 
 * @example
 * // Example usage:
 * // <AppRouter />
 */
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

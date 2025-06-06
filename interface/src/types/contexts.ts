import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Product } from "./products";

export interface HeaderContextType {
  favorites: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
  shoppingCart: Product[];
  setShoppingCart: Dispatch<SetStateAction<Product[]>>;
}

export interface MyContextProviderProps {
  children: ReactNode;
}

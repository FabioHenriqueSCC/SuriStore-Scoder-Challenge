import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Product } from "./products";
import type { UserData } from "./user";

export interface HeaderContextType {
  favorites: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
  shoppingCart: Product[];
  setShoppingCart: Dispatch<SetStateAction<Product[]>>;
}

export interface UserContextType {
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
}

export interface MyContextProviderProps {
  children: ReactNode;
}

import { createContext, useContext, useState } from "react";

import type { Product } from "../../types/products";
import type {
  HeaderContextType,
  MyContextProviderProps,
} from "../../types/contexts";

const HeaderContext = createContext<HeaderContextType | null>(null);

export const HeaderProvider = ({ children }: MyContextProviderProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [shoppingCart, setShoppingCart] = useState<Product[]>([]);

  const contextValue = {
    allProducts,
    setAllProducts,
    shoppingCart,
    setShoppingCart,
    favorites,
    setFavorites,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider"
    );
  }

  return context;
};

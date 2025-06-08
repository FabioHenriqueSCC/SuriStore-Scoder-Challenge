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

/**
 * HeaderContext provider and custom hook for managing header-related state.
 *
 * This context provides global state management for the header section, including:
 * - All products (`allProducts`)
 * - Favorite products (`favorites`)
 * - Shopping cart items (`shoppingCart`)
 *
 * The `HeaderProvider` component wraps the application and provides access to these state values and their setters.
 * The `useHeaderContext` hook allows consuming components to access and update the state managed by the `HeaderContext`.
 *
 * @param {MyContextProviderProps} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components that will have access to the context.
 *
 * @returns {JSX.Element} The rendered provider component with access to the header context.
 *
 * @example
 * // Example usage:
 * // <HeaderProvider>
 * //   <YourComponent />
 * // </HeaderProvider>
 *
 * @throws {Error} Throws an error if `useHeaderContext` is used outside of a `HeaderProvider`.
 */
export const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider"
    );
  }

  return context;
};

import { createContext, useContext, useState } from "react";

import type { Product } from "../../types/products";
import type {
  HeaderContextType,
  MyContextProviderProps,
} from "../../types/contexts";

const HeaderContext = createContext<HeaderContextType | null>(null);

/**
 * HeaderProvider component that provides shopping cart state to the context.
 *
 * This component wraps its children with a context provider (`HeaderContext.Provider`) and manages the `shoppingCart` state.
 * The context value includes the current `shoppingCart` array and a setter function (`setShoppingCart`) to update the cart.
 *
 * The `HeaderProvider` should be used to wrap parts of the application where the shopping cart state needs to be accessed.
 *
 * @param {MyContextProviderProps} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components that will have access to the context.
 *
 * @returns {JSX.Element} The wrapped children with access to the header context.
 *
 * @example
 * // Example usage:
 * // <HeaderProvider>
 * //   <YourComponent />
 * // </HeaderProvider>
 */
export const HeaderProvider = ({ children }: MyContextProviderProps) => {
  const [shoppingCart, setShoppingCart] = useState<Product[]>([]);

  const contextValue = {
    shoppingCart,
    setShoppingCart,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};

/**
 * Custom hook to access the header context.
 *
 * This hook provides access to the `HeaderContext` values, including the shopping cart state and the function to update it.
 * If used outside of the `HeaderProvider`, it throws an error to ensure the context is only accessed within the provider.
 *
 * @returns {object} The context value, which includes `shoppingCart` and `setShoppingCart`.
 *
 * @throws {Error} If used outside of a `HeaderProvider`, an error is thrown.
 *
 * @example
 * // Example usage:
 * // const { shoppingCart, setShoppingCart } = useHeaderContext();
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

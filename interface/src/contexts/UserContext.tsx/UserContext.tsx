import { createContext, useContext, useState } from "react";

import type {
  UserContextType,
  MyContextProviderProps,
} from "../../types/contexts";
import type { UserData } from "../../types/user";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: MyContextProviderProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

/**
 * UserContext provider and custom hook for managing user-related state.
 * 
 * This context provides global state management for the user's data, including:
 * - User data (`userData`), which contains information about the logged-in user.
 * 
 * The `UserProvider` component wraps the application and provides access to the `userData` state and its setter (`setUserData`).
 * The `useUserContext` hook allows consuming components to access and update the user data.
 * 
 * @param {MyContextProviderProps} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components that will have access to the context.
 * 
 * @returns {JSX.Element} The rendered provider component with access to the user context.
 * 
 * @example
 * // Example usage:
 * // <UserProvider>
 * //   <YourComponent />
 * // </UserProvider>
 * 
 * @throws {Error} Throws an error if `useUserContext` is used outside of a `UserProvider`.
 */
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider"
    );
  }

  return context;
};

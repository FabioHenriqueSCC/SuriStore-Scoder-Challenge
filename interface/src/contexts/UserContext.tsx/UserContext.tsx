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

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider"
    );
  }

  return context;
};

import { useLocation } from "react-router-dom";

import { navigationItems } from "./constants/productCategory";

import Header from "./components/Header/Header";
import { CatalogNav } from "./components/CatalogNav/CatalogNav";

import { HeaderProvider } from "./contexts/Header/HeaderContext";
import { UserProvider } from "./contexts/UserContext.tsx/UserContext";

import { handleCategoryClick } from "./utils/effects";

import AppRouter from "./router/Router";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <UserProvider>
        <HeaderProvider>
          <Header />
          {isHomePage && (
            <CatalogNav
              items={navigationItems}
              onCategoryClick={handleCategoryClick}
            />
          )}
          <AppRouter />
        </HeaderProvider>
      </UserProvider>
    </>
  );
}

export default App;

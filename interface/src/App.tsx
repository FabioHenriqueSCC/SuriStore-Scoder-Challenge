import Header from "./components/Header/Header";

import { HeaderProvider } from "./contexts/Header/HeaderContext";
import { UserProvider } from "./contexts/UserContext.tsx/UserContext";

import AppRouter from "./router/Router";

function App() {
  return (
    <>
      <UserProvider>
        <HeaderProvider>
          <Header />
          <AppRouter />
        </HeaderProvider>
      </UserProvider>
    </>
  );
}

export default App;

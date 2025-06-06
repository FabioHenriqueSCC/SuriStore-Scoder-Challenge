import Header from "./components/Header/Header";
import { HeaderProvider } from "./contexts/Header/HeaderContext";
import AppRouter from "./router/Router";

function App() {
  return (
    <>
      <HeaderProvider>
        <Header />
        <AppRouter />
      </HeaderProvider>
    </>
  );
}

export default App;

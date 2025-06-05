import { MantineProvider } from "@mantine/core";
import "./App.css";

function App() {
  return (
    <>
      <MantineProvider>
        <div className="min-h-screen flex items-center justify-center bg-red-100">
          <h1 className="text-4xl font-bold text-blue-600">
            Tailwind funcionando!
          </h1>
        </div>
      </MantineProvider>
    </>
  );
}

export default App;

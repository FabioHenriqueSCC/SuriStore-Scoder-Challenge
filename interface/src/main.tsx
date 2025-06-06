import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";

import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.layer.css";
import "@mantine/carousel/styles.css";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <App />
      <ToastContainer />
    </MantineProvider>
  </StrictMode>
);

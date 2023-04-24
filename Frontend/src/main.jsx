import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
        <Notifications position="bottom-center" />
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
);

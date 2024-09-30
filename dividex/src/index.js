import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import initializeLocalStorage from "./db/initializeData";
import { AuthProvider } from "./context/AuthContext";

const initApp = async () => {
  try {
    await initializeLocalStorage();
  } catch (error) {
    console.error("Error al inicializar el almacenamiento local:", error);
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
};

initApp();

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import initializeLocalStorage from "./db/initializeData"; // Corrige la ruta si es necesario

const initApp = async () => {
  await initializeLocalStorage();

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initApp();

reportWebVitals();

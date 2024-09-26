import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import initializeLocalStorage from "./db/initializeData"; // Corrige la ruta si es necesario

const initApp = async () => {
  try {
    await initializeLocalStorage();
  } catch (error) {
    console.error("Error al inicializar el almacenamiento local:", error);
    // Aquí podrías manejar el error de otra manera, como mostrar un mensaje al usuario
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initApp();

reportWebVitals();
